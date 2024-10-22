import { StackPageProps } from "@/navigation";
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
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import {
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { mockImages } from "@/mocks/images";
import { useState } from "react";

const TOP_AREA = 190;

export function ContentDetailPage({}: StackPageProps<"ContentDetail">) {
  const navigation = useNavigation();
  const [topAreaHeight, setTopAreaHeight] = useState(1);

  return (
    <>
      <ScrollView
        contentContainerStyle={[flex.y({ gap: 4 }), { paddingBottom: 190 }]}
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
          <View
            style={[flex.y({ gap: 16 }), h(TOP_AREA - 32)]}
            onLayout={e => setTopAreaHeight(e.nativeEvent.layout.height)}
          >
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
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
