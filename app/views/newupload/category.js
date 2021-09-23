import * as React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export function CategoryList({route, navigation}) {
  const selectCategories = route.params.selectCategories;
  const selectTags = route.params.selectTags;
  const [categories, setCategories] = React.useState(route.params.categories);
  const [tags, setTags] = React.useState(route.params.tags);
  const [changeFlag, setChangeFlag] = React.useState(false);
  const TYPE_CATEGORY = 'cateogory';
  const TYPE_TAG = 'tag';

  const handleSelection = (value, _type) => {
    let temp = [];
    if (_type === TYPE_CATEGORY) temp = categories;
    else if (_type === TYPE_TAG) temp = tags;
    else return;
    if (!temp.includes(value)) {
      temp.push(value);
    } else {
      let idx = temp.indexOf(value);
      temp.splice(idx, 1);
    }

    if (_type === TYPE_CATEGORY) {
      setCategories(temp);
    } else if (_type === TYPE_TAG) {
      setTags(temp);
    } else return;
    setChangeFlag(!changeFlag);
  };

  const handleSubmit = () => {
    selectCategories(categories);
    selectTags(tags);
    navigation.goBack();
  };

  let categoryData = [
    '포토그래피',
    '일러스트레이션',
    '건축',
    '패션',
    '웹/모바일',
    '제품',
  ];
  let tagData = [
    '포토그래프',
    '생동감',
    '컬러풀',
    '자연',
    '인물',
    '풍경',
    '도시',
    '스포티',
    '감성',
  ];

  return (
    <View style={styles.baseWrapper}>
      <View>
        <Text style={styles.titleArea}>1. 카테고리</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {categoryData.map(category => {
            return (
              <View style={{padding: 5}}>
                <TouchableOpacity
                  style={[
                    styles.labelStyle,
                    categories.includes(category)
                      ? styles.labelSelected
                      : styles.labelNotSelected,
                  ]}
                  onPress={() => handleSelection(category, TYPE_CATEGORY)}>
                  <Text
                    style={
                      categories.includes(category)
                        ? styles.labelSelected
                        : styles.labelNotSelected
                    }>
                    {category}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
      <View>
        <Text style={styles.titleArea}>
          #{' '}
          <Text style={{fontSize: 12, color: '#B2B2B5'}}>
            하단의 추천 태그를 선택 하시면 더 많은 노출이 가능합니다.
          </Text>
        </Text>
        <View style={styles.tagArea}>
          {tagData.map(tag => {
            return (
              <View style={{padding: 5}}>
                <TouchableOpacity
                  style={[
                    styles.labelStyle,
                    tags.includes(tag)
                      ? styles.labelSelected
                      : styles.labelNotSelected,
                  ]}
                  onPress={() => handleSelection(tag, TYPE_TAG)}>
                  <Text
                    style={
                      tags.includes(tag)
                        ? styles.labelSelected
                        : styles.labelNotSelected
                    }>
                    {tag}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
      <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Pressable style={styles.applyButton} onPress={handleSubmit}>
            <Text style={{fontSize: 17, lineHeight: 52}}>적용 하기</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  baseWrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 5,
    flex: 1,
  },
  item: {
    height: 60,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: 'JejuGothicOTF',
    fontSize: 17,
    lineHeight: 60,
  },
  labelStyle: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    width: 'auto',
  },
  labelNotSelected: {
    fontSize: 12,
    backgroundColor: '#F7F7F7',
    color: 'black',
  },
  labelSelected: {
    fontSize: 12,
    backgroundColor: '#F85B02',
    color: 'white',
  },
  titleArea: {
    fontSize: 12,
    paddingVertical: 15,
  },
  tagArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#707070',
    minHeight: 150,
    padding: 5,
  },
  applyButton: {
    alignSelf: 'flex-end',
    marginBottom: 50,
    height: 52,
    backgroundColor: '#F7F7F7',
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
});
