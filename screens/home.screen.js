import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, SafeAreaView, Image } from "react-native";

import stemLogo from "../assets/stemLogo.png";

// - - - - - - - - - - - - - - - - - - - -

export const HomeScreen = ({ navigation }) => {
  // - - - - - - - - - -

  const onJokeListPress = () => {
    console.log("onJokeListPress triggered...");
  };

  // - - - - - - - - - -

  useEffect(() => {
    navigation.setOptions({ title: "Home For Jokes" });
  }, []);

  // - - - - - - - - - -

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.container}>
        <Image source={stemLogo} style={{ width: 317, height: 309 }} />
        <Text> </Text>
        <Button
          onPress={() => onJokeListPress()}
          title="My Joke List"
          buttonStyle={{ borderRadius: 8 }}
          containerStyle={{ alignSelf: "center" }}
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

// - - - - - - - - - -

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center",
  },
});
