import React, { useContext, useRef } from "react";
import { Context, useCart } from "../context/cartContext";
import { urlFor } from "../lib/client";
import {
  AiOutlineShopping,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const { cart, removeItem, changItemQuantity } = useCart();
  const { items } = cart;

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="cart-container" ref={cartRef}>
        {items?.length < 1 ? (
          <div className="empty-cart">
            <h3>You have ({cart.itemsCount}) Items</h3>
            <AiOutlineShopping size={100} />
            <p>Your cart Is Emtpy</p>
          </div>
        ) : (
          <>
            <div>
              <h3>You have ({cart.itemsCount}) Items</h3>
              {items?.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="name">
                    <img src={urlFor(item?.image[0])} alt="" />
                    <div>
                      <p>{item.name}</p>
                      <div className="quantity">
                        <AiOutlineMinus
                          size={30}
                          onClick={() => changItemQuantity(item, -1)}
                        />
                        <span className="qty-num">{item.qty}</span>{" "}
                        <AiOutlinePlus
                          size={30}
                          onClick={() => changItemQuantity(item, 1)}
                        />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="price">
                    <span>${item.price}</span>
                    <RiDeleteBin6Line
                      onClick={() => removeItem(item)}
                      size={30}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="total">
              <div>
                <span>subtotal:</span>
                <span>${cart.cartTotal}</span>
              </div>
              <button onClick={handleCheckout}>Checkout Now</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
