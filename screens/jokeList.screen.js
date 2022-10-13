import React, { useState, useContext, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import { ListItem } from "@rneui/themed";
import { UserContext } from "../context/user.context";
import { CloudDataContext } from "../context/cloudData.context";

// - - - - - - - - - - - - - - - - - - - -

export const JokeListScreen = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const { cloudData, isLoading } = useContext(CloudDataContext);

  // - - - - - - - - - -

  const onAdd = () => {
    console.log("add btn pressed...");
  };

  // - - - - - - - - - -

  const onPressed = (item) => {
    // console.log("joke item pressed, item: ", item);
    console.log("joke item pressed, id: ", item.fieldData.id);
  };

  // - - - - - - - - - -

  const renderItem = ({ item }) => {
    return (
      <ListItem
        containerStyle={{ backgroundColor: "white" }}
        topDivider
        bottomDivider
        onPress={() => onPressed(item)}
      >
        <ListItem.Content>
          <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
            <Text>{item.fieldData["FirstLine"]}</Text>
          </ListItem.Title>
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              alignSelf: "flex-end",
            }}
          >
            {item.fieldData["Votes::sCount"]}
          </Text>
          <ListItem.Subtitle style={{ color: "black" }}>
            <Text>{item.fieldData["SecondLine"]}</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  // - - - - - - - - - -

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Jokes",
      headerRight: () => <Button onPress={() => onAdd()} title="Add" />,
    });
  }, [navigation]);

  // - - - - - - - - - -

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "skyblue" }}>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={cloudData}
          renderItem={renderItem}
        />
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
