import React, { useState, useContext } from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home.screen";
import { JokeListNavigator } from "./jokeList.navigator";
import { UserContext } from "../context/user.context";
import { CloudDataContext } from "../context/cloudData.context";

// - - - - - - - - - - - - - - - - - - - -

const HomeStack = createNativeStackNavigator();

// - - - - - - - - - -

export const HomeNavigator = () => {
  const { user } = useContext(UserContext);
  const { onRequestTestData } = useContext(CloudDataContext);

  // - - - - - - - - - -

  return (
    <>
      {user.name === "Rerunx" ? (
        <HomeStack.Navigator
          screenOptions={{
            headerShown: true,
            headerRight: () => (
              <Button onPress={() => onRequestTestData()} title="Go" />
            ),
          }}
        >
          <HomeStack.Screen name="HomeForJokesScreen" component={HomeScreen} />
          <HomeStack.Screen name="Joke List" component={JokeListNavigator} />
        </HomeStack.Navigator>
      ) : (
        <HomeStack.Navigator
          screenOptions={{
            headerShown: true,
          }}
        >
          <HomeStack.Screen name="HomeForJokesScreen" component={HomeScreen} />
          <HomeStack.Screen name="Joke List" component={JokeListNavigator} />
        </HomeStack.Navigator>
      )}
    </>
  );
};

// - - - - - - - - - -
