import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartProviderProps {
  children: ReactNode;
}

interface Cart {
  [productId: number]: {
    quantity: number;
  };
}

interface CartContextData {
  cart: Cart;
  cartProductsQuantity: number;
  addItemUnitToCart: (productId: number) => void;
  removeItemUnitFromCart: (productId: number) => void;
  removeItemFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart>({});

  useEffect(() => {
    async function fetchCartItens() {
      try {
        const stringCart = await AsyncStorage.getItem("cart");

        if (stringCart) {
          return setCart(JSON.parse(stringCart));
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("Unexpected error", error);
        }
      }
    }

    fetchCartItens();
  }, []);

  const cartProductsQuantity = Object.keys(cart).reduce(
    (quantity, productId) => quantity + cart[Number(productId)].quantity,
    0,
  );

  function updateCartItens(updateCart: (oldStateRef: Cart) => Cart) {
    setCart((oldStateRef: Cart) => {
      const updatedCart = updateCart(oldStateRef);

      const stringCart = JSON.stringify(updatedCart);
      AsyncStorage.setItem("cart", stringCart);

      if (Object.keys(updatedCart).length === 0) {
        router.back();
      }

      return updatedCart;
    });
  }

  function addItemUnitToCart(productId: number) {
    updateCartItens((oldStateRef: Cart) => {
      const cartItem = oldStateRef[productId] || {};
      const productQuantity = cartItem?.quantity || 0;

      const updatedCart = {
        ...oldStateRef,
        [productId]: {
          quantity: productQuantity + 1,
        },
      };

      return updatedCart;
    });
  }

  function removeItemUnitFromCart(productId: number) {
    updateCartItens((oldStateRef: Cart) => {
      const cartItem = oldStateRef[productId];

      if (!cartItem) return oldStateRef;

      const updatedCart = { ...oldStateRef };

      if (cartItem.quantity > 1) {
        updatedCart[productId].quantity = cartItem.quantity - 1;
      } else {
        delete updatedCart[productId];
      }

      return updatedCart as Cart;
    });
  }

  function removeItemFromCart(productId: number) {
    updateCartItens((oldStateRef: Cart) => {
      const cartItem = oldStateRef[productId];

      if (!cartItem) return oldStateRef;

      const updatedCart = { ...oldStateRef };
      delete updatedCart[productId];

      return updatedCart as Cart;
    });
  }

  function clearCart() {
    updateCartItens(() => {
      return {};
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartProductsQuantity,
        addItemUnitToCart,
        removeItemUnitFromCart,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart(): CartContextData {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within an CartProvider");
  }

  return context;
}

export { CartProvider, useCart };
