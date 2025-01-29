import { Button, Input } from "@/components";
import { View } from "react-native";
import * as Kakao from "@react-native-seoul/kakao-login";
import { authenticateKakao } from "@/api/auth";
import { useNavigation } from "@react-navigation/native";
import { useLoading } from "@/hooks/useLoading";
import { stackRoute } from "@/utils/navigation";
import { TransitionPresets } from "@react-navigation/stack";
import { useQueryClient } from "@tanstack/react-query";
import { loginStatus } from "@/api/user";
import { tokenStore } from "@/utils/tokenStore";

export const LoginRoute = stackRoute({
  screen: LoginPage,
  options: {
    headerShown: false,
    gestureEnabled: false,
    ...TransitionPresets.ModalSlideFromBottomIOS,
  },
});

function LoginPage() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { isLoading, loadingFn } = useLoading();

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Input placeholder="email" />
      <Input placeholder="password" />
      <Button onPress={() => navigation.goBack()}>그냥 로그인 테스트</Button>
      <Button
        onPress={loadingFn(async () => {
          try {
            const { accessToken } = await Kakao.login();

            const res = await authenticateKakao(accessToken);

            if (res.isRegistered) {
              await tokenStore.setToken(res.token);
              queryClient.invalidateQueries(loginStatus);

              navigation.popTo("MainTab");
              return;
            }

            navigation.navigate("Register.Agreement", {
              registerToken: res.registerToken,
              prefill: res.prefill,
            });
          } catch (e) {
            console.error("fail!", e);
          }
        })}
      >
        {isLoading ? "로그인 중" : "카카오 로그인"}
      </Button>
      <Button onPress={() => navigation.goBack()}>애플 로그인</Button>
      <Button variant="mono" onPress={() => navigation.goBack()}>
        닫기
      </Button>
    </View>
  );
}
