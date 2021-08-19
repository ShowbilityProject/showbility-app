import * as React from 'react';
import {FlatList, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

const styles = StyleSheet.create({
  flatListImage: {
    width: '100%',
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
});

export function GroupDepthView(object) {
  const navigation = useNavigation();

  let title = object.title;
  let data = [
    {
      id: 0,
      url: 'https://i.pinimg.com/564x/08/94/75/089475365c284288406baf7e5616dd64.jpg',
      name: '포토그래피',
    },
    {
      id: 1,
      url: 'https://i.pinimg.com/236x/4b/ee/eb/4beeebb760923f65d559e3486f1233c1.jpg',
      name: '일러스트레이션',
    },
    {
      id: 2,
      url: 'https://i.pinimg.com/564x/b7/a5/a8/b7a5a801d8b9476bad5906ad88347445.jpg',
      name: '건축',
    },
    {
      id: 3,
      url: 'https://i.pinimg.com/564x/08/94/75/089475365c284288406baf7e5616dd64.jpg',
      name: '포토그래피',
    },
    {
      id: 4,
      url: 'https://i.pinimg.com/236x/4b/ee/eb/4beeebb760923f65d559e3486f1233c1.jpg',
      name: '일러스트레이션',
    },
    {
      id: 5,
      url: 'https://i.pinimg.com/564x/b7/a5/a8/b7a5a801d8b9476bad5906ad88347445.jpg',
      name: '건축',
    },
    {
      id: 6,
      url: 'https://i.pinimg.com/564x/08/94/75/089475365c284288406baf7e5616dd64.jpg',
      name: '포토그래피',
    },
    {
      id: 7,
      url: 'https://i.pinimg.com/236x/4b/ee/eb/4beeebb760923f65d559e3486f1233c1.jpg',
      name: '일러스트레이션',
    },
    {
      id: 8,
      url: 'https://i.pinimg.com/564x/b7/a5/a8/b7a5a801d8b9476bad5906ad88347445.jpg',
      name: '건축',
    },
  ];

  const renderItem = itemObject => {
    let item = itemObject.item;
    console.log(item.name);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('GroupDetail', {name: item.name})}
        style={styles.abilityFrame}>
        <Image source={{uri: item.url}} style={styles.flatListImage} />
        <Text style={[styles.fontJeju, styles.abilityItemTitle]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      key={'#'}
      keyExtractor={item => '#' + item.id}
      data={data}
      renderItem={renderItem}
      horizontal={false}
      numColumns={2}
      style={styles.flatListFrame}
    />
  );
}
