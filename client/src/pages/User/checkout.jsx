import OrderDetailsForm from "../../components/user/order-details-form";
import OrderSummary from "../../components/user/order-summary";
import Header from "../../layouts/Seller/header";
import OneStepBanner from "../../components/common/one-step";

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
        width: "100vw",
        overflowX: "hidden", 
      }}
    >
      <Header />
      <OneStepBanner />
      {/* Main checkout content */}
      <div style={{ flex: 2, maxWidth: 520, marginLeft: "20vw", marginTop: "40px" }}>
        <OrderDetailsForm />
      </div>
      <div style={{ flex: 2, maxWidth: 520, marginTop: "40px"}}>
        <OrderSummary products={[]} />
      </div>
      <div style={{ flex: 1 }} />
    </div>
  );
};

export default checkout;