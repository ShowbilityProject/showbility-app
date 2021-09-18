import * as React from 'react';
import {View, Text, StyleSheet, TextInput, Image, Dimensions} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function NewUploadTab() {
  const [images, setImages] = React.useState([]);
  const {height, width} = Dimensions.get('window');
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

  return (
    <ScrollView style={[styles.container]}>
      <View style={{paddingHorizontal: 15}}>
        <View style={{flex: 1}}>
          <TextInput />
        </View>
        <View style={{flex: 1}}>
          <Text>카테고리</Text>
        </View>
        <View style={{flex: 1}}>
          <Text># 태그</Text>
        </View>
      </View>
      <View style={{flex: 6, width: "100%"}}>
        <TouchableOpacity onPress={handleUploadImage}>
          <Text>Editor</Text>
        </TouchableOpacity>
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
      </View>
    </ScrollView>
  );
}

export default NewUploadTab;
