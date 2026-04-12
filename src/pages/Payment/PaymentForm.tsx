import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

interface CheckoutFormProps {
  onHandleReturn: Function;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onHandleReturn }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMsg("");

    const response = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (response.error) {
      setErrorMsg(response.error.message || "Payment failed. Please try again.");
      setLoading(false);
    } else {
      onHandleReturn(response);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />

      {errorMsg && (
        <p style={{
          color: "#dc2626", fontSize: 13, marginTop: 12,
          padding: "8px 12px", background: "#FEF2F2",
          borderRadius: 6, border: "1px solid #FECACA",
        }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          width: "100%",
          marginTop: 20,
          height: 44,
          background: !stripe || loading ? "#ccc" : "#1a1a1a",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 600,
          cursor: !stripe || loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};
