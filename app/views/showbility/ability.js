import * as React from 'react';
import {FlatList, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {getAbilityList} from '../../service/ability';

const styles = StyleSheet.create({
  flatListImage: {
    width: '100%',
    aspectRatio: 1.3,
    alignSelf: 'center',
    marginBottom: 7,
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
  flatListFrame: {
    paddingHorizontal: 10,
  },
});

export function AbilityScreen() {
  const [abilities, setAbilities] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    setRefreshing(true);
    refreshData();
  }, []);

  const refreshData = () => {
    getAbilityList().then(res => {
      setAbilities(res.results);
      setRefreshing(false);
    });
  };

  const renderItem = itemObject => {
    console.log(itemObject);
    let item = itemObject.item;
    return (
      <TouchableOpacity style={styles.abilityFrame}>
        <Image source={{uri: item.url}} style={styles.flatListImage} />
        <Text style={[styles.fontJeju, styles.abilityItemTitle]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      key={'#'}
      keyExtractor={item => '#' + item.name}
      data={abilities}
      renderItem={renderItem}
      horizontal={false}
      numColumns={2}
      style={styles.flatListFrame}
      refreshing={refreshing}
      onRefresh={refreshData}
    />
  );
}
