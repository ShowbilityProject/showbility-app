import * as React from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function CategoryList({route, navigation}) {
  const selectCategories = route.params.selectCategories;
  const [categories, setCategories] = React.useState(route.params.categories);
  const [changeFlag, setChangeFlag] = React.useState(false);

  const handleSelection = value => {
    let temp = categories;
    if (!temp.includes(value)) {
      temp.push(value);
    } else {
      let idx = temp.indexOf(value);
      temp.splice(idx, 1);
    }
    setCategories(temp);
    selectCategories(categories);
    setChangeFlag(!changeFlag);
  };

  const renderItem = ({item}) => {
    const iconName = categories.includes(item.name)
      ? 'checkmark-circle-sharp'
      : 'checkmark-circle-outline';
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => handleSelection(item.name)}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>{item.name}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Ionicons name={iconName} size={30} color="#FF3B30" />
          </View>
        </TouchableOpacity>
        {/* checkmark-circle-outline */}
      </View>
    );
  };

  let data = [
    {
      id: 0,
      name: '일러스트레이션',
    },
    {
      id: 1,
      name: '포토샵',
    },
  ];
  return (
    <View style={styles.baseWrapper}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={changeFlag}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  baseWrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
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
});
