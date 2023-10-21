import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image } from "expo-image";
import { Text, View } from "react-native";

import styles from "./styles";

import placeholderImage from "@/assets/placeholder.png";
import Button from "@/components/Button";
import Colors from "@/config/colors";
import { formatPrice } from "@/util/formatPrice";

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
  handleAddToCartButtonPress?: (productId: number) => void;
}

export default function ProductCard({
  product,
  handleAddToCartButtonPress = () => {},
}: ProductCardProps) {
  function generateRatingStars(starPosition: number) {
    const subtractionDifference = starPosition - product.rating.rate;

    if (subtractionDifference < 0) {
      return (
        <FontAwesome
          key={starPosition}
          name="star"
          size={14}
          color={Colors.gold}
        />
      );
    }

    if (subtractionDifference % starPosition < 1) {
      return (
        <FontAwesome
          key={starPosition}
          name="star-half-full"
          size={14}
          color={Colors.gold}
        />
      );
    }

    return (
      <FontAwesome
        key={starPosition}
        name="star-o"
        size={14}
        color={Colors.gold}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.productImageContainer}>
        <Image
          style={styles.productImage}
          source={product.image}
          alt={product.title}
          cachePolicy="memory"
          placeholder={placeholderImage}
          contentFit="contain"
          transition={500}
        />
      </View>
      <View style={styles.productInfo}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.productTitle} numberOfLines={2}>
            {product.title}
          </Text>
          <View style={styles.productCategorycontainer}>
            <Text style={styles.productCategory}>{product.category}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingAverage}>{product.rating.rate}</Text>
            <View style={styles.ratingStarsContainer}>
              {[1, 2, 3, 4, 5].map(generateRatingStars)}
            </View>
            <Text style={styles.ratingText}>
              {product.rating.count} avaliações
            </Text>
          </View>
          <Text style={styles.priceText}>{formatPrice(product.price)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Adicionar ao carrinho"
            icon={
              <FontAwesome name="cart-plus" size={16} color={Colors.white} />
            }
            onPress={() => handleAddToCartButtonPress(product.id)}
          />
        </View>
      </View>
    </View>
  );
}
