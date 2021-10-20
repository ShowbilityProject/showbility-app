import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Alert,
} from 'react-native';
import {isEmpty} from '../../../common/util';
import {requestSignIn} from '../../../service/account';

const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'JejuGothicOTF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContaier: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'JejuGothicOTF',
    // backgroundColor: 'yellow'
  },
  buttonsContainer: {
    flex: 1.3,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'green'
  },
  accountContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  joinContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontSize: 30,
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    fontSize: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    width: '90%',
    height: '80%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DDDDDD',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinScreen: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 30,
  },
  textinput: {
    fontFamily: 'JejuGothicOTF',
    width: '90%',
    height: 60,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 17,
  },
  circle: {
    height: 26,
    width: 26,
    borderRadius: 26 / 2,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    marginRight: 10,
  },
});

function EmailLoginScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const validateInput = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let minPasswordLengthLimit = 4;
    return reg.test(email) && password.length > minPasswordLengthLimit;
  };

  const handleButtonStyle = () => {
    if (validateInput()) return {backgroundColor: '#F85B02'};
    else return {backgroundColor: '#F7F7F7'};
  };
  const handleButtonTextStyle = () => {
    if (validateInput()) return {fontSize: 17, color: 'white'};
    else return {fontSize: 17, color: 'black'};
  };
  const handleEmailChange = value => {
    setEmail(value);
  };
  const handlePasswordChange = value => {
    setPassword(value);
  };
  const handleLogin = () => {
    if (isEmpty(email) || isEmpty(password)) return false;
    requestSignIn(email, password).then(ret => {
      if(ret) navigation.navigate('App');
      else Alert.alert('로그인 실패', '아이디와 비밀번호를 확인하세요.');
    });
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
      }}>
      <TextInput
        style={styles.textinput}
        placeholder="이메일"
        keyboardType="email-address"
        textContentType="emailAddress"
        onChangeText={handleEmailChange}
      />
      <TextInput
        style={styles.textinput}
        placeholder="비밀번호"
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
      />
      <TouchableHighlight
        style={[
          styles.flexCenter,
          styles.fontStyle,
          {width: '90%', height: 52, borderRadius: 5},
          handleButtonStyle(),
        ]}
        onPress={handleLogin}>
        <Text style={handleButtonTextStyle()}>로그인</Text>
      </TouchableHighlight>
    </View>
  );
}

export default EmailLoginScreen;
