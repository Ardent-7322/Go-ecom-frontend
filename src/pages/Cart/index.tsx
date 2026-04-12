/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import { AppCSS, TapButton } from "../../components";
import { useEffect, useState } from "react";
import { CartModel } from "../../types";
import { FetchCartItemsApi } from "../../api/product-api";
import { useAppSelector } from "../../state/hooks";
import { Container } from "../../utils/globalstyled";
import ProductPlaceholder from "../../images/product_placeholder.jpg";
import { CollectPaymentApi } from "../../api/payment-api";
import { MakePayment } from "../Payment";
import { formatUsdAsInr } from "../../utils/currency";

interface PaymentCredential {
  secret: string;
  publishableKey: string;
}

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartModel[]>([]);
  const [appFee, setAppFee] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [paymentCredential, setPaymentCredential] = useState<PaymentCredential | false>(false);
  const [orderLoading, setOrderLoading] = useState(false);

  const userReducer = useAppSelector((state) => state.userReducer);
  const profile = userReducer.userProfile;
  const authToken = profile?.token || localStorage.getItem("token") || "";

  useEffect(() => {
    onGetCartItems();
  }, []);

  const getTotal = () => appFee + productPrice;

  const onInitPayment = async () => {
    setOrderLoading(true);
    const { data, message } = await CollectPaymentApi(authToken);
    if (data) {
      const credential = data as PaymentCredential;
      if (credential?.secret && credential?.publishableKey) {
        setPaymentCredential(credential);
      } else {
        navigate("/post-order");
      }
    } else {
      alert(message || "Failed to initiate payment. Please try again.");
    }
    setOrderLoading(false);
  };

  const onGetCartItems = async () => {
    if (!authToken) return;
    const { data, message } = await FetchCartItemsApi(authToken);
    if (data) {
      setAppFee(Number(data.appFee));
      const items = data.cartItems as CartModel[];
      if (Array.isArray(items)) {
        const totalAmount = items.reduce(
          (sum, item) => sum + Number(item.price) * item.item_qty,
          0
        );
        setProductPrice(totalAmount);
      }
      setCartItems(items);
    } else {
      console.log(`Cart fetch error: ${message}`);
    }
  };

  if (!authToken) {
    return (
      <Container style={{ width: "80%", paddingTop: 60, textAlign: "center" }}>
        <p style={{ fontSize: 20, fontWeight: 600, color: "#1a1a1a", marginBottom: 20 }}>
          Login to view your cart
        </p>
        <TapButton
          title="Login"
          bgColor={AppCSS.ORANGE}
          radius={6}
          height={44}
          width={160}
          onTap={() => navigate("/login")}
        />
      </Container>
    );
  }

  if (paymentCredential) {
    return (
      <Container style={{ width: "80%", paddingTop: 20 }}>
        <MakePayment
          totalAmount={getTotal()}
          clientSecret={paymentCredential.secret}
          pk={paymentCredential.publishableKey}
          onSuccess={(paymentId: string) => navigate(`/post-order?id=${paymentId}`)}
          onFailed={() => navigate("/failed-order")}
        />
      </Container>
    );
  }

  return (
    <Container style={{ width: "80%", paddingTop: 24 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", margin: "0 0 20px" }}>
        Your Cart ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})
      </h2>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
          <p style={{ fontSize: 16, fontWeight: 600 }}>Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            style={{ marginTop: 16, padding: "8px 20px", borderRadius: 6, border: "1px solid #ddd", cursor: "pointer", background: "#fff", fontSize: 13 }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {/* Cart items */}
          <div style={{ flex: 3, minWidth: 300 }}>
            {cartItems.map((item) => (
              <div
                key={item.item_id}
                style={{
                  display: "flex", alignItems: "center", gap: 16,
                  border: "1px solid #EBEBEB", borderRadius: 8,
                  padding: "14px 16px", marginBottom: 12, background: "#fff",
                }}
              >
                <img
                  src={item.image_url || ProductPlaceholder}
                  alt={item.name}
                  onError={(e) => { (e.target as HTMLImageElement).src = ProductPlaceholder; }}
                  style={{ width: 80, height: 80, objectFit: "contain", flexShrink: 0, borderRadius: 6, background: "#F7F7F7" }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>{item.name}</p>
                  <p style={{ fontSize: 13, color: "#888", margin: "4px 0 0" }}>Qty: {item.item_qty}</p>
                </div>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", margin: 0, flexShrink: 0 }}>
                  {formatUsdAsInr(Number(item.price) * item.item_qty)}
                </p>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div style={{
            flex: 1, minWidth: 240,
            border: "1px solid #EBEBEB", borderRadius: 8,
            padding: "20px", background: "#fff", height: "fit-content",
          }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", margin: "0 0 16px" }}>Order Summary</p>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "#555" }}>Subtotal</span>
              <span style={{ fontSize: 13, color: "#1a1a1a" }}>{formatUsdAsInr(productPrice)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: "#555" }}>Tax & Fee</span>
              <span style={{ fontSize: 13, color: "#1a1a1a" }}>{formatUsdAsInr(appFee)}</span>
            </div>
            <div style={{ borderTop: "1px solid #EBEBEB", paddingTop: 14, display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>Total</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>{formatUsdAsInr(getTotal())}</span>
            </div>

            <button
              onClick={onInitPayment}
              disabled={orderLoading}
              style={{
                width: "100%", height: 44, borderRadius: 6,
                background: orderLoading ? "#ccc" : "#1a1a1a",
                color: "#fff", border: "none",
                fontSize: 14, fontWeight: 600,
                cursor: orderLoading ? "not-allowed" : "pointer",
              }}
            >
              {orderLoading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CartPage;
