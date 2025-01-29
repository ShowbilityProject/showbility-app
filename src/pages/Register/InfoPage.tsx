import { PrefillCreateUser } from "@/api/auth";
import { registerUser } from "@/api/user";
import { Button, Input } from "@/components";
import { stackRoute } from "@/utils/navigation";
import { tokenStore } from "@/utils/tokenStore";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Text, TextInput } from "react-native";

export const InfoRoute = stackRoute({
  screen: InfoPage,
});

function InfoPage({
  route: {
    params: { prefill, registerToken },
  },
}: StaticScreenProps<{
  registerToken: string;
  prefill: PrefillCreateUser;
}>) {
  const navigation = useNavigation();

  const [name, setName] = useState(prefill.name ?? "");
  const [nickname, setNickname] = useState(prefill.nickname ?? "");

  return (
    <>
      <Text>이름</Text>

      <Input placeholder="이름" defaultValue={name} onChangeText={setName} />

      <Text>별명</Text>
      <Input
        placeholder="별명"
        defaultValue={nickname}
        onChangeText={setNickname}
      />

      <Button
        onPress={async () => {
          console.log({
            registerToken,
            user: {
              name,
              description: null,
              nickname,
              agreeRule: true,
              agreeMarketing: true,
              birth: "2003-01-15",
              gender: "male",
              profileImage: prefill.profileImage,
            },
          });

          try {
            const res = await registerUser({
              registerToken: registerToken,
              user: {
                name,
                description: null,
                nickname,
                agreeRule: true,
                agreeMarketing: true,
                birth: "2003-01-15",
                gender: "male",
                profileImage: prefill.profileImage ?? null,
              },
            });

            alert("가입 성공: " + JSON.stringify(res));

            tokenStore.setToken(res.token);
            navigation.navigate("MainTab", undefined, true);
          } catch (e) {
            alert("fail");
          }
        }}
      >
        다음
      </Button>
    </>
  );
}
