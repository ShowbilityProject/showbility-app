import * as React from 'react';
import {Text, StyleSheet, View, TextInput, ScrollView} from 'react-native';

const styles = StyleSheet.create({
  searchArea: {
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  textinput: {
    fontFamily: 'JejuGothicOTF',
    width: '100%',
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
    borderRadius: 5,
  },
  suggestTagText: {
    fontSize: 12,
  },
});

export function TagSearchArea(object) {
  let items = object.items;
  return (
    <View style={styles.searchArea}>
      <TextInput style={styles.textinput} placeholder="태그 검색" />
      <ScrollView horizontal={true}>
        {items.map(sgt => {
          return (
            <View style={styles.suggestTagView}>
              <Text style={styles.suggestTagText}>{sgt.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
