if (__DEV__) {
  import("./ReactotronConfig");
}

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./src/navigation";
import { StatusBar } from "expo-status-bar";

import * as SplashScreen from "expo-splash-screen";

export default function App() {
  useEffect(() => {
    async function showSplash() {
      await SplashScreen.preventAutoHideAsync();
    }
    showSplash();
  });

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <RootNavigator />
    </NavigationContainer>
  );
}
