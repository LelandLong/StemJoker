import React, { useState, useContext, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
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

  const list = [
    {
      id: 0,
      name: "Why did the chicken cross the road?",
      subtitle: "To show the squirrel that it could be done",
      count: 0,
    },
    {
      id: 1,
      name: "Joke #2",
      subtitle: "Answer #2",
      count: 0,
    },
    {
      id: 2,
      name: "Joke #3",
      subtitle: "Answer #3",
      count: 0,
    },
    {
      id: 3,
      name: "Joke #4",
      subtitle: "Answer #4",
      count: 0,
    },
  ];

  var whichList = [];
  if (user.name === "Rerunx") {
    whichList = cloudData;
  } else {
    whichList = list;
  }

  // - - - - - - - - - -

  const renderItem = ({ item }) => {
    return (
      <>
        {user.name === "Rerunx" ? (
          <ListItem
            containerStyle={{ backgroundColor: "white" }}
            topDivider
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
                <Text>{item.fieldData["zipcode"]}</Text>
              </ListItem.Title>
              <ListItem.Subtitle style={{ color: "black" }}>
                <Text>{item.fieldData["city_primary"]}</Text>
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ) : (
          <ListItem
            containerStyle={{ backgroundColor: "white" }}
            topDivider
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
                <Text>{item.name}</Text>
              </ListItem.Title>
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  alignSelf: "flex-end",
                }}
              >
                {item.count}
              </Text>
              <ListItem.Subtitle style={{ color: "black" }}>
                <Text>{item.subtitle}</Text>
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
      </>
    );
  };

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
          data={whichList}
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
