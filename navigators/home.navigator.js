import React, { useState } from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home.screen";

// - - - - - - - - - - - - - - - - - - - -

const HomeStack = createNativeStackNavigator();

// - - - - - - - - - -

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <HomeStack.Screen name="HomeForJokesScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

// - - - - - - - - - -

{
  /* <HomeStack.Screen name="JokeListScreen" component={JokeListScreen} /> */
}
