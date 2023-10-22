import MockAdapter from "axios-mock-adapter";
import { router } from "expo-router";
import {
  act,
  fireEvent,
  renderRouter,
  screen,
} from "expo-router/testing-library";
import { Alert } from "react-native";

import api from "@/services/api";
import { formatPrice } from "@/util/formatPrice";

const apiMock = new MockAdapter(api);

describe("Produts List", () => {
  it("should render produts listing with api response data", async () => {
    const apiResponse = [
      {
        id: 123,
        title: "Fake Product",
        price: 123.45,
        category: "fake",
        description: "a fake product for testing",
        image: "https://picsum.photos/200",
        rating: {
          count: 123,
          rate: 4.5,
        },
      },
      {
        id: 456,
        title: "Fake Product 2",
        price: 678.9,
        category: "fake",
        description: "a second fake product for testing",
        image: "https://picsum.photos/200",
        rating: {
          count: 456,
          rate: 3.8,
        },
      },
    ];

    apiMock.onGet("/products").reply(200, apiResponse);

    renderRouter("./src/app");

    await act(async () => {});

    apiResponse.forEach((product) => {
      expect(screen.getByText(product.title)).toBeOnTheScreen();

      expect(screen.getByText(String(product.rating.rate))).toBeOnTheScreen();
      expect(
        screen.getByText(`${String(product.rating.count)} avaliações`),
      ).toBeOnTheScreen();
      expect(screen.getByText(formatPrice(product.price))).toBeOnTheScreen();
    });

    expect(screen.getAllByText("fake").length).toBe(2);

    expect(screen).toHavePathname("/");
  });

  it("should increase cart items counter", async () => {
    const apiResponse = [
      {
        id: 123,
        title: "Fake Product",
        price: 123.45,
        category: "fake",
        description: "a fake product for testing",
        image: "https://picsum.photos/200",
        rating: {
          count: 123,
          rate: 4.5,
        },
      },
    ];

    apiMock.onGet("/products").reply(200, apiResponse);

    renderRouter("./src/app");

    await act(async () => {});

    expect(screen.getByText("Adicionar ao carrinho")).toBeOnTheScreen();

    const spyAlert = jest.spyOn(Alert, "alert");
    fireEvent.press(screen.getByText("Adicionar ao carrinho"));

    const alertButtons = spyAlert.mock.calls[0][2] || [];
    const onlyAddItemButton = alertButtons.find(
      (button) => button.text === "Apenas adicionar",
    );

    act(() => {
      if (onlyAddItemButton && onlyAddItemButton.onPress)
        onlyAddItemButton.onPress();
    });

    expect(screen.getByLabelText("quantity-indicator")).toHaveTextContent("1");
  });

  it("should go to the cart when adding product and not just choose add item", async () => {
    const apiResponse = [
      {
        id: 123,
        title: "Fake Product",
        price: 123.45,
        category: "fake",
        description: "a fake product for testing",
        image: "https://picsum.photos/200",
        rating: {
          count: 123,
          rate: 4.5,
        },
      },
    ];

    apiMock.onGet("/products").reply(200, apiResponse);

    renderRouter("./src/app");

    await act(async () => {});

    expect(screen.getByText("Adicionar ao carrinho")).toBeOnTheScreen();

    const spyAlert = jest.spyOn(Alert, "alert");
    fireEvent.press(screen.getByText("Adicionar ao carrinho"));

    const alertButtons = spyAlert.mock.calls[0][2] || [];
    const onlyAddItemButton = alertButtons.find(
      (button) => button.text === "Adicionar e ir para o carrinho",
    );

    const goToCartSpy = jest.spyOn(router, "push").mockImplementation(() => {});

    act(() => {
      if (onlyAddItemButton && onlyAddItemButton.onPress)
        onlyAddItemButton.onPress();
    });

    expect(screen.getByLabelText("quantity-indicator")).toHaveTextContent("1");
    expect(goToCartSpy).toBeCalledWith("/cart");
  });
});
