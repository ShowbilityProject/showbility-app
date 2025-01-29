import React from "react";

import * as SplashScreen from "expo-splash-screen";

import { registerRootComponent } from "expo";

import "./defaultProps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./main";
import { ErrorBoundary } from "@suspensive/react";
import { Text } from "react-native";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const Main = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary fallback={<Text>Error!</Text>}>
      <App />
    </ErrorBoundary>
  </QueryClientProvider>
);

registerRootComponent(Main);
