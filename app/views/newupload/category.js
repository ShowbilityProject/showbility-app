import * as React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getCategoryList, getTagList} from '../../service/ability';

export function CategoryList({route, navigation}) {
  const selectCategories = route.params.selectCategories;
  const selectTags = route.params.selectTags;
  const isUpload = route.params.isUpload;
  const prevCategories = route.params.categories;
  const prevTags = route.params.tags;
  const [categories, setCategories] = React.useState(prevCategories.slice());
  const [tags, setTags] = React.useState(prevTags.slice());
  const [changeFlag, setChangeFlag] = React.useState(false);
  const [categoryData, setCategoryData] = React.useState([]);
  const [categoryFlag, setCategoryFlag] = React.useState(true);
  const [tagData, setTagData] = React.useState([]);
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
      setCategoryFlag(true);
    } else if (_type === TYPE_TAG) {
      setTags(temp);
    } else return;
    setChangeFlag(!changeFlag);
  };

  const isSameArray = (array1, array2) => {
    return (
      array1.length === array2.length &&
      array1.every((value, index) => value === array2[index])
    );
  };

  const isValidNow = () => {
    return (
      isSameArray(prevCategories, categories) && isSameArray(prevTags, tags)
    );
  };

  const handleSubmit = () => {
    selectCategories(categories);
    selectTags(tags.filter(tag => tagData.some(td => td.name === tag)));
    navigation.goBack();
  };

  const fetchData = () => {
    if (categoryFlag) {
      getCategoryList().then(res => setCategoryData(res.results));
      getTagList(categories).then(res => setTagData(res));
      setCategoryFlag(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [changeFlag]);

  return (
    <View style={styles.baseWrapper}>
      <View>
        <Text style={styles.titleArea}>1. 카테고리</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {categoryData.map(category => {
            return (
              <View key={category.name} style={{padding: 5}}>
                <TouchableOpacity
                  style={[
                    styles.labelStyle,
                    categories.includes(category.name)
                      ? styles.labelSelected
                      : styles.labelNotSelected,
                  ]}
                  onPress={() => handleSelection(category.name, TYPE_CATEGORY)}>
                  <Text
                    style={
                      categories.includes(category.name)
                        ? styles.labelSelected
                        : styles.labelNotSelected
                    }>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.titleArea}>2. 태그</Text>

        {isUpload ? (
          <Text style={styles.titleArea}>
            #{' '}
            <Text
              style={{
                fontFamily: 'JejuGothicOTF',
                fontSize: 12,
                color: '#B2B2B5',
              }}>
              하단의 추천 태그를 선택 하시면 더 많은 노출이 가능합니다.
            </Text>
          </Text>
        ) : null}
        <View style={styles.tagArea}>
          {tagData.map(tag => {
            return (
              <View key={tag.name} style={{padding: 5}}>
                <TouchableOpacity
                  style={[
                    styles.labelStyle,
                    tags.includes(tag.name)
                      ? styles.labelSelected
                      : styles.labelNotSelected,
                  ]}
                  onPress={() => handleSelection(tag.name, TYPE_TAG)}>
                  <Text
                    style={
                      tags.includes(tag.name)
                        ? styles.labelSelected
                        : styles.labelNotSelected
                    }>
                    {tag.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
      <View style={{flex: 1, maxHeight: 250}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Pressable
            style={isValidNow() ? styles.applyButton : styles.applyButtonValid}
            onPress={handleSubmit}>
            <Text
              style={
                isValidNow()
                  ? styles.applyButtonText
                  : styles.applyButtonTextValid
              }>
              적용 하기
            </Text>
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
    fontFamily: 'JejuGothicOTF',
    fontSize: 12,
    backgroundColor: '#F7F7F7',
    color: 'black',
  },
  labelSelected: {
    fontFamily: 'JejuGothicOTF',
    fontSize: 12,
    backgroundColor: '#F85B02',
    color: 'white',
  },
  titleArea: {
    fontFamily: 'JejuGothicOTF',
    fontSize: 12,
    paddingVertical: 15,
  },
  tagArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#707070',
    height: '100%',
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
  applyButtonValid: {
    alignSelf: 'flex-end',
    marginBottom: 50,
    height: 52,
    backgroundColor: '#F85B02',
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
  },
  applyButtonText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: 17,
    lineHeight: 52,
  },
  applyButtonTextValid: {
    fontFamily: 'JejuGothicOTF',
    fontSize: 17,
    lineHeight: 52,
    color: 'white',
  },
});
