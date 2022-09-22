import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home.screen";
import { JokeListNavigator } from "./jokeList.navigator";

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
      <HomeStack.Screen name="Joke List" component={JokeListNavigator} />
    </HomeStack.Navigator>
  );
};

// - - - - - - - - - -
