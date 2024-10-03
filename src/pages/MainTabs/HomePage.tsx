import { TabPageProps } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";

export function HomePage(props: TabPageProps<"Home">) {
  const navigation = useNavigation();

  return (
    <>
      <Button title="test" onPress={() => navigation.navigate("Login")} />
    </>
  );
}
