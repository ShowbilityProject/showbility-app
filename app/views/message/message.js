import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchStyle: {
    fontFamily: 'JejuGothicOTF',
    padding: 10,
    backgroundColor: '#F6F7F9',
    fontSize: 17,
  },
});

function MessageTab() {
  let messageData = [
    {
      sender: 'Hyechou',
      latestMessage: '너무 멋진 작품입니다.',
      latestMessageTime: '14:23',
    },
    {
      sender: 'Hyechou2',
      latestMessage: '너무 멋진 작품입니다.',
      latestMessageTime: '14:23',
    },
  ];

  const renderItem = object => {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, maxWidth: 62, padding: 7, paddingLeft: 0}}>
          <Image
            style={{width: null, height: null, aspectRatio: 1, flex: 1}}
            resizeMode={'contain'}
            source={require('../../../assets/imgs/add_image.png')}
          />
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1, flexDirection: 'row', paddingTop: 5}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 17}}>Hyechou</Text>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                flex: 1,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{flex: 1, maxWidth: 50, color: '#B2B2B5'}}>
                  14:23
                </Text>
                <Text style={{flex: 1, maxWidth: 10}}>{'>'}</Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 12}}>너무 멋진 작품입니다.</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.flexCenter, styles.container]}>
      <View style={{paddingHorizontal: 15, flex: 1, paddingTop: 30}}>
        <View style={{flex: 1, flexDirection: 'row', maxHeight: 90}}>
          <View style={{flex: 1}}>
            <Text style={{fontFamily: 'JejuGothicOTF', fontSize: 30}}>
              메시지
            </Text>
          </View>
          <View
            style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end'}}>
            <Text style={{fontFamily: 'JejuGothicOTF', color: '#F85B02'}}>
              선택
            </Text>
          </View>
        </View>
        <View style={{flex: 1, maxHeight: 50}}>
          <TextInput placeholder="검색" style={styles.searchStyle} />
        </View>
        <View style={{flex: 1}}>
          <FlatList
            key={'#'}
            keyExtractor={item => '#' + item.sender}
            data={messageData}
            renderItem={renderItem}
            horizontal={false}
            style={{flex: 1}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MessageTab;
