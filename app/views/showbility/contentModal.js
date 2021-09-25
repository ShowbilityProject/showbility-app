import * as React from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
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
  upperRightTopCloseBtn: {
    color: 'white',
    alignSelf: 'center'
  },
  filterIcon: {
    position: 'absolute',
    right: 30,
    marginTop: 7,
  },
  contentMetaCount: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
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
  const item = route.params;
  const snapPoints = React.useMemo(() => ['10%', '50%'], []);

  let title = item.title;
  let likesCount = 91;
  let viewCount = item.views;
  let commentCount = item.comments.length;
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
          style={styles.upperRightTopCloseBtn}>
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
            <View style={styles.contentMetaCount}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.modalCount}>{likesCount}</Text>
                <Text style={styles.modalCount}>{viewCount}</Text>
                <Text style={styles.modalCount}>{commentCount}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.dateArea}>{createdDate}</Text>
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
            <ScrollView horizontal={true}>
              {tags.map(tag => {
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
                댓글 ({commentCount})
              </Text>
            </View>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => navigation.push('댓글', comments)}>
              <Text style={styles.viewOption}>전체 보기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.commentWrapper}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 12}}>
                {commentCount ? comments[0].author : ''}
              </Text>
              <Text style={{marginLeft: 10}}>
                {commentCount ? comments[0].detail : ''}
              </Text>
            </View>
          </View>
          <View style={styles.commentInputWrapper}>
            <TextInput placeholder="댓글 달기" style={styles.commentInput} />
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
