import React, { useState } from "react";
import PayPalButton from "../common/paypal-button";

// Dummy addresses
const dummyAddresses = [
  { id: "a1", label: "Home", address: "123 Main St, Mumbai, MH" },
  { id: "a2", label: "Work", address: "456 Office Rd, Pune, MH" },
  { id: "a3", label: "Other", address: "789 Lane, Bengaluru, KA" },
];

const OrderDetailsForm = () => {
  const [orderName, setOrderName] = useState("");
  const [addresses, setAddresses] = useState(dummyAddresses);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddresses[0].id);
  const [adding, setAdding] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newAddressLabel, setNewAddressLabel] = useState("");
  const [checkoutId, setCheckoutId] = useState(null);
  const [amount] = useState(1999); // Example amount

  const handleAddAddress = () => {
    if (newAddress.trim() && newAddressLabel.trim()) {
      const id = "a" + (addresses.length + 1);
      setAddresses([
        ...addresses,
        { id, label: newAddressLabel.trim(), address: newAddress.trim() },
      ]);
      setSelectedAddress(id);
      setNewAddress("");
      setNewAddressLabel("");
      setAdding(false);
    }
  };

  const handleCheckout = () => {
    setCheckoutId("dummy-checkout-id-123");
  };

  const handleSuccess = (order) => {
    console.log("Payment successful!", order);
  };

  const handleFailure = (error) => {
    console.log("Payment failed!", error);
  };

  return (
    <div
      style={{
        background: "#f7f7f9",
        borderRadius: 16,
        padding: 20,
        width: "min(420px, 90vw)",
        minWidth: 260,
        maxWidth: 480,
        boxSizing: "border-box",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>
        Order Details
      </div>

      {/* Order Name */}
      <div>
        <label style={{ fontWeight: 600, fontSize: 14, marginBottom: 3, display: "block" }}>
          Name for Order
        </label>
        <input
          type="text"
          value={orderName}
          onChange={(e) => setOrderName(e.target.value)}
          placeholder="Enter your name"
          style={{
            width: "100%",
            padding: "7px 10px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 13,
            outline: "none",
          }}
        />
      </div>

      {/* Address Selection */}
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 5 }}>
          Delivery Address
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {addresses.map((addr) => (
            <label
              key={addr.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                cursor: "pointer",
                background: selectedAddress === addr.id ? "#ececec" : "transparent",
                borderRadius: 8,
                padding: "6px 8px",
              }}
            >
              <input
                type="radio"
                name="address"
                checked={selectedAddress === addr.id}
                onChange={() => setSelectedAddress(addr.id)}
                style={{ marginTop: 2 }}
              />
              <div>
                <div style={{ fontWeight: 500, fontSize: 13 }}>{addr.label}</div>
                <div style={{ fontSize: 12, color: "#555" }}>{addr.address}</div>
              </div>
            </label>
          ))}
        </div>

        {/* Add new address */}
        {!adding ? (
          <button
            style={{
              marginTop: 10,
              background: "none",
              border: "none",
              color: "#c93939c8",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              padding: 0,
              textAlign: "left",
            }}
            onClick={() => setAdding(true)}
          >
            + Add new address
          </button>
        ) : (
          <div style={{ marginTop: 10 }}>
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter new address"
              style={{
                width: "100%",
                padding: "7px 10px",
                borderRadius: 8,
                border: "1px solid #ddd",
                fontSize: 13,
                outline: "none",
                marginBottom: 6,
              }}
            />
            <input
              type="text"
              value={newAddressLabel}
              onChange={(e) => setNewAddressLabel(e.target.value)}
              placeholder="Label (e.g. Home, Work)"
              style={{
                width: "100%",
                padding: "7px 10px",
                borderRadius: 8,
                border: "1px solid #ddd",
                fontSize: 13,
                outline: "none",
                marginBottom: 6,
              }}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <button
                style={{
                  background: "#c93939c8",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "7px 14px",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
                onClick={handleAddAddress}
              >
                Add
              </button>
              <button
                style={{
                  background: "none",
                  color: "#888",
                  border: "none",
                  borderRadius: 8,
                  padding: "7px 14px",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setAdding(false);
                  setNewAddress("");
                  setNewAddressLabel("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Checkout / PayPal */}
      <div>
        {!checkoutId ? (
          <button
            style={{
              width: "100%",
              background: "#c93939c8",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              border: "none",
              borderRadius: 8,
              padding: "12px 0",
              marginTop: 8,
              cursor: "pointer",
            }}
            onClick={handleCheckout}
          >
            Continue to Payment
          </button>
        ) : (
          <PayPalButton
            amount={amount}
            onSuccess={handleSuccess}
            onFail={handleFailure}
          />
        )}
      </div>
    </div>
  );
};

export default OrderDetailsForm;
