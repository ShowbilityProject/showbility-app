import { useNavigation } from "@react-navigation/native";
import { RefreshControl, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Pressable } from "@/components/Pressable";
import { flex } from "@/styles";

const mockImages = [
  "https://s3-alpha-sig.figma.com/img/cdf8/97d8/ee2a563f26f23f00c43a7fd92acfe49a?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Lgifmchetp9-Q8EIpVRy7uDqwtFTg1MqWFTQe~ZXSt5H7NGr5f42jEpdtvXs~rzdthA7DXyNJKsanl2FM1wnbMZtK3~6L09ZyvCVoCyfb9p6p2cbTyuFGAuPe-usCwmHss8p8L2OXMZY2-DsT0YiAl5Y1uCIlnJm~PskJ3H0jyixCIJhNaS8BSUjmyL9AQ-Hh7VAHmmfNcltWCLkGnuCjS~4YAC2ex9xSiTmtAxIXY~qgL-ks62l4HB1dc1NlFtGGKl1ar3G9zLMW7wwbAwBz6SMNzGjw4TLBlgVF7IxCXMJeoNGOoJt-GhgnJh8IGVwTMUpq~VkC6OXwfPgus53hw__",
  "https://s3-alpha-sig.figma.com/img/dc91/d0be/7b8566430d728af74f88302c06664cec?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RaLflRk8hVoUkq815P5iZ3h97YCFk0Kr6rqAfRKRJeVyu4wTjqCc3m3nmCL20T7gQUEcTzK0EV~ALr4Sya56EONbn1~1EfSBxka2U~70tobTRpOpxeniTZEE1LuU1MRqeJ02GY-rfc7L73qvTE2pytx5mQCBsdPOJLfvik4vXwbfOh0FpqWIwU8aGbL6jWeCwzz8aZooPytl22pFkQan2P8pBB3KJ3PWF6lRj69y~L~wuCQytKAAeqVUjUlbTgFm~vOuD5APj3xbr7N~wm4GAhb9oeAJq1GD-Z3-Ja0Zl3FJp3L2TfCMjUySMdGjecmFrPvU1zSXuUbGvnzCrgEePg__",
  "https://s3-alpha-sig.figma.com/img/08c7/c8bb/1aab4442079a0f83f7c5431a3ab27ba9?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Boy~jCEhp63yPyik83knrMiPc3aMPzG8CKWCBST6DDMDWU8u8P1~60smp6JpYYxxbap0v2LpfP3leLIYX07-aNqRWmbuWuu7UvlTLyWSdNogjubpAe5VHGy4-bmkHRCmapKv9WgyUesCZyVaoUacBVyWpKL~CVdKuT1y4jPmWKip15eVbsJaY8sHDG34MkFKQpL~ECQcAtj8iByvmw4WHZLn03uKJiUQW1daifly~VEgYwQLQEPB~h0f89CR0WHyohwKiqAR5ClKXa83Gv9JMzEZ1zE0brKlh3uxp5wPObeGkTEgEOd~LGhxsOfP4ujw0VmW3tJRr0lMFZBq7d-HKg__",
  "https://s3-alpha-sig.figma.com/img/72c2/b38b/51d4c2ed0e86adc4a4f134591a36481e?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZAlMA-~k6DVDhiY7esO3I-R~W~Tg5YBIj3CRvLVyKRtfhja2KLGTX68fZtZnvepKuM5yrlRQltQiMtnarETPz8DNYftPAWdRSIXmJlyh63Vu6QpqX5At7aYn33PTphITni7PeW0B6fh7C9Sg-qp3vdHsGsqQxBvPtQxd39MY1ts7-QTLIeWuTqA34c0yuL9CZxjveqGybx9c3Zccb-UUpbR9H6Bmc2UGX5RfQ7mTb0ZTz61T~Kf8niEHd~Jvrjc8cAM2xTjmGuhbkyCWHedqseC3rJebgGGY-D-DAKT2cfVdmU9AkuYBsHnA7t7fcce2nUUpdHmyZpSZvQa~l0JbLg__",
  "https://s3-alpha-sig.figma.com/img/c2f7/3721/3485225862025d25bd5ab2e2d4884b8d?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UDYxq3s103er9vsrVUWWyLSrxM39RFZB~xnAgdEb5YCAG6bX3IGaZ3nv0bgduIZtnHTIPN71v7orE9xE5L~j3G2o0-NNzKqbzmLXRanC2~ZArAQxcsKul9zNfOIJfr94lfntVGxAgrp~eChHWkMj~ju2WOcdb8UdXhjlHBMdmyYhd3efSdGGoA8mcJm6V9mk5qhdNIpkb4f9oeT1lnecwCY26pZ~RExGudiFixyfedIMCMO9q8g7xBH29oMTA4Gc-DrjeRwtEwJV4oe6kxjPwCd0T6VISInIZoqnno~5qrdIA3W2WUluHVL2o8vYxU5NNeuDTlsLdVJVfkELlDa~hQ__",
];

export function ShowbilityTab() {
  const navigation = useNavigation();

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          flex.v({ gap: 12 }),
          {
            paddingVertical: 16,
            paddingHorizontal: 20,
          },
        ]}
        refreshControl={<RefreshControl refreshing={false} />}
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
    </>
  );
}
