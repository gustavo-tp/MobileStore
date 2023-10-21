import { StyleSheet } from "react-native";

import Colors from "@/config/colors";

const styles = StyleSheet.create({
  container: {
    minHeight: 160,
    flexDirection: "row",
    borderColor: Colors.gray[300],
    borderWidth: 1,
    borderRadius: 4,
    columnGap: 6,
    shadowColor: Colors.black,
    shadowOpacity: 0.6,
    elevation: 1,
    padding: 8,
  },
  productImageContainer: {
    width: 120,
  },
  productImage: { flex: 1 },
  productInfo: {
    flex: 1,
    rowGap: 4,
  },
  descriptionContainer: {
    flex: 1,
    rowGap: 4,
  },
  productTitle: {
    color: Colors.gray[900],
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "Roboto_500Medium",
  },
  productCategorycontainer: {
    flexDirection: "row",
  },
  productCategory: {
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
    backgroundColor: Colors.gray[200],
    color: Colors.gray[800],
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  ratingAverage: {
    fontFamily: "Roboto_400Regular",
  },
  ratingStarsContainer: {
    flexDirection: "row",
    columnGap: 2,
    alignItems: "center",
  },
  ratingText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
  },
  priceText: {
    fontFamily: "Roboto_500Medium",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default styles;
