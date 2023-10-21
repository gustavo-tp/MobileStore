import { memo } from "react";
import { ScrollView } from "react-native";

import ProductCard from "./ProductCard";
import styles from "./styles";

import { Product } from "@/app";

interface ProductsListPros {
  products: Product[];
  handleAddToCartButtonPress: (productId: number) => void;
}

const ProductsList = ({
  products,
  handleAddToCartButtonPress,
}: ProductsListPros) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          handleAddToCartButtonPress={handleAddToCartButtonPress}
        />
      ))}
    </ScrollView>
  );
};

export default memo(ProductsList);
