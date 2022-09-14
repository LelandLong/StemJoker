import React, { useState } from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { JokeListScreen } from "../screens/jokeList.screen";

// - - - - - - - - - - - - - - - - - - - -

const JokeListStack = createNativeStackNavigator();

// - - - - - - - - - -

export const JokeListNavigator = () => {
  return (
    <JokeListStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <JokeListStack.Screen name="JokeListScreen" component={JokeListScreen} />
    </JokeListStack.Navigator>
  );
};

// - - - - - - - - - -

{
  /* <JokeListStack.Screen name="JokeListScreen" component={JokeListScreen} /> */
}
