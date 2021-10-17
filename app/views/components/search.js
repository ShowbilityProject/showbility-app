import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {getCategoryList} from '../../service/ability';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  flexCenter: {
    alignItems: 'center',
  },
  subtitleWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
    maxHeight: 70,
  },
  subtitleShowAll: {
    fontFamily: 'JejuGothicOTF',
    color: '#F85B02',
    fontSize: 12,
  },
  subtitle: {
    fontFamily: 'JejuGothicOTF',
    fontSize: 17
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
  flatListImage: {
    width: '100%',
    aspectRatio: 2,
    alignSelf: 'center',
    marginBottom: 7,
    borderRadius: 5,
  },
  abilityFrame: {
    width: '50%',
    paddingBottom: 5,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  fontJeju: {
    fontFamily: 'JejuGothicOTF',
  },
  abilityItemTitle: {
    fontSize: 17,
  },
});

function SearchTab() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getCategoryList().then(res => {
      console.log(res);
      setData(res.results);
    });
  }, []);

  const renderItem = itemObject => {
    let item = itemObject.item;
    return (
      <TouchableOpacity style={styles.abilityFrame}>
        <Image source={{uri: item.image}} style={styles.flatListImage} />
        <Text style={[styles.fontJeju, styles.abilityItemTitle]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={[styles.flexCenter, styles.container]}>
        <TextInput style={styles.textinput} placeholder="태그 검색" />
        <View style={styles.subtitleWrapper}>
          <View style={{flex: 3}}>
            <Text style={styles.subtitle}>
              관심있는 재능의 태그를 검색해보기
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={styles.subtitleShowAll}>전체보기</Text>
          </View>
        </View>
        <FlatList
          key={'#'}
          keyExtractor={item => '#' + item.id}
          data={data}
          renderItem={renderItem}
          horizontal={false}
          numColumns={2}
          style={{flex: 1}}
        />
      </View>
    </SafeAreaView>
  );
}

export default SearchTab;
