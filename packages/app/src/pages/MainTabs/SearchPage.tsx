import { Input, Pressable } from "@/components";
import { FilterIcon, SearchIcon } from "@/icons";
import { mockImages } from "@/mocks/images";
import {
  flexFill,
  padding,
  h,
  flex,
  margin,
  round,
  colors,
  bg,
} from "@/styles";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useState } from "react";
import { SceneRendererProps, TabBar, TabView } from "react-native-tab-view";
import { CategoryTabs } from "@/components/composed/CategoryTabs";
import { bottomTabRoute } from "@/utils/navigation";

export const SearchRoute = bottomTabRoute({
  screen: SearchPage,
  options: {
    title: "검색",
    headerShown: false,
    tabBarIcon: ({ focused, color }) => (
      <SearchIcon width={24} height={24} filled={focused} color={color} />
    ),
  },
});

function SearchPage() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <SafeAreaView edges={["top"]} style={flexFill}>
      <View
        style={[
          h(56),
          padding.x(20),
          flex.x({ align: "center" }),
          margin.bottom(4),
        ]}
      >
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

      <CategoryTabs />

      <FlatList
        numColumns={2}
        data={Array(10).map(() => null)}
        renderItem={({ item }) => (
          <Pressable style={{ flex: 1 / 2 }} onPress={() => {}}>
            <View
              style={[{ aspectRatio: 162 / 122 }, round.md, bg(colors.gray300)]}
            />
          </Pressable>
        )}
        contentContainerStyle={[padding.x(20), padding.y(16), { gap: 10 }]}
        keyExtractor={(_, index) => index.toString()}
        columnWrapperStyle={{ gap: 10 }}
      />
    </SafeAreaView>
  );
}

function Images(
  props: SceneRendererProps & { route: { key: string; title: string } },
) {
  return (
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
      contentContainerStyle={[padding.x(20), padding.y(12), { gap: 8 }]}
      keyExtractor={(_, index) => index.toString()}
      columnWrapperStyle={{ gap: 11 }}
    />
  );
}
