import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  Animated,
  Button,
} from 'react-native';
import {getGroups, GET_GROUP_TYPE} from '../../service/group';
import {Color} from '../../style/colors';

const styles = new StyleSheet.create({
  groupItem: {
    flex: 1,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupItemFont: {
    fontSize: 14,
    lineHeight: 22,
    flex: 1,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 26 / 2,
    borderColor: '#DDDDDD',
    borderWidth: 1,
  },
  groupImage: {
    width: 36,
    height: 36,
    resizeMode: 'cover',
    borderRadius: 18,
    marginRight: 15,
  },
  textStyle: {
    fontFamily: 'JejuGothicOTF',
    fontSize: 17,
    lineHeight: 60,
    flex: 1,
  },
});

export function SelectGroup(props) {
  const {selectedGroups, setSelectedGroups, style} = props;
  const [groups, setGroups] = React.useState([]);
  const [extraData, setExtraData] = React.useState(false);
  const [contentsHeight, setContentsHeight] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);

  const animatedHeight = React.useRef(new Animated.Value(0)).current;
  const padBottomValue = 20;

  const open = () => {
    setIsOpen(true);
    Animated.timing(animatedHeight, {
      toValue: contentsHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const close = () => {
    setIsOpen(false);
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    getGroups(GET_GROUP_TYPE.MY).then(res => {
      setGroups(res.results);
      setContentsHeight(padBottomValue + res.results.length * 46);
    });
  }, []);

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

  return groups.length ? (
    <View style={style}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.textStyle}>그룹 선택</Text>
        {isOpen ? (
          <Button title="&or;" color="#d3d7e0" onPress={close} />
        ) : (
          <Button title="&and;" color="#d3d7e0" onPress={open} />
        )}
      </View>
      <Animated.View style={{height: animatedHeight, overflow: 'hidden'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingBottom: padBottomValue,
          }}>
          {groups.map(group => {
            let id = group.id;
            let name = group.name;
            let groupThumbnail = group.small_image;
            if (groupThumbnail === null) groupThumbnail = group.repr_image;
            return (
              <View key={id} style={styles.groupItem}>
                <Image
                  style={styles.groupImage}
                  source={{uri: groupThumbnail}}
                />
                <Text style={styles.groupItemFont}>{name}</Text>
                <Switch
                  trackColor={{false: '#767577', true: Color.birghtOrange}}
                  onValueChange={() => handleSelection(id)}
                  value={selectedGroups.includes(id)}
                />
              </View>
            );
          })}
        </View>
      </Animated.View>
    </View>
  ) : null;
}
