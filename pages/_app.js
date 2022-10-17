import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import toast, { Toaster } from "react-hot-toast";
import "../styles/main.scss";
import { Context } from "../context/stateContext";

function MyApp({ Component, pageProps }) {
  const cartItems = "cartItems";

  const [showCart, setShowCart] = useState(false);

  const caluculateCartTotal = (items) => {
    const itemsCount = items.reduce((acc, currenct) => acc + currenct.qty, 0);
    const cartTotal = items.reduce(
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
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cart,
        addToCart,
        removeItem,
        changItemQuantity,
      }}
    >
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  );
}

export default MyApp;
