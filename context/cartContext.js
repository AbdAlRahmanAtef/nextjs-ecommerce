import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
  useCallback,
} from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [test, setTest] = useState([]);
  const [initialItems, setInitialItems] = useState([]);

  const caluculateCartTotal = (items) => {
    saveJson(items);
    const itemsCount = items?.reduce((acc, currenct) => acc + currenct.qty, 0);
    const cartTotal = items?.reduce(
      (acc, currenct) => acc + currenct.qty * currenct.price,
      0
    );
    return { itemsCount, cartTotal };
  };

  const [cart, setcart] = useState({
    items: [],
    itemsCount: 0,
    cartTotal: 0,
  });
  const storedItems = "CART_ITEMS";

  const saveJson = (data) =>
    localStorage.setItem(storedItems, JSON.stringify(data));

  const addToCart = (product) => {
    const { items = [] } = cart;
    const productIndex = items.findIndex((item) => item._id === product._id);
    if (productIndex === -1) {
      items.push({ ...product, qty: 1 });
    } else {
      items[productIndex].qty++;
    }
    const total = caluculateCartTotal(items);
    setcart({ items, ...total });
    saveJson(items);
    toast.success(`${product.name} added successfully`);
  };

  const changItemQuantity = (product, sign) => {
    const { items = [] } = cart;
    const foundProduct = items.findIndex((item) => item._id === product._id);
    if (foundProduct !== -1) {
      if (sign === -1 && items[foundProduct].qty > 1) {
        items[foundProduct].qty--;
      } else if (sign === 1) {
        items[foundProduct].qty++;
      } else {
        return;
      }
    }
    const total = caluculateCartTotal(items);
    setcart({ items, ...total });
  };

  const removeItem = (product) => {
    const { items = [] } = cart;
    const productIndex = items.findIndex((item) => item._id === product._id);
    if (productIndex !== -1) {
      items.splice(productIndex, 1);
    }
    const total = caluculateCartTotal(items);
    setcart({ items, ...total });
  };

  return (
    <CartContext.Provider
      value={{
        showCart,
        setShowCart,
        cart,
        addToCart,
        changItemQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
