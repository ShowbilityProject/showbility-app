import * as React from 'react';
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  fontJeju: {
    fontFamily: 'JejuGothicOTF',
  },
  baseView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    maxHeight: 150,
  },
  textInputWrapper: {
    flex: 1,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#707070',
    maxHeight: 60,
  },
  textInputStyle: {
    flex: 1,
    fontSize: 17,
    paddingHorizontal: 5,
    lineHeight: 20,
  },
  applyButton: {
    flex: 1,
    backgroundColor: 'yellow',
    height: 52,
    backgroundColor: '#F7F7F7',
    width: '100%',
    alignItems: 'center',
  },
  applyButtonText: {
    lineHeight: 52,
    fontSize: 17,
    color: '#B2B2B5',
  },
});

export function EditProfileScreen({route, navigation}) {
  return (
    <SafeAreaView style={styles.baseView}>
      <View style={styles.baseView}>
        <View style={styles.imageWrapper}>
          <Image source={require('../../../assets/imgs/add_image.png')} />
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput style={styles.textInputStyle} placeholder="별명" />
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput style={styles.textInputStyle} placeholder="이메일" />
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput style={styles.textInputStyle} placeholder="출생년도" />
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput style={styles.textInputStyle} placeholder="자기소개" />
        </View>
        <View style={{flex: 2, alignItems: 'flex-end', flexDirection: 'row'}}>
          <View style={styles.applyButton}>
            <Text style={styles.applyButtonText}>저장하기</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
