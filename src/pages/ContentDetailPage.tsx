import { Image } from "expo-image";

const image =
  "https://s3-alpha-sig.figma.com/img/cdf8/97d8/ee2a563f26f23f00c43a7fd92acfe49a?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Lgifmchetp9-Q8EIpVRy7uDqwtFTg1MqWFTQe~ZXSt5H7NGr5f42jEpdtvXs~rzdthA7DXyNJKsanl2FM1wnbMZtK3~6L09ZyvCVoCyfb9p6p2cbTyuFGAuPe-usCwmHss8p8L2OXMZY2-DsT0YiAl5Y1uCIlnJm~PskJ3H0jyixCIJhNaS8BSUjmyL9AQ-Hh7VAHmmfNcltWCLkGnuCjS~4YAC2ex9xSiTmtAxIXY~qgL-ks62l4HB1dc1NlFtGGKl1ar3G9zLMW7wwbAwBz6SMNzGjw4TLBlgVF7IxCXMJeoNGOoJt-GhgnJh8IGVwTMUpq~VkC6OXwfPgus53hw__";

export function ContentDetailPage() {
  return (
    <>
      <Image source={image} style={{ aspectRatio: 335 / 250 }} />
    </>
  );
}
