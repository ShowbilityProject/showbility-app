import {Alert} from 'react-native';

const isEmpty = data => {
  if (
    data === undefined ||
    data === '' ||
    data === null ||
    data === 'undefined'
  ) {
    return true;
  }
  return false;
};

export {isEmpty};

export function askIfNotTokenValid(navigation) {
  return Alert.alert('로그인', '로그인 하시겠습니까?', [
    {
      text: '취소',
      onPress: () => null,
      style: 'cancel',
    },
    {text: 'OK', onPress: () => navigation.navigate('Login')},
  ]);
}

export function getUserImageFromUser(user) {
  if (isEmpty(user.profile_image))
    return require('../../assets/imgs/default_profile.png');
  else return {uri: user.small_image || user.profile_image};
}
