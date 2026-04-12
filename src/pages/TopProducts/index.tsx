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
        width: 200,
        minWidth: 200,
        borderRadius: 10,
        background: "#fff",
        border: "1px solid #EBEBEB",
        cursor: "pointer",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div style={{
        width: "100%", height: 160,
        background: "#F7F7F7",
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

      <div style={{ padding: "12px 14px 14px" }}>
        <p style={{
          fontSize: 13, fontWeight: 600, color: "#1a1a1a",
          margin: 0, marginBottom: 4,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {item.name}
        </p>
        <p style={{
          fontSize: 11, color: "#888", margin: 0, marginBottom: 10,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {item.description || "—"}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>
            {formatUsdAsInr(Number(item.price))}
          </span>
          {item.stock !== undefined && (
            <span style={{
              fontSize: 10, fontWeight: 600,
              color: item.stock > 0 ? "#16a34a" : "#dc2626",
            }}>
              {item.stock > 0 ? "In stock" : "Sold out"}
            </span>
          )}
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
        borderRadius: 10, padding: "40px",
        textAlign: "center", color: "#888",
        border: "1px solid #EBEBEB",
      }}>
        <p style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>No products found</p>
        <p style={{ fontSize: 13, marginTop: 6, color: "#aaa" }}>Check back soon for new arrivals.</p>
      </div>
    );
  }

  return (
    <div style={{
      width: "92%",
      background: "#fff",
      borderRadius: 10,
      padding: "24px",
      border: "1px solid #EBEBEB",
    }}>
      {(title || subtitle) && (
        <div style={{ marginBottom: 20 }}>
          {title && (
            <p style={{ fontSize: 16, fontWeight: 700, margin: 0, color: "#1a1a1a" }}>
              {title}
            </p>
          )}
          {subtitle && (
            <p style={{ fontSize: 12, color: "#888", margin: "4px 0 0" }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div style={{
        display: "flex", flexDirection: "row", gap: 14,
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
