import * as React from 'react';
import {FlatList, Text, StyleSheet, Image, View, Switch, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  groupImageContainer: {
    marginTop: 15,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexHorizontal: {
    flexDirection: 'row',
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderColor: '#dddddd',
  },
  defaultVerticalPad: {
    paddingVertical: 20,
  },
  fontJeju: {
    fontFamily: 'JejuGothicOTF',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    marginBottom: 40,
  },
  buttonStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    height: 52,
    borderRadius: 5,
    marginBottom: 15,
  },
});

function GroupImage() {
  return (
    <View style={styles.groupImageContainer}>
      <Image source={require('../../../../assets/imgs/add_image.png')} />
    </View>
  );
}

function GroupDetail() {
  const groupNameGuide =
    '그룹 이름과 프로필 사진은 생성 후에도 변경 가능합니다.';
  const groupTagGuide = '그룹에 맞는 대표 쇼빌 태그를 설정하세요!';
  return (
    <View style={{paddingHorizontal: 15}}>
      <View
        style={[
          styles.flexHorizontal,
          styles.bottomBorder,
          styles.defaultVerticalPad,
        ]}>
        <Text style={[styles.fontJeju, {fontSize: 17}]}>그룹명</Text>
        <TextInput
          style={[styles.fontJeju, {fontSize: 17, paddingHorizontal: 15}]}
          placeholder={'그룹명 입력'}
          placeholderTextColor={'#AAAAAA'}
        />
      </View>
      <View style={[styles.defaultVerticalPad, {marginTop: 10}]}>
        <Text style={[styles.fontJeju, {fontSize: 12, color: '#B2B2B5'}]}>
          {groupNameGuide}
        </Text>
      </View>
      <View
        style={[
          styles.flexHorizontal,
          styles.bottomBorder,
          styles.defaultVerticalPad,
        ]}>
        <View style={{flex: 1}}>
          <Text style={[styles.fontJeju, {fontSize: 17}]}>
            그룹 대표 태그 설정
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={{textAlign: 'right'}}>{'>'}</Text>
        </View>
      </View>
      <View style={[styles.defaultVerticalPad, {marginTop: 10}]}>
        <Text style={[styles.fontJeju, {fontSize: 12, color: '#B2B2B5'}]}>
          {groupTagGuide}
        </Text>
      </View>
      <View
        style={[
          styles.flexHorizontal,
          styles.bottomBorder,
          styles.defaultVerticalPad,
        ]}>
        <Text style={[styles.fontJeju, {fontSize: 17}]}>소개</Text>
        <TextInput
          style={[styles.fontJeju, {fontSize: 17, paddingHorizontal: 15}]}
          placeholder={'그룹 소개'}
          placeholderTextColor={'#AAAAAA'}
        />
      </View>
      <View
        style={[
          styles.flexHorizontal,
          styles.bottomBorder,
          styles.defaultVerticalPad,
          {alignItems: 'center'}
        ]}>
        <View style={{flex: 1}}>
          <Text style={[styles.fontJeju, {fontSize: 17}]}>그룹 공개 설정</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Switch />
        </View>
      </View>
    </View>
  );
}

function BottomButton() {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonStyle}>
        <Text style={[styles.fontJeju, {fontSize: 17, color: '#B2B2B5'}]}>
          그룹 생성하기
        </Text>
      </TouchableOpacity>
    </View>
  )
}
export function GroupCreate() {
  return (
    <View style={styles.baseContainer}>
      <GroupImage />
      <GroupDetail />
      <BottomButton />
    </View>
  );
}
