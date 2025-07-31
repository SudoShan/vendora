import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchProductById } from "../../store/product-slice";
import OrderDetailsForm from "../../components/user/order-details-form";
import OrderSummary from "../../components/user/order-summary";
import Header from "../../layouts/Seller/header";
import OneStepBanner from "../../components/common/one-step";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const calculateTotal = (itemsArray) => {
    return itemsArray.reduce(
      (sum, prod) => sum + prod.price * prod.quantity,
      0
    );
  };

  const [cartProducts, setCartProducts] = useState([]);

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
    setTotal(calculateTotal(cartProducts));
  }, [cartItems, dispatch, cartProducts]);

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 48,
        padding: "48px 0",
        background: "#fafbfc",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden", 
      }}
    >
      <Header />
      <OneStepBanner />
      {/* Main checkout content */}
      <div style={{ flex: 2, maxWidth: 520, marginLeft: "20vw", marginTop: "40px" }}>
        <OrderDetailsForm total={total} />
      </div>
      <div style={{ flex: 2, maxWidth: 520, marginTop: "40px"}}>
        <OrderSummary  cartProducts={cartProducts} total={total} />
      </div>
      <div style={{ flex: 1 }} />
    </div>
  );
};

export default Checkout;