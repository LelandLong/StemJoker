import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TextInput, SafeAreaView } from "react-native";

import { UserContext } from "../context/user.context";

// - - - - - - - - - - - - - - - - - - - -

export const SettingsScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const { user, addUsername, addAge } = useContext(UserContext);

  // - - - - - - - - - -

  const usernameChanged = (username) => {
    // console.log("settings.screen usernameChanged: ", username);
    setUsername(username);
    addUsername(username);
  };

  // - - - - - - - - - -

  const ageChanged = (age) => {
    //   // console.log("settings.screen ageChanged: ", age);
    setAge(age);
    addAge(age);
  };

  // - - - - - - - - - -

  // USERNAME CHANGES
  // useEffect(() => {
  //   console.log("settings.screen[useEffect] username: ", username);
  // }, [username]);

  // - - - - - - - - - -

  // HEADER TITLE
  useEffect(() => {
    console.log("settings.screen[useEffect] triggered...");
    navigation.setOptions({ title: "Settings" });
  }, [navigation]);

  // - - - - - - - - - -

  // INPUT x2
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "grey" }}>
      <View style={styles.container}>
        <Text style={styles.text}>Your name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => usernameChanged(value)}
          value={user.name}
          placeholder="Enter your name here"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => ageChanged(value)}
          value={user.age}
          placeholder="Enter your age here"
          keyboardType="numeric"
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );

  // - - - - - - - - - -

  // ORIGINAL
  // return (
  //   <SafeAreaView style={{ flex: 1, backgroundColor: "grey" }}>
  //     <View style={styles.container}>
  //       <Text style={styles.text}>Settings</Text>
  //       <StatusBar style="auto" />
  //     </View>
  //   </SafeAreaView>
  // );
};

// - - - - - - - - - -

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellowgreen",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
