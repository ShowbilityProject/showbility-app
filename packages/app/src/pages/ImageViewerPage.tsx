import { CloseIcon } from "@/icons/CloseIcon";
import { colors, flex } from "@/styles";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";

import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ImageViewerPage({
  route: { params },
}: StaticScreenProps<{ uri: string }>) {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={[
        { flex: 1, backgroundColor: colors.black },
        flex.y({ justify: "center" }),
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
