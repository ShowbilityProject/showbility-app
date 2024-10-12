import { StackPageProps } from "@/navigation";
import { colors, flex, bg } from "@/styles";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { Text, ScrollView, TouchableWithoutFeedback } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const mockImages = [
  "https://s3-alpha-sig.figma.com/img/cdf8/97d8/ee2a563f26f23f00c43a7fd92acfe49a?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Lgifmchetp9-Q8EIpVRy7uDqwtFTg1MqWFTQe~ZXSt5H7NGr5f42jEpdtvXs~rzdthA7DXyNJKsanl2FM1wnbMZtK3~6L09ZyvCVoCyfb9p6p2cbTyuFGAuPe-usCwmHss8p8L2OXMZY2-DsT0YiAl5Y1uCIlnJm~PskJ3H0jyixCIJhNaS8BSUjmyL9AQ-Hh7VAHmmfNcltWCLkGnuCjS~4YAC2ex9xSiTmtAxIXY~qgL-ks62l4HB1dc1NlFtGGKl1ar3G9zLMW7wwbAwBz6SMNzGjw4TLBlgVF7IxCXMJeoNGOoJt-GhgnJh8IGVwTMUpq~VkC6OXwfPgus53hw__",
  "https://s3-alpha-sig.figma.com/img/c2f7/3721/3485225862025d25bd5ab2e2d4884b8d?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UDYxq3s103er9vsrVUWWyLSrxM39RFZB~xnAgdEb5YCAG6bX3IGaZ3nv0bgduIZtnHTIPN71v7orE9xE5L~j3G2o0-NNzKqbzmLXRanC2~ZArAQxcsKul9zNfOIJfr94lfntVGxAgrp~eChHWkMj~ju2WOcdb8UdXhjlHBMdmyYhd3efSdGGoA8mcJm6V9mk5qhdNIpkb4f9oeT1lnecwCY26pZ~RExGudiFixyfedIMCMO9q8g7xBH29oMTA4Gc-DrjeRwtEwJV4oe6kxjPwCd0T6VISInIZoqnno~5qrdIA3W2WUluHVL2o8vYxU5NNeuDTlsLdVJVfkELlDa~hQ__",
  "https://s3-alpha-sig.figma.com/img/72c2/b38b/51d4c2ed0e86adc4a4f134591a36481e?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZAlMA-~k6DVDhiY7esO3I-R~W~Tg5YBIj3CRvLVyKRtfhja2KLGTX68fZtZnvepKuM5yrlRQltQiMtnarETPz8DNYftPAWdRSIXmJlyh63Vu6QpqX5At7aYn33PTphITni7PeW0B6fh7C9Sg-qp3vdHsGsqQxBvPtQxd39MY1ts7-QTLIeWuTqA34c0yuL9CZxjveqGybx9c3Zccb-UUpbR9H6Bmc2UGX5RfQ7mTb0ZTz61T~Kf8niEHd~Jvrjc8cAM2xTjmGuhbkyCWHedqseC3rJebgGGY-D-DAKT2cfVdmU9AkuYBsHnA7t7fcce2nUUpdHmyZpSZvQa~l0JbLg__",
];

export function ContentDetailPage({}: StackPageProps<"ContentDetail">) {
  const navigation = useNavigation();

  return (
    <>
      <ScrollView
        contentContainerStyle={[flex.v({ gap: 4 }), { paddingBottom: 190 }]}
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
        snapPoints={[190, "91%"]}
        handleIndicatorStyle={[bg(colors.gray300)]}
        backgroundStyle={{ borderRadius: 24 }}
      >
        <BottomSheetView
          style={[
            {
              flex: 1,
              padding: 24,
            },
          ]}
        >
          <Text>바텀싯 테스트</Text>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
