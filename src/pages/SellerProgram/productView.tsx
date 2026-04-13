import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../state/hooks";
import { CategoryModel, ProductModel } from "../../types";
import { FetchCategories, FetchSellerOrders, FetchSellerProducts } from "../../api/product-api";
import { sellerCategories, setOrders, setSellerProducts } from "../../state/reducers/productSlice";
import { AddProductPopup } from "./AddProductPopup";
import { EditProductPopup } from "./EditProductPopup";
import { OrderModel } from "../../types/models/order-model";
import { formatUsdAsInr } from "../../utils/currency";
import PlaceholderIcon from "../../images/product_placeholder.jpg";

const ProductView: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductModel>();
  const [tab, setTab] = useState<"products" | "orders">("products");

  const { sellerProducts, categories, currentSellerOrders } = useAppSelector((s) => s.productReducer);
  const profile = useAppSelector((s) => s.userReducer.userProfile);

  useEffect(() => {
    onFetchProducts();
    onFetchCategories();
    onFetchOrders();
  }, [profile.token]);

  const onFetchProducts = async () => {
    const { data } = await FetchSellerProducts();
    if (data) dispatch(setSellerProducts(data as ProductModel[]));
  };

  const onFetchCategories = async () => {
    const { data } = await FetchCategories();
    if (data) dispatch(sellerCategories(data as CategoryModel[]));
  };

  const onFetchOrders = async () => {
    const { data } = await FetchSellerOrders();
    if (data) dispatch(setOrders(data as OrderModel[]));
  };

  // Stats
  const totalRevenue = Array.isArray(currentSellerOrders)
    ? currentSellerOrders.reduce((sum, o: any) => sum + Number(o.price || 0), 0)
    : 0;

  const tabStyle = (active: boolean) => ({
    padding: "8px 20px", borderRadius: 6, border: "none",
    background: active ? "#5c3d2e" : "transparent",
    color: active ? "#fff" : "#666",
    fontSize: 13, fontWeight: 600, cursor: "pointer",
  });

  return (
    <div style={{ width: "100%" }}>
      {/* Stats bar */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { label: "Total Products", value: sellerProducts?.length || 0 },
          { label: "Total Orders", value: Array.isArray(currentSellerOrders) ? currentSellerOrders.length : 0 },
          { label: "Total Revenue", value: formatUsdAsInr(totalRevenue) },
        ].map((stat, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #e8ddd4", borderRadius: 8, padding: "14px 20px", flex: 1, minWidth: 140 }}>
            <p style={{ fontSize: 11, color: "#aaa", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.5 }}>{stat.label}</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, background: "#f5ede4", padding: 4, borderRadius: 8, width: "fit-content" }}>
        <button style={tabStyle(tab === "products")} onClick={() => setTab("products")}>Products</button>
        <button style={tabStyle(tab === "orders")} onClick={() => setTab("orders")}>Orders</button>
      </div>

      {tab === "products" && (
        <div style={{ background: "#fff", border: "1px solid #e8ddd4", borderRadius: 8, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
              {sellerProducts?.length || 0} Products
            </p>
            <button
              onClick={() => setOpen(true)}
              style={{ background: "#5c3d2e", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            >
              + Add Product
            </button>
          </div>

          {!sellerProducts?.length ? (
            <p style={{ textAlign: "center", color: "#aaa", fontSize: 14, padding: "40px 0" }}>No products yet. Add your first product.</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {sellerProducts.map((item) => (
                <div
                  key={item.id}
                  onClick={() => { setCurrentProduct(item); setEditOpen(true); }}
                  style={{ width: 160, borderRadius: 8, border: "1px solid #e8ddd4", cursor: "pointer", overflow: "hidden", background: "#FAF4EE" }}
                >
                  <img
                    src={item.image_url || PlaceholderIcon}
                    alt={item.name}
                    onError={(e) => { (e.target as HTMLImageElement).src = PlaceholderIcon; }}
                    style={{ width: "100%", height: 120, objectFit: "cover" }}
                  />
                  <div style={{ padding: "10px 12px" }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#5c3d2e", margin: 0 }}>{formatUsdAsInr(item.price)}</p>
                    <p style={{ fontSize: 10, color: item.stock > 0 ? "#2d7a4f" : "#c0392b", margin: "2px 0 0" }}>
                      {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "orders" && (
        <div style={{ background: "#fff", border: "1px solid #e8ddd4", borderRadius: 8, padding: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", margin: "0 0 16px" }}>
            {Array.isArray(currentSellerOrders) ? currentSellerOrders.length : 0} Orders
          </p>

          {!Array.isArray(currentSellerOrders) || currentSellerOrders.length === 0 ? (
            <p style={{ textAlign: "center", color: "#aaa", fontSize: 14, padding: "40px 0" }}>No orders yet.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f0e8e0" }}>
                  {["Date", "Item", "Price", "Action"].map((h) => (
                    <th key={h} style={{ textAlign: "left", fontSize: 11, fontWeight: 600, color: "#aaa", padding: "8px 12px", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(currentSellerOrders as any[]).map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f9f4ef" }}>
                    <td style={{ padding: "10px 12px", fontSize: 12, color: "#555" }}>
                      {row.CreatedAt ? new Date(row.CreatedAt).toLocaleDateString("en-IN") : "—"}
                    </td>
                    <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 500, color: "#1a1a1a" }}>{row.name || "—"}</td>
                    <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{formatUsdAsInr(Number(row.price || 0))}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <button
                        onClick={() => navigate(`/seller-order/${row.id}`)}
                        style={{ fontSize: 12, padding: "4px 12px", borderRadius: 5, border: "1px solid #e8ddd4", background: "#fff", cursor: "pointer", fontWeight: 500 }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <EditProductPopup product={currentProduct} open={editOpen} categories={categories} onClose={() => { onFetchProducts(); setEditOpen(false); }} />
      <AddProductPopup open={open} categories={categories} onClose={() => { onFetchProducts(); setOpen(false); }} />
    </div>
  );
};

export default ProductView;
