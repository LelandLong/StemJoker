import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SettingsScreen } from "../screens/settings.screen";

// - - - - - - - - - - - - - - - - - - - -

const SettingsStack = createNativeStackNavigator();

// - - - - - - - - - -

export const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
};

// - - - - - - - - - -
