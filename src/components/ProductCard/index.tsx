import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button, Image, Text, View } from "react-native";

import styles from "./styles";

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

interface ProductCardProps {
  product: Product;
  handleAddToCartButtonPress: (productId: number) => void;
}

export default function ProductCard({
  product,
  handleAddToCartButtonPress,
}: ProductCardProps) {
  function generateRatingStars(starPosition: number) {
    const subtractionDifference = starPosition - product.rating.rate;

    if (subtractionDifference < 0) {
      return (
        <FontAwesome key={starPosition} name="star" size={14} color="#FFB000" />
      );
    }

    if (subtractionDifference % starPosition < 1) {
      return (
        <FontAwesome
          key={starPosition}
          name="star-half-full"
          size={14}
          color="#FFB000"
        />
      );
    }

    return (
      <FontAwesome key={starPosition} name="star-o" size={14} color="#FFB000" />
    );
  }

  function formatPrice(price: number) {
    const formatedPrice = Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);

    return formatedPrice.replace(/^(\D+)/, "$1 ");
  }

  return (
    <View style={styles.container}>
      <View style={styles.productImageContainer}>
        <Image style={styles.productImage} source={{ uri: product.image }} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <View style={styles.productCategorycontainer}>
          <Text style={styles.productCategory}>{product.category}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingStarsContainer}>
            {[1, 2, 3, 4, 5].map(generateRatingStars)}
          </View>
          <Text style={styles.ratingText}>
            {product.rating.rate} de {product.rating.count}
          </Text>
        </View>
        <Text style={styles.priceText}>{formatPrice(product.price)}</Text>
        <Button
          title="Adicionar ao carrinho"
          onPress={() => handleAddToCartButtonPress(product.id)}
        />
      </View>
    </View>
  );
}
