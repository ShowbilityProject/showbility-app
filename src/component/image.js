import * as React from 'react';
import {Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  groupScreenImage: {
    width: 165,
    height: 124,
    aspectRatio: 1.3,
    alignSelf: 'center',
    marginBottom: 10,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  mainFeedImage: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 5,
  },
});

export function MainFeedImage({source}) {
  return <Image source={source} style={styles.mainFeedImage} />;
}

export function GroupImage({source}) {
  return <Image source={source} style={styles.groupScreenImage} />;
}

export const imageSources = {
  tab: {
    home: require('../../assets/imgs/tab_icons/home.png'),
    homeFocused: require('../../assets/imgs/tab_icons/home_focused.png'),
    search: require('../../assets/imgs/tab_icons/search.png'),
    searchFocused: require('../../assets/imgs/tab_icons/search_focused.png'),
    message: require('../../assets/imgs/tab_icons/message.png'),
    messageFocused: require('../../assets/imgs/tab_icons/message_focused.png'),
    myshowbil: require('../../assets/imgs/tab_icons/myshowbil.png'),
    myshowbilFocused: require('../../assets/imgs/tab_icons/myshowbil_focused.png'),
    upload: require('../../assets/imgs/tab_icons/upload.png'),
  },
};
