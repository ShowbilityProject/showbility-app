import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function NewUploadTab() {
  return (
    <View style={[styles.flexCenter, styles.container]}>
      <Text>NewUploadTab</Text>
    </View>
  );
}

export default NewUploadTab;
