import * as React from 'react';
import {FlatList, SafeAreaView, View, Text, StyleSheet} from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
