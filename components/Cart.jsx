import React, { useContext } from "react";
import { Context } from "../context/stateContext";
import { urlFor } from "../lib/client";
import {
  AiOutlineShopping,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = () => {
  const { cart, removeItem, changItemQuantity } = useContext(Context);
  const { items } = cart;
  return (
    <>
      <div className="overlay"></div>
      <div className="cart-container">
        {items.length < 1 ? (
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
                <div className="cart-item">
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
              <button>Checkout Now</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
