import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  headerCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailButtonsCommon: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 12,
    overflow: 'hidden',
  }
});

function MyDetailHeader({name, followers, followings, contents}) {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, borderBottomWidth: 1, borderColor: '#F7F7F7', alignItems: 'center', paddingTop: 20}}>
      <View style={{flex: 1, width: '100%'}}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>{name}
        </Text>
        <Pressable style={{position: 'absolute', right: 15}} onPress={() => navigation.navigate('프로필 편집')}>
          <Ionicons name="settings-sharp" size={20} color={'black'} />
        </Pressable>
      </View>
      <Image
        style={{marginTop: 40}}
        source={require('../../../assets/imgs/group.png')}
      />
      <View style={{flexDirection: 'row'}}>
        <View style={{padding:20, alignItems: 'center'}}>
          <Text style={{color: "#B2B2B5", fontSize: 12, marginBottom: 5}}>팔로워</Text>
          <Text style={styles.headerCount}>{followers}</Text>
        </View>
        <View style={{padding:20, alignItems: 'center'}}>
          <Text style={{color: "#B2B2B5", fontSize: 12, marginBottom: 5}}>팔로잉</Text>
          <Text style={styles.headerCount}>{followings}</Text>
        </View>
        <View style={{padding:20, alignItems: 'center'}}>
          <Text style={{color: "#B2B2B5", fontSize: 12, marginBottom: 5}}>작품</Text>
          <Text style={styles.headerCount}>{contents}</Text>
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Pressable style={{paddingHorizontal: 3}}>
          <Text style={[styles.detailButtonsCommon, {borderColor: '#707070'}]}>메세지</Text>
        </Pressable>
        <Pressable style={{paddingHorizontal: 3}}>
          <Text style={[styles.detailButtonsCommon, {borderColor: '#F85B02', backgroundColor: '#F85B02', color: 'white'}]}>팔로우</Text>
        </Pressable>
      </View>
    </View>
  );
}

function MyIntroduce(object) {
  let data = object.data;
  return (
    <View style={styles.bodyItemSpace}>
      <View style={[{flexDirection: "row"}, styles.bodyHaederSpaceBody]}>
        <View style={{flex: 1 }}>
          <Text style={[styles.bodyHeaderFont, styles.fontJeju]}>소개</Text>
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

function MyTag(object) {
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

function MyItems(object) {
  let data = object.data;
  return (
    <View style={styles.bodyItemSpace}>
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

function MyDetailBody(object) {
  let data = object.data;
  return (
    <View style={{flex: 3, padding: 15}}>
      <MyIntroduce data={data} />
      <MyTag data={data} />
      <MyItems data={data} />
    </View>
  );
}

export function GroupDetail({navigation, route}) {

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
    <SafeAreaView style={styles.baseView}>
      <ScrollView style={styles.baseView}>
        <MyDetailHeader name="TESTNAME" followers={356} followings={200} contents={20} />
        <MyDetailBody data={data} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default GroupDetail;