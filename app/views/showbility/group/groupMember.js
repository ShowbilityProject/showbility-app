import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {FlatList, View, Image, Text, StyleSheet, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { MEMBER_STATUS_TYPE } from '../../../common/constant';
import {getGroupMemebersByGroupId, getNext, updateMemberStatus} from '../../../service/group';

export function GroupMember({route}) {
  const navigation = useNavigation();
  const groupId = route.params.groupId;
  const status = route.params.status;
  const [data, setData] = React.useState([]);
  const [nextURL, setNextURL] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [fetchingNext, setFetchingNext] = React.useState(true);
  const [extraData, setExtraData] = React.useState(false);

  React.useEffect(() => {
    getGroupMemebersByGroupId(groupId, status)
      .then(res => {
        setData(res.results);
        setNextURL(res.next);
      })
      .then(() => {
        setRefreshing(false);
        setFetchingNext(false);
      });
  }, [groupId, status]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: status === 'AT' ? '그룹 멤버 전체보기' : '승인 대기 중인 인원',
    });
  });

  const fetchNext = () => {
    if (nextURL === null) return;
    console.log('Fetch next');
    setFetchingNext(true);
    getNext(nextURL).then(res => {
      data.push.apply(data, res.results);
      setNextURL(res.next);
      setData(data);
      setFetchingNext(false);
    });
  };

  const isScrollEnd = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    const ret =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
    return ret;
  };

  const MemberTypeString = {
    LD: '그룹 장',
    MB: '그룹 멤버',
    MG: '운영진',
  };

  const memberTypeColor = {
    LD: '#F85B02',
    MB: 'black',
    MG: '#F85B02',
  };

  const removeMemberFromList = memberId => {
    setData(data.filter(member => member.id !== memberId));
    setExtraData(!extraData);
  };

  const updateStatus = (memberId, status) => {
    updateMemberStatus(groupId, memberId, status);
    removeMemberFromList(memberId);
  };

  const allowDeny = member => {
    return (
      <View style={styles.allowDenyWrapper}>
        <TouchableOpacity
          style={styles.allowButton}
          onPress={() => updateStatus(member.id, MEMBER_STATUS_TYPE.ACTIVE)}>
          <Text style={[styles.fontJeju, , styles.allowText]}>승인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.denyButton}
          onPress={() => updateStatus(member.id, MEMBER_STATUS_TYPE.REJECT)}>
          <Text style={[styles.fontJeju, styles.denyText]}>거절</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = itemObject => {
    let item = itemObject.item;
    const tempImage =
      'http://localhost:8000/media/group/images/tag1_Kyfk4hI.jpeg';
    return (
      <View style={styles.memberRow}>
        <View style={{flex: 1, maxWidth: 40, minHeight: 40, marginRight: 10}}>
          <Image source={{uri: tempImage}} style={styles.profileImage} />
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 17}}>{item.user.nickname}</Text>
          <Text
            style={[
              styles.memberTypeText,
              {
                color: memberTypeColor[item.member_type],
              },
            ]}>
            {MemberTypeString[item.member_type]}
          </Text>
        </View>
        {status === 'AT' ? (
          <TouchableOpacity style={styles.followButton}>
            <Text style={[styles.fontJeju, {color: 'white'}]}>팔로우</Text>
          </TouchableOpacity>
        ) : (
          allowDeny(item)
        )}
      </View>
    );
  };

  return (
    <View style={styles.baseContainer}>
      <TextInput style={styles.searchInput} placeholder="그룹 멤버 검색" />
      <FlatList
        key={'#'}
        keyExtractor={item => '#' + item.id}
        data={data}
        renderItem={renderItem}
        horizontal={false}
        numColumns={1}
        refreshing={refreshing}
        extraData={extraData}
        onScroll={({nativeEvent}) => {
          if (isScrollEnd(nativeEvent)) {
            console.log(fetchingNext);
            if (!fetchingNext) fetchNext();
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: 'white',
    paddingTop: 15,
    flex: 1,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    maxHeight: 40,
    backgroundColor: '#F6F7F9',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  fontJeju: {
    fontFamily: 'JejuGothicOTF',
  },
  memberRow: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    paddingVertical: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
    overflow: 'hidden',
  },
  memberTypeText: {
    fontSize: 9,
    marginTop: 5,
  },
  followButton: {
    backgroundColor: '#F85B02',
    height: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
  },
  allowDenyWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  allowButton: {
    alignSelf: 'flex-end',
    borderRadius: 5,
    backgroundColor: '#F85B02',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 5,
  },
  allowText: {
    textAlign: 'right',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 12,
  },
  denyButton: {
    alignSelf: 'flex-end',
    borderRadius: 5,
    backgroundColor: '#B2B2B5',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  denyText: {
    textAlign: 'right',
    textAlignVertical: 'center',
    color: 'black',
    fontSize: 12,
  },
});
