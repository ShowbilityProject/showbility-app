import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import { isEmpty } from '../../common/util';
import { updateMyProfile } from '../../service/account';

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
    borderColor: '#F4F4F6',
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
    height: 52,
    backgroundColor: '#F7F7F7',
    width: '100%',
    alignItems: 'center',
  },
  applyButtonValid:{
    flex: 1,
    height: 52,
    backgroundColor: '#F85B02',
    width: '100%',
    alignItems: 'center',
  },
  applyButtonText: {
    lineHeight: 52,
    fontSize: 17,
    color: '#B2B2B5',
  },
  applyButtonTextValid: {
    lineHeight: 52,
    fontSize: 17,
    color: 'white',
  },
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 50,
  },
});

export function EditProfileScreen({route}) {
  const navigation = useNavigation();
  let {profile_image, nickname, date_of_birth, description, tags} = route.params.data;
  const [image, setImage] = React.useState(profile_image);
  const [nname, setNname] = React.useState(nickname);
  const [dateOfBirth, setDateOfBirth] = React.useState(date_of_birth);
  const [desc, setDesc] = React.useState(description);
  const [tgs, setTgs] = React.useState(tags);

  const imageSource = image
    ? typeof image === 'string'
      ? {uri: image}
      : image
    : require('../../../assets/imgs/add_image.png');

  const handleUploadImage = () => {
    let imagePickerOptions = {
      selectionLimit: 1,
    };
    launchImageLibrary(imagePickerOptions, e => {
      if (!e.assets) {
        return;
      }
      const imageInfo = e.assets[0];
      setImage(imageInfo);
    });
  };

  const validateInput = () => {
    if (isEmpty(nname) || isEmpty(dateOfBirth)) return false;
    else return true;
  };

  const buttonStyle = validateInput()
    ? styles.applyButtonValid
    : styles.applyButton;

  const buttonTextStyle = validateInput()
    ? styles.applyButtonTextValid
    : styles.applyButtonText;

  const handleSubmit = async () => {
    if (!validateInput()) return false;
    const formData = new FormData();
    if (typeof image === 'object') {
      const imageData = {
        type: image.type,
        uri: image.uri,
        name: image.fileName,
      };
      formData.append('profile_image', imageData);
    }
    formData.append('nickname', nname);
    formData.append('date_of_birth', dateOfBirth);
    formData.append('description', desc);

    const ret = await updateMyProfile(formData);
    if (ret) navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.baseView}>
      <View style={styles.baseView}>
        <Pressable style={styles.imageWrapper} onPress={handleUploadImage}>
          <Image style={styles.imageStyle} source={imageSource} />
        </Pressable>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="별명"
            value={nname}
            onChangeText={value => setNname(value)}
          />
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="출생년도"
            value={dateOfBirth}
            onChangeText={value => setDateOfBirth(value)}
          />
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="자기소개"
            value={desc}
            onChangeText={value => setDesc(value)}
          />
        </View>
        <Pressable
          onPress={() => console.log('태그 설정')}
          style={[
            styles.textInputWrapper,
            {justifyContent: 'center', flexDirection: 'row'},
          ]}>
          <Text style={{fontSize: 17, alignSelf: 'center', flex: 1}}>
            태그 설정
          </Text>
          <Text style={{fontSize: 17, alignSelf: 'center'}}>{'>'}</Text>
        </Pressable>
        <View style={{flex: 2, alignItems: 'flex-end', flexDirection: 'row'}}>
          <Pressable style={buttonStyle} onPress={() => handleSubmit()}>
            <Text style={buttonTextStyle}>저장하기</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
