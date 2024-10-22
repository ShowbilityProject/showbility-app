import { CloseIcon } from "@/icons/CloseIcon";
import { StackPageProps } from "@/navigation";
import { colors, flex } from "@/styles";

import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ImageViewerPage({
  navigation,
  route: { params },
}: StackPageProps<"ImageViewer">) {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={[
        { flex: 1, backgroundColor: colors.black },
        flex.v({ justify: "center" }),
      ]}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top,
          right: 0,
          paddingVertical: 16,
          paddingHorizontal: 20,
        }}
        onPress={navigation.goBack}
      >
        <CloseIcon width={24} height={24} />
      </TouchableOpacity>
      <Image source={params.uri} style={{ aspectRatio: 1 }} />
    </View>
  );
}
