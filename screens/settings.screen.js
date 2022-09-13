import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, SafeAreaView, FlatList } from "react-native";

// - - - - - - - - - - - - - - - - - - - -

export const SettingsScreen = ({ navigation }) => {
  // - - - - - - - - - -

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.container}>
        <Text> </Text>
        <Text>Settings</Text>
        <StatusBar style="auto" />
      </View>
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
