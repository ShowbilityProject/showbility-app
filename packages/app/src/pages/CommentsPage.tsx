import { Input } from "@/components";
import { flexFill, padding } from "@/styles";
import { stackRoute } from "@/utils/navigation";
import { StaticScreenProps } from "@react-navigation/native";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CommentsRoute = stackRoute({
  screen: CommentsPage,
  options: { title: "댓글 15" },
});

function CommentsPage({}: StaticScreenProps<{ id: string }>) {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={flexFill}
      behavior="padding"
      keyboardVerticalOffset={top + bottom}
    >
      <ScrollView style={[flexFill]}></ScrollView>
      <View style={[padding.x(20), padding.bottom(bottom)]}>
        <Input placeholder="댓글을 입력해주세요" />
      </View>
    </KeyboardAvoidingView>
  );
}
