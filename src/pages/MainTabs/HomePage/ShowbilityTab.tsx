import { useNavigation } from "@react-navigation/native";
import { Text, RefreshControl, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Pressable } from "@/components/Pressable";
import { bg, colors, flex, flexFill, h, margin, round, text } from "@/styles";

import { mockImages } from "@/mocks/images";
import { PlusIcon } from "@/icons/PlusIcon";
import { useEffect, useRef, useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { CirclePlusIcon } from "@/icons/CirclePlusIcon";

export function ShowbilityTab() {
  const navigation = useNavigation();
  const [expand, setExpand] = useState(true);

  const scrollRef = useRef(0);

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          flex.y({ gap: 12 }),
          {
            paddingVertical: 16,
            paddingHorizontal: 20,
          },
        ]}
        refreshControl={<RefreshControl refreshing={false} />}
        onScroll={e => {
          const { y } = e.nativeEvent.contentOffset;

          const delta = scrollRef.current - y;

          if (Math.abs(delta) < 100) return;

          setExpand(delta > 0);
          scrollRef.current = y;
        }}
        scrollEventThrottle={16}
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
      <FloatingActionButton expanded={expand} />
    </>
  );
}

interface Props {
  expanded: boolean;
}

function FloatingActionButton({ expanded }: Props) {
  const width = useSharedValue<number>(0);

  useEffect(() => {
    width.value = expanded ? 142 : 48;
  });

  const widthStyle = useAnimatedStyle(() => ({
    width: withTiming(width.value),
  }));

  return (
    <Pressable
      style={[
        h(48),
        widthStyle,
        bg(colors.primary),
        { position: "absolute", bottom: 16, right: 12 },
        round.full,
        // flex.x({ align: "center", justify: "flex-end" }),
      ]}
    >
      {expanded && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={[
            flex.x({ align: "center", justify: "center", gap: 4 }),
            flexFill,
          ]}
        >
          <Text style={[text.h4, text.color(colors.white), { width: 78 }]}>
            내 작품 올리기
          </Text>
          <CirclePlusIcon width={20} height={20} color={colors.white} />
        </Animated.View>
      )}

      {!expanded && (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <PlusIcon
            color={colors.white}
            width={20}
            height={20}
            style={margin(14)}
          />
        </Animated.View>
      )}
    </Pressable>
  );
}
