import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  act,
  fireEvent,
  renderRouter,
  screen,
} from "expo-router/testing-library";

import { formatPrice } from "@/util/formatPrice";

describe("Cart", () => {
  it("should render cart page with fake product itens", async () => {
    const fakeProducts = [
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

    const cartItens = fakeProducts.reduce(
      (cart, product) => ({ ...cart, [product.id]: { quantity: 1 } }),
      {},
    ) as {
      [key: number]: {
        quantity: number;
      };
    };

    cartItens[fakeProducts[1].id].quantity = 2;

    const mockReturn = {
      products: JSON.stringify(fakeProducts),
      cart: JSON.stringify(cartItens),
    };

    jest
      .spyOn(AsyncStorage, "getItem")
      .mockImplementation(
        (key: string) =>
          new Promise((resolve) =>
            resolve(mockReturn[key as keyof typeof mockReturn]),
          ),
      );

    renderRouter("./src/app", { initialUrl: "/cart" });

    await act(async () => {});

    fakeProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeOnTheScreen();
      expect(screen.getByText(formatPrice(product.price))).toBeOnTheScreen();
    });

    expect(
      screen.getByText(formatPrice(fakeProducts[1].price * 2)),
    ).toBeOnTheScreen();

    const amount = Object.keys(cartItens).reduce((amount, productId) => {
      const productIdNumber = Number(productId);
      const product = fakeProducts.find(
        (product) => product.id === productIdNumber,
      );
      if (!product) return amount;
      return amount + product.price * cartItens[productIdNumber].quantity;
    }, 0);

    expect(
      screen.getByText(`Valor total: ${formatPrice(amount)}`),
    ).toBeOnTheScreen();

    expect(screen).toHavePathname("/cart");
  });

  it("should remove or add product items from cart by pressing buttons", async () => {
    const fakeProducts = [
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

    const cartItens = fakeProducts.reduce(
      (cart, product) => ({ ...cart, [product.id]: { quantity: 1 } }),
      {},
    ) as {
      [key: number]: {
        quantity: number;
      };
    };

    cartItens[fakeProducts[1].id].quantity = 2;

    const mockReturn = {
      products: JSON.stringify(fakeProducts),
      cart: JSON.stringify(cartItens),
    };

    jest
      .spyOn(AsyncStorage, "getItem")
      .mockImplementation(
        (key: string) =>
          new Promise((resolve) =>
            resolve(mockReturn[key as keyof typeof mockReturn]),
          ),
      );

    renderRouter("./src/app", { initialUrl: "/cart" });

    await act(async () => {});

    const removeItemUnitButton = screen.getByLabelText(
      "remove-item-unit-button-123",
    );
    const removeItemButton = screen.getByLabelText("remove-item-button-123");
    const addItemUnitButton = screen.getByLabelText("add-item-unit-button-123");
    const itemQuantityText = screen.getByLabelText("item-quantity-123");

    expect(itemQuantityText).toHaveTextContent("1");

    fireEvent.press(addItemUnitButton);
    fireEvent.press(addItemUnitButton);
    expect(itemQuantityText).toHaveTextContent("3");

    fireEvent.press(removeItemUnitButton);
    expect(itemQuantityText).toHaveTextContent("2");

    fireEvent.press(removeItemButton);
    expect(itemQuantityText).not.toBeOnTheScreen();

    const removeItemUnitButton2 = screen.getByLabelText(
      "remove-item-unit-button-456",
    );
    const itemQuantityText2 = screen.getByLabelText("item-quantity-456");

    expect(itemQuantityText2).toBeOnTheScreen();

    fireEvent.press(removeItemUnitButton2);
    expect(itemQuantityText2).toHaveTextContent("1");

    const backToCartSpy = jest
      .spyOn(router, "back")
      .mockImplementation(() => {});

    fireEvent.press(removeItemUnitButton2);
    expect(itemQuantityText2).not.toBeOnTheScreen();
    expect(backToCartSpy).toBeCalled();
  });
});
