// @refresh reset
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View, YellowBox } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LoadingScreen from "./components/LoadingScreen";
import LoginScreen from "./components/LoginScreen";
import DashboardScreen from "./components/DashboardScreen";
import {
  useFonts,
  Poppins_800ExtraBold_Italic,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
} from "@expo-google-fonts/poppins";
import { AppLoading } from "expo";
const firebaseConfig = {
  apiKey: "AIzaSyBl2g3YK8DrLh5R-uBYU1f9eta2zjT1L5Q",
  authDomain: "workout-app-4d96d.firebaseapp.com",
  databaseURL: "https://workout-app-4d96d.firebaseio.com",
  projectId: "workout-app-4d96d",
  storageBucket: "workout-app-4d96d.appspot.com",
  messagingSenderId: "936118735151",
  appId: "1:936118735151:web:f5455c087091c0f32791da",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

YellowBox.ignoreWarnings([
  "Setting a timer for a long period of time",
  "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation",
  "Possible Unhandled Promise Rejection",
  "VirtualizedList"
]);

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_800ExtraBold_Italic,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
  });
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <AppNavigator />
    </View>
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282828",
    alignItems: "center",
    justifyContent: "center",
  },
});
