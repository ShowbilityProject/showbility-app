import * as React from 'react';
import {View, StyleSheet, Text, Pressable, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getCategoryList, getTagList} from '../../service/ability';

export function CategoryList({route, navigation}) {
  const selectCategories = route.params.selectCategories;
  const selectTags = route.params.selectTags;
  const prevCategories = route.params.categories;
  const prevTags = route.params.tags;
  const prevScreen = route.params.prevScreen
    ? route.params.prevScreen
    : 'FILTER';
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

  const removeAllSelection = () => {
    setCategories([]);
    setTags([]);
    setCategoryFlag(true);
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

  const isSelectedAny = () => {
    return categories.length + tags.length;
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

  const titleText = {
    GROUP: '내가 딱 원하는 그룹 찾기',
    FILTER: '내가 딱 원하는 재능 찾기',
    GROUP_CREATE: '그룹에 맞는 대표 태그를 설정하세요!',
    UPLOAD: '작품에 맞는 대표 태그를 설정하세요',
    PROFILE: '나에게 맞는 대표 태그를 선택하세요',
  };

  const bottomText = {
    GROUP: '태그를 선택하여 마음에 드는 그룹을 바로 찾아보세요!',
    FILTER: '적절한 태그를 선택하여 마음에 드는 작품을 바로 찾아보세요!',
    GROUP_CREATE: '적절한 태그를 선택하여 그룹 노출도를 높여보세요!',
    UPLOAD: '적절한 태그를 선택하여 작품 노출도를 높여보세요!',
    PROFILE: "적절한 태그를 선택하여 '나'를 잘 표현해보세요",
  };

  function LabelArea({title, rawData, selectedData, _type}) {
    return (
      <View>
        <Text style={styles.titleArea}>{title}</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {rawData.map(data => {
            return (
              <View key={data.name} style={{padding: 5}}>
                <TouchableOpacity
                  style={[
                    styles.labelStyle,
                    rawData.includes(data.name)
                      ? styles.labelSelected
                      : styles.labelNotSelected,
                  ]}
                  onPress={() => handleSelection(data.name, _type)}>
                  <Text
                    style={
                      selectedData.includes(data.name)
                        ? styles.labelSelected
                        : styles.labelNotSelected
                    }>
                    {data.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  function SelectedLabel({datas, _type}) {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {datas.map(data => {
          return (
            <View key={data} style={{paddingRight: 10}}>
              <View style={styles.bottomLabelStyle}>
                <Text style={styles.bottomLabelText}>{data}</Text>
                <Pressable
                  style={{flex: 1, marginLeft: 4, alignItems: 'center'}}
                  onPress={() => handleSelection(data, _type)}>
                  <Text style={styles.bottomLabelText}>X</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.baseWrapper}>
      <View style={{flex: 1, paddingBottom: 20}}>
        <ScrollView style={{flexGrow: 1}}>
          <View style={{paddingVertical: 19}}>
            <Text style={{fontFamily: 'JejuGothicOTF', fontSize: 17}}>
              {titleText[prevScreen]}
            </Text>
          </View>
          <LabelArea
            title="카테고리"
            rawData={categoryData}
            selectedData={categories}
            _type={TYPE_CATEGORY}
          />
          <LabelArea
            title="기능 태그"
            rawData={tagData.filter(item => item.section === '기능')}
            selectedData={tags}
            _type={TYPE_TAG}
          />
          <LabelArea
            title="감성 태그"
            rawData={tagData.filter(item => item.section === '감성')}
            selectedData={tags}
            _type={TYPE_TAG}
          />
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View>
          <View style={{paddingBottom: 14, marginBottom: 5}}>
            {isSelectedAny() ? (
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.bottomText}>최대 20개 선택 가능</Text>
                  <Pressable
                    style={{alignSelf: 'flex-end'}}
                    onPress={() => removeAllSelection()}>
                    <Text style={styles.allDeleteText}>전체 삭제</Text>
                  </Pressable>
                </View>
                <ScrollView style={{marginTop: 15}} horizontal={true}>
                  <SelectedLabel datas={categories} _type={TYPE_CATEGORY} />
                  <SelectedLabel datas={tags} _type={TYPE_TAG} />
                </ScrollView>
              </View>
            ) : (
              <Text style={styles.bottomText}>{bottomText[prevScreen]}</Text>
            )}
          </View>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={
                isValidNow() ? styles.applyButton : styles.applyButtonValid
              }
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: 'auto',
  },
  labelNotSelected: {
    fontSize: 12,
    backgroundColor: '#F7F7F7',
    color: 'black',
  },
  labelSelected: {
    fontSize: 12,
    backgroundColor: '#F7F7F7',
    color: '#F85B02',
  },
  bottomLabelStyle: {
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: 'auto',
    borderColor: '#F85B02',
    borderWidth: 1,
    flexDirection: 'row',
  },
  bottomLabelText: {
    fontSize: 12,
    color: '#F85B02',
  },
  titleArea: {
    fontFamily: 'JejuGothicOTF',
    fontSize: 14,
    paddingVertical: 13,
    paddingTop: 23,
  },
  bottomText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'JejuGothicOTF',
    color: '#b2b2b5',
  },
  allDeleteText: {
    flex: 1,
    fontSize: 12,
    color: '#f85b02',
    textAlign: 'right',
  },
  tagArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: 'white',
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
