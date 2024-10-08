import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Platform,
} from "react-native";
import {
  requestLoginApple,
  requestLoginKakao,
  requestSignIn,
  verifyToken,
} from "../../../service/account";
import { login } from "@react-native-seoul/kakao-login";
import { Color } from "../../../style/colors";
import { normalizeFontSize } from "../../../component/font";
import TextField from "./TextField";
import SubmitButton from "./SubmitButton";
import * as AppleAuthentication from "expo-apple-authentication";

import { Spacer, Input, ActionButton } from "../../../component/atoms";
import { useInput } from "../../../common/hooks";
import { useCallback, useMemo } from "react";

const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: "JejuGothicOTF",
  },
  container: {
    height: Dimensions.get("window").height,
    backgroundColor: Color.white,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    paddingHorizontal: 30,
    gap: 10,
  },
  accountContainer: {
    flexBasis: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  buttonsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  accountTextWrapper: {
    flex: 1,
    alignItems: "center",
    borderRightWidth: 1,
  },
  accountText: {
    fontFamily: "JejuGothicOTF",
    fontSize: normalizeFontSize(14),
  },
  verticalBar: {
    height: 16,
    width: 1,
    borderRightWidth: 1,
  },
  icon: {
    height: 60,
    width: 60,
  },
  clickableText: {
    fontFamily: "JejuGothicOTF",
    fontSize: normalizeFontSize(14),
    color: Color.veryLightPink,
    textDecorationLine: "underline",
  },
});

function LoginScreen({ route }) {
  const kakao_icon = "../../../../assets/imgs/login/kakao_login_circle.png";
  const apple_icon = "../../../../assets/imgs/login/apple_login_circle.png";
  const showbility_icon = require("../../../../assets/imgs/showbility.png");
  const navigation = useNavigation();

  const email = useInput();
  const password = useInput();

  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");

  const validateInputs = React.useCallback(() => {
    return email.length > 0 && password.length > 0;
  }, [email, password]);

  const invalidInput = useMemo(
    () => !email.value || !password.value,
    [email.value, password.value],
  );

  React.useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
      navigation.setParams({
        email: "",
      });
    }
  }, [route.params?.email]);

  React.useEffect(() => {
    verifyToken().then(res => {
      if (res) {
        console.log("Current token is valid, move to app");
        navigation.navigate("App");
      }
    });
  }, []);

  const signInWithKakao = async () => {
    try {
      const token = await login();
      let ret = await requestLoginKakao(token);
      if (ret) navigation.navigate("App");
      else Alert.alert("로그인 실패", "문제가 발생하였습니다.");
    } catch (err) {
      // console.error(err);
      Alert.alert("로그인 실패", "취소되었습니다.");
    }
  };

  const signInWithApple = async () => {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const res = await requestLoginApple(credentials);
      if (!res) Alert.alert("로그인 실패", "문제가 발생하였습니다.");

      navigation.navigate("App");
    } catch (e) {
      Alert.alert("로그인 실패", "Apple 로그인에 실패하였습니다.");
    }
  };

  const handleSubmit = useCallback(async () => {
    if (invalidInput) return false;
    else {
      let ret = await requestSignIn(email.value, password.value);
      if (!ret) Alert.alert("로그인 오류", "이메일과 비밀번호를 확인해주세요.");
      else {
        navigation.replace("App");
      }
    }
  }, [email.value, password.value, invalidInput, navigation]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar barStyle={"dark-content"} />

        <Spacer y={137} />

        <View style={styles.centerContainer}>
          <Text
            style={{
              fontFamily: "JejuGothicOTF",
              fontSize: normalizeFontSize(16),
              marginBottom: 10,
            }}
          >
            세상에 너의 재능을 보여줘!
          </Text>
          <Image
            style={{ marginStart: 56, marginEnd: 55, resizeMode: "contain" }}
            source={showbility_icon}
          />
        </View>

        <Spacer y={23} />

        <View style={styles.loginContainer}>
          <Input placeholder="이메일" {...email} />
          <Input placeholder="비밀번호" secureTextEntry {...password} />
          <ActionButton onPress={handleSubmit} disabled={invalidInput}>
            로그인
          </ActionButton>
          <ActionButton
            onPress={() => navigation.navigate("회원가입")}
            secondary
          >
            회원가입
          </ActionButton>
        </View>

        <Spacer y={40} />

        {/*<View style={styles.accountContainer}>*/}
        {/*  <Pressable*/}
        {/*    style={styles.accountTextWrapper}*/}
        {/*    onPress={() => navigation.navigate("이메일 찾기")}*/}
        {/*  >*/}
        {/*    <Text style={styles.accountText}>이메일 찾기</Text>*/}
        {/*  </Pressable>*/}
        {/*  <Pressable*/}
        {/*    style={[styles.accountTextWrapper, {flex: 1.2}]}*/}
        {/*    onPress={() => navigation.navigate("비밀번호 찾기")}*/}
        {/*  >*/}
        {/*    <Text style={styles.accountText}>계정정보 찾기</Text>*/}
        {/*  </Pressable>*/}
        {/*  <Pressable*/}
        {/*    style={[styles.accountTextWrapper, { borderRightWidth: 0 }]}*/}
        {/*    onPress={() => navigation.navigate("회원가입")}*/}
        {/*  >*/}
        {/*    <Text style={styles.accountText}>회원가입</Text>*/}
        {/*  </Pressable>*/}
        {/*</View>*/}
        {/**/}
        {/*<Spacer y={50} />*/}

        <View style={styles.buttonsContainer}>
          <Text
            style={[
              styles.clickableText,
              { paddingBottom: 20, textDecorationLine: "none" },
            ]}
          >
            SNS 간편 로그인
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              onPress={signInWithKakao}
              style={{ paddingHorizontal: 25 }}
            >
              <Image style={styles.icon} source={require(kakao_icon)} />
            </Pressable>
            {Platform.OS === "ios" && (
              <Pressable
                onPress={signInWithApple}
                style={{ paddingHorizontal: 25 }}
              >
                <Image style={styles.icon} source={require(apple_icon)} />
              </Pressable>
            )}
          </View>
          <Text
            style={[styles.clickableText, { paddingTop: 30 }]}
            onPress={() => navigation.navigate("App")}
          >
            로그인 전 둘러보기
          </Text>
        </View>

        <Spacer y={132} />

        {/*<View style={styles.footerContainer}>*/}
        {/*  <Text style={styles.privacyText}>*/}
        {/*    당신의 재능 활동은 연결된 계정에 노출되지 않습니다.*/}
        {/*  </Text>*/}
        {/*  <Text style={styles.privacyText}>*/}
        {/*    회원가입시{' '}*/}
        {/*    <Text*/}
        {/*      style={{color: Color.vividBlue}}*/}
        {/*      onPress={() =>*/}
        {/*        navigation.push('Privacy', {title: '개인정보 처리방침'})*/}
        {/*      }>*/}
        {/*      개인정보 처리방침*/}
        {/*    </Text>*/}
        {/*    과{' '}*/}
        {/*    <Text*/}
        {/*      style={{color: Color.vividBlue}}*/}
        {/*      onPress={() => navigation.push('Privacy', {title: '이용약관'})}>*/}
        {/*      이용약관*/}
        {/*    </Text>*/}
        {/*    을 확인하였으며, 동의합니다.*/}
        {/*  </Text>*/}
        {/*</View>*/}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;
