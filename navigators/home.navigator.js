import React, { useState, useContext } from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home.screen";
import { JokeListScreen } from "../screens/jokeList.screen";
import { UserContext } from "../context/user.context";
import { CloudDataContext } from "../context/cloudData.context";

// - - - - - - - - - - - - - - - - - - - -

const HomeStack = createNativeStackNavigator();

// - - - - - - - - - -

export const HomeNavigator = () => {
  const { user } = useContext(UserContext);
  const { onRequestTestData, onRequestData } = useContext(CloudDataContext);

  // - - - - - - - - - -

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: true,
        headerRight: () => (
          <Button onPress={() => onRequestData()} title="Go" />
        ),
      }}
    >
      <HomeStack.Screen name="HomeForJokesScreen" component={HomeScreen} />
      <HomeStack.Screen name="Joke List" component={JokeListScreen} />
    </HomeStack.Navigator>
  );
};

// - - - - - - - - - -
