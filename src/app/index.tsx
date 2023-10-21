import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { CartLink } from "@/components/CartLink";
import ProductsList from "@/components/ProductsList/ProductsList";
import Colors from "@/config/colors";
import { useCart } from "@/hooks/cart";
import api from "@/services/api";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const { cart, cartProductsQuantity, addItemUnitToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api<Product[]>("/products");
        const products = response.data;
        const stringProducts = JSON.stringify(products);

        await AsyncStorage.setItem("products", stringProducts);
        setProducts(products);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("Unexpected error", error);
        }
      }
    }

    fetchProducts();
  }, []);

  const createAddItemUnitToCartAlert = useCallback((productId: number) => {
    const product = products.find((product) => product.id === productId);

    let alertMessage = `Tem certeza de que quer adicionar o produto "${product?.title}" no carrinho?`;

    if (productId in cart) {
      alertMessage = `O produto "${product?.title}" já está no carrinho. Deseja adicionar mais um item deste mesmo produto?`;
    }

    return Alert.alert("Atenção", alertMessage, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      { text: "Apenas adicionar", onPress: () => addItemUnitToCart(productId) },
      {
        text: "Adicionar e ir para o carrinho",
        onPress: () => {
          addItemUnitToCart(productId);
          router.push("/cart");
        },
      },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Produtos",
          headerRight: () => (
            <CartLink.Root>
              {cartProductsQuantity > 0 && (
                <CartLink.QuantityIndicator quantity={cartProductsQuantity} />
              )}
            </CartLink.Root>
          ),
        }}
      />
      <ProductsList
        products={products}
        handleAddToCartButtonPress={createAddItemUnitToCartAlert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
