import * as React from 'react';
import { FlatList, SafeAreaView, View, Text, StyleSheet, Image, Modal, Button } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomSheet from '@gorhom/bottom-sheet';
import { type } from 'os';

const styles = StyleSheet.create({
  flatListImage: {
    width:"100%",
    aspectRatio: 1.3,
    alignSelf: 'center',
    marginBottom: 7
  }
})

export function AbilityScreen() {
  
  let data = [
    {
      id: 0,
      url: "https://i.pinimg.com/564x/08/94/75/089475365c284288406baf7e5616dd64.jpg",
      name: '포토그래피'
    },
    {
      id: 1,
      url: "https://i.pinimg.com/236x/4b/ee/eb/4beeebb760923f65d559e3486f1233c1.jpg",
      name: "일러스트레이션"
    },
    {
      id: 2,
      url: "https://i.pinimg.com/564x/b7/a5/a8/b7a5a801d8b9476bad5906ad88347445.jpg",
      name: "건축"
    }
  ];

  const renderItem = (itemObject) => {
    let item = itemObject.item;
    return (
      <TouchableOpacity style={{ width: "50%", paddingBottom: 5, paddingHorizontal: 5, marginBottom: 10 }}>
        <Image source={{uri:item.url}} style={ styles.flatListImage } />
        <Text style={{ fontFamily: "JejuGothicOTF", fontSize: 17 }}>{item.name}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <FlatList
      key={'#'}
      keyExtractor={item => "#" + item.id}
      data={data}
      renderItem={renderItem}
      horizontal={false}
      numColumns={2}
      style={{ paddingHorizontal: 10 }}
    >
    </FlatList>
  )
}