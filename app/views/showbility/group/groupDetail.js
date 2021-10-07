import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {HOST} from '../../../common/constant';
import {getGroupById} from '../../../service/group';

const styles = StyleSheet.create({
  fontJeju: {
    fontFamily: 'JejuGothicOTF',
  },
  baseView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  bodyHeaderFont: {
    color: '#B2B2B5',
    fontSize: 12,
  },
  bodyHaederSpaceBody: {
    marginBottom: 10,
  },
  showAllTextFont: {
    color: '#F85B02',
    fontSize: 12,
    textAlign: 'right',
  },
  bodyItemSpace: {
    paddingVertical: 15,
  },
  groupImageContainer: {
    width: '50%',
    maxHeight: 150,
    padding: 5,
  },
  groupImage: {
    width: '100%',
    height: '100%',
    // aspectRatio: 1.3,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 5,
  },
  imageStyle: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: 50,
  },
});

function GroupDetailHeader({repr_image, followers, contents}) {
  const imageSource = repr_image
    ? {uri: repr_image}
    : require('../../../../assets/imgs/add_image.png');
  return (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#F7F7F7',
        alignItems: 'center',
      }}>
      <Image style={styles.imageStyle} source={imageSource} />
      <View style={{flexDirection: 'row'}}>
        <View style={{padding: 20, alignItems: 'center'}}>
          <Text style={{color: '#B2B2B5', fontSize: 12, marginBottom: 5}}>
            팔로워
          </Text>
          <Text style={{fontSize: 20}}>{followers}</Text>
        </View>
        <View style={{padding: 20, alignItems: 'center'}}>
          <Text style={{color: '#B2B2B5', fontSize: 12, marginBottom: 5}}>
            작품
          </Text>
          <Text style={{fontSize: 20}}>{contents}</Text>
        </View>
      </View>
    </View>
  );
}

function GroupIntroduce({name, detail}) {
  return (
    <View style={styles.bodyItemSpace}>
      <View style={[{flexDirection: 'row'}, styles.bodyHaederSpaceBody]}>
        <View style={{flex: 1}}>
          <Text style={[styles.bodyHeaderFont, styles.fontJeju]}>
            그룹 소개
          </Text>
        </View>
        <TouchableOpacity style={{flex: 1}}>
          <Text style={styles.showAllTextFont}>전체 보기</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>{detail}</Text>
      </View>
    </View>
  );
}

function GroupTag({tags}) {
  return (
    <View style={styles.bodyItemSpace}>
      <View>
        <Text
          style={[
            styles.bodyHeaderFont,
            styles.fontJeju,
            styles.bodyHaederSpaceBody,
          ]}>
          대표 태그
        </Text>
        <FilterItemsArea items={tags} />
      </View>
    </View>
  );
}

function FilterItemsArea({items}) {
  return (
    <View style={styles.searchArea}>
      {items.map(sgt => {
        return (
          <View style={styles.suggestTagView}>
            <Text style={styles.suggestTagText}>{sgt}</Text>
          </View>
        );
      })}
    </View>
  );
}

function GroupItems({contents, title, id}) {
  const navigation = useNavigation();
  return (
    <View style={styles.bodyItemSpace}>
      <View style={[{flexDirection: 'row'}, styles.bodyHaederSpaceBody]}>
        <View style={{flex: 1}}>
          <Text style={[{fontSize: 17}, styles.fontJeju]}>
            그룹 작품 둘러보기
          </Text>
        </View>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() =>
            navigation.navigate('Find', {title: title, groupFilter: [id]})
          }>
          <Text style={styles.showAllTextFont}>전체 보기</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        {contents.map(content => {
          let source =
            content.images.length > 0
              ? {uri: HOST + content.images[0]}
              : require('../../../../assets/imgs/add_image.png');
          return (
            <TouchableOpacity
              key={content.url}
              style={styles.groupImageContainer}
              onPress={() => navigation.navigate('ContentsModal', content.id)}>
              <Image source={source} style={styles.groupImage} />
              <Text>test</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function GroupMembers({members, members_count}) {
  const MEMBER_TYPE_STR = {
    LD: '그룹 장',
    MB: '그룹 멤버',
  };

  return (
    <View style={styles.bodyItemSpace}>
      <View style={[{flexDirection: 'row'}, styles.bodyHaederSpaceBody]}>
        <View style={{flex: 1}}>
          <Text style={[{fontSize: 17}, styles.fontJeju]}>
            그룹 멤버<Text>({members_count}명)</Text>
          </Text>
        </View>
        <TouchableOpacity style={{flex: 1}}>
          <Text style={styles.showAllTextFont}>전체 보기</Text>
        </TouchableOpacity>
      </View>
      <View>
        {members.map(member => {
          return (
            <View style={{flexDirection: 'row', paddingVertical: 5}}>
              <Image
                style={{width: 36, height: 36, marginRight: 5}}
                source={require('../../../../assets/imgs/group.png')}
              />
              <View>
                <Text
                  style={[
                    {fontSize: 17, alignSelf: 'stretch', marginBottom: 3},
                    styles.fontJeju,
                  ]}>
                  {member.user.username}
                </Text>
                <Text style={{fontSize: 9, alignSelf: 'baseline'}}>
                  {MEMBER_TYPE_STR[member.member_type]}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    borderRadius: 5,
                    backgroundColor: '#F85B02',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  }}>
                  <Text
                    style={[
                      styles.fontJeju,
                      {
                        textAlign: 'right',
                        textAlignVertical: 'center',
                        color: 'white',
                        fontSize: 12,
                      },
                    ]}>
                    팔로우
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function GroupDetailBody({data}) {
  return (
    <View style={{flex: 3, padding: 15}}>
      <GroupIntroduce name={data.name} detail={data.detail} />
      <GroupTag tags={data.tags} />
      <GroupItems contents={data.contents} title={data.name} id={data.id} />
      <GroupMembers members={data.members} members_count={data.members_count} />
    </View>
  );
}

function BottomJoinButtonView() {
  return (
    <View style={{padding: 15}}>
      <TouchableOpacity
        style={{
          width: '100%',
          paddingVertical: 20,
          borderRadius: 5,
          backgroundColor: '#F85B02',
          alignItems: 'center',
        }}>
        <Text
          style={[
            styles.fontJeju,
            {
              textAlign: 'right',
              textAlignVertical: 'center',
              color: 'white',
              fontSize: 17,
            },
          ]}>
          함께하기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function GroupDetail({navigation, route}) {
  const id = route.params.id;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    });
  });
  const defaultGroup = {
    id: 0,
    tags: [],
    categories: [],
    name: '',
    detail: '',
    repr_image: '',
    is_visible: true,
    created_at: '2021-10-04T11:06:09.964875Z',
    updated_at: '2021-10-04T11:06:09.964945Z',
    contents: [],
    followers_count: 0,
    contents_count: 0,
    members_count: 0,
    members: [],
  };
  const [data, setData] = React.useState(defaultGroup);

  React.useState(() => {
    getGroupById(id).then(res => {
      setData(res);
    });
  }, [id]);

  return (
    <ScrollView style={styles.baseView}>
      <GroupDetailHeader
        repr_image={data.repr_image}
        followers={data.followers_count}
        contents={data.contents_count}
      />
      <GroupDetailBody data={data} />
      <BottomJoinButtonView />
    </ScrollView>
  );
}
