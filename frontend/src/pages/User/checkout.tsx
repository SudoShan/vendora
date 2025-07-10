import OrderDetailsForm from "../../components/user/order-details-form";
import OrderSummary from "../../components/user/order-summary";

const checkout = () => {
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
      }}
    >
      <div style={{ flex: 1, maxWidth: 520 }}>
        <OrderDetailsForm />
      </div>
      <div style={{ flex: 1, maxWidth: 520 }}>
        <OrderSummary />
      </div>
    </div>
  );
};

export default checkout;