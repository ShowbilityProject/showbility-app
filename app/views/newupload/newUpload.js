import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  Pressable,
  Button,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  DeviceEventEmitter,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';
import {isEmpty} from '../../common/util';
import {uploadContentMeta, uploadImage} from '../../service/content';
import {verifyToken} from '../../service/account';
import {Color} from '../../style/colors';
import {SelectGroup} from './selectgroup';
import {requestAddContentToGroup} from '../../service/group';
import {LoadingScreen} from '../../component/loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topWrapper: {
    paddingHorizontal: 15,
  },
  inputWrapper: {
    flex: 1,
    height: 'auto',
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
  },
  inputStyle: {
    width: '90%',
    height: 60,
    fontSize: 17,
  },
  textStyle: {
    fontFamily: 'JejuGothicOTF',
    fontSize: 17,
    lineHeight: 60,
  },
  suggestTagView: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F7F7F7',
    marginRight: 10,
    borderRadius: 5,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestTagText: {
    fontSize: 12,
  },
  upperRightTopCloseBtn: {
    color: 'white',
    alignSelf: 'center',
  },
  upperRightTopRemove: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 24,
    height: 24,
    backgroundColor: '#F85B02',
    borderRadius: 24,
    justifyContent: 'center',
  },
  labelWrapper: {
    marginVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    minHeight: 20,
  },
  scrollStyle: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  hashTagText: {
    fontSize: 14,
    color: Color.veryLightPink,
  },
});

function ListingLable({values}) {
  return values.map((value, index) => {
    return (
      <View
        style={styles.suggestTagView}
        key={index + value}
        onStartShouldSetResponder={() => true}>
        <Text style={styles.suggestTagText}>{value}</Text>
      </View>
    );
  });
}

function NewUploadTab() {
  const navigation = useNavigation();
  const [images, setImages] = React.useState([]);
  const {height, width} = Dimensions.get('window');
  const [title, setTitle] = React.useState('');
  const [categories, setCategories] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [freeTags, setFreeTags] = React.useState([]);
  const [freeTagInput, setFreeTagInput] = React.useState('');
  const [freeTagFocused, setFreeTagFocused] = React.useState(false);
  const [desc, setDesc] = React.useState('');
  const [forceRefresh, setForceRefresh] = React.useState(false);
  const [loadingDisplay, setLoadingDisplay] = React.useState('none');
  const [selectedGroups, setSelectedGroups] = React.useState([]);
  const [keyboardAvoid, setKeyboardAvoid] = React.useState(false);

  const freeTagInputRef = React.useRef();

  const handleUploadImage = () => {
    let imagePickerOptions = {
      selectionLimit: 0,
    };
    launchImageLibrary(imagePickerOptions, e => {
      if (!e.assets) {
        return;
      }
      let temp = e.assets;
      images.push.apply(images, temp);
      setImages(images);
      setForceRefresh(!forceRefresh);
    });
  };

  const handleTitleChange = value => {
    setTitle(value);
  };

  const selectCategories = value => {
    setCategories(value);
  };

  const selectTags = value => {
    setTags(value);
  };

  const validateInputs = () => {
    const missings = [];
    if (isEmpty(title)) missings.push('작품 제목');
    if (!categories.length) missings.push('카테고리');
    if (isEmpty(desc)) missings.push('프로젝트 설명');
    if (!images.length) missings.push('이미지');
    if (missings.length) {
      Alert.alert(
        '필수 항목 누락',
        '다음 항목을 채워주세요\n' + missings.join(', '),
      );
      return false;
    } else return true;
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      setLoadingDisplay('flex');
      try {
        let imageIds = [];
        for (let i = 0; i < images.length; i++) {
          let ret = await uploadImage(images[i], i);
          imageIds.push(ret.id);
        }
        const content = await uploadContentMeta(
          title,
          categories,
          tags.concat(freeTags),
          desc,
          imageIds,
        );
        for (let groupId of selectedGroups)
          requestAddContentToGroup(groupId, content.id);
        Alert.alert('업로드가 완료되었습니다.', '', [
          {
            text: '확인',
            onPress: async () => {
              DeviceEventEmitter.emit('NewUpload');
              navigation.goBack();
              navigation.navigate('ContentsModal', content.id);
            },
          },
        ]);
      } catch (err) {
        console.log(err);
        setLoadingDisplay('none');
        Alert.alert(
          '작품을 게시할 수 없음',
          '죄송합니다. 작품을 게시하는 중 문제가 발생했습니다. 다시 시도하세요.',
          [{text: '확인', onPress: () => null}],
        );
      }
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={handleSubmit}
          title="완료"
          color="#FF3B30"
          disabled={loadingDisplay === 'flex'}
        />
      ),
    });
  });

  const removeImageByIndex = index => {
    images.splice(index, 1);
    setImages(images);
    setForceRefresh(!forceRefresh);
  };

  const convertFreeTagToLabel = value => {
    if (!freeTags.includes(value)) {
      freeTags.push(value);
      setFreeTags(freeTags);
    }
    setFreeTagInput('');
  };

  const onFreeTagInputChange = value => {
    setFreeTagInput(value);
    let last = value.charAt(value.length - 1);
    if (last === ' ' || last === '\n') {
      let word = value.substring(0, value.length - 1);
      if (word !== ' ' && !isEmpty(word)) {
        convertFreeTagToLabel(word);
      }
    }
  };

  const onRemoveFreeTagPressed = index => {
    freeTags.splice(index, 1);
    setFreeTags(freeTags);
    setFreeTagFocused(false);
    setForceRefresh(!forceRefresh);
  };

  return (
    <KeyboardAvoidingView
      enabled={keyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      style={{flex: 1, backgroundColor: 'white'}}>
      <LoadingScreen display={loadingDisplay} />
      <ScrollView contentContainerStyle={styles.scrollStyle}>
        <TouchableWithoutFeedback
          style={{flex: 1}}
          onPress={() => {
            Keyboard.dismiss();
            setFreeTagFocused(false);
            setKeyboardAvoid(false);
          }}>
          <View style={{flex: 1}}>
            <View style={styles.topWrapper}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="작품 제목"
                  onChangeText={handleTitleChange}
                  onFocus={() => {
                    setFreeTagFocused(false);
                    setKeyboardAvoid(false);
                  }}
                />
              </View>
              <View style={[styles.inputWrapper, {flexDirection: 'row'}]}>
                <View style={{flex: 1}}>
                  <Text style={styles.textStyle}>태그 설정</Text>
                </View>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('카테고리&태그 선택', {
                        selectCategories: selectCategories,
                        categories: categories.slice(),
                        selectTags: selectTags,
                        tags: tags.slice(),
                        isUpload: true,
                      })
                    }>
                    <Text
                      style={[
                        styles.textStyle,
                        {textAlign: 'right', color: '#d3d7e0'},
                      ]}>
                      {'>'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <View style={styles.inputWrapper}>
                  <View style={styles.labelWrapper}>
                    <ListingLable values={categories} />
                    <ListingLable values={tags} />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Pressable
                    style={styles.labelWrapper}
                    onPress={() => {
                      setFreeTagFocused(true);
                      freeTagInputRef.current.focus();
                    }}>
                    {freeTags.length ? (
                      freeTags.map((value, index) => {
                        return (
                          <View
                            style={[
                              styles.suggestTagView,
                              {flexDirection: 'row'},
                            ]}
                            key={index + value}>
                            <Text style={[styles.suggestTagText]}>{value}</Text>
                            <Pressable
                              onPress={() => onRemoveFreeTagPressed(index)}>
                              <Text
                                style={[
                                  styles.suggestTagText,
                                  {paddingLeft: 4},
                                ]}>
                                X
                              </Text>
                            </Pressable>
                          </View>
                        );
                      })
                    ) : (
                      <Text
                        style={[
                          styles.hashTagText,
                          {display: freeTagFocused ? 'none' : 'flex'},
                        ]}>
                        원하는 모든 태그를 입력하세요.
                      </Text>
                    )}
                    <TextInput
                      ref={freeTagInputRef}
                      style={[
                        styles.inputStyle,
                        {display: freeTagFocused ? 'flex' : 'none', height: 40},
                      ]}
                      onChangeText={value => onFreeTagInputChange(value)}
                      value={freeTagInput}
                      onFocus={() => setKeyboardAvoid(false)}
                      onSubmitEditing={e => {
                        convertFreeTagToLabel(e.nativeEvent.text);
                        setFreeTagFocused(false);
                      }}
                    />
                  </Pressable>
                </View>
              </View>
              <SelectGroup
                selectedGroups={selectedGroups}
                setSelectedGroups={setSelectedGroups}
                style={styles.inputWrapper}
              />
              <View style={styles.inputWrapper}>
                <Text style={styles.textStyle}>프로젝트 설명</Text>
                <TextInput
                  style={[
                    styles.inputStyle,
                    {height: 'auto', minHeight: 100, fontSize: 15},
                  ]}
                  placeholder="프로젝트 설명"
                  multiline={true}
                  onChangeText={value => setDesc(value)}
                  onFocus={() => {
                    setFreeTagFocused(false);
                    setKeyboardAvoid(true);
                  }}
                />
              </View>
            </View>
            <View style={{flex: 6, marginTop: 30}}>
              {images.map((image, index) => {
                let i_height = (image.height * width) / image.width;
                return (
                  <View key={index}>
                    <Image
                      style={{width: width, height: i_height, marginBottom: 10}}
                      key={image.fileName}
                      resizeMode="contain"
                      source={image}
                    />
                    <Pressable
                      onPress={() => removeImageByIndex(index)}
                      style={styles.upperRightTopRemove}>
                      <Text style={styles.upperRightTopCloseBtn}>&#10005;</Text>
                    </Pressable>
                  </View>
                );
              })}
              <TouchableOpacity
                onPress={handleUploadImage}
                style={{alignItems: 'center', marginBottom: 40}}>
                <Ionicons name="add-circle-outline" size={50} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default NewUploadTab;
