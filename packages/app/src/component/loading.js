import * as React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  loadingView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export function LoadingScreen({display}) {
  return (
    <View display={display} style={styles.loadingView}>
      <ActivityIndicator size={'large'} />
    </View>
  );
}
