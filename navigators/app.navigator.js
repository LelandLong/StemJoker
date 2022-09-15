import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { HomeNavigator } from "../navigators/home.navigator";
import { SettingsScreen } from "../screens/settings.screen";

import stemLogo from "../assets/stemLogo.png";

// - - - - - - - - - - - - - - - - - - - -

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home",
  Settings: "settings",
};

// - - - - - - - - - -

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: [
      {
        display: "flex",
      },
      null,
    ],
    headerShown: false,
  };
};

// - - - - - - - - - -

export const AppNavigator = () => {
  // - - - - - - - - - -

  // ORIGINAL
  // return (
  //   <View style={styles.container}>
  //     <Image source={stemLogo} style={{ width: 317, height: 309 }} />
  //     <Text> </Text>
  //     <Text>Open up App.js to start working on your app!</Text>
  //     <StatusBar style="auto" />
  //   </View>
  // );

  // TABS
  return (
    <NavigationContainer>
      <Tab.Navigator backBehavior="history" screenOptions={createScreenOptions}>
        <Tab.Screen name="Home" component={HomeNavigator} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// - - - - - - - - - -

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
