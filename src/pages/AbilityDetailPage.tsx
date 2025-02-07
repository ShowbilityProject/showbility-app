import { Input } from "@/components";
import { Text, View } from "react-native";
import { padding, text } from "@/styles";
import { StaticScreenProps } from "@react-navigation/native";
import { stackRoute } from "@/utils/navigation";

export const AbilityDetailRoute = stackRoute({
  screen: AbilityDetailPage,
});

function AbilityDetailPage({
  route: { params },
}: StaticScreenProps<{
  title: string;
}>) {
  return (
    <View style={[padding(20)]}>
      <Text style={[text.h3, padding.bottom(12)]}>
        어떤 작품이 궁금하신가요?
      </Text>
      <Input variant="filled" placeholder="#태그를 검색해보세요" />
    </View>
  );
}
