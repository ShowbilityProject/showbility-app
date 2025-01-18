import { useState } from "react";
import { ShowbilityTab } from "./ShowbilityTab";
import { AbilityTab } from "./AbilityTab";
import { SafeAreaView } from "react-native-safe-area-context";
import { createTabs } from "@/components/Tabs";
import { ZapIcon } from "@/icons/ZapIcon";

type TabNames = "showbility" | "zap";
const Tabs = createTabs<TabNames>();

export function HomePage() {
  const [tab, setTab] = useState<TabNames>("showbility");

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Tabs value={tab} onChange={setTab}>
        <Tabs.Item value="showbility">쇼빌리티</Tabs.Item>
        <Tabs.Item value="zap">
          {color => (
            <>
              ZAP
              <ZapIcon color={color} />
            </>
          )}
        </Tabs.Item>
      </Tabs>

      {tab === "showbility" && <ShowbilityTab />}
      {tab === "zap" && <AbilityTab />}
    </SafeAreaView>
  );
}
