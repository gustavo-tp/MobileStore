import { StyleSheet, Text, View } from "react-native";

interface CartLinkQuantityIndicatorProps {
  quantity: number;
}

export default function CartLinkQuantityIndicator({
  quantity,
}: CartLinkQuantityIndicatorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.indicator}>{quantity}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f00",
    position: "absolute",
    right: 0,
    width: 12,
    borderRadius: 6,
  },
  indicator: {
    fontFamily: "Roboto_500Medium",
    lineHeight: 12,
    fontSize: 8,
    color: "#fff",
    textAlign: "center",
  },
});
