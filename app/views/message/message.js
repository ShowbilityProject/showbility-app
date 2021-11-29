import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    height: 40,
  },
  fixingText1: {
    fontFamily: 'JejuGothicOTF',
    fontSize: 17,
    lineHeight: 67
  },
  fixingText2: {
    fontFamily: 'JejuGothicOTF',
    fontSize: 13,
    lineHeight: 21
  },
  msgBodyArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  topContainer: {
    borderColor: '#f4f4f6',
    borderBottomWidth: 1,
    flex: 1,
    maxHeight: 56,
    width: '100%',
  },
  topHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  topText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: 17,
    textAlign: 'center',
  },
});

function MessageTab() {
  const fixingImage = require('../../../assets/imgs/fixing.png');

  return (
    <SafeAreaView style={[styles.flexCenter, styles.container]}>
      <View style={styles.topContainer}>
        <View style={styles.topHeader}>
          <Text style={{flex: 1, fontFamily: 'JejuGothicOTF', fontSize: 25}}>+</Text>
          <View style={{flex: 1}}>
            <Text style={styles.topText}>메시지</Text>
          </View>
          <View
            style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end'}}>
            <Text style={{fontFamily: 'JejuGothicOTF', fontSize: 16}}>
              선택
            </Text>
          </View>
        </View>
      </View>
      <View style={{paddingHorizontal: 15, flex: 1, paddingTop: 10, width: '100%'}}>
        <View style={{flex: 1, maxHeight: 40}}>
          <TextInput
            placeholder="검색"
            style={styles.searchStyle}
            editable={false}
          />
        </View>
        <View style={styles.msgBodyArea}>
          <Image
            source={fixingImage}
            style={{alignSelf: 'center', width: 73, height: 73}}
          />
          <Text style={styles.fixingText1}>아직 준비 중인 서비스입니다.</Text>
          <Text style={styles.fixingText2}>
            현재 베타오픈으로 일부 기능이 제한됩니다.
          </Text>
          <Text style={styles.fixingText2}>
            정식 오픈까지 잠시만 기다려주세요.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default MessageTab;
