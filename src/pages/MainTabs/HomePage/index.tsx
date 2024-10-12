import { TabPageProps } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { ShowbilityTab } from "./ShowbilityTab";
import { AbilityTab } from "./AbilityTab";
import { colors } from "@/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { FilterIcon } from "@/icons/FilterIcon";

const routes = [
  { key: "showbility", title: "쇼빌리티" },
  { key: "ability", title: "어빌리티" },
];

const renderScene = SceneMap({
  showbility: ShowbilityTab,
  ability: AbilityTab,
});

export function HomePage(props: TabPageProps<"Home">) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <TabView
        navigationState={{ index: tabIndex, routes }}
        onIndexChange={setTabIndex}
        renderScene={renderScene}
        renderTabBar={props => (
          <TabBar
            style={{
              backgroundColor: "transparent",
              paddingHorizontal: 20,
              borderBottomColor: colors.gray300,
              borderBottomWidth: 0.4,
              marginTop: 20,
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
            indicatorContainerStyle={{ marginHorizontal: 20 }}
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
        )}
      />
    </SafeAreaView>
  );
}
