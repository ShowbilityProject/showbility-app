import * as React from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {TouchableOpacity, TextInput} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomSheet from '@gorhom/bottom-sheet';
import {AbilityScreen} from './ability';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tobBar: {
    marginLeft: 10,
    height: 52,
    width: '100%',
    flexDirection: 'row',
  },
  tobBarText: {
    fontFamily: 'JejuGothicOTF',
    padding: 10,
    fontSize: 18,
    color: '#D5D5D6',
  },
  tobBarTextFocused: {
    color: '#000000',
    fontSize: 20,
  },
  main: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  flatListImage: {
    width: '90%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  modalCloseButton: {
    position: 'absolute',
    right: 10,
    top: 60,
    width: 24,
    height: 24,
    flex: 1,
    backgroundColor: '#F85B02',
    borderRadius: 24,
    justifyContent: 'center',
  },
  modalContentTitle: {
    fontFamily: 'JejuGothicOTF',
    color: '#B2B2B5',
    fontSize: 12,
  },
  modalCount: {
    padding: 10,
    color: '#BCBCBC',
    fontSize: 14,
  },
  filterIcon: {
    position: 'absolute',
    right: 30,
    marginTop: 7,
  },
});

class SHome extends React.Component {
  constructor(props) {
    super(props);
    this.st = true;
    this.state = {
      showbility: true,
      ability: false,
      group: false,
    };

    this.data = [
      {
        id: 0,
        url: 'https://i.pinimg.com/564x/08/94/75/089475365c284288406baf7e5616dd64.jpg',
      },
      {
        id: 1,
        url: 'https://i.pinimg.com/236x/4b/ee/eb/4beeebb760923f65d559e3486f1233c1.jpg',
      },
      {
        id: 2,
        url: 'https://i.pinimg.com/564x/b7/a5/a8/b7a5a801d8b9476bad5906ad88347445.jpg',
      },
    ];
  }

  onPressTobText = key => {
    let st = this.state;
    if (!st[key]) {
      for (let k in st) {
        if (k === key) {
          st[k] = true;
        } else {
          st[k] = false;
        }
      }
    }
    this.setState(st);
  };

  showModalOnShowbilityItemPressed = item => {
    this.props.navigation.navigate('ContentsModal', item);
  };

  renderItem = itemObject => {
    let item = itemObject.item;
    return (
      <TouchableOpacity
        onPress={() => this.showModalOnShowbilityItemPressed(item)}>
        <Image source={{uri: item.url}} style={styles.flatListImage} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={[styles.flexCenter, styles.container]}>
        <View style={{width: '100%'}}>
          <View style={styles.tobBar}>
            <Text
              style={[
                styles.tobBarText,
                this.state.showbility ? styles.tobBarTextFocused : {},
              ]}
              onPress={() => this.onPressTobText('showbility')}>
              쇼빌리티
            </Text>
            <Text
              style={[
                styles.tobBarText,
                this.state.ability ? styles.tobBarTextFocused : {},
              ]}
              onPress={() => this.onPressTobText('ability')}>
              어빌리티
            </Text>
            <Text
              style={[
                styles.tobBarText,
                this.state.group ? styles.tobBarTextFocused : {},
              ]}
              onPress={() => this.onPressTobText('group')}>
              그룹
            </Text>
            <Image
              style={styles.filterIcon}
              source={require('../../../assets/imgs/ICON-24-Filter.png')}
            />
          </View>
        </View>
        <View style={styles.main}>
          <View style={{display: this.state.showbility ? '' : 'none'}}>
            <FlatList data={this.data} renderItem={this.renderItem} />
          </View>
          <View style={{display: this.state.ability ? '' : 'none'}}>
            <AbilityScreen />
          </View>
          <View>
            <FlatList style={{display: this.state.group ? '' : 'none'}} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const MainHomeStack = createStackNavigator();

export function ContentsModal({route, navigation}) {
  const item = route.params;
  const data = [item];
  const snapPoints = React.useMemo(() => ['10%', '50%'], []);

  let title = '아디다스 2021 비주얼 아트';
  let likesCount = 91;
  let viewCount = 91;
  let commentCount = 91;
  let createdDate = '2021.12.12.';
  let description =
    '기획부터 설계, UI 디자인, 개발 조직과의 협업까지 전 과정의 업무를 수행합니다. 데이터를 파악하며, 비즈니스적인 관점을 고려합니다. 거대한 서비스를 만들어가는 디자이너로서, 전체적인 관점에서 체계적 @ \n기획부터 설계, UI 디자인, 개발 조직과의 협업까지 전 과정의 업무를 수행합니다. 데이터를 파악하며, 비즈니스적인 관점을 고려합니다.';
  let tags = ['태그1', '태그2', '태그3'];
  let comments = [
    {
      id: '1f12vr-r1v3vrafv-12rv1213ßrv',
      author: 'Kimhyeju',
      contents: '너무 멋진 작품입니다!',
      createdDate: '2021-12-12',
      liked: true,
      likesCount: 1,
      replies: [
        {
          id: '1f12vr-r1v3vrafv-12rv12rv',
          author: 'Hyechouxx',
          contents: '@Kimhyeju 응원 너무 감사합니다!',
          createdDate: '2021-12-12',
          liked: false,
          likesCount: 0,
          replies: [],
        },
        {
          id: '1f12vr-r1v3vrafv-12rv12rv1',
          author: 'Kimhyeju',
          contents: '@Hyechouxx 다음 작품도 기대하고 있어요!',
          createdDate: '2021-12-12',
          liked: true,
          likesCount: 0,
          replies: [],
        },
      ],
    },
    {
      id: '1f12vr-r1v3vrafv-12rv12re',
      author: 'Kimhyeju',
      contents: '너무 멋진 작품입니다!',
      createdDate: '2021-12-12',
      liked: true,
      likesCount: 20,
      replies: [],
    },
  ];
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={itemObject => {
          let item = itemObject.item;
          return (
            <Image
              source={{uri: item.url}}
              style={{width: '100%', aspectRatio: 1, marginBottom: 10}}
            />
          );
        }}
      />
      <View style={styles.modalCloseButton}>
        <Text
          onPress={() => navigation.goBack()}
          style={{color: 'white', alignSelf: 'center'}}>
          &#10005;
        </Text>
      </View>
      <BottomSheet snapPoints={snapPoints}>
        <View style={{marginBottom: 20, flexDirection: 'row'}}>
          <View style={{flex: 1, height: 70}}>
            <Image />
          </View>
          <View style={{flex: 4}}>
            <View style={{marginBottom: 10}}>
              <Text style={{fontFamily: 'JejuGothicOTF', fontSize: 17}}>
                {title}
              </Text>
            </View>
            <View
              style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.modalCount}>{likesCount}</Text>
                <Text style={styles.modalCount}>{viewCount}</Text>
                <Text style={styles.modalCount}>{commentCount}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    padding: 10,
                    textAlign: 'right',
                    color: '#BCBCBC',
                    fontSize: 10,
                  }}>
                  {createdDate}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{}}>
          <View
            style={{paddingRight: 16, paddingLeft: 16, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.modalContentTitle}>프로젝트 소개</Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  textAlign: 'right',
                  fontFamily: 'JejuGothicOTF',
                  color: '#F85B02',
                  fontSize: 12,
                }}>
                접어 보기
              </Text>
            </View>
          </View>
          <View style={{padding: 16}}>
            <Text style={{fontSize: 12, lineHeight: 18, letterSpacing: 0.9}}>
              {description}
            </Text>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <View style={{padding: 16, flexDirection: 'row'}}>
            <Text style={styles.modalContentTitle}>태그 정보</Text>
          </View>
          <View
            style={{paddingRight: 16, paddingLeft: 16, flexDirection: 'row'}}>
            <Text>태그</Text>
            <Text>태그</Text>
            <Text>태그</Text>
          </View>
        </View>
        <View style={{}}>
          <View
            style={{paddingRight: 16, paddingLeft: 16, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.modalContentTitle}>댓글 (91)</Text>
            </View>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => navigation.push('댓글', comments)}>
              <Text
                style={{
                  textAlign: 'right',
                  fontFamily: 'JejuGothicOTF',
                  color: '#F85B02',
                  fontSize: 12,
                }}>
                전체 보기
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingRight: 16,
              paddingLeft: 16,
              paddingTop: 16,
              lexDirection: 'row',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 12}}>{comments[0].author}</Text>
              <Text style={{marginLeft: 10}}>{comments[0].contents}</Text>
            </View>
          </View>
          <View
            style={{
              marginLeft: 16,
              marginRight: 16,
              marginTop: 16,
              borderWidth: 1,
              borderColor: '#707070',
              borderRadius: 6,
            }}>
            <TextInput
              placeholder="댓글 달기"
              style={{
                height: 40,
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 11,
                paddingTop: 12,
              }}
            />
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

function ReplyView(reply) {
  reply = reply.reply;
  let CommentStyles = {
    headLayer: {
      flexDirection: 'row',
      paddingHorizontal: 18,
      paddingTop: 20,
    },
    replyLayer: {
      flexDirection: 'row',
      paddingHorizontal: 38,
      paddingTop: 20,
    },
    additionalInfo: {
      fontSize: 12,
      color: '#B2B2B5',
      marginRight: 8,
    },
  };
  return (
    <View style={CommentStyles.replyLayer}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 12}}>{reply.author}</Text>
          <Text style={{marginLeft: 10, fontSize: 12}}>{reply.contents}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={CommentStyles.additionalInfo}>4분</Text>
          <Text style={CommentStyles.additionalInfo}>
            좋아요 {reply.likesCount}개
          </Text>
          <Text style={CommentStyles.additionalInfo}>답글 달기</Text>
        </View>
      </View>
    </View>
  );
}

function CommentsView({route, navigation}) {
  let CommentStyles = {
    headLayer: {
      flexDirection: 'row',
      paddingHorizontal: 18,
      paddingTop: 20,
    },
    replyLayer: {
      flexDirection: 'row',
      paddingHorizontal: 38,
      paddingTop: 20,
    },
    additionalInfo: {
      fontSize: 12,
      color: '#B2B2B5',
      marginRight: 8,
    },
  };
  const item = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={item}
        renderItem={item => {
          let comment = item.item;
          return (
            <View>
              <View style={CommentStyles.headLayer}>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12}}>{comment.author}</Text>
                    <Text style={{marginLeft: 10, fontSize: 12}}>
                      {comment.contents}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Text style={CommentStyles.additionalInfo}>4분</Text>
                    <Text style={CommentStyles.additionalInfo}>
                      좋아요 {comment.likesCount}개
                    </Text>
                    <Text style={CommentStyles.additionalInfo}>답글 달기</Text>
                  </View>
                </View>
              </View>
              {comment.replies.map(reply => {
                return <ReplyView reply={reply} key={reply.id} />;
              })}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

export function ShowbilityHome() {
  return (
    <MainHomeStack.Navigator mode="modal">
      <MainHomeStack.Screen
        name="Main"
        component={SHome}
        options={{headerShown: false}}
      />
      <MainHomeStack.Screen
        name="ContentsModal"
        component={ContentsModal}
        options={{headerShown: false}}
      />
      <MainHomeStack.Screen
        name="댓글"
        component={CommentsView}
        options={{headerBackTitle: ' '}}
      />
    </MainHomeStack.Navigator>
  );
}

// export default ShowbilityHome;
