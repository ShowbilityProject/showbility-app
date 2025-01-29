import { ReactNode, useState } from "react";
import { ShowbilityTab } from "./ShowbilityTab";
import { ZapTab } from "./ZapTab";
import { SafeAreaView } from "react-native-safe-area-context";
import { createTabs } from "@/components/Tabs";
import { ZapIcon } from "@/icons/ZapIcon";
import { Text } from "react-native";
import { colors, padding, text } from "@/styles";
import { bottomTabRoute } from "@/utils/navigation";
import { HomeIcon } from "@/icons";

export const HomeRoute = bottomTabRoute({
  screen: HomePage,
  options: {
    title: "홈",
    headerShown: false,
    tabBarIcon: ({ focused, color }) => (
      <HomeIcon width={24} height={24} filled={focused} color={color} />
    ),
  },
});

type TabNames = "showbility" | "zap";
const Tabs = createTabs<TabNames>();

function HomePage() {
  const [tab, setTab] = useState<TabNames>("showbility");

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Tabs value={tab} onChange={setTab} style={padding.x(12)}>
        <HomeTabItem value="showbility">{() => "쇼빌리티"}</HomeTabItem>
        <HomeTabItem value="zap">
          {color => (
            <>
              ZAP
              <ZapIcon color={color} />
            </>
          )}
        </HomeTabItem>
      </Tabs>

      {tab === "showbility" && <ShowbilityTab />}
      {tab === "zap" && <ZapTab />}
    </SafeAreaView>
  );
}

const HomeTabItem = ({
  value,
  children,
}: {
  value: TabNames;
  children: (color: string) => ReactNode;
}) => (
  <Tabs.Item value={value} style={[padding.x(8), padding.y(14)]}>
    {isActive => {
      const color = isActive ? colors.black : colors.gray500;
      return (
        <Text
          style={[
            text.custom({ size: 22, lineHeight: 28, weight: 600 }),
            { color },
          ]}
        >
          {children(color)}
        </Text>
      );
    }}
  </Tabs.Item>
);
