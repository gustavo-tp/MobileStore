import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image } from "expo-image";
import { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";

import { Product } from "@/app";
import placeholderImage from "@/assets/placeholder.png";
import Colors from "@/config/colors";
import { formatPrice } from "@/util/formatPrice";

interface CartItemProps {
  product: Product;
  itemQuantity: number;
  handleAddItemUnitButtonPress: (productId: number) => void;
  handleRemoveItemUnitButtonPress: (productId: number) => void;
  handleRemoveItemButtonPress: (productId: number) => void;
}

const CartItem = ({
  product,
  itemQuantity,
  handleRemoveItemButtonPress,
  handleRemoveItemUnitButtonPress,
  handleAddItemUnitButtonPress,
}: CartItemProps) => {
  return (
    <View style={styles.productContainer}>
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
        <Text style={styles.productTitle} numberOfLines={2}>
          {product.title}
        </Text>
        <View style={styles.productPriceContainer}>
          <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
          {itemQuantity > 1 && (
            <Text style={styles.productItemsPriceAmount}>
              {formatPrice(product.price * itemQuantity)}
            </Text>
          )}
          <View style={styles.changeQuantityButtonsContainer}>
            <TouchableOpacity
              style={{
                ...styles.changeQuantityButton,
                ...styles.changeQuantityLeftButton,
              }}
              onPress={() => handleRemoveItemUnitButtonPress(product.id)}
            >
              <FontAwesome name="minus" size={10} color={Colors.gray[900]} />
            </TouchableOpacity>
            <View style={styles.itemQuantityContainer}>
              <Text style={styles.itemQuantity}>{itemQuantity}</Text>
            </View>
            <TouchableOpacity
              style={{
                ...styles.changeQuantityButton,
                ...styles.changeQuantityRightButton,
              }}
              onPress={() => handleAddItemUnitButtonPress(product.id)}
            >
              <FontAwesome name="plus" size={10} color={Colors.gray[900]} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleRemoveItemButtonPress(product.id)}>
        <FontAwesome name="trash" size={18} color={Colors.red} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(CartItem);
