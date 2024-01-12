import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../scenes/Home";
import DisclaimerScreen from "../scenes/Disclaimer";
import FinishedFormScreen from "../scenes/FinishedForm"

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Disclaimer"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Disclaimer" component={DisclaimerScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Finish" component={FinishedFormScreen} />
    </Stack.Navigator>
  );
}
