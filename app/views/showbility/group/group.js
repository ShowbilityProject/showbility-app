import * as React from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {FindBar} from '../../components/find';
import {isEmpty} from '../../../common/util';
import {getGroups, GET_GROUP_TYPE} from '../../../service/group';
import {HOST} from '../../../common/constant';

const styles = StyleSheet.create({
  flatListImage: {
    height: '75%',
    aspectRatio: 1.3,
    alignSelf: 'center',
    marginBottom: 7,
    resizeMode: 'cover',
  },
  abilityFrame: {
    width: '50%',
    paddingBottom: 5,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  fontJeju: {
    fontFamily: 'JejuGothicOTF',
  },
  abilityItemTitle: {
    fontSize: 17,
  },
  flatListFrame: {
    paddingHorizontal: 10,
  },
  touchableArea: {
    paddingHorizontal: 5,
    height: 190,
  },
  groupTitle: {
    padding: 5,
    marginBottom: 5,
  },
  groupArea: {
    marginBottom: 20,
  },
  searchArea: {
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  textinput: {
    fontFamily: 'JejuGothicOTF',
    width: '100%',
    height: 40,
    backgroundColor: '#F6F7F9',
    marginBottom: 20,
    fontSize: 17,
    padding: 10,
  },
  suggestTagView: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F7F7F7',
    marginRight: 10,
    borderRadius: 5,
  },
  suggestTagText: {
    fontSize: 12,
  },
  showAllText: {
    textAlign: 'right',
    fontSize: 12,
    color: '#F85B02',
  },
});

function GroupArea({title, fetchType}) {
  const navigation = useNavigation();

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getGroups(fetchType).then(res => {
      console.log('Received groups ', fetchType);
      setData(res.results);
    });
  }, [fetchType]);

  const renderItem = itemObject => {
    let item = itemObject.item;
    const imageSource = !isEmpty(item.repr_image)
      ? {uri: item.repr_image}
      : require('../../../../assets/imgs/add_image.png');
    return (
      <TouchableOpacity
        style={styles.touchableArea}
        onPress={() =>
          navigation.navigate('GroupDetail', {id: item.id, name: item.name})
        }>
        <Image source={imageSource} style={styles.flatListImage} />
        <Text style={[styles.fontJeju, {fontSize: 17}]}>{item.name}</Text>
        <Text style={[styles.fontJeju, {fontSize: 10, marginTop: 7}]}>
          {item.detail}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.groupArea}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Text
            style={[
              styles.groupTitle,
              styles.fontJeju,
              styles.abilityItemTitle,
            ]}>
            {title}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text
            style={[styles.showAllText]}
            onPress={() =>
              navigation.navigate('GroupDepthView', {
                title: title,
                fetchType: fetchType,
              })
            }>
            전체 보기
          </Text>
        </View>
      </View>
      <FlatList
        horizontal
        key={'#'}
        keyExtractor={item => '#' + item.id}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
}

export function GroupScreen() {
  const [tagFilter, setTagFilter] = React.useState([]);
  const [rerenderKey, setRerenderKey] = React.useState(false);

  React.useEffect(() => {
    console.log(tagFilter);
  }, [Object.keys(tagFilter).join()]);

  const addTagFilter = value => {
    if (isEmpty(value)) return;
    else if (!tagFilter.includes(value)) {
      tagFilter.push(value);
      setTagFilter(tagFilter);
      setRerenderKey(!rerenderKey);
    }
  };

  const removeTagFromFilter = value => {
    let index = tagFilter.indexOf(value);
    if (index !== -1) {
      tagFilter.splice(index, 1);
      setTagFilter(tagFilter);
      setRerenderKey(!rerenderKey);
    }
  };
  const handleTagSubmit = ({nativeEvent}) => {
    addTagFilter(nativeEvent.text);
  };

  return (
    <ScrollView style={{paddingHorizontal: 15}}>
      <FindBar
        key={rerenderKey}
        tagFilter={tagFilter}
        removeTagFromFilter={removeTagFromFilter}
        handleTagSubmit={handleTagSubmit}
        onFocused={() => {}}
      />
      <GroupArea title="마이 그룹" fetchType={GET_GROUP_TYPE.MY} />
      <GroupArea title="쇼빌 그룹 둘러보기" fetchType={GET_GROUP_TYPE.ALL} />
    </ScrollView>
  );
}
