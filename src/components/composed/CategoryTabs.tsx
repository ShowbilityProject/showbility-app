import { colors, padding, margin, text } from "@/styles";
import { Text, ScrollView } from "react-native";
import { createTabs } from "../Tabs";
import { useState } from "react";

const categories = [
  "브랜딩",
  "회화",
  "일러스트",
  "사진",
  "그래픽",
  "UI/UX",
  "건축",
  "패션",
  "제품",
  "공예",
  "조형예술",
  "기타",
];
const Tabs = createTabs<string>();

export function CategoryTabs() {
  const [category, setCategory] = useState(categories[0]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        flexShrink: 0,
        borderBottomColor: colors.gray200,
        borderBottomWidth: 1,
      }}
      contentContainerStyle={padding.x(20)}
    >
      <Tabs
        value={category}
        onChange={setCategory}
        style={[margin.bottom(-1), { gap: 12 }]}
      >
        {categories.map(category => (
          <Tabs.Item
            value={category}
            style={isActive => [
              padding.x(6),
              padding.y(12),
              isActive && {
                borderBottomColor: colors.black,
                borderBottomWidth: 2,
              },
            ]}
          >
            {isActive => (
              <Text
                style={[
                  text.h3,
                  text.color(isActive ? colors.black : colors.gray600),
                ]}
              >
                {category}
              </Text>
            )}
          </Tabs.Item>
        ))}
      </Tabs>
    </ScrollView>
  );
}
