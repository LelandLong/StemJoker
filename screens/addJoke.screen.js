import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";

import { UserContext } from "../context/user.context";
import { CloudDataContext } from "../context/cloudData.context";

// - - - - - - - - - - - - - - - - - - - -

export const AddJokeScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const { onSendNewJoke, isLoading } = useContext(CloudDataContext);
  const [firstLine, setFirstLine] = useState("");
  const [secondLine, setSecondLine] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // - - - - - - - - - -

  const firstLineChanged = (value) => {
    // console.log("AddJokeScreen firstLineChanged...");
    setFirstLine(value);
  };

  // - - - - - - - - - -

  const secondLineChanged = (value) => {
    // console.log("AddJokeScreen secondLineChanged...");
    setSecondLine(value);
  };

  // - - - - - - - - - -

  const onSave = () => {
    if (firstLine === "" || secondLine === "") {
      Alert.alert("Sorry but both lines need to NOT be empty.");
    } else {
      setIsSaving(true);
      const scriptParams = {
        username: user.name,
        firstLine: firstLine,
        secondLine: secondLine,
      };
      console.log("AddJokeScreen onSave, scriptParams: ", scriptParams);
      onSendNewJoke(scriptParams);
    }
  };

  // - - - - - - - - - -

  useEffect(() => {
    if (!isLoading && isSaving) {
      setIsSaving(false);
      navigation.goBack();
    }
  }, [isLoading]);

  // - - - - - - - - - -

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Jokes",
      headerRight: null,
    });
  }, [navigation]);

  // - - - - - - - - - -

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "grey" }}>
      <View style={styles.container}>
        <Text style={styles.text}>Your awesome joke:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => firstLineChanged(value)}
          value={firstLine}
          placeholder="First line"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => secondLineChanged(value)}
          value={secondLine}
          placeholder="Second line"
          keyboardType="default"
        />
        {isLoading ? (
          <View>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <Button onPress={() => onSave()} title="Save" />
        )}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

// - - - - - - - - - -

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
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
