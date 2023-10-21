import { ReactNode } from "react";
import { TouchableNativeFeedback, View, Text } from "react-native";

import styles from "./styles";

import Colors from "@/config/colors";

interface ButtonProps {
  title: string;
  icon: ReactNode;
  onPress: () => void;
  isBackgroudTransparent?: boolean;
  textColor?: string;
}

export default function Button({
  title,
  icon,
  onPress,
  isBackgroudTransparent = false,
  textColor = Colors.white,
}: ButtonProps) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View
        style={
          isBackgroudTransparent
            ? styles.transparentContainer
            : styles.container
        }
      >
        {icon}
        <Text style={{ ...styles.text, color: textColor }}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}
