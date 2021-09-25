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
import {GroupScreen} from './group/group';
import {FilterScreen} from './filter';
import {GroupDepthView} from './group/groupDepthView';
import {GroupDetail} from './group/groupDetail';
import {GroupCreate} from './group/groupCreate';
import {getContent, getContentsList} from '../../service/content';
import {useNavigation} from '@react-navigation/core';
import {HOST} from '../../common/constant';

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
      isFetching: false,
    };
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
            <TouchableOpacity
              style={styles.filterIcon}
              onPress={() =>
                this.props.navigation.navigate('카테고리&태그 선택')
              }>
              <Image
                source={require('../../../assets/imgs/ICON-24-Filter.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.main}>
          <View style={{flex: 1, display: this.state.showbility ? '' : 'none'}}>
            <ShowbilityScreen />
          </View>
          <View style={{display: this.state.ability ? '' : 'none'}}>
            <AbilityScreen />
          </View>
          <View style={{display: this.state.group ? '' : 'none'}}>
            <GroupScreen />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

function ShowbilityScreen() {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const showModalOnShowbilityItemPressed = item => {
    getContent(item.url).then(content =>
      navigation.navigate('ContentsModal', content),
    );
  };

  const renderItem = itemObject => {
    let item = itemObject.item;
    let source = require('../../../assets/imgs/add_image.png');
    if (item.images.length > 0) {
      source = {uri: HOST + item.images[0]};
    }
    return (
      <TouchableOpacity onPress={() => showModalOnShowbilityItemPressed(item)}>
        <Image source={source} style={styles.flatListImage} />
      </TouchableOpacity>
    );
  };

  const fetchData = () => {
    console.log('Fetchdata Showbility Home');
    getContentsList()
      .then(d => {
        setData(d.results);
      })
      .then(() => setRefreshing(false));
  };

  const onRefersh = () => {
    setRefreshing(true);
    fetchData();
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <FlatList
      key={'#'}
      keyExtractor={item => '#' + item.url}
      data={data}
      renderItem={renderItem}
      onRefresh={() => onRefersh()}
      refreshing={refreshing}
    />
  );
}

const MainHomeStack = createStackNavigator();

export function ContentsModal({route, navigation}) {
  const item = route.params;
  const snapPoints = React.useMemo(() => ['10%', '50%'], []);

  let title = item.title;
  let likesCount = 91;
  let viewCount = 91;
  let commentCount = 91;
  let createdDate = item.created_at.slice(0, 10);
  let description = item.detail;
  let tags = item.tags;
  let comments = item.comments;
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        key={'#'}
        keyExtractor={item => '#' + item}
        data={item.images}
        renderItem={itemObject => {
          let item = itemObject.item;
          let source = {uri: HOST + item};
          return (
            <Image
              source={source}
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
            {tags.map(tag => {
              return <Text key={tag}>{tag}</Text>;
            })}
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
              <Text style={{marginLeft: 10}}>{comments[0].detail}</Text>
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
          <Text style={{marginLeft: 10, fontSize: 12}}>{reply.detail}</Text>
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
          if (comment.depth > 0) {
            return;
          }
          return (
            <View>
              <View style={CommentStyles.headLayer}>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 12}}>{comment.author}</Text>
                    <Text style={{marginLeft: 10, fontSize: 12}}>
                      {comment.detail}
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
              {comment.childs.map(reply => {
                return <ReplyView reply={reply} key={reply.url} />;
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
      <MainHomeStack.Screen
        name="카테고리&태그 선택"
        component={FilterScreen}
        options={{headerBackTitle: ' '}}
      />
      <MainHomeStack.Screen
        name="마이 그룹"
        component={GroupDepthView}
        options={{headerBackTitle: ' '}}
      />
      <MainHomeStack.Screen
        name="쇼빌 그룹 둘러보기"
        component={GroupDepthView}
        options={{headerBackTitle: ' '}}
      />
      <MainHomeStack.Screen
        name="멤버 모집 중인 그룹"
        component={GroupDepthView}
        options={{headerBackTitle: ' '}}
      />
      <MainHomeStack.Screen
        name="GroupDetail"
        component={GroupDetail}
        options={{headerBackTitle: ' '}}
      />
      <MainHomeStack.Screen
        name="그룹 생성"
        component={GroupCreate}
        options={{headerBackTitle: ' '}}
      />
    </MainHomeStack.Navigator>
  );
}
