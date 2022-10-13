import React, { useEffect, useContext } from "react";
import { Button, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, SafeAreaView, Image } from "react-native";
import { UserContext } from "../context/user.context";
import { CloudDataContext } from "../context/cloudData.context";

import stemLogo from "../assets/stemLogo.png";

// - - - - - - - - - - - - - - - - - - - -

export const HomeScreen = ({ navigation }) => {
  const { user, loadUser } = useContext(UserContext);
  const { isLoading } = useContext(CloudDataContext);

  // - - - - - - - - - -

  const onJokeListPress = () => {
    console.log("onJokeListPress triggered...");
    console.log("onJokeListPress pressed by: ", user.name, ", age: ", user.age);
    navigation.navigate("Joke List");
  };

  // - - - - - - - - - -

  // HEADER TITLE
  useEffect(() => {
    console.log("home.screen[useEffect] triggered...");
    navigation.setOptions({ title: "Stem Jokes" });
  }, [navigation]);

  // - - - - - - - - - -

  // LOAD USER
  useEffect(() => {
    console.log("home.screen[useEffect] triggered...");
    loadUser();
  }, []);

  // - - - - - - - - - -

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          {user.name ? (
            <Text>
              Welcome STEM student "{user.name}" (age {user.age})
            </Text>
          ) : (
            <Text> </Text>
          )}
          <Text> </Text>
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
      )}
    </SafeAreaView>
  );
};

// - - - - - - - - - -

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
