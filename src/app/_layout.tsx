import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";

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
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1F6E8C",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Roboto_900Black",
          },
        }}
      />
      <StatusBar backgroundColor="#2E8A99" />
    </>
  );
}
