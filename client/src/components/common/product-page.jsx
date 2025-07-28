import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../store/product-slice";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "sonner";
import Header from "../../layouts/User/header";
import { addToCart } from "../../store/cart-slice";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.products.find((p) => p._id === id)
  );

  const [selectedSize, setSelectedSize] = useState(undefined);
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.category === "wearable" && product.sizes?.length) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await dispatch(
        addToCart({
          id: product._id,
          size: selectedSize,
          quantity,
          price: product.price,
        })
      );
      toast.success("Product added to cart");
    } catch(err) {
      console.log(err);
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (!product) {
    return <div style={{ padding: 32 }}>Product not found.</div>;
  }

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          gap: 32,
          padding: "48px 0",
          alignItems: "flex-start",
          margin: "0 auto",
          backgroundColor: "#f8f8f8",
          width: "100vw",
          minHeight: "100vh",
          justifyContent: "flex-start",
        }}
      >
        {/* Left: Images */}
        <div
          style={{
            flex: "0 0 340px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            marginLeft: 12,
            padding: 0,
            minWidth: 280,
            alignItems: "flex-end",
            background: "none",
            boxShadow: "none",
            borderRadius: 0,
          }}
        >
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: 18,
              overflow: "hidden",
              background: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 0,
            }}
          >
            <img
              src={
                Array.isArray(product.images) && product.images.length > 0
                  ? product.images[selectedImgIdx]
                  : ""
              }
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                userSelect: "none",
              }}
              draggable={false}
            />
          </div>

          {/* Thumbnails */}
          <div style={{ display: "flex", gap: 10, marginLeft: 0 }}>
            {Array.isArray(product.images) &&
              product.images.map((img, idx) => (
                <div
                  key={img._id || idx}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    overflow: "hidden",
                    background: "#eee",
                    border:
                      selectedImgIdx === idx
                        ? "2px solid #c93939c8"
                        : "2px solid transparent",
                    cursor: "pointer",
                    boxSizing: "border-box",
                  }}
                  onClick={() => setSelectedImgIdx(idx)}
                >
                  <img
                    src={img}
                    alt={`thumb-${idx}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    draggable={false}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Right: Details */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 18,
            background: "none",
            borderRadius: 0,
            boxShadow: "none",
            padding: "0 0 0 24px",
            minWidth: 320,
            maxWidth: 540,
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 2, color: "#c93939c8", letterSpacing: 1 }}>
            {product.name}
          </div>
          <div style={{ fontSize: 18, color: "#888", marginBottom: 12 }}>
            by {product.brand}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#222",
              marginBottom: 8,
            }}
          >
            ₹{product.price}
            {product.discount > 0 && (
              <>
                <span
                  style={{
                    fontSize: 16,
                    color: "#888",
                    fontWeight: 400,
                    marginLeft: 12,
                    textDecoration: "line-through",
                  }}
                >
                  ₹{Math.round(product.price / (1 - product.discount / 100))}
                </span>
                <span
                  style={{
                    fontSize: 15,
                    color: "#388e3c",
                    fontWeight: 600,
                    marginLeft: 10,
                  }}
                >
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Quantity controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <button
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: "none",
                background: "#f5f5f5",
                color: "#c93939c8",
                fontWeight: 700,
                fontSize: 20,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
                outline: "none",
                boxShadow: "none",
              }}
              tabIndex={-1}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              –
            </button>
            <span
              style={{
                minWidth: 24,
                textAlign: "center",
                fontWeight: 600,
                fontSize: 16,
                color: "#000",
              }}
            >
              {quantity}
            </span>
            <button
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                border: "none",
                background: "#f5f5f5",
                color: "#c93939c8",
                fontWeight: 700,
                fontSize: 20,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
                outline: "none",
                boxShadow: "none",
              }}
              tabIndex={-1}
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>

          <div
            style={{
              fontSize: 15,
              color: "#444",
              marginBottom: 18,
              whiteSpace: "pre-line",
              lineHeight: 1.7,
            }}
          >
            {product.description || "No description available."}
          </div>

          {/* Size Selection */}
          {product.category === "wearable" && product.sizes && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Select Size:</div>
              <div style={{ display: "flex", gap: 12 }}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      border: "none",
                      background: selectedSize === size ? "#c93939c8" : "#f5f5f5",
                      color: selectedSize === size ? "#fff" : "#222",
                      fontWeight: 700,
                      fontSize: 15,
                      cursor: "pointer",
                      boxShadow:
                        selectedSize === size ? "0 2px 8px #c9393933" : undefined,
                      transition: "background 0.2s, color 0.2s",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={adding}
            style={{
              marginTop: 16,
              background: adding ? "#bbb" : "#c93939c8",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              border: "none",
              borderRadius: 8,
              padding: "14px 0",
              cursor: adding ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              width: "100%",
              boxShadow: "0 2px 8px rgba(201,57,57,0.10)",
              opacity: adding ? 0.7 : 1,
              transition: "background 0.2s, opacity 0.2s",
            }}
            tabIndex={-1}
          >
            <FiShoppingCart size={22} />
            {adding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
