import { Button, Input } from "@/components";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import * as Kakao from "@react-native-seoul/kakao-login";

export function LoginPage() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Input placeholder="email" />
      <Input placeholder="password" />
      <Button onPress={() => navigation.goBack()}>그냥 로그인 테스트</Button>
      <Button
        onPress={async () => {
          try {
            const token = await Kakao.login();
            alert(JSON.stringify(token));
          } catch (e) {
            console.error("fail!", e);
          }
        }}
      >
        카카오 로그인
      </Button>
      <Button onPress={() => navigation.goBack()}>애플 로그인</Button>
      <Button variant="mono" onPress={() => navigation.goBack()}>
        닫기
      </Button>
    </View>
  );
}
