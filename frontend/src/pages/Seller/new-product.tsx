import React, { useState } from "react";

const categories = ["Electronics", "Wearable", "Home", "Other"];

const NewProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [sizes, setSizes] = useState<string[]>([""]);
  const [images, setImages] = useState<File[]>([]);

  const handleSizeChange = (idx: number, value: string) => {
    if (value.length > 1) return;
    setSizes((prev) => prev.map((s, i) => (i === idx ? value.toUpperCase() : s)));
  };

  const handleAddSize = () => {
    setSizes((prev) => [...prev, ""]);
  };

  const handleRemoveSize = (idx: number) => {
    setSizes((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImages((prev) => {
      const all = [...prev, ...files].slice(0, 4);
      return all;
    });
  };

  const handleRemoveImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      name,
      description: desc,
      category,
      sizes: category === "Wearable" ? sizes.filter((s) => s.trim()) : undefined,
      images,
    };
    console.log("Product submitted:", product);
    alert("Product submitted! (see console)");
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 2px 16px #0001",
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Add New Product</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <label style={{ fontWeight: 600, fontSize: 15 }}>Product Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter product name"
          style={{
            padding: "9px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 15,
            marginBottom: 6,
          }}
          required
        />

        <label style={{ fontWeight: 600, fontSize: 15 }}>Description</label>
        <textarea
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Enter product description"
          style={{
            padding: "9px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 15,
            minHeight: 60,
            marginBottom: 6,
            resize: "vertical",
          }}
          required
        />

        <label style={{ fontWeight: 600, fontSize: 15 }}>Category</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{
            padding: "9px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 15,
            marginBottom: 6,
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {category === "Wearable" && (
          <div>
            <label style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, display: "block" }}>
              Sizes
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sizes.map((size, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="text"
                    value={size}
                    maxLength={1}
                    onChange={e => handleSizeChange(idx, e.target.value.replace(/[^a-zA-Z0-9]/g, ""))}
                    style={{
                      width: 36,
                      padding: "7px 0",
                      borderRadius: 8,
                      border: "1px solid #ddd",
                      fontSize: 15,
                      textAlign: "center",
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
                        fontSize: 15,
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

        {/* Image Upload */}
        <label style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>Product Images (max 4)</label>
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
              style={{
                display: "none",
              }}
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
                  width: 22,
                  height: 22,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 4px #0002",
                }}
                aria-label="Remove image"
              >
                ×
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
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
