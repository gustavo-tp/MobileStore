import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Product } from ".";

import Button from "@/components/Button";
import CartItem from "@/components/CartItem";
import Colors from "@/config/colors";
import { useCart } from "@/hooks/cart";
import { formatPrice } from "@/util/formatPrice";

export default function Cart() {
  const [products, setProducts] = useState<Product[]>([]);
  const {
    cart,
    clearCart,
    addItemUnitToCart,
    removeItemUnitFromCart,
    removeItemFromCart,
  } = useCart();

  const amount = Object.keys(cart).reduce((amount, productId) => {
    const productIdNumber = Number(productId);
    const product = products.find((product) => product.id === productIdNumber);
    if (!product) return amount;
    return amount + product.price * cart[productIdNumber].quantity;
  }, 0);

  useEffect(() => {
    async function fetchProducts() {
      const jsonProducts = await AsyncStorage.getItem("products");
      const products = jsonProducts ? JSON.parse(jsonProducts) : [];
      setProducts(products);
    }

    fetchProducts();
  }, []);

  function goToProductsList() {
    router.push("/");
  }

  const handleAddItemUnitButtonPress = useCallback(addItemUnitToCart, []);
  const handleRemoveItemUnitButtonPress = useCallback(
    removeItemUnitFromCart,
    [],
  );
  const handleRemoveItemButtonPress = useCallback(removeItemFromCart, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Carrinho" }} />
      <ScrollView>
        <View style={styles.productList}>
          {products.length > 0 &&
            Object.keys(cart).map((productId) => {
              const product = products.find(
                (product) => product.id === Number(productId),
              );

              if (!product) return null;

              const cartItem = cart[Number(productId)];

              return (
                <CartItem
                  key={product.id}
                  product={product}
                  itemQuantity={cartItem.quantity}
                  handleAddItemUnitButtonPress={handleAddItemUnitButtonPress}
                  handleRemoveItemUnitButtonPress={
                    handleRemoveItemUnitButtonPress
                  }
                  handleRemoveItemButtonPress={handleRemoveItemButtonPress}
                />
              );
            })}
        </View>
      </ScrollView>
      <Text style={styles.amount}>Valor total: {formatPrice(amount)}</Text>
      <View style={styles.cardActions}>
        <Button
          title="Adicionar mais produtos"
          icon={<FontAwesome name="list" size={16} color={Colors.white} />}
          onPress={goToProductsList}
        />
        <Button
          title="Esvaziar carrinho"
          icon={<FontAwesome name="trash" size={18} color={Colors.red} />}
          onPress={clearCart}
          isBackgroudTransparent
          textColor={Colors.red}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
    rowGap: 8,
  },
  productList: {
    minWidth: "100%",
    rowGap: 6,
    paddingBottom: 2,
  },
  amount: {
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
  cardActions: {
    alignItems: "center",
    rowGap: 6,
  },
});
