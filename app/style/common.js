import {StyleSheet} from 'react-native';
import {Color} from './colors';

const commonStyles = StyleSheet.create({
  appFont: {
    fontFamily: 'JejuGothicOTF',
  },
  appFont2: {
    fontFamily: 'SF-Pro-Text-Medium',
  },
});

export const StackScreenOptions = {
  headerTintColor: Color.black,
  headerStyle: {
    backgroundColor: Color.white,
  },
  backgroundColor: Color.white,
};
