/* eslint-disable react/jsx-no-undef */
import React from "react";
import { AppCSS, Lbl, Spacer } from "../../components";
import { Elements } from "@stripe/react-stripe-js";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
  PaymentIntentResult,
} from "@stripe/stripe-js";
import { CheckoutForm } from "./PaymentForm";
import { ColDiv } from "../../components/Misc/misc.styled";
import { formatUsdAsInr } from "../../utils/currency";

interface MakePaymentProps {
  clientSecret: string;
  pk: string;
  totalAmount: number;
  onSuccess: Function;
  onFailed: Function;
}

export const MakePayment: React.FC<MakePaymentProps> = ({
  clientSecret,
  pk,
  totalAmount,
  onSuccess,
  onFailed,
}) => {
  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      fontWeightNormal: "500",
      borderRadius: "6px",
      colorBackground: "#ffffff",
      colorPrimary: "#1a1a1a",
      colorPrimaryText: "#ffffff",
      spacingGridRow: "16px",
    },
  };

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  const stripePromise = pk ? loadStripe(pk) : null;

  const onHandleReturnUrl = async (response: PaymentIntentResult) => {
    const { error, paymentIntent } = response;
    if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess(response.paymentIntent.id);
    } else {
      console.log("Payment Failed!", error);
      onFailed(error);
    }
  };

  return (
    <ColDiv style={{ justifyContent: "center", alignItems: "center", padding: "20px 0" }}>
      {/* Order summary card */}
      <div style={{
        width: 420, background: "#fff",
        border: "1px solid #EBEBEB", borderRadius: 10,
        padding: "24px 28px", marginBottom: 24,
      }}>
        <p style={{ fontSize: 13, color: "#888", margin: "0 0 8px", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>
          Order Summary
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>Total Amount</p>
          <p style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>
            {formatUsdAsInr(totalAmount)}
          </p>
        </div>

        {/* Stripe test mode notice */}
        <div style={{
          marginTop: 16, padding: "10px 14px",
          background: "#FFF9E6", border: "1px solid #FDE68A",
          borderRadius: 6, fontSize: 12, color: "#92400e",
        }}>
          <strong>Test Mode:</strong> Use card <code>4242 4242 4242 4242</code>, any future date, any CVC.
        </div>
      </div>

      {/* Stripe Payment form */}
      <div style={{
        width: 420, background: "#fff",
        border: "1px solid #EBEBEB", borderRadius: 10,
        padding: "24px 28px",
      }}>
        <p style={{ fontSize: 13, color: "#888", margin: "0 0 20px", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>
          Payment Details
        </p>
        {pk && clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm onHandleReturn={onHandleReturnUrl} />
          </Elements>
        ) : (
          <ColDiv style={{ alignItems: "center", padding: "20px 0" }}>
            <Lbl title="Loading payment..." />
          </ColDiv>
        )}
      </div>
    </ColDiv>
  );
};
