import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';

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
    height: 60,
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
});

function NewUploadTab() {
  const navigation = useNavigation();
  const [images, setImages] = React.useState([]);
  const {height, width} = Dimensions.get('window');
  const [title, setTitle] = React.useState('');
  const [categories, setCategories] = React.useState([]);
  const [tags, setTags] = React.useState([]);

  const handleUploadImage = () => {
    let imagePickerOptions = {
      selectionLimit: 0,
    };
    launchImageLibrary(imagePickerOptions, e => {
      // let temp = images + e.assets;
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
            <Text style={styles.textStyle}>카테고리</Text>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('카테고리', {
                  selectCategories: selectCategories,
                  categories: categories,
                })
              }>
              <Text style={[styles.textStyle, {textAlign: 'right'}]}>
                {'>'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.textStyle}># 태그</Text>
        </View>
      </View>
      <View style={{flex: 6, marginTop: 30}}>
        {images.map(image => {
          let i_height = (image.height * width) / image.width;
          console.log(image);
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
