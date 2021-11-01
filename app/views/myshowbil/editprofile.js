import {useNavigation} from '@react-navigation/core';
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
import {isEmpty} from '../../common/util';
import {updateMyProfile} from '../../service/account';

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
  applyButtonValid: {
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
  tagsStyle: {
    fontSize: 17,
    textAlign: 'right',
    color: '#F85B02',
    alignSelf: 'center',
  },
});

export function EditProfileScreen({route}) {
  const navigation = useNavigation();
  let {profile_image, nickname, date_of_birth, description, tags} =
    route.params.data;
  console.log(route.params.data);
  const [image, setImage] = React.useState(profile_image);
  const [nname, setNname] = React.useState(nickname);
  const [dateOfBirth, setDateOfBirth] = React.useState(date_of_birth);
  const [desc, setDesc] = React.useState(description);
  const [categories, setCategories] = React.useState([]);
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
    for (var tag of tgs) {
      formData.append('tags', tag);
    }

    const ret = await updateMyProfile(formData);
    if (ret) navigation.goBack();
  };

  const selectCategories = value => {
    setCategories(value);
  };

  const selectTags = value => {
    setTgs(value);
  };

  const getReprTagText = () => {
    let text = '';
    if (categories.length) {
      text = categories[0];
    } else if (tgs.length) {
      text = tgs[0];
    }

    let count = categories.length + tgs.length;
    if (count > 1) {
      text += `+${count - 1}`;
    }
    console.log(text);
    return text;
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
          onPress={() =>
            navigation.push('카테고리&태그 선택', {
              selectCategories: selectCategories,
              categories: categories.slice(),
              selectTags: selectTags,
              tags: tgs.slice(),
              isUpload: false,
            })
          }
          style={[
            styles.textInputWrapper,
            {justifyContent: 'center', flexDirection: 'row'},
          ]}>
          <Text style={{fontSize: 17, alignSelf: 'center', flex: 1}}>
            태그 설정
          </Text>
          {categories.length > 0 || tgs.length > 0 ? (
            <Text style={styles.tagsStyle}>{getReprTagText()}</Text>
          ) : (
            <Text
              style={{fontSize: 17, textAlign: 'right', alignSelf: 'center'}}>
              {'>'}
            </Text>
          )}
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
