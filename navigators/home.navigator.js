import React, { useContext } from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home.screen";
import { JokeListScreen } from "../screens/jokeList.screen";
import { AddJokeScreen } from "../screens/addJoke.screen";
import { CloudDataContext } from "../context/cloudData.context";
import { UserContext } from "../context/user.context";

// - - - - - - - - - - - - - - - - - - - -

const HomeStack = createNativeStackNavigator();

// - - - - - - - - - -

export const HomeNavigator = () => {
  const { onRequestData } = useContext(CloudDataContext);
  const { user } = useContext(UserContext);

  // - - - - - - - - - -

  return (
    <>
      {user.name === "Rerun" ? (
        <HomeStack.Navigator
          screenOptions={{
            headerShown: true,
            headerRight: () => (
              <Button onPress={() => onRequestData()} title="Load" />
            ),
          }}
        >
          <HomeStack.Screen name="HomeForJokesScreen" component={HomeScreen} />
          <HomeStack.Screen name="Joke List" component={JokeListScreen} />
          <HomeStack.Screen name="Add Joke" component={AddJokeScreen} />
        </HomeStack.Navigator>
      ) : (
        <HomeStack.Navigator
          screenOptions={{
            headerShown: true,
            headerRight: () => null,
          }}
        >
          <HomeStack.Screen name="HomeForJokesScreen" component={HomeScreen} />
          <HomeStack.Screen name="Joke List" component={JokeListScreen} />
          <HomeStack.Screen name="Add Joke" component={AddJokeScreen} />
        </HomeStack.Navigator>
      )}
    </>
  );
};

// - - - - - - - - - -
