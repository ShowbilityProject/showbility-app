import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image,
} from 'react-native';
import {
  getGroups,
  GET_GROUP_TYPE,
  requestAddContentToGroup,
} from '../../service/group';

const styles = new StyleSheet.create({
  groupItem: {
    flex: 1,
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    flexDirection: 'row',
  },
  groupItemFont: {
    fontSize: 17,
    flex: 1,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 26 / 2,
    borderColor: '#DDDDDD',
    borderWidth: 1,
  },
});

export function SelectGroup({route}) {
  const contentId = route.params.contentId;
  const navigation = useNavigation();
  const [groups, setGroups] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [extraData, setExtraData] = React.useState(false);
  const [selectedGroups, setSelectedGroups] = React.useState([]);
  const selectIcon = require('../../../assets/imgs/select_icon.png');

  React.useEffect(() => {
    getGroups(GET_GROUP_TYPE.MY).then(res => {
      setRefreshing(true);
      setGroups(res.results);
      setRefreshing(false);
    });
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleSubmit} title="완료" color="#FF3B30" />
      ),
    });
  });

  const handleSubmit = async () => {
    for (let groupId of selectedGroups) {
      requestAddContentToGroup(groupId, contentId);
    }
    navigation.pop(2);
    navigation.navigate('ContentsModal', contentId);
  };

  const handleSelection = id => {
    if (selectedGroups.includes(id)) {
      let idx = selectedGroups.indexOf(id);
      if (idx > -1) {
        selectedGroups.splice(idx, 1);
        setSelectedGroups(selectedGroups);
      }
    } else {
      selectedGroups.push(id);
      setSelectedGroups(selectedGroups);
    }
    setExtraData(!extraData);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        key={'#'}
        keyExtractor={item => '#' + item.name}
        data={groups}
        refreshing={refreshing}
        extraData={extraData}
        renderItem={group => {
          let id = group.item.id;
          let name = group.item.name;
          return (
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => handleSelection(id)}>
              <Text style={styles.groupItemFont}>{name}</Text>
              {selectedGroups.includes(id) ? (
                <Image style={{alignSelf: 'flex-end'}} source={selectIcon} />
              ) : (
                <View style={styles.circle} />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
