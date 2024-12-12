import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
// import Modal from "react-native-modal";

import { isEmpty } from "../../../common/util";
import { normalizeFontSize } from "../../../component/font";
import { Color } from "../../../style/colors";

import {
  ActionButton,
  Anchor,
  CheckBox,
  Input,
  Spacer,
} from "../../../component/atoms";
import { useInput } from "../../../common/hooks";
import {
  requestDuplicateEmailCheck,
  requestDuplicateNicknameCheck,
  requestSignIn,
  requestSignUp,
} from "../../../service/account";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 15,
    paddingTop: 24,
    paddingBottom: 10,
  },
  agreeText: {
    fontFamily: "JejuGothicOTF",
    fontSize: normalizeFontSize(17),
    lineHeight: 18,
    letterSpacing: 0.1,
    marginLeft: 10,
  },
  smallAgreeText: {
    fontFamily: "JejuGothicOTF",
    fontSize: normalizeFontSize(15),
    lineHeight: 18,
    letterSpacing: 0.1,
    marginLeft: 10,
    flexDirection: "row",
  },
  allAgreeWrapper: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 20,
  },
  agreeWrapper: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },
  buttonWrapper: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  buttonStyle: {
    width: "100%",
    height: 52,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  joinConfirmText: {
    fontFamily: "JejuGothicOTF",
    fontSize: normalizeFontSize(17),
  },
  termsText: {
    fontFamily: "JejuGothicOTF",
    fontSize: normalizeFontSize(11),
    color: Color.veryLightPink,
    textAlign: "center",
    lineHeight: 18,
    paddingTop: 27,
    paddingBottom: 20,
  },
  modalWrapper: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Color.veryLightPink,
  },
});

export function JoinScreen() {
  const navigation = useNavigation();

  const name = useInput();
  const phoneNumber = useInput({ numeric: true });
  const email = useInput();
  const password = useInput();
  const passwordCheck = useInput();
  const nickname = useInput();

  const [agreedRule, setAgreedRule] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const [uniqueEmail, setUniqueEmail] = useState<boolean | null>(null);
  const [uniqueNickname, setUniqueNickname] = useState<boolean | null>(null);

  const emailError = useMemo(() => {
    if (isEmpty(email.value)) return;
    const emailRegex = /^[A-Za-z0-9_.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (!emailRegex.test(email.value)) return "이메일 형식을 확인해 주세요";
    if (uniqueEmail === false) return "이미 가입된 이메일입니다";
  }, [email.value, uniqueEmail]);

  const passwordError = useMemo(() => {
    if (isEmpty(password.value)) return;
    const isValid =
      password.value.length >= 10 &&
      /[0-9]/g.test(password.value) &&
      /[a-zA-Z]/g.test(password.value) &&
      /[!@#$%^&*\-_]/g.test(password.value);
    if (!isValid) return "영문 + 숫자 + 특수문자 포함 10자 이상 입력해주세요";
  }, [password.value]);

  const passwordCheckError = useMemo(() => {
    if (isEmpty(passwordCheck.value)) return;
    if (password.value !== passwordCheck.value)
      return "비밀번호가 일치하지 않습니다";
  }, [password.value, passwordCheck.value]);

  const nicknameError = useMemo(() => {
    if (isEmpty(nickname.value)) return;
    if (uniqueNickname === false) return "이미 사용중인 닉네임입니다";
  }, [nickname.value, uniqueNickname]);

  const invalidInput = useMemo(
    () =>
      !!(
        [
          name.value,
          phoneNumber.value,
          email.value,
          password.value,
          passwordCheck.value,
          nickname.value,
        ].some(isEmpty) ||
        emailError ||
        !uniqueEmail ||
        passwordError ||
        passwordCheckError ||
        nicknameError ||
        !uniqueNickname
      ),
    [
      name.value,
      phoneNumber.value,
      email.value,
      password.value,
      passwordCheck.value,
      nickname.value,
      emailError,
      uniqueEmail,
      passwordError,
      passwordCheckError,
      nicknameError,
      uniqueNickname,
    ],
  );

  const checkUniqueEmail = useCallback(() => {
    requestDuplicateEmailCheck(email.value).then(setUniqueEmail).catch(alert);
  }, [email.value]);
  const checkUniqueNickname = useCallback(() => {
    requestDuplicateNicknameCheck(nickname.value)
      .then(setUniqueNickname)
      .catch(alert);
  }, [nickname.value]);

  const signUp = useCallback(async () => {
    try {
      await requestSignUp(
        nickname.value,
        email.value,
        password.value,
        agreedRule,
        agreeMarketing,
      );

      await requestSignIn(email.value, password.value);

      // TODO
      // @ts-ignore
      navigation.navigate("App");
      setModalVisible(false);
    } catch (e) {
      alert(e);
    }
  }, [nickname.value, email.value, password.value, agreedRule, agreeMarketing]);

  useEffect(() => setUniqueEmail(null), [email.value]);
  useEffect(() => setUniqueNickname(null), [nickname.value]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={70}
      >
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Input placeholder="이름" {...name} />
            <Input placeholder="전화번호" {...phoneNumber} />
            <Input placeholder="이메일" error={emailError} {...email}>
              <Input.Button
                onPress={checkUniqueEmail}
                disabled={!email.value || !!emailError || !!uniqueEmail}
              >
                {uniqueEmail ? "확인완료" : "중복확인"}
              </Input.Button>
            </Input>
            <Input
              placeholder="비밀번호"
              error={passwordError}
              secureTextEntry
              {...password}
            />
            <Input
              placeholder="비밀번호 확인"
              error={passwordCheckError}
              secureTextEntry
              {...passwordCheck}
            />
            <Input placeholder="별명" error={nicknameError} {...nickname}>
              <Input.Button
                onPress={checkUniqueNickname}
                disabled={
                  !nickname.value || !!nicknameError || !!uniqueNickname
                }
              >
                {uniqueNickname ? "확인완료" : "중복확인"}
              </Input.Button>
            </Input>

            <Spacer y={50} />
          </ScrollView>

          <View style={styles.buttonWrapper}>
            <ActionButton
              disabled={invalidInput}
              onPress={() => setModalVisible(true)}
            >
              회원가입
            </ActionButton>
          </View>

          {/* <Modal */}
          {/*   style={styles.modalWrapper} */}
          {/*   backdropOpacity={0.4} */}
          {/*   isVisible={isModalVisible} */}
          {/*   onBackdropPress={() => setModalVisible(false)} */}
          {/* > */}
          {/*   <View style={styles.modal}> */}
          {/*     <View style={[styles.allAgreeWrapper, styles.borderBottom]}> */}
          {/*       <CheckBox */}
          {/*         checked={agreedRule && agreeMarketing} */}
          {/*         toggle={[setAgreedRule, setAgreeMarketing]} */}
          {/*       /> */}
          {/*       <Text style={styles.agreeText}>서비스 이용약관 전체 동의</Text> */}
          {/*     </View> */}
          {/*     <View style={[styles.agreeWrapper, { marginTop: 20 }]}> */}
          {/*       <CheckBox checked={agreedRule} toggle={setAgreedRule} /> */}
          {/*       <Text style={styles.smallAgreeText}> */}
          {/*         [필수] 이용약관 및 개인정보 처리방침 */}
          {/*       </Text> */}
          {/*     </View> */}
          {/*     <View style={styles.agreeWrapper}> */}
          {/*       <CheckBox checked={agreeMarketing} toggle={setAgreeMarketing} /> */}
          {/*       <Text style={styles.smallAgreeText}> */}
          {/*         [선택] 마케팅 정보 수집 및 수신 동의 */}
          {/*       </Text> */}
          {/*     </View> */}
          {/*     <Text style={styles.termsText}> */}
          {/*       당신의 재능 활동은 연결된 계정에 노출되지 않습니다.{"\n"} */}
          {/*       회원가입시 개인정보 처리방침과 이용약관을 확인하였으며, */}
          {/*       동의합니다. */}
          {/*     </Text> */}
          {/**/}
          {/*     <ActionButton onPress={signUp}>회원가입</ActionButton> */}
          {/*   </View> */}
          {/* </Modal> */}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
