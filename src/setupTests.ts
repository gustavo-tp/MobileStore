jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

jest.mock("expo-router/src/testing-library/mocks", () => {
  const originalModule = jest.requireActual(
    "expo-router/src/testing-library/mocks",
  );

  return {
    ...originalModule,
    initialUrlRef: {},
  };
});

jest.mock("@expo-google-fonts/roboto", () => ({
  useFonts: () => [true, null],
}));
