import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    minHeight: 160,
    flexDirection: "row",
    borderColor: "#dee2e6",
    borderWidth: 1,
    borderRadius: 4,
    columnGap: 4,
  },
  productImageContainer: {
    padding: 4,
    width: 120,
  },
  productImage: { flex: 1, resizeMode: "contain" },
  descriptionContainer: {
    flex: 1,
    rowGap: 4,
    paddingVertical: 4,
    paddingRight: 4,
  },
  productTitle: {
    color: "#212529",
    fontSize: 14,
    fontFamily: "Roboto_500Medium",
  },
  productCategorycontainer: {
    flexDirection: "row",
  },
  productCategory: {
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
    backgroundColor: "#e9ecef",
    color: "#343a40",
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 6,
  },
  ratingStarsContainer: {
    flexDirection: "row",
    columnGap: 2,
    alignItems: "center",
  },
  ratingText: {
    fontFamily: "Roboto_400Regular",
  },
  priceText: {
    fontFamily: "Roboto_500Medium",
  },
});

export default styles;
