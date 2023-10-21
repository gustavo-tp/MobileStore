import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { ReactNode } from "react";
import { View } from "react-native";

import Colors from "@/config/colors";

interface CartLinkRootProps {
  children?: ReactNode;
}

export default function CartLinkRoot({ children = null }: CartLinkRootProps) {
  return (
    <Link href="/cart">
      <View style={{ padding: 4 }}>
        <FontAwesome name="shopping-cart" size={24} color={Colors.white} />
        {children}
      </View>
    </Link>
  );
}
