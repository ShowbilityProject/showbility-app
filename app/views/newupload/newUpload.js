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
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';
import {isEmpty} from '../../common/util';
import {
  uploadContentMeta,
  uploadImageWithContentId,
} from '../../service/content';

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
    fontFamily: 'JejuGothicOTF',
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
  },
  suggestTagText: {
    fontSize: 12,
  },
});

function ListingLable({values}) {
  return values.map(value => {
    return (
      <View
        style={styles.suggestTagView}
        key={value}
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
  const [desc, setDesc] = React.useState('');

  const handleUploadImage = () => {
    let imagePickerOptions = {
      selectionLimit: 0,
    };
    launchImageLibrary(imagePickerOptions, e => {
      if (!e.assets) {
        return;
      }
      let temp = e.assets;
      temp.push.apply(temp, images);
      console.log(temp);
      setImages(temp);
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

  const handleSubmit = async () => {
    const res = await uploadContentMeta(title, categories, tags, desc);
    for (let i = 0; i < images.length; i++) {
      uploadImageWithContentId(images[i], res.id, i);
    }
    navigation.push('그룹 선택', {contentId: res.id});
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleSubmit} title="다음" color="#FF3B30" />
      ),
    });
  });

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.topWrapper}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputStyle}
            placeholder="작품 제목"
            onChangeText={handleTitleChange}
          />
        </View>
        <View style={[styles.inputWrapper, {flexDirection: 'row'}]}>
          <View style={{flex: 1}}>
            <Text style={styles.textStyle}>카테고리&태그</Text>
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
              <Text style={[styles.textStyle, {textAlign: 'right'}]}>
                {'>'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.inputWrapper}>
            <View
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                flexWrap: 'wrap',
                minHeight: 20,
              }}>
              <ListingLable values={categories} />
              <ListingLable values={tags} />
            </View>
          </View>
        </View>
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
          />
        </View>
      </View>
      <View style={{flex: 6, marginTop: 30}}>
        {images.map(image => {
          let i_height = (image.height * width) / image.width;
          return (
            <Image
              style={{width: width, height: i_height, marginBottom: 10}}
              key={image.fileName}
              resizeMode="contain"
              source={image}
            />
          );
        })}
        <TouchableOpacity
          onPress={handleUploadImage}
          style={{alignItems: 'center', marginBottom: 40}}>
          <Ionicons name="add-circle-outline" size={50} color="gray" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default NewUploadTab;
