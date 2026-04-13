import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchOrderItemsApi } from "../../api/product-api";
import { useAppSelector } from "../../state/hooks";
import { formatUsdAsInr } from "../../utils/currency";

const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const profile = useAppSelector((state) => state.userReducer.userProfile);

  useEffect(() => { onGetOrders(); }, []);

  const onGetOrders = async () => {
    const data = await FetchOrderItemsApi(profile.token);
    if (data?.orders) {
      setOrders(Array.isArray(data.orders) ? data.orders : [data.orders]);
    }
    setLoading(false);
  };

  return (
    <div style={{ width: "80%", margin: "32px auto 60px" }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", margin: "0 0 24px" }}>My Orders</h2>

      {loading ? (
        <p style={{ color: "#aaa", fontSize: 14 }}>Loading...</p>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", background: "#fff", borderRadius: 8, border: "1px solid #e8ddd4" }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#555" }}>No orders yet</p>
          <p style={{ fontSize: 13, color: "#aaa", margin: "6px 0 20px" }}>Your order history will appear here.</p>
          <button onClick={() => navigate("/")} style={{ padding: "8px 20px", borderRadius: 6, border: "1px solid #e8ddd4", cursor: "pointer", background: "#fff", fontSize: 13, fontWeight: 500 }}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {orders.map((order, idx) => (
            <div key={order.id || idx} style={{ background: "#fff", border: "1px solid #e8ddd4", borderRadius: 8, padding: "18px 20px" }}>
              {/* Order header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>
                    Order #{order.order_ref_number || order.id}
                  </p>
                  <p style={{ fontSize: 11, color: "#aaa", margin: "3px 0 0" }}>
                    {order.CreatedAt ? new Date(order.CreatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : ""}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>
                    {formatUsdAsInr(Number(order.amount || 0))}
                  </p>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#2d7a4f", background: "#e6f4ed", padding: "2px 8px", borderRadius: 20 }}>
                    Confirmed
                  </span>
                </div>
              </div>

              {/* Order items */}
              {Array.isArray(order.items) && order.items.length > 0 && (
                <div style={{ borderTop: "1px solid #f0e8e0", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  {order.items.map((item: any, i: number) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {item.image_url && (
                          <img src={item.image_url} alt={item.name} style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 4, background: "#FAF4EE" }} />
                        )}
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>{item.name}</p>
                          <p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>Qty: {item.qty}</p>
                        </div>
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
                        {formatUsdAsInr(Number(item.price))}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
