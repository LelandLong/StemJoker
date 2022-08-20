import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import stemLogo from "./assets/stemLogo.png";

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={stemLogo} style={{ width: 317, height: 309 }} />
      <Text> </Text>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
