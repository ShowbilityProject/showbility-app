import React from "react";

import {
  colors,
  flex,
  bg,
  size,
  round,
  padding,
  flexFill,
  text,
  h,
  margin,
} from "@/styles";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import {
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { mockImages } from "@/mocks/images";
import { useState } from "react";
import { CommentIcon, LikeIcon } from "@/icons";
import { stackRoute } from "@/utils/navigation";

const TOP_AREA = 190;

export const ContentDetailRoute = stackRoute({
  screen: ContentDetailPage,
  options: { title: "작품" },
});

function ContentDetailPage({
  route: {
    params: { id },
  },
}: StaticScreenProps<{
  id: string;
}>) {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          flex.y({ gap: 4 }),
          { paddingBottom: 190 },
          bg(colors.gray200),
        ]}
      >
        {mockImages.map((image, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => navigation.navigate("ImageViewer", { uri: image })}
          >
            <Image source={image} style={{ aspectRatio: 1 }} />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
      <BottomSheet
        // ref={bottomSheetRef}
        // onChange={handleSheetChanges}
        snapPoints={[TOP_AREA, "92%"]}
        handleIndicatorStyle={[bg(colors.gray300)]}
        backgroundStyle={[
          {
            borderRadius: 24,
          },
        ]}
      >
        <BottomSheetView style={[flexFill, padding.top(8), padding.x(24)]}>
          <View style={[flex.y({ gap: 16 }), h(TOP_AREA - 32)]}>
            <View style={[flex.x({ align: "center", gap: 8 })]}>
              <Image style={[size(24), round.full, bg(colors.gray300)]} />
              <Text style={text.h4}>이쇼빌</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={[text.h4, text.color(colors.primary)]}>
                  팔로우
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[text.h3, text.color(colors.black)]} numberOfLines={2}>
              작품 제목입니다 작품 제목입니다 작품 제목입니다 작품 제목입니다
              작품 제목입니다 작품 제목입니다 작품 제목입니다작품 제목입니다
              작품 제목입니다
            </Text>

            <View
              style={[flex.x({ align: "center", justify: "space-between" })]}
            >
              <View style={[flex.x({ align: "center", gap: 16 })]}>
                <TouchableOpacity
                  style={[flex.x({ align: "center", gap: 4 })]}
                  onPress={() => setLiked(t => !t)}
                >
                  <LikeIcon
                    filled={liked}
                    width={24}
                    height={24}
                    color={liked ? colors.primary : colors.gray700}
                  />
                  <Text style={[text.body3, text.color(colors.gray700)]}>
                    {liked ? "1,235" : "1,234"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[flex.x({ align: "center", gap: 4 })]}
                  onPress={() => navigation.navigate("Comments", { id })}
                >
                  <CommentIcon width={24} height={24} color={colors.gray700} />
                  <Text style={[text.body3, text.color(colors.gray700)]}>
                    1,234
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={[text.body3, text.color(colors.gray500)]}>
                2024.09.30
              </Text>
            </View>
          </View>

          <View
            style={[h(4), bg(colors.gray200), margin.x(-24), margin.bottom(32)]}
          />

          <Text style={[text.h4, text.color(colors.black), padding.bottom(8)]}>
            프로젝트 소개
          </Text>
          <Text
            style={[text.body2, text.color(colors.gray800)]}
            numberOfLines={10}
          >
            일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오
            일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오
            일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오일이삼사오
          </Text>

          <Text
            style={[
              text.h4,
              text.color(colors.black),
              padding.top(32),
              padding.bottom(8),
            ]}
          >
            태그 정보
          </Text>
          <View style={flex.x({ gap: 8 })}>
            <View style={tagStyle}>
              <Text style={[text.h5, text.color(colors.gray800)]}>#로고</Text>
            </View>
            <View style={tagStyle}>
              <Text style={[text.h5, text.color(colors.gray800)]}>
                #졸업작품
              </Text>
            </View>
            <View style={tagStyle}>
              <Text style={[text.h5, text.color(colors.gray800)]}>#심플한</Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

const tagStyle: StyleProp<ViewStyle> = [
  padding.x(14),
  padding.y(8),
  bg(colors.gray200),
  round.full,
];
