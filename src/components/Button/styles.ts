import { StyleSheet } from "react-native";

import Colors from "@/config/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.secondary,
    columnGap: 6,
    padding: 8,
    borderRadius: 2,
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOpacity: 0.6,
    elevation: 2,
    justifyContent: "center",
  },
  transparentContainer: {
    flexDirection: "row",
    columnGap: 6,
    padding: 8,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Roboto_400Regular",
    textTransform: "uppercase",
    color: Colors.white,
    fontSize: 12,
  },
});

export default styles;
