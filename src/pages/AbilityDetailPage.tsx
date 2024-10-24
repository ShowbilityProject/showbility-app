import { Input } from "@/components";
import { StackPageProps } from "@/navigation";
import { Text, View } from "react-native";
import { padding, text } from "@/styles";

export function AbilityDetailPage({
  route: { params },
}: StackPageProps<"AbilityDetail">) {
  return (
    <View style={[padding(20)]}>
      <Text style={[text.h3, padding.bottom(12)]}>
        어떤 작품이 궁금하신가요?
      </Text>
      <Input variant="filled" placeholder="#태그를 검색해보세요" />
    </View>
  );
}
