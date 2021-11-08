import * as React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  Switch,
  TextInput,
  Pressable,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {launchImageLibrary} from 'react-native-image-picker';
import {createGroup} from '../../../service/group';
import {isEmpty} from '../../../common/util';

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
  buttonStyleValid: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F85B02',
    height: 52,
    borderRadius: 5,
    marginBottom: 15,
  },
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 50,
  },
});

function GroupImage({setGroupImage}) {
  const default_image = require('../../../../assets/imgs/add_image.png');
  const [image, setImage] = React.useState(default_image);
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
      setGroupImage(imageInfo);
    });
  };

  return (
    <Pressable style={styles.groupImageContainer} onPress={handleUploadImage}>
      <Image style={styles.imageStyle} source={image} />
    </Pressable>
  );
}

function GroupDetail({group, filter, rerender}) {
  const navigation = useNavigation();
  const groupNameGuide =
    '그룹 이름과 프로필 사진은 생성 후에도 변경 가능합니다.';
  const groupTagGuide = '그룹에 맞는 대표 쇼빌 태그를 설정하세요!';

  const getReprTagText = () => {
    let text = '';
    if (filter.categoryFilter.length) {
      text = filter.categoryFilter[0];
    } else if (filter.tagFilter.length) {
      text = filter.tagFilter[0];
    }

    let count = filter.categoryFilter.length + filter.tagFilter.length;
    if (count > 1) {
      text += `+${count - 1}`;
    }
    return text;
  };

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
          onChangeText={value => group.setName(value)}
          value={group.name}
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
        <Pressable
          onPress={() =>
            navigation.push('카테고리&태그 선택', {
              selectCategories: categories => {
                filter.setCategory(categories);
                rerender();
              },
              selectTags: tags => {
                filter.setTag(tags);
                rerender();
              },
              categories: filter.categoryFilter,
              tags: filter.tagFilter,
              isUpload: false,
            })
          }
          style={{flex: 1}}>
          {filter.categoryFilter.length > 0 || filter.tagFilter.length > 0 ? (
            <Text style={{textAlign: 'right', color: '#F85B02'}}>
              {getReprTagText()}
            </Text>
          ) : (
            <Text style={{textAlign: 'right'}}>{'>'}</Text>
          )}
        </Pressable>
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
          onChangeText={value => group.setDetail(value)}
          value={group.detail}
        />
      </View>
      <View
        style={[
          styles.flexHorizontal,
          styles.bottomBorder,
          styles.defaultVerticalPad,
          {alignItems: 'center'},
        ]}>
        <View style={{flex: 1}}>
          <Text style={[styles.fontJeju, {fontSize: 17}]}>그룹 공개 설정</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Switch
            onValueChange={() => group.setIsVisible(!group.isVisible)}
            value={group.isVisible}
            trackColor={{false: '#767577', true: '#F85B02'}}
          />
        </View>
      </View>
    </View>
  );
}

function BottomButton({handleButton, isFormValid}) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={isFormValid() ? styles.buttonStyleValid : styles.buttonStyle}
        onPress={() => handleButton()}>
        <Text
          style={[
            styles.fontJeju,
            {fontSize: 17, color: isFormValid() ? 'white' : '#B2B2B5'},
          ]}>
          그룹 생성하기
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export function GroupCreate() {
  const [groupImage, setGroupImage] = React.useState();
  const [groupName, setGroupName] = React.useState('');
  const [groupDetail, setGroupDetail] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  const [categoryFilter, setCategoryFilter] = React.useState([]);
  const [tagFilter, setTagFilter] = React.useState([]);
  const [rerenderKey, setRerenderKey] = React.useState(false);

  const filter = {
    categoryFilter: categoryFilter,
    tagFilter: tagFilter,
    setCategory: setCategoryFilter,
    setTag: setTagFilter,
  };

  const rerender = () => {
    setRerenderKey(!rerenderKey);
  };

  const handleButton = async () => {
    const ret = createGroup(
      groupName,
      groupDetail,
      isVisible,
      categoryFilter,
      tagFilter,
      groupImage,
    );
    console.log(ret);
  };

  const group = {
    name: groupName,
    detail: groupDetail,
    setName: setGroupName,
    setDetail: setGroupDetail,
    isVisible: isVisible,
    setIsVisible: setIsVisible,
  };

  const isFormValid = () => {
    if (
      isEmpty(groupName) ||
      isEmpty(groupDetail) ||
      !categoryFilter.length ||
      !tagFilter.length
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <View style={styles.baseContainer}>
      <GroupImage key={groupImage} setGroupImage={setGroupImage} />
      <GroupDetail
        key={rerenderKey}
        group={group}
        filter={filter}
        rerender={rerender}
      />
      <BottomButton handleButton={handleButton} isFormValid={isFormValid} />
    </View>
  );
}
