import { StyleSheet } from "react-native";

import Colors from "@/config/colors";

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    minHeight: 80,
    borderColor: Colors.gray[300],
    borderWidth: 1,
    borderRadius: 4,
    padding: 6,
    columnGap: 6,
    shadowColor: Colors.black,
    shadowOpacity: 0.6,
    elevation: 1,
  },
  productImageContainer: {
    width: 72,
  },
  productImage: {
    flex: 1,
  },
  productInfo: {
    flex: 1,
    rowGap: 8,
  },
  productTitle: {
    fontFamily: "Roboto_500Medium",
    fontSize: 14,
    lineHeight: 14,
  },
  productPriceContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  productPrice: {
    fontFamily: "Roboto_400Regular",
  },
  productItemsPriceAmount: {
    fontFamily: "Roboto_400Regular",
    color: Colors.primaryVariant,
  },
  changeQuantityButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.gray[600],
    borderWidth: 1,
    borderRadius: 10,
  },
  changeQuantityButton: {
    width: 20,
    height: 20,
    //backgroundColor: Colors.gray[300],
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.gray[600],
  },
  changeQuantityLeftButton: {
    borderRightWidth: 1,
  },
  changeQuantityRightButton: {
    borderLeftWidth: 1,
  },
  itemQuantityContainer: {
    paddingHorizontal: 8,
  },
  itemQuantity: {
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
  },
});

export default styles;
