if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootNavigator from './src/navigation'
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <RootNavigator />
    </NavigationContainer>
  );
}
