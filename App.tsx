import { AppRegistry } from "react-native";

import appConfig from "./app.config";
import { App } from "./src";

AppRegistry.registerComponent(appConfig.name, () => App);
