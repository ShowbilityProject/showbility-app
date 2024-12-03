import { useNavigation } from "@react-navigation/native";
import { Button, View } from "react-native";

export function LoginPage() {
  const navigation = useNavigation();

  return (
    <View
      style={{ backgroundColor: "orange", flex: 1, justifyContent: "center" }}
    >
      <Button title="test" onPress={() => navigation.goBack()} />
    </View>
  );
}
