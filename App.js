import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { UserContextProvider } from "./context/user.context";
import { AppNavigator } from "./navigators/app.navigator";

// - - - - - - - - - - - - - - - - - - - -

export default function App() {
  return (
    <UserContextProvider>
      <AppNavigator />
    </UserContextProvider>
  );
}

// - - - - - - - - - - - - - - - - - - - -

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
