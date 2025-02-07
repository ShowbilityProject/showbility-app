import React, { useState } from "react";

import { colors, padding, round, bg, margin } from "@/styles";
import { text } from "@/styles/typography";
import { FlatList, ScrollView, Text, View } from "react-native";
import { Pressable } from "@/components";
import { useNavigation } from "@react-navigation/core";
import { createTabs } from "@/components/Tabs";
import { CategoryTabs } from "@/components/composed/CategoryTabs";

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

export function ZapTab() {
  const navigation = useNavigation();

  return (
    <>
      <CategoryTabs />

      <FlatList
        numColumns={2}
        data={categories}
        renderItem={({ item }) => (
          <Pressable
            style={{ flex: 1 / 2 }}
            onPress={() =>
              navigation.navigate("AbilityDetail", { title: item })
            }
          >
            <View
              style={[{ aspectRatio: 162 / 122 }, round.md, bg(colors.gray300)]}
            />
            <Text style={[padding.y(8), text.h4]}>{item}</Text>
          </Pressable>
        )}
        contentContainerStyle={[padding.x(20), padding.y(16), { gap: 8 }]}
        keyExtractor={(_, index) => index.toString()}
        columnWrapperStyle={{ gap: 11 }}
      />
    </>
  );
}
