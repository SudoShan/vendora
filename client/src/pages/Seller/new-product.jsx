import React, { useState } from "react";
import axiosInstance from "../../utils/api";

const categories = ["Electronics", "Wearable", "Home", "Other"];

const NewProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [sizes, setSizes] = useState([""]);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [brand, setBrand] = useState("");

  const handleSizeChange = (idx, value) => {
    if (value.length > 1) return;
    setSizes((prev) => prev.map((s, i) => (i === idx ? value.toUpperCase() : s)));
  };

  const handleAddSize = () => {
    setSizes((prev) => [...prev, ""]);
  };

  const handleRemoveSize = (idx) => {
    setSizes((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleImageChange = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImages((prev) => {
      const all = [...prev, ...files].slice(0, 4);
      return all;
    });
  };

  const handleRemoveImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const accessToken = localStorage.getItem("accessToken"); 
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axiosInstance.post("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const uploadImages = async () => {
    const uploadedUrls = await Promise.all(images.map((img) => uploadImage(img)));
    return uploadedUrls;
  };

  try {
    const uploadedImages = await uploadImages();
    const product = {
      name,
      description: desc,
      category,
      price,
      discount,
      quantity,
      brand,
      sizes: category === "Wearable" ? sizes.filter((s) => s.trim()) : undefined,
      images: uploadedImages,
    };
    console.log("Submitting product:", product);
    const response = await axiosInstance.post("/products", product, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("Product response:", response.data);

    if (response.status !== 201) {
      console.error("Failed to add product:", response.data);
      return;
    } else {
      console.log("Product submitted successfully:", response.data);
      setName("");
      setDesc("");
      setCategory(categories[0]);
      setSizes([""]);
      setImages([]);
      setQuantity("");
      setPrice("");
      setDiscount("");
      setBrand("");
      alert("Product added successfully!");
      window.location.reload();
    }
  } catch (error) {
    console.error("Product submission failed:", error);
  }
};

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
      }}
    >
      <h1
        style={{
          fontWeight: 800,
          fontSize: "2.2rem",
          marginBottom: 18,
          color: "#222",
          fontFamily: "'Montserrat', sans-serif",
          textAlign: "left",
        }}
      >
        Add a new product to my warehouse
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: "70%",
          margin: "0 0",
        }}
      >
        <label style={{ fontWeight: 600, fontSize: 15, color: "#222" }}>Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 16,
            marginBottom: 6,
            width: "70%",
            background: "#fff",
            color: "#000",
          }}
          required
        />

        <label style={{ fontWeight: 600, fontSize: 15, color: "#222" }}>Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter product description"
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 16,
            minHeight: 60,
            marginBottom: 6,
            resize: "vertical",
            width: "70%",
            background: "#fff",
            color: "#000",
          }}
          required
        />

        <label style={{ fontWeight: 600, fontSize: 15, color: "#222" }}>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px 10px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 16,
            marginBottom: 6,
            width: "25%",
            background: "#fff",
            color: "#000",
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div style={{ display: "flex", gap: 0, alignItems: "center", marginBottom: 6 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 600, fontSize: 15, color: "#222" }}>Price</label>
            <input
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid #ddd",
                fontSize: 16,
                width: "80%",
                background: "#fff",
                color: "#000",
              }}
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 600, fontSize: 15, color: "#222" }}>Discount (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Discount"
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid #ddd",
                fontSize: 16,
                width: "80%",
                background: "#fff",
                color: "#000",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontWeight: 600, fontSize: 15, color: "#222" }}>Quantity</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid #ddd",
                fontSize: 16,
                width: "80%",
                background: "#fff",
                color: "#000",
              }}
              required
            />
          </div>
        </div>

        <label style={{ fontWeight: 600, fontSize: 15, color: "#222" }}>Brand</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Enter brand"
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 16,
            marginBottom: 6,
            width: "70%",
            background: "#fff",
            color: "#000",
          }}
          required
        />

        {category === "Wearable" && (
          <div>
            <label style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, display: "block", color: "#222" }}>
              Sizes
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sizes.map((size, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="text"
                    value={size}
                    maxLength={1}
                    onChange={(e) =>
                      handleSizeChange(idx, e.target.value.replace(/[^a-zA-Z0-9]/g, ""))
                    }
                    style={{
                      width: 36,
                      padding: "7px 0",
                      borderRadius: 8,
                      border: "1px solid #ddd",
                      fontSize: 16,
                      textAlign: "center",
                      background: "#fff",
                      color: "#000",
                    }}
                  />
                  {sizes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(idx)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#c93939c8",
                        fontWeight: 700,
                        fontSize: 18,
                        cursor: "pointer",
                        padding: "0 6px",
                      }}
                      aria-label="Remove size"
                    >
                      ×
                    </button>
                  )}
                  {idx === sizes.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddSize}
                      style={{
                        background: "#c93939c8",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "4px 12px",
                        fontWeight: 600,
                        fontSize: 22,
                        cursor: "pointer",
                        marginLeft: 4,
                      }}
                      aria-label="Add size"
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <label style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, color: "#222" }}>
          Product Images (max 4)
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
          <label
            style={{
              display: "inline-block",
              background: "#c93939c8",
              color: "#fff",
              borderRadius: 8,
              padding: "8px 18px",
              fontWeight: 600,
              fontSize: 15,
              cursor: images.length >= 4 ? "not-allowed" : "pointer",
              opacity: images.length >= 4 ? 0.6 : 1,
              transition: "background 0.2s",
              border: "none",
            }}
          >
            Select Images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              disabled={images.length >= 4}
              style={{ display: "none" }}
            />
          </label>
          <span style={{ fontSize: 13, color: "#888" }}>
            {images.length}/4 selected
          </span>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
          {images.map((img, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <img
                src={URL.createObjectURL(img)}
                alt={`product-img-${idx}`}
                style={{
                  width: 64,
                  height: 64,
                  objectFit: "cover",
                  borderRadius: 8,
                  border: "1px solid #eee",
                  background: "#fafafa",
                }}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  background: "#c93939c8",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 4px #0002",
                }}
                aria-label="Remove image"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          style={{
            marginTop: 18,
            background: "#c93939c8",
            color: "#fff",
            fontWeight: 700,
            fontSize: 17,
            border: "none",
            borderRadius: 8,
            padding: "12px 0",
            cursor: "pointer",
            transition: "background 0.2s",
            width: "100%",
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
