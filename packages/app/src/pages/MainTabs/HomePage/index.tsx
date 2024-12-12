import { useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { ShowbilityTab } from "./ShowbilityTab";
import { AbilityTab } from "./AbilityTab";
import { colors } from "@/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, View } from "react-native";
import { FilterIcon } from "@/icons";
import { flex, padding } from "@/styles";

export function HomePage() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <TabView
        navigationState={{
          index: tabIndex,
          routes: [
            { key: "showbility", title: "쇼빌리티" },
            { key: "ability", title: "어빌리티" },
          ],
        }}
        onIndexChange={setTabIndex}
        renderScene={SceneMap({
          showbility: ShowbilityTab,
          ability: AbilityTab,
        })}
        renderTabBar={props => (
          <View
            style={[
              flex.x({ align: "center" }),
              padding.x(20),
              {
                borderBottomColor: colors.gray300,
                borderBottomWidth: 0.5,
              },
            ]}
          >
            <TabBar
              style={{
                flex: 1,
                height: 56,
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
            <TouchableOpacity>
              <FilterIcon width={24} height={24} />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
