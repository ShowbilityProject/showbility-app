import { Header } from '@react-navigation/stack';
import * as React from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { getComment, postComment } from '../../service/comment';

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

export function CommentsView({route, navigation}) {
  let CommentStyles = {
    headLayer: {
      flexDirection: 'row',
      paddingLeft: 4,
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
  // const item = route.params.comments;
  const contentId = route.params.contentId;
  const [item, setItem] = React.useState(route.params.comments);
  const [cmtText, setCmtText] = React.useState('');
  const commentInput = React.useRef();
  const defaultUserIconSource = require('../../../assets/imgs/default_profile.png');

  const submitComment = ({nativeEvent}) => {
    const text = nativeEvent.text;
    postComment(text, contentId, null).then(res => {
      setCmtText('');
      fetchData();
    });
  };

  const fetchData = React.useCallback(() => {
    getComment(contentId).then(res => setItem(res.results));
  }, [contentId]);

  React.useEffect(() => {
    console.log('useEffect');
    fetchData();
  }, [contentId, fetchData]);

  const getTimeString = dt => {
    const created_dt = new Date(dt);
    const date_now = new Date();

    let delta = Math.abs(date_now - created_dt) / 1000;
    let days = Math.floor(delta / 86400);
    delta -= days * 86400;
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    let seconds = Math.floor(delta % 60);

    if (days !== 0) return `${days}일`;
    else if (hours !== 0) return `${hours}시간`;
    else if (minutes !== 0) return `${minutes}분`;
    else return `${seconds}초`;
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 15, backgroundColor: 'white'}}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <FlatList
          data={item}
          renderItem={item => {
            let comment = item.item;
            if (comment.depth > 0) {
              return;
            }
            return (
              <View style={{flexDirection: 'row', paddingVertical: 10}}>
                <View style={{justifyContent: 'flex-start'}}>
                  <Image
                    source={defaultUserIconSource}
                    style={{width: 20, height: 20}}
                  />
                </View>
                <View style={CommentStyles.headLayer}>
                  <View stlye={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 12, fontWeight: '600', lineHeight: 18}}>
                        {comment.author}
                      </Text>
                      <Text style={{marginLeft: 10, fontSize: 12, lineHeight: 18}}>
                        {comment.detail}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <Text style={CommentStyles.additionalInfo}>
                        {getTimeString(comment.created_at)}
                      </Text>
                      <Text style={CommentStyles.additionalInfo}>
                        좋아요 {comment.likes}개
                      </Text>
                      {/* <Text style={CommentStyles.additionalInfo}>답글 달기</Text> */}
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
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  commentInputWrapper: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#707070',
    borderRadius: 6,
    marginBottom: 40,
  },
  commentInput: {
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 11,
    paddingTop: 12,
  },
});
