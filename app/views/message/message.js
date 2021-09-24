import * as React from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList} from 'react-native';
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
        {/* <FlatList /> */}
        <View style={{flex: 1}}>
          <View style={{flex: 1, flexDirection: 'row', maxHeight: 62}}>
            <View style={{flex: 1, maxWidth: 62}}>
              <Text>Image</Text>
            </View>
            <View style={{flex: 1}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Text>name</Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    flex: 1,
                  }}>
                  <Text>{'>'}</Text>
                </View>
              </View>
              <View>
                <Text>recentmessage</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MessageTab;
