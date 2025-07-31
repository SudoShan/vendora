import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, getCartItems } from "../../store/cart-slice";
import { fetchProductById } from "../../store/product-slice";
import { unwrapResult } from "@reduxjs/toolkit";


const CartContents = () => {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getCartItems());
  }, [dispatch]);

  const cartItems = useSelector((state) => state.cart.items);

  const [cartProducts, setCartProducts] = useState([]);

  const onRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const onQtyChange = (productId, newQty) => {
    if (newQty <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(addToCart({ id: productId, quantity: newQty }));
    }
  };


  useEffect(() => {
    async function fetchDetails() {
      if (Array.isArray(cartItems) && cartItems.length > 0) {
        const results = [];
        for (const item of cartItems) {
          try {
            const productId = item.product;
            const action = await dispatch(fetchProductById(productId));
            const prod = unwrapResult(action);
            results.push({
              ...prod,
              quantity: item.quantity,
              size: item.size,
            });
          } catch (err) {
            console.error("Error fetching product details:", err);
          }
        }
        setCartProducts(results);
      } else {
        setCartProducts([]);
      }
    }
    fetchDetails();
  }, [cartItems, dispatch]);

  if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
    return (
      <div style={{ textAlign: "center", color: "#888", padding: "32px 0" }}>
        No item in cart
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {cartProducts.map((prod) => (
        <div
          key={prod._id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            width: "100%",
            padding: 0,
          }}
        >
          {/* Image */}
          <img
            src={
              Array.isArray(prod.images) && prod.images.length > 0
                ? prod.images[0].url || prod.images[0]
                : prod.image
            }
            alt={prod.name}
            style={{
              width: 80,
              height: 80,
              borderRadius: 12,
              objectFit: "cover",
              background: "#eee",
              flexShrink: 0,
            }}
          />
          {/* Details */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 15, color: "#000" }}>{prod.name}</div>
            {prod.size && (
              <div style={{ fontSize: 12, color: "#000", marginTop: 1 }}>
                Size {prod.size}
              </div>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 4,
                gap: 16,
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 15, color: "#000" }}>₹{prod.price}</span>
              {/* Qty controls */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    border: "none",
                    background: "#f5f5f5",
                    color: "#c93939c8",
                    fontWeight: 700,
                    fontSize: 18,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s",
                    outline: "none",
                    boxShadow: "none",
                  }}
                  onClick={() => onQtyChange(prod._id, prod.quantity - 1)}
                  disabled={prod.quantity <= 1}
                  tabIndex={-1}
                >
                  –
                </button>
                <span
                  style={{
                    minWidth: 18,
                    textAlign: "center",
                    fontWeight: 600,
                    color: "#000",
                  }}
                >
                  {prod.quantity}
                </span>
                <button
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    border: "none",
                    background: "#f5f5f5",
                    color: "#c93939c8",
                    fontWeight: 700,
                    fontSize: 18,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s",
                    outline: "none",
                    boxShadow: "none",
                  }}
                  onClick={() => onQtyChange(prod._id, prod.quantity + 1)}
                  tabIndex={-1}
                >
                  +
                </button>
              </div>
            </div>
            {/* Remove button */}
            <button
              style={{
                marginTop: 4,
                background: "none",
                border: "none",
                color: "#c93939c8",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                padding: 0,
                alignSelf: "flex-start",
                outline: "none",
                boxShadow: "none",
              }}
              onClick={() => onRemove(prod._id)}
              tabIndex={-1}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;