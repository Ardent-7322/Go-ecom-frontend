import { Box, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerifyPayment } from "../../api/payment-api";

export const PostOrder = () => {
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!confirm) {
      setConfirm(true);
      confirmOrder();
    }
  }, []);

  const confirmOrder = async () => {
    const { response, message } = await VerifyPayment();
    if (response && response.status === "succeeded") {
      setSuccess(true);
    } else {
      setSuccess(false);
      console.log(`Error: ${message}`);
    }
    setLoading(false);
  };

  return (
    <Container style={{
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      paddingTop: 80,
    }}>
      {loading ? (
        <Box style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
        }}>
          <CircularProgress color="warning" size={60} />
          <p style={{ fontSize: 16, fontWeight: 500, color: "#555" }}>
            Confirming your order...
          </p>
        </Box>
      ) : success ? (
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "#d1fae5", display: "flex",
            alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px",
            fontSize: 36,
          }}>
            ✓
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", margin: "0 0 12px" }}>
            Order Placed!
          </h1>
          <p style={{ fontSize: 15, color: "#666", margin: "0 0 32px", lineHeight: 1.6 }}>
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 28px", borderRadius: 6,
              background: "#1a1a1a", color: "#fff",
              border: "none", fontSize: 14,
              fontWeight: 600, cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center", maxWidth: 480 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "#fee2e2", display: "flex",
            alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px",
            fontSize: 36,
          }}>
            ✕
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", margin: "0 0 12px" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: 15, color: "#666", margin: "0 0 32px" }}>
            Your payment was processed but we couldn't confirm your order. Please contact support.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 28px", borderRadius: 6,
              background: "#1a1a1a", color: "#fff",
              border: "none", fontSize: 14,
              fontWeight: 600, cursor: "pointer",
            }}
          >
            Go Home
          </button>
        </div>
      )}
    </Container>
  );
};