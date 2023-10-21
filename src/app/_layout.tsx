import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";

import Colors from "@/config/colors";
import { CartProvider } from "@/hooks/cart";

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_900Black,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor={Colors.primaryVariant} />
      <CartProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.white,
            headerTitleStyle: {
              fontFamily: "Roboto_900Black",
            },
          }}
        />
      </CartProvider>
    </>
  );
}
