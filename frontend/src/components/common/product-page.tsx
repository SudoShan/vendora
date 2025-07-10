import React, { useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../../types/product";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "sonner";
import Header from "../../layouts/User/header";

// Dummy product data
export const dummyProducts: Product[] = [
  {
    _id: "p1",
    name: "Classic T-Shirt",
    price: 499,
    discount: 10,
    description: "A comfortable cotton t-shirt for everyday wear. Available in multiple colors and sizes.",
    sellername: "WearWell",
    image: [
      "https://picsum.photos/400/400?random=1",
      "https://picsum.photos/400/400?random=2",
      "https://picsum.photos/400/400?random=3"
    ],
    category: "wearable",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    _id: "p2",
    name: "Bluetooth Headphones",
    price: 1999,
    discount: 20,
    description: "Wireless headphones with noise cancellation and long battery life.",
    sellername: "SoundPro",
    image: [
      "https://picsum.photos/400/400?random=4",
      "https://picsum.photos/400/400?random=5"
    ],
    category: "electronics",
  },
  {
    _id: "p3",
    name: "Sneakers",
    price: 2499,
    discount: 15,
    description: "Stylish sneakers for all-day comfort and performance.",
    sellername: "ShoeMart",
    image: [
      "https://picsum.photos/400/400?random=6",
      "https://picsum.photos/400/400?random=7"
    ],
    category: "wearable",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    _id: "p4",
    name: "Coffee Mug",
    price: 299,
    discount: 5,
    description: "Elegant ceramic mug for your daily coffee.",
    sellername: "HomeEssence",
    image: [
      "https://picsum.photos/400/400?random=8"
    ],
    category: "home",
  },
  {
    _id: "p5",
    name: "Leather Wallet",
    price: 799,
    discount: 18,
    description: "Premium leather wallet with multiple compartments.",
    sellername: "UrbanStyle",
    image: [
      "https://picsum.photos/400/400?random=9"
    ],
    category: "other",
  },
  {
    _id: "p6",
    name: "Analog Wrist Watch",
    price: 1299,
    discount: 25,
    description: "Classic analog watch with a leather strap.",
    sellername: "TimeKeepers",
    image: [
      "https://picsum.photos/400/400?random=10"
    ],
    category: "other",
  },
  {
    _id: "p7",
    name: "Yoga Mat",
    price: 599,
    discount: 12,
    description: "Non-slip yoga mat for all types of exercises.",
    sellername: "FitLife",
    image: [
      "https://picsum.photos/400/400?random=11"
    ],
    category: "other",
  },
  {
    _id: "p8",
    name: "Cotton Hoodie",
    price: 999,
    discount: 22,
    description: "Warm and comfortable cotton hoodie for winter.",
    sellername: "WearWell",
    image: [
      "https://picsum.photos/400/400?random=12"
    ],
    category: "wearable",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    _id: "p9",
    name: "Laptop Backpack",
    price: 1599,
    discount: 30,
    description: "Spacious and durable backpack for laptops.",
    sellername: "BagZone",
    image: [
      "https://picsum.photos/400/400?random=13"
    ],
    category: "other",
  },
  {
    _id: "p10",
    name: "Ceramic Vase",
    price: 499,
    discount: 10,
    description: "Handcrafted ceramic vase for home decor.",
    sellername: "HomeEssence",
    image: [
      "https://picsum.photos/400/400?random=14"
    ],
    category: "home",
  },
  {
    _id: "p11",
    name: "Sports Shorts",
    price: 399,
    discount: 15,
    description: "Breathable sports shorts for running and gym.",
    sellername: "FitLife",
    image: [
      "https://picsum.photos/400/400?random=15"
    ],
    category: "wearable",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    _id: "p12",
    name: "Bluetooth Speaker",
    price: 1999,
    discount: 35,
    description: "Portable Bluetooth speaker with deep bass.",
    sellername: "MusicWorld",
    image: [
      "https://picsum.photos/400/400?random=16"
    ],
    category: "electronics",
  },
  {
    _id: "p13",
    name: "Travel Mug",
    price: 349,
    discount: 8,
    description: "Insulated travel mug for hot and cold drinks.",
    sellername: "HomeEssence",
    image: [
      "https://picsum.photos/400/400?random=17"
    ],
    category: "home",
  },
  {
    _id: "p14",
    name: "Formal Shirt",
    price: 899,
    discount: 20,
    description: "Elegant formal shirt for office and events.",
    sellername: "WearWell",
    image: [
      "https://picsum.photos/400/400?random=18"
    ],
    category: "wearable",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    _id: "p15",
    name: "Wireless Mouse",
    price: 699,
    discount: 18,
    description: "Ergonomic wireless mouse with long battery life.",
    sellername: "TechStore",
    image: [
      "https://picsum.photos/400/400?random=19"
    ],
    category: "electronics",
  },
  {
    _id: "p16",
    name: "Running Shoes",
    price: 2999,
    discount: 28,
    description: "Lightweight running shoes for all terrains.",
    sellername: "ShoeMart",
    image: [
      "https://picsum.photos/400/400?random=20"
    ],
    category: "wearable",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    _id: "p17",
    name: "Desk Lamp",
    price: 599,
    discount: 14,
    description: "LED desk lamp with adjustable brightness.",
    sellername: "HomeEssence",
    image: [
      "https://picsum.photos/400/400?random=21"
    ],
    category: "home",
  },
  {
    _id: "p18",
    name: "Graphic Tee",
    price: 549,
    discount: 16,
    description: "Trendy graphic tee for casual wear.",
    sellername: "WearWell",
    image: [
      "https://picsum.photos/400/400?random=22"
    ],
    category: "wearable",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    _id: "p19",
    name: "Wireless Charger",
    price: 899,
    discount: 24,
    description: "Fast wireless charger for smartphones.",
    sellername: "TechStore",
    image: [
      "https://picsum.photos/400/400?random=23"
    ],
    category: "electronics",
  },
  {
    _id: "p20",
    name: "Denim Jeans",
    price: 1299,
    discount: 19,
    description: "Classic fit denim jeans for everyday style.",
    sellername: "WearWell",
    image: [
      "https://picsum.photos/400/400?random=24"
    ],
    category: "wearable",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    _id: "p21",
    name: "Table Clock",
    price: 499,
    discount: 11,
    description: "Minimalist table clock for your workspace.",
    sellername: "TimeKeepers",
    image: [
      "https://picsum.photos/400/400?random=25"
    ],
    category: "other",
  },
  {
    _id: "p22",
    name: "Sunglasses",
    price: 799,
    discount: 21,
    description: "UV-protected stylish sunglasses.",
    sellername: "UrbanStyle",
    image: [
      "https://picsum.photos/400/400?random=26"
    ],
    category: "other",
  },
  {
    _id: "p23",
    name: "Cotton Socks",
    price: 199,
    discount: 9,
    description: "Soft and comfortable cotton socks.",
    sellername: "WearWell",
    image: [
      "https://picsum.photos/400/400?random=27"
    ],
    category: "wearable",
    sizes: ["S", "M", "L"],
  },
  {
    _id: "p24",
    name: "Fitness Tracker",
    price: 2499,
    discount: 27,
    description: "Track your fitness and health metrics.",
    sellername: "FitLife",
    image: [
      "https://picsum.photos/400/400?random=28"
    ],
    category: "electronics",
  }
];

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // Use dummyProducts as product source
  const product: Product | undefined = dummyProducts.find((p) => p._id === id);

  // For wearables, pick the first available size as default
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.category === "wearable" && product.sizes?.length
      ? product.sizes[0]
      : undefined
  );
  // Track selected image index
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  // Quantity state
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = () => {
    setAdding(true);
    setTimeout(() => {
      setAdding(false);
      toast.success("Product added to cart");
    }, 1200);
  };

  if (!product) {
    return <div style={{ padding: 32 }}>Product not found.</div>;
  }

  return (
    <>
    <Header />
    <div style={{ display: "flex", gap: 48, padding: 48, alignItems: "flex-start", margin: "0 auto", backgroundColor:"white", width: "100%" }}>
      {/* Left: Images */}
      <div style={{ flex: "0 0 380px", display: "flex", flexDirection: "column", gap: 24, marginLeft: 36 }}>
        <div style={{ width: 380, height: 380, borderRadius: 18, overflow: "hidden", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src={product.image[selectedImgIdx]}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", userSelect: "none" }}
            draggable={false}
          />
        </div>
        {/* Thumbnails */}
        <div style={{ display: "flex", gap: 12 }}>
          {product.image.map((img, idx) => (
            <div
              key={idx}
              style={{
                width: 64,
                height: 64,
                borderRadius: 10,
                overflow: "hidden",
                background: "#eee",
                border: selectedImgIdx === idx ? "2px solid #c93939c8" : "2px solid transparent",
                cursor: "pointer",
                boxSizing: "border-box",
              }}
              onClick={() => setSelectedImgIdx(idx)}
            >
              <img src={img} alt={`thumb-${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} draggable={false} />
            </div>
          ))}
        </div>
      </div>
      {/* Right: Details */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 2 }}>{product.name}</div>
        <div style={{ fontSize: 18, color: "#888", marginBottom: 12 }}>
        {"by "}{product.sellername}
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#222", marginBottom: 8 }}>
          ₹{product.price}
          {product.discount > 0 && (
            <span style={{ fontSize: 16, color: "#888", fontWeight: 400, marginLeft: 12, textDecoration: "line-through" }}>
              ₹{Math.round(product.price / (1 - product.discount / 100))}
            </span>
          )}
          {product.discount > 0 && (
            <span style={{ fontSize: 15, color: "#388e3c", fontWeight: 600, marginLeft: 10 }}>
              {product.discount}% OFF
            </span>
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
            }}
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
          >
            –
          </button>
          <span style={{ minWidth: 24, textAlign: "center", fontWeight: 600, fontSize: 16 }}>{quantity}</span>
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
            }}
            onClick={() => setQuantity(q => q + 1)}
          >
            +
          </button>
        </div>
        <div style={{ fontSize: 15, color: "#444", marginBottom: 18, whiteSpace: "pre-line" }}>{product.description || "No description available."}</div>
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
                    boxShadow: selectedSize === size ? "0 2px 8px #c9393933" : undefined,
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
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
            width: 220,
            boxShadow: "0 2px 8px rgba(201,57,57,0.10)",
            opacity: adding ? 0.7 : 1,
            transition: "background 0.2s, opacity 0.2s",
          }}
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
