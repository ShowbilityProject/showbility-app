import * as React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

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
    padding: 5,
  },
  groupImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 5,
  },
});

function GroupDetailHeader() {
  return (
    <View style={{flex: 1, borderBottomWidth: 1, borderColor: '#F7F7F7', alignItems: 'center'}}>
      <Image
        style={{marginTop: 20}}
        source={require('../../../../assets/imgs/group.png')}
      />
      <View style={{flexDirection: 'row'}}>
        <View style={{padding:20, alignItems: 'center'}}>
          <Text style={{color: "#B2B2B5", fontSize: 12, marginBottom: 5}}>팔로워</Text>
          <Text style={{fontSize: 20}}>356</Text>
        </View>
        <View style={{padding:20, alignItems: 'center'}}>
          <Text style={{color: "#B2B2B5", fontSize: 12, marginBottom: 5}}>작품</Text>
          <Text style={{fontSize: 20}}>20</Text>
        </View>
      </View>
    </View>
  );
}

function GroupIntroduce(object) {
  let data = object.data;
  return (
    <View style={styles.bodyItemSpace}>
      <View style={[{flexDirection: "row"}, styles.bodyHaederSpaceBody]}>
        <View style={{flex: 1 }}>
          <Text style={[styles.bodyHeaderFont, styles.fontJeju]}>그룹 소개</Text>
        </View>
        <TouchableOpacity style={{flex: 1}}>
          <Text style={styles.showAllTextFont}>전체 보기</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>{data.content}</Text>
      </View>
    </View>
  );
}

function GroupTag(object) {
  let data = object.data;
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
        <FilterItemsArea items={data.tags} />
      </View>
    </View>
  );
}

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

function GroupItems(object) {
  let data = object.data;
  return (
    <View style={styles.bodyItemSpace}>
      <View style={[{flexDirection: "row"}, styles.bodyHaederSpaceBody]}>
        <View style={{flex: 1 }}>
          <Text style={[{fontSize: 17}, styles.fontJeju]}>그룹 작품 둘러보기</Text>
        </View>
        <TouchableOpacity style={{flex: 1}}>
          <Text style={styles.showAllTextFont}>전체 보기</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.groupImageContainer}>
          <Image
            source={{uri: data.groupItems[0].url}}
            style={styles.groupImage}
          />
        </View>
        <View style={styles.groupImageContainer}>
          <Image
            source={{uri: data.groupItems[1].url}}
            style={styles.groupImage}
          />
        </View>
      </View>
    </View>
  );
}

function GroupMembers(object) {
  let data = object.data;
  return (
    <View style={styles.bodyItemSpace}>
      <View style={[{flexDirection: "row"}, styles.bodyHaederSpaceBody]}>
        <View style={{flex: 1 }}>
          <Text style={[{fontSize: 17}, styles.fontJeju]}>그룹 멤버<Text>(32명)</Text></Text>
        </View>
        <TouchableOpacity style={{flex: 1}}>
          <Text style={styles.showAllTextFont}>전체 보기</Text>
        </TouchableOpacity>
      </View>
      <View>
        {data.members.map(member => {
          return (
            <View style={{flexDirection: 'row', paddingVertical: 5}}>
              <Image style={{width: 36, height: 36, marginRight: 5}} source={require("../../../../assets/imgs/group.png")}/>
              <View>
                <Text style={[{fontSize: 17, alignSelf: 'stretch', marginBottom: 3}, styles.fontJeju]}>{member.username}</Text>
                <Text style={{fontSize: 9, alignSelf: 'baseline'}}>{member.position}</Text>
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity style={{alignSelf:'flex-end', borderRadius: 5, backgroundColor: '#F85B02', paddingVertical: 10, paddingHorizontal: 20}}>
                  <Text style={[styles.fontJeju, {textAlign:'right', textAlignVertical: 'center', color: 'white', fontSize: 12}]}>팔로우</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function GroupDetailBody(object) {
  let data = object.data;
  return (
    <View style={{flex: 3, padding: 15}}>
      <GroupIntroduce data={data} />
      <GroupTag data={data} />
      <GroupItems data={data} />
      <GroupMembers data={data} />
    </View>
  );
}

function BottomJoinButtonView() {
  return (
    <View style={{padding: 15}}>
      <TouchableOpacity style={{width: '100%', paddingVertical: 20, borderRadius: 5, backgroundColor: '#F85B02', alignItems: 'center'}}>
        <Text style={[styles.fontJeju, {textAlign:'right', textAlignVertical: 'center', color: 'white', fontSize: 17}]}>함께하기</Text>
      </TouchableOpacity>
    </View>
  )
}

export function GroupDetail({navigation, route}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    });
  });

  let data = {
    content: `기획부터 설계, UI 디자인, 개발 조직과의 협업까지 전 과정의 업무를 \
수행합니다. 데이터를 파악하며, 비즈니스적인 관점을 고려합니다.\
거대한 서비스를 만들어가는 디자이너로서, 전체적인 관점에서 체계적\
기획부터 설계, UI 디자인, 개발 조직과의 협업까지 전 과정의 업무를 \
수행합니다. 데이터를 파악하며, 비즈니스적인 관점을 고려합니다. \
거대한 서비스를 만들어가는 디자이너로서, 전체적인 관점에서 체\
기획부터 설계, UI 디자인, 개발 조직과의 협업까지 전 과정의 업무를 \
수행합니다. 데이터를 파악하며, 비즈니스적인 관점을 고려합니다. 

https://showbility.co.rk`,
    tags: [
      {
        id: 0,
        name: '건축',
      },
      {
        id: 1,
        name: '패션',
      },
      {
        id: 2,
        name: 'UI/UX',
      },
      {
        id: 3,
        name: '스타일',
      },
      {
        id: 4,
        name: '반려동물',
      },
    ],
    groupItems: [
      {
        id: 0,
        url: 'https://i.pinimg.com/564x/08/94/75/089475365c284288406baf7e5616dd64.jpg',
        name: '포토그래피',
      },
      {
        id: 1,
        url: 'https://i.pinimg.com/236x/4b/ee/eb/4beeebb760923f65d559e3486f1233c1.jpg',
        name: '일러스트레이션',
      },
    ],
    members: [
      {
        id: 0,
        username: 'Hyechou',
        position: 'leader',
      },
      {
        id: 1,
        username: 'Hyechou',
        position: 'member',
      },
      {
        id: 2,
        username: 'Hyechou',
        position: 'member',
      },
    ],
  };
  return (
    <ScrollView style={styles.baseView}>
      <GroupDetailHeader />
      <GroupDetailBody data={data} />
      <BottomJoinButtonView />
    </ScrollView>
  );
}