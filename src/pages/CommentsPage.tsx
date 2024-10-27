import { Input } from "@/components";
import { flexFill, padding } from "@/styles";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function CommentsPage() {
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
