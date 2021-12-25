import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {isEmpty} from '../../common/util';
import {
  requestSignOut,
  requestUserWithdraw,
  updateMyProfile,
} from '../../service/account';
import {Color} from '../../style/colors';

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
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#F4F4F6',
    height: 60,
    paddingVertical: 10,
  },
  textInputStyle: {
    flex: 1,
    fontSize: 17,
    paddingTop: 10,
    lineHeight: 20,
  },
  applyButton: {
    flex: 1,
    maxHeight: 52,
    backgroundColor: '#F7F7F7',
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  applyButtonValid: {
    flex: 1,
    maxHeight: 52,
    backgroundColor: '#F85B02',
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  applyButtonText: {
    fontFamily: 'JejuGothicOTF',
    lineHeight: 52,
    fontSize: 17,
    color: '#B2B2B5',
  },
  applyButtonTextValid: {
    lineHeight: 52,
    fontSize: 17,
    color: 'white',
    fontFamily: 'JejuGothicOTF',
  },
  imageStyle: {
    width: 80,
    height: 80,
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
  bottomWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingBottom: 42,
  },
  smallOptionText: {
    fontSize: 12,
    color: Color.brownishGrey,
    textDecorationLine: 'underline',
  },
  smallOptionWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  addIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 20,
    height: 20,
  },
});

export function EditProfileScreen({route}) {
  const navigation = useNavigation();
  let {id, profile_image, nickname, description, tags, small_image} =
    route.params.data;
  const [image, setImage] = React.useState(small_image || profile_image);
  const [nname, setNname] = React.useState(nickname);
  const [desc, setDesc] = React.useState(description);
  const [categories, setCategories] = React.useState([]);
  const [tgs, setTgs] = React.useState(tags);
  const [descHeight, setDescHeight] = React.useState(60);
  const descRef = React.useRef();
  const addIconSource = require('../../../assets/imgs/add.png');

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
    if (isEmpty(nname)) return false;
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
    if (!isEmpty(image) && typeof image === 'object') {
      const imageData = {
        type: image.type,
        uri: image.uri,
        name: image.fileName,
      };
      formData.append('profile_image', imageData);
    }
    formData.append('nickname', nname);
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

  const getReprTagText = React.useCallback(() => {
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
  }, [categories, tgs]);

  const handleWithdraw = async () => {
    let ret = await requestUserWithdraw(id);
    if (ret) navigation.navigate('Login');
    else Alert.alert('오류', '오류가 발생하였습니다.');
  };

  return (
    <View style={styles.baseView}>
      <View style={styles.imageWrapper}>
        <Pressable onPress={handleUploadImage}>
          <Image style={styles.imageStyle} source={imageSource} />
          <Image style={styles.addIcon} source={addIconSource} />
        </Pressable>
      </View>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="별명"
              value={nname}
              onChangeText={value => setNname(value)}
            />
          </View>
          <View
            style={[
              styles.textInputWrapper,
              {height: Math.max(descHeight + 40, 60)},
            ]}>
            <TextInput
              ref={descRef}
              style={[styles.textInputStyle]}
              placeholder="자기소개"
              value={desc}
              onChangeText={value => setDesc(value)}
              multiline={true}
              onContentSizeChange={({nativeEvent}) =>
                setDescHeight(nativeEvent.contentSize.height)
              }
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
                prevScreen: 'PROFILE',
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
          <View style={styles.bottomWrapper}>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <View style={styles.smallOptionWrapper}>
                <Pressable
                  style={{marginRight: 7}}
                  onPress={async () => {
                    let ret = await requestSignOut();
                    if (ret) navigation.navigate('Login');
                  }}>
                  <Text style={styles.smallOptionText}>로그아웃</Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    Alert.alert('회원탈퇴', '회원탈퇴 하시겠습니까?', [
                      {
                        text: '취소',
                        onPress: () => null,
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: async () => handleWithdraw()},
                    ])
                  }>
                  <Text style={styles.smallOptionText}>회원탈퇴</Text>
                </Pressable>
              </View>
              <TouchableOpacity
                style={buttonStyle}
                onPress={() => handleSubmit()}>
                <Text style={buttonTextStyle}>저장하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
