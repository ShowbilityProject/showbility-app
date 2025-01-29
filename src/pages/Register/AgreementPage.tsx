import { PrefillCreateUser } from "@/api/auth";
import { Button } from "@/components";
import { stackRoute } from "@/utils/navigation";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";

export const AgreementRoute = stackRoute({
  screen: AgreementPage,
});

function AgreementPage({
  route: { params },
}: StaticScreenProps<{
  registerToken: string;
  prefill: PrefillCreateUser;
}>) {
  const navigation = useNavigation();
  return (
    <>
      <Text>대충 동의했다 침</Text>
      <Button
        onPress={() => navigation.navigate("Register.Info", { ...params })}
      >
        다음
      </Button>
    </>
  );
}
