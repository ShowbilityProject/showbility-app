import { StackPageProps } from "@/navigation";
import { colors, flex } from "@/styles";

import { Image } from "expo-image";
import { View } from "react-native";

export function ImageViewerPage({
  route: { params },
}: StackPageProps<"ImageViewer">) {
  return (
    <View
      style={[
        { flex: 1, backgroundColor: colors.black },
        flex.v({ justify: "center" }),
      ]}
    >
      <Image source={params.uri} style={{ aspectRatio: 1 }} />
    </View>
  );
}
