import React, { useState, useEffect } from "react";
import PayPalButton from "../common/paypal-button";
import axiosInstance from "../../utils/api";

const OrderDetailsForm = () => {
  const [orderName, setOrderName] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [adding, setAdding] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newAddressLabel, setNewAddressLabel] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editAddress, setEditAddress] = useState("");
  const [editLabel, setEditLabel] = useState("");
  const [checkoutId, setCheckoutId] = useState(null);
  const [amount] = useState(1999); 

  // Fetch addresses from backend
  useEffect(() => {
    async function fetchAddresses() {
      try {
        const res = await axiosInstance.get("/addresses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
          },
        });
        // Flatten addresses array from backend
        const addrArr = res.data.addresses || [];
        setAddresses(
          addrArr.map((a) => ({
            id: a.label,
            label: a.label,
            address: a.address,
          }))
        );
        if (addrArr.length > 0) setSelectedAddress(addrArr[0].label);
      } catch {
        setAddresses([]);
      }
    }
    fetchAddresses();
  }, []);

  // Add new address (backend)
  const handleAddAddress = async () => {
    if (newAddress.trim() && newAddressLabel.trim()) {
      try {
        await axiosInstance.post(
          "/addresses",
          { address: newAddress, label: newAddressLabel },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
            },
          }
        );
        console.log("Address added successfully");
        // Refresh addresses
        const res = await axiosInstance.get("/addresses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
          },
        });
        const addrArr = res.data.addresses || [];
        console.log("Fetched addresses:", addrArr);
        setAddresses(
          addrArr.map((a) => ({
            id: a.label,
            label: a.label,
            address: a.address,
          }))
        );
        console.log(addresses);
        setSelectedAddress(newAddressLabel);
        setNewAddress("");
        setNewAddressLabel("");
        setAdding(false);
      } catch (err) {
        console.error("Error adding address:", err);
      }
    }
  };

  // Edit address (backend)
  const handleEditAddress = (id) => {
    const addr = addresses.find((a) => a.id === id);
    setEditingId(id);
    setEditAddress(addr.address);
    setEditLabel(addr.label);
  };

  const handleSaveEdit = async () => {
    try {
      await axiosInstance.put(
        "/addresses",
        { label: editingId, newAddress: editAddress },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
          },
        }
      );
      // Refresh addresses
      const res = await axiosInstance.get("/addresses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
      });
      const addrArr = res.data.addresses || [];
      setAddresses(
        addrArr.map((a) => ({
          id: a.label,
          label: a.label,
          address: a.address,
        }))
      );
      setEditingId(null);
      setEditAddress("");
      setEditLabel("");
    } catch (err) {
      console.error("Error updating address:", err);
    }
  };

  // Delete address (backend)
  const handleDeleteAddress = async (id) => {
    try {
      await axiosInstance.delete(
        "/addresses",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
          },
          data: { label: id },
        }
      );
      // Refresh addresses
      const res = await axiosInstance.get("/addresses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
        },
      });
      const addrArr = res.data.addresses || [];
      setAddresses(
        addrArr.map((a) => ({
          id: a.label,
          label: a.label,
          address: a.address,
        }))
      );
      if (selectedAddress === id && addrArr.length > 0) {
        setSelectedAddress(addrArr[0].label);
      }
      if (editingId === id) {
        setEditingId(null);
        setEditAddress("");
        setEditLabel("");
      }
    } catch (err) {
      console.error("Error deleting address:", err);
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
        background: "#fff",
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
        overflowX: "hidden", // prevent horizontal scrolling
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 18,
          marginBottom: 4,
          color: "#000",
        }}
      >
        Order Details
      </div>

      {/* Order Name */}
      <div>
        <label
          style={{
            fontWeight: 600,
            fontSize: 14,
            marginBottom: 3,
            display: "block",
            color: "#000",
          }}
        >
          Name for Order
        </label>
        <input
          type="text"
          value={orderName}
          onChange={(e) => setOrderName(e.target.value)}
          placeholder="Enter your name"
          style={{
            width: "93%",
            padding: "7px 10px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 13,
            outline: "none",
            background: "#fff",
            color: "#000",
          }}
        />
      </div>

      {/* Address Selection */}
      <div>
        <div
          style={{
            fontWeight: 600,
            fontSize: 14,
            marginBottom: 5,
            color: "#000",
          }}
        >
          Delivery Address
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {addresses.map((addr) =>
            editingId === addr.id ? (
              <div
                key={addr.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  background: "#f7f7f7",
                  borderRadius: 8,
                  padding: "8px 10px",
                }}
              >
                <input
                  type="text"
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  placeholder="Label"
                  style={{
                    width: "93%",
                    padding: "7px 10px",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    fontSize: 13,
                    outline: "none",
                    marginBottom: 6,
                    background: "#fff",
                    color: "#000",
                  }}
                />
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  placeholder="Address"
                  style={{
                    width: "93%",
                    padding: "7px 10px",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    fontSize: 13,
                    outline: "none",
                    marginBottom: 6,
                    background: "#fff",
                    color: "#000",
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
                      outline: "none",
                    }}
                    onClick={handleSaveEdit}
                  >
                    Save
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
                      outline: "none",
                    }}
                    onClick={() => handleDeleteAddress(addr.id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      background: "none",
                      color: "#c93939c8",
                      border: "none",
                      borderRadius: 8,
                      padding: "7px 14px",
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: "pointer",
                      outline: "none",
                    }}
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <label
                key={addr.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  cursor: "pointer",
                  background:
                    selectedAddress === addr.id ? "#ececec" : "transparent",
                  borderRadius: 8,
                  padding: "6px 8px",
                  color: "#000",
                  position: "relative",
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
                  <div
                    style={{
                      fontWeight: 500,
                      fontSize: 13,
                      color: "#000",
                    }}
                  >
                    {addr.label}
                  </div>
                  <div style={{ fontSize: 12, color: "#555" }}>
                    {addr.address}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    position: "absolute",
                    right: 10,
                    top: 8,
                  }}
                >
                  <button
                    style={{
                      background: "none",
                      color: "#c93939c8",
                      border: "none",
                      borderRadius: 6,
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: "pointer",
                      outline: "none",
                      padding: "2px 8px",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleEditAddress(addr.id);
                    }}
                  >
                    Edit
                  </button>
                  {/* Delete button removed from here */}
                </div>
              </label>
            )
          )}
        </div>

        {/* Add new address */}
        {!adding && editingId === null ? (
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
              outline: "none",
            }}
            onClick={() => setAdding(true)}
          >
            + Add new address
          </button>
        ) : null}
        {adding && editingId === null && (
          <div style={{ marginTop: 10 }}>
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter new address"
              style={{
                width: "93%",
                padding: "7px 10px",
                borderRadius: 8,
                border: "1px solid #ddd",
                fontSize: 13,
                outline: "none",
                marginBottom: 6,
                background: "#fff",
                color: "#000",
              }}
            />
            <input
              type="text"
              value={newAddressLabel}
              onChange={(e) => setNewAddressLabel(e.target.value)}
              placeholder="Label (e.g. Home, Work)"
              style={{
                width: "93%",
                padding: "7px 10px",
                borderRadius: 8,
                border: "1px solid #ddd",
                fontSize: 13,
                outline: "none",
                marginBottom: 6,
                background: "#fff",
                color: "#000",
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
                  outline: "none",
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
                  outline: "none",
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
              background: "linear-gradient(90deg, #c93939 30%, orange 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              border: "none",
              borderRadius: 8,
              padding: "12px 0",
              marginTop: 8,
              cursor: "pointer",
              outline: "none",
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
