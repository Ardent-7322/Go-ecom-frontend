import React from "react";
import { ProductModel } from "../../types";
import placeholderImage from "../../images/place_holder.jpg";
import { useNavigate } from "react-router-dom";
import { formatUsdAsInr } from "../../utils/currency";

interface TopProductsProps {
  products: ProductModel[];
  title?: string;
  subtitle?: string;
}

const ProductCard: React.FC<{ item: ProductModel }> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product-details/${item.id}`)}
      style={{
        width: 196,
        minWidth: 196,
        borderRadius: 8,
        background: "#fff",
        border: "1px solid #e8e0d8",
        cursor: "pointer",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div style={{
        width: "100%", height: 156,
        background: "#FAF7F4",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <img
          src={item.image_url || placeholderImage}
          alt={item.name}
          onError={e => { (e.target as HTMLImageElement).src = placeholderImage; }}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ padding: "12px 14px" }}>
        <p style={{
          fontSize: 13, fontWeight: 600, color: "#1a1a1a",
          margin: "0 0 3px",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {item.name}
        </p>
        <p style={{
          fontSize: 11, color: "#aaa", margin: "0 0 10px",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {item.description || "—"}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>
            {formatUsdAsInr(Number(item.price))}
          </span>
          <span style={{
            fontSize: 10, fontWeight: 500,
            color: item.stock > 0 ? "#2d7a4f" : "#c0392b",
          }}>
            {item.stock > 0 ? "In stock" : "Sold out"}
          </span>
        </div>
      </div>
    </div>
  );
};

export const TopPrducts: React.FC<TopProductsProps> = ({ products, title, subtitle }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div style={{
        width: "92%", background: "#fff",
        borderRadius: 8, padding: "40px",
        textAlign: "center",
        border: "1px solid #e8e0d8",
      }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#555", margin: 0 }}>No products found</p>
        <p style={{ fontSize: 12, marginTop: 6, color: "#aaa" }}>Check back soon for new arrivals.</p>
      </div>
    );
  }

  return (
    <div style={{
      width: "92%",
      background: "#fff",
      borderRadius: 8,
      padding: "20px",
      border: "1px solid #e8e0d8",
    }}>
      {(title || subtitle) && (
        <div style={{ marginBottom: 16 }}>
          {title && <p style={{ fontSize: 15, fontWeight: 700, margin: 0, color: "#1a1a1a" }}>{title}</p>}
          {subtitle && <p style={{ fontSize: 11, color: "#aaa", margin: "3px 0 0" }}>{subtitle}</p>}
        </div>
      )}
      <div style={{
        display: "flex", gap: 12,
        overflowX: "auto", paddingBottom: 4,
        scrollbarWidth: "thin",
      }}>
        {products.map(item => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
