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
