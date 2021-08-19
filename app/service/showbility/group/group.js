import * as React from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import {TagSearchArea} from '../tagItems';
import {useNavigation} from '@react-navigation/core';

const styles = StyleSheet.create({
  flatListImage: {
    height: '80%',
    aspectRatio: 1.3,
    alignSelf: 'center',
    marginBottom: 7,
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
    height: 240,
  },
  groupTitle: {
    padding: 5,
    marginBottom: 5,
  },
  groupArea: {
    paddingHorizontal: 10,
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

function GroupArea(dataObject) {
  const navigation = useNavigation();
  let data = dataObject.items;
  let title = dataObject.title;

  const renderItem = itemObject => {
    let item = itemObject.item;
    return (
      <TouchableOpacity style={styles.touchableArea}>
        <Image source={{uri: item.url}} style={styles.flatListImage} />
        <Text style={[styles.fontJeju, {fontSize: 17}]}>{item.name}</Text>
        <Text style={[styles.fontJeju, {fontSize: 10, marginTop: 7}]}>
          {item.desc}
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
            style={styles.showAllText}
            onPress={() => navigation.navigate(title)}>
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
  let data = [
    {
      id: 0,
      url: 'https://i.pinimg.com/564x/08/94/75/089475365c284288406baf7e5616dd64.jpg',
      name: '그룸명',
      desc: '그룹설명',
    },
    {
      id: 1,
      url: 'https://i.pinimg.com/236x/4b/ee/eb/4beeebb760923f65d559e3486f1233c1.jpg',
      name: '그룸명',
      desc: '그룹설명',
    },
    {
      id: 2,
      url: 'https://i.pinimg.com/564x/b7/a5/a8/b7a5a801d8b9476bad5906ad88347445.jpg',
      name: '그룸명',
      desc: '그룹설명',
    },
    {
      id: 3,
      url: 'https://i.pinimg.com/564x/08/94/75/089475365c284288406baf7e5616dd64.jpg',
      name: '그룸명',
      desc: '그룹설명',
    },
    {
      id: 4,
      url: 'https://i.pinimg.com/236x/4b/ee/eb/4beeebb760923f65d559e3486f1233c1.jpg',
      name: '그룸명',
      desc: '그룹설명',
    },
    {
      id: 5,
      url: 'https://i.pinimg.com/564x/b7/a5/a8/b7a5a801d8b9476bad5906ad88347445.jpg',
      name: '그룸명',
      desc: '그룹설명',
    },
    {
      id: 6,
      url: 'https://i.pinimg.com/564x/08/94/75/089475365c284288406baf7e5616dd64.jpg',
      name: '그룸명',
      desc: '그룹설명',
    },
    {
      id: 7,
      url: 'https://i.pinimg.com/236x/4b/ee/eb/4beeebb760923f65d559e3486f1233c1.jpg',
      name: '그룸명',
      desc: '그룹설명',
    },
    {
      id: 8,
      url: 'https://i.pinimg.com/564x/b7/a5/a8/b7a5a801d8b9476bad5906ad88347445.jpg',
      name: '그룸명',
      desc: '그룹설명',
    },
  ];
  let searchSuggests = [
    {id: 0, name: '건축물'},
    {id: 1, name: 'UI/UX'},
    {id: 2, name: '패션'},
    {id: 3, name: '스타일'},
    {id: 4, name: '반려동물'},
  ];
  return (
    <ScrollView>
      <TagSearchArea items={searchSuggests} />
      <GroupArea title="마이 그룹" items={data} />
      <GroupArea title="쇼빌 그룹 둘러보기" items={data} />
      <GroupArea title="멤버 모집 중인 그룹" items={data} />
    </ScrollView>
  );
}
