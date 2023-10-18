import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import CartLink from "@/components/CartLink";

export default function Products() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Produtos",
          headerRight: CartLink,
        }}
      />
      <Text>Products Page</Text>
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
