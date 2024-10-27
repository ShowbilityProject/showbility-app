import { colors, padding, round, bg } from "@/styles";
import { text } from "@/styles/typography";
import { FlatList, Text, View } from "react-native";
import { Pressable } from "@/components";
import { useNavigation } from "@react-navigation/core";

const abilities = [
  "시각 디자인",
  "일러스트레이션",
  "제품 디자인",
  "포토그래피",
  "UX/UI",
  "기타",
];

export function AbilityTab() {
  const navigation = useNavigation();

  return (
    <>
      <FlatList
        numColumns={2}
        data={abilities}
        renderItem={({ item }) => (
          <Pressable
            style={{ flex: 1 / 2 }}
            onPress={() =>
              navigation.navigate("AbilityDetail", { title: item })
            }
          >
            <View
              style={[{ aspectRatio: 162 / 122 }, round.md, bg(colors.gray300)]}
            />
            <Text style={[padding.y(8), text.h4]}>{item}</Text>
          </Pressable>
        )}
        contentContainerStyle={[padding.x(20), padding.y(16), { gap: 8 }]}
        keyExtractor={(_, index) => index.toString()}
        columnWrapperStyle={{ gap: 11 }}
      />
    </>
  );
}
