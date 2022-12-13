import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef();
  const cartIconRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (showCart && cartRef && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      } else if (cartIconRef && cartIconRef.current.contains(e.target)) {
        setShowCart((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [showCart]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => setShowCart(false));
    }
  });

  const storedItems = "CART_ITEMS";

  const saveJSON = (items) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storedItems, JSON.stringify(items));
    }
  };

  const caluculateCartTotal = (items) => {
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

  useEffect(() => {
    if (localStorage.getItem(storedItems)) {
      const initial = JSON.parse(localStorage.getItem(storedItems));
      setcart({ items: initial, ...caluculateCartTotal(initial) });
    }
  }, []);

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
    saveJSON(items);
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
    saveJSON(items);
  };

  const removeItem = (product) => {
    const { items = [] } = cart;
    const productIndex = items.findIndex((item) => item._id === product._id);
    if (productIndex !== -1) {
      items.splice(productIndex, 1);
    }
    const total = caluculateCartTotal(items);
    setcart({ items, ...total });
    saveJSON(items);
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
        cartRef,
        cartIconRef,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
