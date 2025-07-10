import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
  amount: number;
  onSuccess: (order: Record<string, unknown>) => void;
  onFail?: (error: unknown) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess, onFail }) => {
  return (
    <PayPalScriptProvider
      options={{
        "clientId": "AYTmz4ETsiNMuSBtLkM7wRl5824MUh1m-mlB7u6_U9i0p5EQT18B_MqD1Y5VIrv6y7QpD0kWeSv86pdj",
        currency: "USD",
      }}
    >
      <div>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    value: amount.toFixed(2),
                    currency_code: "USD",
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            if (actions.order) {
              try {
                const order = await actions.order.capture();
                console.log("Order approved:", order);
                onSuccess(order);
              } catch (err) {
                console.error("Capture error:", err);
                onFail?.(err);
              }
            }
          }}
          onError={(err) => {
            console.error("PayPal error:", err);
            onFail?.(err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
