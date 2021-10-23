import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {HOST} from '../../common/constant';
import {isEmpty} from '../../common/util';
import {
  clearRecentSearchWord,
  getRecentSearchWord,
  saveSearchWord,
} from '../../service/common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getContentsList, getNestContentsList} from '../../service/content';

export function FindScreen({route, navigation}) {
  const params = route.params;
  const defaultCategory = params.categoryFilter ? params.categoryFilter : [];
  const groupFilter = params.groupFilter ? params.groupFilter : [];
  // const defaultTag = params.tagFilter ? params.tagFilter : [];
  const [categoryFilter, setCategoryFilter] = React.useState(defaultCategory);
  const [tagFilter, setTagFilter] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [nextURL, setNextURL] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [fetchingNext, setFetchingNext] = React.useState(true);
  const [tagInput, setTagInput] = React.useState('');
  const [inputFocused, setInputFocused] = React.useState(false);
  const [recentSearchWords, setRecentSearchWords] = React.useState([]);

  React.useEffect(() => {
    console.log('called effect');
    getContentsList(1, 14, categoryFilter, tagFilter, groupFilter)
      .then(res => {
        setNextURL(res.next);
        setData(res.results);
      })
      .then(() => {
        setRefreshing(false);
        setFetchingNext(false);
      });
    getRecentSearchWord().then(r => setRecentSearchWords(r));
  }, [JSON.stringify(tagFilter), refreshing]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: params.title,
    });
  });

  const isScrollEnd = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    const ret =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
    return ret;
  };

  const fetchNext = () => {
    if (nextURL === null) return;
    console.log('Fetch next');
    setFetchingNext(true);
    getNestContentsList(nextURL).then(res => {
      data.push.apply(data, res.results);
      setNextURL(res.next);
      setData(data);
      setFetchingNext(false);
    });
  };

  const addTagFilter = value => {
    if (isEmpty(value)) return;
    else if (!tagFilter.includes(value)) {
      tagFilter.push(value);
      setTagFilter(tagFilter);
    }
  };

  const removeTagFromFilter = value => {
    let index = tagFilter.indexOf(value);
    if (index !== -1) {
      tagFilter.splice(index, 1);
      setTagFilter(tagFilter);
      setRefreshing(true);
    }
  };

  const handleTagSubmit = async ({nativeEvent}) => {
    await saveSearchWord(nativeEvent.text);
    getRecentSearchWord().then(r => setRecentSearchWords(r));
    setInputFocused(false);
    addTagFilter(nativeEvent.text);
    setTagInput('');
    setRefreshing(true);
    Keyboard.dismiss();
  };

  const onSearchInputFocused = () => {
    setInputFocused(true);
  };

  const clearSearch = () => {
    clearRecentSearchWord();
    setRecentSearchWords([]);
  };

  const renderItem = itemObject => {
    let item = itemObject.item;
    let source = require('../../../assets/imgs/add_image.png');
    if (item.images.length > 0) {
      source = {uri: HOST + item.images[0]};
    }
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ContentsModal', item.id)}
        style={styles.abilityFrame}>
        <Image source={source} style={styles.flatListImage} />
        {/* <Text style={[styles.fontJeju, styles.abilityItemTitle]}>
          {item.title}
        </Text> */}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.baseContainer}>
        <FindBar
          tagFilter={tagFilter}
          removeTagFromFilter={removeTagFromFilter}
          handleTagSubmit={handleTagSubmit}
          onFocused={onSearchInputFocused}
        />
        <FlatList
          key={'#'}
          keyExtractor={item => '#' + item.id}
          data={data}
          renderItem={renderItem}
          horizontal={false}
          numColumns={2}
          refreshing={refreshing}
          style={[
            styles.flatListFrame,
            {display: inputFocused ? 'none' : 'flex'},
          ]}
          onScroll={({nativeEvent}) => {
            if (isScrollEnd(nativeEvent)) {
              console.log(fetchingNext);
              if (!fetchingNext) fetchNext();
            }
          }}
        />
        <View style={{flex: 1, display: inputFocused ? 'flex' : 'none'}}>
          <TouchableOpacity onPress={() => clearSearch()}>
            <Text style={{textAlign: 'right'}}>모두 지우기</Text>
          </TouchableOpacity>
          {recentSearchWords.map(word => {
            return (
              <TouchableOpacity
                key={word}
                style={{
                  paddingVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  maxHeight: 70,
                }}
                onPress={() => handleTagSubmit({nativeEvent: {text: word}})}>
                <Ionicons name="time-outline" size={20} color={'black'} />
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                    justifyContent: 'center',
                  }}>
                  {word}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

export function FindBar({
  tagFilter,
  removeTagFromFilter,
  handleTagSubmit,
  onFocused,
}) {
  const [tagInput, setTagInput] = React.useState('');

  const handleSubmit = e => {
    handleTagSubmit(e);
    setTagInput('');
  };

  return (
    <ScrollView
      style={styles.tagSearchWrapper}
      horizontal={true}
      contentContainerStyle={{alignItems: 'center'}}>
      {tagFilter.map(tag => {
        return (
          <View key={tag} style={styles.tagWrapper}>
            <Text style={{flex: 1, color: 'white', fontSize: 12}}>{tag}</Text>
            <Pressable
              style={{flex: 1, marginLeft: 5, alignItems: ''}}
              onPress={() => removeTagFromFilter(tag)}>
              <Text style={{color: 'white', fontSize: 12}}>x</Text>
            </Pressable>
          </View>
        );
      })}
      <TextInput
        value={tagInput}
        onChangeText={v => setTagInput(v)}
        style={styles.textinput}
        placeholder="태그 검색"
        onSubmitEditing={handleSubmit}
        onFocus={() => onFocused()}
      />
    </ScrollView>
  );
}

const styles = new StyleSheet.create({
  baseContainer: {
    backgroundColor: 'white',
    flex: 1,
    padding: 15,
  },
  tagSearchWrapper: {
    flex: 1,
    marginBottom: 20,
    maxHeight: 40,
    backgroundColor: '#F6F7F9',
  },
  tagWrapper: {
    flex: 1,
    paddingVertical: 3,
    paddingHorizontal: 10,
    height: '70%',
    alignItems: 'center',
    backgroundColor: '#F85B02',
    borderRadius: 5,
    flexDirection: 'row',
    marginRight: 7,
  },
  textinput: {
    fontFamily: 'JejuGothicOTF',
    minWidth: 200,
    height: 40,
    backgroundColor: '#F6F7F9',
    fontSize: 17,
    padding: 10,
  },
  flatListFrame: {
    // paddingHorizontal: 5,
  },
  abilityFrame: {
    width: '50%',
    paddingBottom: 5,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  flatListImage: {
    width: '100%',
    aspectRatio: 1.3,
    alignSelf: 'center',
    // marginBottom: 7,
    borderRadius: 5,
    overflow: 'hidden',
  },
  fontJeju: {
    fontFamily: 'JejuGothicOTF',
  },
  abilityItemTitle: {
    fontSize: 17,
  },
});
