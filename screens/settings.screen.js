import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, SafeAreaView, FlatList } from "react-native";

// - - - - - - - - - - - - - - - - - - - -

export const SettingsScreen = ({ navigation }) => {
  // - - - - - - - - - -

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "grey" }}>
      <View style={styles.container}>
        <Text> </Text>
        <Text style={styles.text}>Settings</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
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
  },
});
