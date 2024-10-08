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
  TouchableWithoutFeedback,
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
import {normalizeFontSize} from '../../component/font';

export function FindScreen({route, navigation}) {
  const params = route.params;
  const isMain = params.isMain ? params.isMain : false;
  const defaultCategory = params.categoryFilter ? params.categoryFilter : [];
  const groupFilter = params.groupFilter ? params.groupFilter : [];
  const defaultTag = params.tagFilter ? params.tagFilter : [];
  const user_id = params.user_id;
  // const defaultTag = params.tagFilter ? params.tagFilter : [];
  const [categoryFilter, setCategoryFilter] = React.useState(defaultCategory);
  const [tagFilter, setTagFilter] = React.useState(defaultTag);
  const [data, setData] = React.useState([]);
  const [nextURL, setNextURL] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [fetchingNext, setFetchingNext] = React.useState(true);
  const [tagInput, setTagInput] = React.useState('');
  const [inputFocused, setInputFocused] = React.useState(false);
  const [recentSearchWords, setRecentSearchWords] = React.useState([]);

  React.useEffect(() => {
    console.log('called effect');
    getContentsList(1, 14, categoryFilter, tagFilter, groupFilter, user_id)
      .then(res => {
        setNextURL(res.next);
        setData(res.results);
      })
      .then(() => {
        setRefreshing(false);
        setFetchingNext(false);
      });
    getRecentSearchWord().then(r => setRecentSearchWords(r));
  }, [JSON.stringify(tagFilter), refreshing, JSON.stringify(categoryFilter)]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: params.title ? params.title : '검색',
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

  const addSelectedTags = tags => {
    for (let tagData of tags) {
      addTagFilter(tagData);
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
        onPress={() => navigation.push('ContentsModal', item.id)}
        style={styles.abilityFrame}>
        <Image source={source} style={styles.flatListImage} />
        {/* <Text style={[styles.fontJeju, styles.abilityItemTitle]}>
          {item.title}
        </Text> */}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
          setInputFocused(false);
        }}>
        <View style={styles.baseContainer}>
          <View style={{flex: 1, flexDirection: 'row', maxHeight: 60}}>
            <FindBar
              tagFilter={tagFilter}
              removeTagFromFilter={removeTagFromFilter}
              handleTagSubmit={handleTagSubmit}
              onFocused={onSearchInputFocused}
            />
            <TouchableOpacity
              style={[styles.filterIcon, {display: isMain ? 'flex' : 'none'}]}
              onPress={() =>
                navigation.push('카테고리&태그 선택', {
                  selectCategories: categories => {
                    setCategoryFilter(categories);
                    setRefreshing(true);
                    // setRerenderKey(!rerenderKey);
                  },
                  selectTags: tags => {
                    addSelectedTags(tags);
                    setRefreshing(true);
                    // setRerenderKey(!rerenderKey);
                  },
                  categories: categoryFilter,
                  tags: tagFilter,
                  isUpload: false,
                })
              }>
              <Image source={require('../../../assets/imgs/ICON-24-Filter.png')} />
            </TouchableOpacity>
          </View>
          <FlatList
            key={'#'}
            keyExtractor={item => '#' + item.id}
            data={data}
            renderItem={renderItem}
            horizontal={false}
            onRefresh={() => setRefreshing(true)}
            numColumns={2}
            refreshing={refreshing}
            style={[
              styles.flatListFrame,
              {
                display: inputFocused ? 'none' : 'flex',
                flex: 1,
              },
            ]}
            onScroll={({nativeEvent}) => {
              if (isScrollEnd(nativeEvent)) {
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
                      fontSize: normalizeFontSize(15),
                      justifyContent: 'center',
                    }}>
                    {word}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </TouchableWithoutFeedback>
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

  const handleChangeText = text => {
    setTagInput(text);
    let last = text.charAt(text.length - 1);
    if (last === ' ') {
      let word = text.substring(0, text.length - 1);
      handleSubmit({nativeEvent: {text: word}});
    }
  };

  return (
    <ScrollView
      style={styles.tagSearchWrapper}
      horizontal={true}
      contentContainerStyle={{alignItems: 'center', paddingLeft: 10}}>
      {tagFilter.map(tag => {
        return (
          <View key={tag} style={styles.tagWrapper}>
            <Text style={{flex: 1, color: 'white', fontSize: normalizeFontSize(12),}}>{tag}</Text>
            <Pressable
              style={{flex: 1, marginLeft: 5, alignItems: ''}}
              onPress={() => removeTagFromFilter(tag)}>
              <Text style={{color: 'white', fontSize: normalizeFontSize(12),}}>x</Text>
            </Pressable>
          </View>
        );
      })}
      <TextInput
        value={tagInput}
        onChangeText={v => handleChangeText(v)}
        style={styles.textinput}
        placeholder={tagFilter.length ? '' : '태그 검색'}
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
    fontSize: normalizeFontSize(17),
    padding: 10,
    paddingLeft: 0,
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
    fontSize: normalizeFontSize(17),
  },
  filterIcon: {
    flex: 1,
    maxWidth: 30,
    justifyContent: 'center',
    maxHeight: 40,
    alignItems: 'center',
    marginLeft: 5,
  },
});
