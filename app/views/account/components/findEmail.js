import * as React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import TextField from "./TextField";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import SubmitButton from "./SubmitButton";
import {normalizeFontSize} from "../../../component/font";

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 15,
    paddingTop: 24,
  },
  details: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(16),
    paddingTop: 91,
    paddingBottom: 15,
  },
  buttonWrapper: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
});

export function FindEmailScreen() {
  const [name, setName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');


  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
          <Text style={styles.details}>쇼빌리티 가입시 등록한 정보를 입력해주세요</Text>

          <TextField
            placeholder='이름'
            value={name}
            setValue={setName}
          />
          <TextField
            placeholder='전화번호'
            keyboardType='numeric'
            value={phoneNumber}
            setValue={v => setPhoneNumber(v.replace(/[^0-9]/g, ''))}
          />

        </KeyboardAwareScrollView>
        <View style={styles.buttonWrapper}>
          <SubmitButton
            // onPress={() => setModalVisible(true)}
          >
            이메일 찾기
          </SubmitButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
