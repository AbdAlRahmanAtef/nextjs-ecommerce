import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Image from "next/image";
import Cart from "./Cart";
import { useCart } from "../context/cartContext";

const Navbar = () => {
  const { cart, cartIconRef, showCart, setShowCart } = useCart();

  const [background, setBackground] = useState(false);
  const changeNavStyle = () => {
    if (window.scrollY >= 100) {
      setBackground(true);
    } else {
      setBackground(false);
    }
  };

  useEffect(() => window.addEventListener("scroll", changeNavStyle));

  return (
    <nav className={` ${background && "bg-colored"}`}>
      <div className="container">
        <Link href="/">
          <Image height={60} width={60} src={logo} alt="" />
        </Link>
        <div className="cart" ref={cartIconRef}>
          <HiOutlineShoppingCart size={30} />
          <span className="qty">{cart.itemsCount}</span>
        </div>
      </div>
      <Cart />
    </nav>
  );
};

export default Navbar;
