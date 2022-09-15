import React, { useState, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, SafeAreaView, FlatList } from "react-native";
import { ListItem } from "@rneui/themed";

// - - - - - - - - - - - - - - - - - - - -

export const JokeListScreen = ({ navigation, route }) => {
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

  // - - - - - - - - - -

  const keyExtractor = (item, index) => item.id;

  // - - - - - - - - - -

  const renderItem = ({ item }) => (
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
  );

  // - - - - - - - - - -

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "skyblue" }}>
      <FlatList
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
      />
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
