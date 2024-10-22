import { useNavigation } from "@react-navigation/native";
import { RefreshControl, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Pressable } from "@/components/Pressable";
import { flex } from "@/styles";

import { mockImages } from "@/mocks/images";

export function ShowbilityTab() {
  const navigation = useNavigation();

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          flex.v({ gap: 12 }),
          {
            paddingVertical: 16,
            paddingHorizontal: 20,
          },
        ]}
        refreshControl={<RefreshControl refreshing={false} />}
      >
        {mockImages.map((image, index) => (
          <Pressable
            key={index}
            style={{ borderRadius: 16, overflow: "hidden" }}
            onPress={() => navigation.navigate("ContentDetail", { id: "test" })}
          >
            <Image source={image} style={{ aspectRatio: 335 / 250 }} />
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
}
