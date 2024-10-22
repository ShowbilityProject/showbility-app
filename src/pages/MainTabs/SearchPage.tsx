import { Input } from "@/components";
import { FilterIcon } from "@/icons";
import { mockImages } from "@/mocks/images";
import { TabPageProps } from "@/navigation/types";
import { flexFill, padding, h, flex, margin, round } from "@/styles";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

export function SearchPage(props: TabPageProps<"Search">) {
  return (
    <SafeAreaView edges={["top"]} style={flexFill}>
      <View style={[h(56), padding.x(20), flex.x({ align: "center" })]}>
        <Input
          variant="filled"
          placeholder="이것은 아직 작업중인 텍스트필드입니다"
          style={flexFill}
        />
        <TouchableOpacity
          onPress={() => {}}
          style={[padding(12), margin.right(-12)]}
        >
          <FilterIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        numColumns={2}
        data={[
          ...mockImages,
          ...mockImages,
          ...mockImages,
          // ...mockImages
        ]}
        renderItem={({ item }) => (
          <Image
            source={item}
            style={[
              {
                aspectRatio: 162 / 122,
                flex: 1 / 2,
                // width: 100,
              },
              round.md,
            ]}
          />
        )}
        contentContainerStyle={[padding.x(20), padding.y(16), { gap: 8 }]}
        keyExtractor={(_, index) => index.toString()}
        columnWrapperStyle={{ gap: 11 }}
      />
    </SafeAreaView>
  );
}
