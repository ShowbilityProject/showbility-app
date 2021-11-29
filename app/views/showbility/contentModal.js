import * as React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Pressable,
  Dimensions,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {HOST} from '../../common/constant';
import {
  getContentById,
  requestDeleteLikeContent,
  requestLikeContent,
} from '../../service/content';
import {postComment} from '../../service/comment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    right: 15,
    top: 20,
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
  upperRightTopCloseBtn: {
    color: 'white',
    alignSelf: 'center',
  },
  filterIcon: {
    position: 'absolute',
    right: 30,
    marginTop: 7,
  },
  contentMetaCount: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  dateArea: {
    padding: 10,
    textAlign: 'right',
    color: '#BCBCBC',
    fontSize: 10,
  },
  viewOption: {
    textAlign: 'right',
    fontFamily: 'JejuGothicOTF',
    color: '#F85B02',
    fontSize: 12,
  },
  commentWrapper: {
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
    flexDirection: 'row',
  },
  commentInputWrapper: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 6,
  },
  commentInput: {
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 11,
    paddingTop: 12,
  },
  suggestTagView: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F7F7F7',
    marginRight: 10,
    borderRadius: 5,
  },
  suggestTagText: {
    fontSize: 12,
  },
});

export function ContentsModal({route, navigation}) {
  const id = route.params;
  const [item, setItem] = React.useState({
    title: '',
    detail: '',
    views: 0,
    likes: 0,
    comments: [],
    created_at: '2021-09-09',
    tags: [],
    images: [],
    is_liked_by_user: false,
  });
  const [cmtText, setCmtText] = React.useState('');
  const [isLiked, setIsLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(0);
  const [isFollow, setIsFollow] = React.useState(false);
  const commentInput = React.useRef();
  const snapPoints = React.useMemo(() => ['10%', '50%'], []);
  const likeIcon = '../../../assets/imgs/like.png';
  const likeOnIcon = '../../../assets/imgs/like_on.png';
  const followOnIcon = '../../../assets/imgs/follow.png';
  const followIcon = '../../../assets/imgs/follown.png';
  const viewIcon = '../../../assets/imgs/view.png';
  const cmtIcon = '../../../assets/imgs/message-circle.png';

  const submitComment = ({nativeEvent}) => {
    const text = nativeEvent.text;
    postComment(text, id, null).then(res => {
      fetchData(id);
      setCmtText('');
    });
  };

  const fetchData = contentId => {
    getContentById(contentId).then(res => {
      setItem(res);
      setIsLiked(res.is_liked_by_user);
      setLikes(res.likes);
    });
  };

  React.useEffect(() => {
    fetchData(id);
  }, [id]);

  const handleLike = () => {
    if (!isLiked) requestLikeContent(id);
    else requestDeleteLikeContent(id);
    fetchData(id);
  };

  const titleArea = () => {
    return (
      <View
        style={{
          justifyContent: 'flex-end',
          height: 56,
          paddingHorizontal: 16,
          paddingVertical: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              flex: 1,
              fontSize: 15,
              fontFamily: 'JejuGothicOTF',
            }}>
            {item.title}
          </Text>
          <TouchableOpacity
            style={{alignItems: 'flex-end', marginRight: 20}}
            onPress={() => handleLike()}>
            <Image
              style={{width: 20, height: 20, resizeMode: 'contain'}}
              source={isLiked ? require(likeOnIcon) : require(likeIcon)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'flex-end'}}
            onPress={() => console.log('follow')}>
            <Image
              style={{width: 20, height: 20, resizeMode: 'contain'}}
              source={isFollow ? require(followOnIcon) : require(followIcon)}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const win = Dimensions.get('window');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar hidden={true} />
      <FlatList
        key={'#'}
        keyExtractor={item => '#' + item.id}
        data={item.images}
        style={{paddingTop: 44}}
        renderItem={itemObject => {
          let image = itemObject.item;
          console.log(image);
          let index = itemObject.index;
          let source = {uri: image.middle_size_image};
          const width = image.middle_width;
          const height = image.middle_height;
          const ratio = win.width / width;
          return (
            <View>
              {index === 0 ? titleArea() : null}
              <Image
                source={source}
                style={{
                  width: '100%',
                  height: height * ratio,
                  marginBottom: 10,
                }}
              />
            </View>
          );
        }}
      />
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.modalCloseButton}>
        <Text style={styles.upperRightTopCloseBtn}>&#10005;</Text>
      </Pressable>
      <BottomSheet snapPoints={snapPoints}>
        <View style={{marginBottom: 20, flexDirection: 'row'}}>
          <View style={{flex: 1, height: 70}}>
            <Image />
          </View>
          <View style={{flex: 4}}>
            <View style={{marginBottom: 10}}>
              <Text style={{fontFamily: 'JejuGothicOTF', fontSize: 17}}>
                {item.title}
              </Text>
            </View>
            <View style={styles.contentMetaCount}>
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => handleLike()}>
                  {isLiked ? (
                    <Image source={require(likeOnIcon)} />
                  ) : (
                    <Image source={require(likeIcon)} />
                  )}
                </TouchableOpacity>
                <Text
                  style={[
                    styles.modalCount,
                    {color: isLiked ? '#F85B02' : '#BCBCBC'},
                  ]}>
                  {item.likes}
                </Text>
                <Image source={require(viewIcon)} />
                <Text style={styles.modalCount}>{item.views}</Text>
                <Image source={require(cmtIcon)} />
                <Text style={styles.modalCount}>{item.comments.length}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.dateArea}>
                  {item.created_at.slice(0, 10)}
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
              <Text style={styles.viewOption}>접어 보기</Text>
            </View>
          </View>
          <View style={{padding: 16}}>
            <Text style={{fontSize: 12, lineHeight: 18, letterSpacing: 0.9}}>
              {item.detail}
            </Text>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <View style={{padding: 16, flexDirection: 'row'}}>
            <Text style={styles.modalContentTitle}>태그 정보</Text>
          </View>
          <View
            style={{paddingRight: 16, paddingLeft: 16, flexDirection: 'row'}}>
            <ScrollView horizontal={true}>
              {item.tags.map(tag => {
                return (
                  <View style={styles.suggestTagView} key={tag}>
                    <Text style={styles.suggestTagText}>{tag}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
        <View style={{}}>
          <View
            style={{paddingRight: 16, paddingLeft: 16, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.modalContentTitle}>
                댓글 ({item.comments.length})
              </Text>
            </View>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() =>
                navigation.push('댓글', {
                  comments: item.comments,
                  contentId: id,
                })
              }>
              <Text style={styles.viewOption}>전체 보기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.commentWrapper}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 12}}>
                {item.comments.length ? item.comments[0].author : ''}
              </Text>
              <Text style={{marginLeft: 10}}>
                {item.comments.length ? item.comments[0].detail : ''}
              </Text>
            </View>
          </View>
          <View style={styles.commentInputWrapper}>
            <TextInput
              ref={commentInput}
              placeholder="댓글 달기"
              style={styles.commentInput}
              value={cmtText}
              onChangeText={value => setCmtText(value)}
              onSubmitEditing={submitComment}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}
