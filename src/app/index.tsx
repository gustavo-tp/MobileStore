import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import { CartLink } from "@/components/CartLink";
import ProdutCard from "@/components/ProductCard";
import api from "@/services/api";

interface Product {
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

interface Cart {
  [productId: number]: {
    quantity: number;
  };
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart>({});

  const cartProductsQuantity = Object.keys(cart).reduce(
    (quantity, productId) => quantity + cart[Number(productId)].quantity,
    0,
  );

  useEffect(() => {
    api<Product[]>("/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error.message));
  }, []);

  const createAddProductToCartAlert = (productId: number) => {
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
      { text: "Apenas adicionar", onPress: () => addProductToCart(productId) },
      {
        text: "Adicionar e ir para o carrinho",
        onPress: () => {
          addProductToCart(productId);
          router.push("/cart");
        },
      },
    ]);
  };

  function addProductToCart(productId: number) {
    const cartItem = cart[productId] || {};
    const productQuantity = cartItem?.quantity || 0;

    const updatedCart = {
      ...cart,
      [productId]: {
        quantity: productQuantity + 1,
      },
    };

    setCart(updatedCart);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Produtos",
          headerRight: () => (
            <CartLink.Root>
              <CartLink.QuantityIndicator quantity={cartProductsQuantity} />
            </CartLink.Root>
          ),
        }}
      />
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 12,
          paddingHorizontal: 8,
          rowGap: 8,
          minWidth: "100%",
        }}
      >
        {products.map((product) => (
          <ProdutCard
            key={product.id}
            product={product}
            handleAddToCartButtonPress={createAddProductToCartAlert}
          />
        ))}
      </ScrollView>
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
