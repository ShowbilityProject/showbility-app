import * as React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { requestFindEmail } from "../../../service/account";
import TextField from "./TextField";
import SubmitButton from "./SubmitButton";
import { normalizeFontSize } from "../../../component/font";
import { useNavigation } from "@react-navigation/native";
import { ActionButton } from "../../../component/atoms";

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  containerFound: {},
  scrollView: {
    paddingHorizontal: 15,
    paddingTop: 24,
  },
  details: {
    fontFamily: "JejuGothicOTF",
    fontSize: normalizeFontSize(16),
    paddingTop: 91,
    paddingBottom: 15,
  },
  buttonWrapper: {
    paddingHorizontal: 15,
    paddingBottom: 30,
    display: "flex",
    flexDirection: "row",
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export function FindEmailScreen() {
  const navigation = useNavigation();
  const [name, setName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const [email, setEmail] = React.useState("");

  const validateFields = React.useCallback(() => {
    return name.length > 0 && phoneNumber.length > 9;
  }, [name, phoneNumber]);

  const handleSubmit = () => {
    if (!validateFields()) return false;
    requestFindEmail(name, phoneNumber).then(res => {
      if (res?.data?.email) {
        setEmail(res.data.email);
      } else {
        alert("일치하는 계정이 없습니다. 다시 입력해주세요.");
      }
    });
  };

  const alert = message => Alert.alert("Alert", message, [{ text: "확인" }]);

  return (
    <TouchableWithoutFeedback>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={70}
      >
        {!email ? (
          <View style={styles.container}>
            <ScrollView
              style={styles.scrollView}
              keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            >
              <Text style={styles.details}>
                쇼빌리티 가입시 등록한 정보를 입력해주세요
              </Text>

              <TextField placeholder="이름" value={name} setValue={setName} />
              <TextField
                placeholder="전화번호"
                keyboardType="numeric"
                value={phoneNumber}
                setValue={v => setPhoneNumber(v.replace(/[^0-9]/g, ""))}
              />
            </ScrollView>
            <View style={styles.buttonWrapper}>
              <SubmitButton
                style={{ flex: 1 }}
                onPress={handleSubmit}
                disabled={!validateFields()}
              >
                이메일 찾기
              </SubmitButton>
            </View>
          </View>
        ) : (
          <View style={styles.containerFound}>
            <ScrollView
              style={styles.scrollView}
              keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            >
              <Text style={styles.details}>
                입력하신 정보와 일치하는 메일정보입니다
              </Text>

              <TextField placeholder="이메일" value={email} />
            </ScrollView>
            <View style={styles.buttonWrapper}>
              <ActionButton
                style={styles.button}
                onPress={() => navigation.navigate("Home", { email })}
              >
                로그인
              </ActionButton>
              <ActionButton
                secondary
                style={styles.button}
                onPress={() => navigation.navigate("비밀번호 찾기", { email })}
              >
                비밀번호 찾기
              </ActionButton>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
