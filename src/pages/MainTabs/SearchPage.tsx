import { Input } from "@/components";
import { FilterIcon } from "@/icons";
import { mockImages } from "@/mocks/images";
import { TabPageProps } from "@/navigation/types";
import { flexFill, padding, h, flex, margin, round, colors } from "@/styles";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useState } from "react";
import { SceneRendererProps, TabBar, TabView } from "react-native-tab-view";

export function SearchPage(props: TabPageProps<"Search">) {
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

      <TabView
        navigationState={{
          index: tabIndex,
          routes: [
            { key: "showbility", title: "쇼빌리티" },
            { key: "ability", title: "어빌리티" },
          ],
        }}
        onIndexChange={setTabIndex}
        renderScene={Images}
        renderTabBar={props => (
          <View
            style={[
              padding.x(20),
              {
                borderBottomColor: colors.gray300,
                borderBottomWidth: 0.5,
              },
            ]}
          >
            <TabBar
              style={{
                paddingTop: 16,
                backgroundColor: "transparent",
              }}
              gap={16}
              contentContainerStyle={{
                position: "relative",
              }}
              tabStyle={{
                width: "auto",
                padding: 4,
                minHeight: 0,
              }}
              // indicatorContainerStyle={{ marginHorizontal: 20 }}
              activeColor="black"
              inactiveColor="grey"
              labelStyle={{
                margin: 0,
                fontSize: 20,
                fontWeight: 700,
                lineHeight: 28,
              }}
              indicatorStyle={{
                backgroundColor: "black",
                height: 2,
                bottom: -1,
                // left: 20,
              }}
              {...props}
            />
          </View>
        )}
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
