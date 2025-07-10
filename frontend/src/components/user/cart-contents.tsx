import React from "react";

// Dummy cart data for demonstration

export interface CartProduct {
  id: string;
  name: string;
  category: string;
  size?: string;
  quantity: number;
  price: number;
  image: string;
}

export const cartProducts: CartProduct[] = [
  {
    id: "p1",
    name: "Classic T-Shirt",
    category: "wearable",
    size: "M",
    quantity: 2,
    price: 499,
    image: "https://via.placeholder.com/60x60?text=TShirt",
  },
  {
    id: "p2",
    name: "Bluetooth Headphones",
    category: "electronics",
    quantity: 1,
    price: 1999,
    image: "https://via.placeholder.com/60x60?text=Headphones",
  },
  {
    id: "p3",
    name: "Sneakers",
    category: "wearable",
    size: "9",
    quantity: 1,
    price: 2499,
    image: "https://via.placeholder.com/60x60?text=Sneakers",
  },
  {
    id: "p4",
    name: "Coffee Mug",
    category: "home",
    quantity: 3,
    price: 299,
    image: "https://via.placeholder.com/60x60?text=Mug",
  },
];

const CartContents: React.FC<{
  products?: CartProduct[];
  onQtyChange?: (id: string, qty: number) => void;
  onRemove?: (id: string) => void;
}> = ({
  products = cartProducts,
  onQtyChange = () => {},
  onRemove = () => {},
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
    {products.map((prod) => (
      <div
        key={prod.id}
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
          src={prod.image}
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
          <div style={{ fontWeight: 600, fontSize: 15 }}>{prod.name}</div>
          {prod.size && (
            <div
              style={{
                fontSize: 12,
                color: "#888",
                marginTop: 1,
              }}
            >
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
            <span
              style={{
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              ₹{prod.price}
            </span>
            {/* Qty controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
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
                }}
                onClick={() => onQtyChange(prod.id, prod.quantity - 1)}
                disabled={prod.quantity <= 1}
              >
                –
              </button>
              <span
                style={{
                  minWidth: 18,
                  textAlign: "center",
                  fontWeight: 600,
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
                }}
                onClick={() => onQtyChange(prod.id, prod.quantity + 1)}
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
            }}
            onClick={() => onRemove(prod.id)}
          >
            Remove
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default CartContents;
