import * as React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  fontJeju: {
    fontFamily: 'JejuGothicOTF',
  },
  baseView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  selectionView: {
    flex: 1,
    padding: 15,
  },
  header: {
    flex: 1,
    marginBottom: 20,
  },
  categoryView: {
    flex: 5,
  },
  numberHeader: {
    marginBottom: 10,
  },
  tagView: {
    flex: 4,
  },
  tagWarpperView: {
    borderColor: '#F7F7F7',
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    flexWrap: 'wrap',
  },
  textinput: {
    fontFamily: 'JejuGothicOTF',
    height: 40,
    backgroundColor: '#F6F7F9',
    marginBottom: 20,
    fontSize: 17,
    padding: 10,
  },
  suggestTagView: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F7F7F7',
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  suggestTagText: {
    fontSize: 12,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 30,
  },
  applyButton: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 5,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
  },
});

function FilterItemsArea(object) {
  let items = object.items;
  return (
    <View style={styles.searchArea}>
      {items.map(sgt => {
        return (
          <View style={styles.suggestTagView}>
            <Text style={styles.suggestTagText}>{sgt.name}</Text>
          </View>
        );
      })}
    </View>
  );
}

export function FilterScreen() {
  let searchSuggests = [
    {id: 0, name: '포토그래피'},
    {id: 1, name: '일러스트레이션'},
    {id: 2, name: '건축'},
    {id: 3, name: '패션'},
    {id: 4, name: '웹/모바일'},
    {id: 4, name: '제품'},
  ];

  return (
    <View style={styles.baseView}>
      <View style={styles.selectionView}>
        <View style={styles.header}>
          <Text style={[{fontSize: 17}, styles.fontJeju]}>
            내가 딱 원하는 그룹 찾기
          </Text>
        </View>
        <View style={styles.categoryView}>
          <View style={styles.numberHeader}>
            <Text>1. 카테고리</Text>
          </View>
          <FilterItemsArea items={searchSuggests} />
        </View>
        <View style={styles.tagView}>
          <View style={styles.numberHeader}>
            <Text>2. 태그</Text>
          </View>
          <View style={styles.tagWarpperView}>
            <FilterItemsArea items={searchSuggests} />
          </View>
        </View>
      </View>
      <View style={styles.bottomView}>
        <View style={{flex: 1}}>
          <Text style={{padding: 20}}>
            선택 태그를 모두 포함하는 그룹이 노출됩니다.
          </Text>
          <TouchableOpacity style={styles.applyButton}>
            <Text>적용하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}