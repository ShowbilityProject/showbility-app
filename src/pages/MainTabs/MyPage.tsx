import { bg, colors, flex, padding, round, size, text, w, h } from "@/styles";
import { Image } from "expo-image";
import { View, Text, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { bottomTabRoute } from "@/utils/navigation";
import { MyIcon, SettingsIcon } from "@/icons";
import { useQueryClient } from "@tanstack/react-query";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { loginStatus } from "@/api/user";

export const MyRoute = bottomTabRoute({
  screen: MyPage,
  options: {
    title: "마이",
    headerTitle: "",
    tabBarIcon: ({ focused, color }) => (
      <MyIcon width={24} height={24} filled={focused} color={color} />
    ),
    tabBarButton: InterceptLoginPress,
    headerRight: () => <SettingsIcon width={24} height={24} />,
  },
});

function InterceptLoginPress({ onPress, ...props }: BottomTabBarButtonProps) {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const promptLogin = () =>
    Alert.alert(
      "",
      "로그인을 해야 사용할 수 있는 서비스입니다.\n로그인 하시겠습니까?",
      [
        {
          text: "취소",
        },
        { text: "확인", onPress: () => navigation.navigate("Login") },
      ],
    );

  return (
    <Pressable
      {...props}
      onPress={(...props) =>
        queryClient
          .ensureQueryData({ ...loginStatus, staleTime: Infinity })
          .then(isLoggedIn =>
            isLoggedIn ? onPress?.(...props) : promptLogin(),
          )
      }
    />
  );
}

function MyPage() {
  return (
    <>
      <View
        style={[
          flex.y({ align: "center", gap: 12 }),
          padding.top(32),
          padding.bottom(20),
        ]}
      >
        <Image
          style={[size(64), round.full]}
          source="https://s3-alpha-sig.figma.com/img/dc91/d0be/7b8566430d728af74f88302c06664cec?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PVtsdSOlHuDThTRZxEwRc0BChe9sjY2zhNp1t4Qnl49z9mioi5CerC1rqBxHzYMJNeF5nISR11qnhumieyz3C3Z~fGzldRU2B5Vlgte0u0w~XJZDT3BDyP4B66GTUGk~dBur2tLkf2PZWf7lg05fUeOww5jj9LqAPOQIEjKxTo9jMf2gwwh18Q-sL-8K7EsAvoQmXjCC08Tm7QTZKrktkLhPfveRz-Ek1wgGQ~-zRJxnvyLdVezGMErK4tB640StM1DCqbLgq2zNIU2~XT9M0qIcB~NoqUkMqgoQsGTFUEWYp8ghsF42gbpkiyjGFZ~CfZYZZmxUBODYR3gl2Glt2w__"
        />
        <Text style={[text.h3]}>닉네임</Text>

        <View
          style={[
            flex.x({ justify: "space-evenly" }),
            w("100%"),
            padding.bottom(32),
          ]}
        >
          <NumericIndicator label="작품" value={1234} />
          <NumericIndicator label="작품" value={1234} />
          <NumericIndicator label="작품" value={1234} />
        </View>
      </View>
      <View style={[bg(colors.gray300), h(4), w("100%")]} />

      <View style={[padding.top(32), padding.x(20)]}>
        <Text style={text.h4}>소개</Text>
        <Text
          style={[text.body2, text.color(colors.gray800), padding.top(8)]}
          numberOfLines={5}
        >
          일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오
          일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오
          일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오
        </Text>
      </View>
    </>
  );
}

function NumericIndicator(props: { label: string; value: number }) {
  return (
    <View style={[flex.y({ align: "center", gap: 2 })]}>
      <Text style={text.caption1}>{props.label}</Text>
      <Text style={[text.h3, text.color(colors.primary)]}>
        {props.value.toLocaleString()}
      </Text>
    </View>
  );
}
