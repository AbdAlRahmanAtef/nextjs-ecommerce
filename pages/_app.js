import React, { useEffect, useRef, useState } from "react";
import { Layout } from "../components";
import toast, { Toaster } from "react-hot-toast";
import "../styles/main.scss";
import { CartProvider } from "../context/cartContext";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
