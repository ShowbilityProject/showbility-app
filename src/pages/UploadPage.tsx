import { CameraIcon } from "@/icons/CameraIcon";
import { StackPageProps } from "@/navigation";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  launchImageLibraryAsync,
  ImagePickerResult,
  ImagePickerAsset,
} from "expo-image-picker";
import { useState } from "react";
import {
  colors,
  flex,
  flexFill,
  margin,
  padding,
  round,
  size,
  text,
} from "@/styles";
import { Image } from "expo-image";
import { Button, Input } from "@/components";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export function UploadPage({
  navigation,
  route: { params },
}: StackPageProps<"Upload">) {
  const [pickedImages, setPickedImages] = useState<ImagePickerAsset[]>([]);
  const { top, bottom } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={flexFill}
      behavior="padding"
      keyboardVerticalOffset={top + bottom}
    >
      <ScrollView>
        <ScrollView
          horizontal
          contentContainerStyle={[
            padding.x(20),
            padding.y(24),
            flex.x({ gap: 12 }),
          ]}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            style={[
              size(64),
              round.sm,
              flex.center(),
              { borderWidth: 1, borderColor: colors.gray300 },
            ]}
            onPress={async () => {
              const { assets } = await launchImageLibraryAsync({
                allowsMultipleSelection: true,
                orderedSelection: true,
              });

              if (!assets) return;

              setPickedImages(prev =>
                assets.reduce(
                  (arr, img) =>
                    arr.some(a => a.assetId === img.assetId)
                      ? arr
                      : [...arr, img],
                  prev,
                ),
              );
            }}
          >
            <CameraIcon width={24} height={24} color={colors.gray600} />
          </TouchableOpacity>
          {pickedImages.map(image => (
            <Image
              key={image.assetId}
              source={image.uri}
              style={[size(64), round.sm]}
            />
          ))}
        </ScrollView>
        <View style={[padding.x(20), flex.y({ gap: 24 })]}>
          <View>
            <Text style={[text.h5, margin.bottom(8)]}>제목</Text>
            <Input placeholder="작품 제목을 입력해주세요." />
          </View>

          <View>
            <Text style={[text.h5, margin.bottom(8)]}>카테고리</Text>
          </View>

          <View>
            <Text style={[text.h5, margin.bottom(8)]}>태그</Text>
          </View>

          <View>
            <Text style={[text.h5, margin.bottom(8)]}>프로젝트 설명</Text>
          </View>
        </View>
      </ScrollView>
      <Button cta>작성 완료</Button>
    </KeyboardAvoidingView>
  );
}
