import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../store/cart-slice";

const ProductCard = ({
  id,
  name,
  sellername,
  description,
  image,
  price,
  discount,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [inCart, setInCart] = useState(
    cartItems.some((item) => item.product === id)
  );


  // Set color: black if in cart, red if not
  const cartColor = inCart ? "#c93939c8": "#222";

  const hasDiscount = discount > 0;
  const originalPrice = hasDiscount ? Math.round(price / (1 - discount / 100)) : price;

  // Toggle cart status and dispatch action
  const handleCartClick = (e) => {
    e.preventDefault();
    if (inCart) {
      setInCart(false);
      dispatch(removeFromCart(id));
    } else {
      setInCart(true);
      dispatch(addToCart({ id, quantity: 1 }));
    }
  };

  return (
    <div
      style={{
        borderRadius: 18,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        background: "#fff",
        overflow: "hidden",
        position: "relative",
        width: 200,
        height: 320,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Cart Icon */}
      <button
        type="button"
        onClick={handleCartClick}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 2,
          background: "#fff",
          borderRadius: "50%",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          width: 36,
          height: 36,
          display: "flex",
          justifyContent: "center",
          color: cartColor,
          cursor: "pointer",
          border: "none",
          outline: "none",
          padding: 0,
        }}
        aria-label={inCart ? "Remove from cart" : "Add to cart"}
      >
        <FiShoppingCart size={20} color={cartColor} style={{marginTop: 8}} />
      </button>

      {/* Product Image and Info wrapped in Link */}
      <Link to={`/product/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ width: "100%", aspectRatio: "1.1/1", overflow: "hidden" }}>
          <img
            src={image}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
              userSelect: "none",
              pointerEvents: "none",
            }}
            draggable={false}
          />
        </div>
        <div style={{ padding: "16px 16px 18px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: "#222" }}>{name}</div>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>{sellername}</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#222", marginBottom: 4 }}>
            ₹{price}
            {hasDiscount && (
              <>
                <span
                  style={{
                    fontSize: 13,
                    color: "#888",
                    fontWeight: 400,
                    marginLeft: 8,
                    textDecoration: "line-through",
                  }}
                >
                  ₹{originalPrice}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "#388e3c",
                    fontWeight: 600,
                    marginLeft: 6,
                  }}
                >
                  {discount}% OFF
                </span>
              </>
            )}
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#444",
              lineHeight: "1.4",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "2.8em",
              maxHeight: "2.8em",
              marginTop: 2,
            }}
            title={description}
          >
            {description}
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
