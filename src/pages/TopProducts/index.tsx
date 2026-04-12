import React from "react";
import { ProductModel } from "../../types";
import placeholderImage from "../../images/place_holder.jpg";
import { AppCSS } from "../../components";
import { useNavigate } from "react-router-dom";

interface TopProductsProps {
  products: ProductModel[];
}

const ProductCard: React.FC<{ item: ProductModel }> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product-details/${item.id}`)}
      style={{
        width: 220,
        minWidth: 220,
        borderRadius: 16,
        background: "#fff",
        border: `1px solid ${AppCSS.BORDER}`,
        cursor: "pointer",
        overflow: "hidden",
        transition: "all 0.25s ease",
        position: "relative",
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-6px)";
        el.style.boxShadow = "0 16px 40px rgba(108,60,225,0.16)";
        el.style.borderColor = AppCSS.PRIMARY;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "";
        el.style.boxShadow = "";
        el.style.borderColor = AppCSS.BORDER;
      }}
    >
      {/* Image area */}
      <div style={{
        width: "100%", height: 180,
        background: AppCSS.GRAD_CARD,
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

      {/* Stock badge */}
      {item.stock !== undefined && (
        <div style={{
          position: "absolute", top: 10, right: 10,
          background: item.stock > 0 ? AppCSS.GREEN : AppCSS.DANGER,
          color: "#fff", fontSize: 10, fontWeight: 700,
          padding: "3px 8px", borderRadius: 20, letterSpacing: 0.5,
        }}>
          {item.stock > 0 ? "IN STOCK" : "SOLD OUT"}
        </div>
      )}

      {/* Info */}
      <div style={{ padding: "14px 16px 16px" }}>
        <p style={{
          fontSize: 14, fontWeight: 600, color: AppCSS.BLACK,
          margin: 0, marginBottom: 4,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {item.name}
        </p>
        <p style={{
          fontSize: 12, color: AppCSS.GRAY, margin: 0, marginBottom: 10,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {item.description || "Premium quality product"}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontSize: 18, fontWeight: 800, color: AppCSS.PRIMARY,
            fontFamily: "'Sora', sans-serif",
          }}>
            ${Number(item.price).toFixed(2)}
          </span>
          <button
            style={{
              background: AppCSS.GRAD_PRIMARY,
              color: "#fff", border: "none",
              borderRadius: 20, padding: "6px 14px",
              fontSize: 12, fontWeight: 700, cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export const TopPrducts: React.FC<TopProductsProps> = ({ products }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div style={{
        width: "92%", background: "#fff",
        borderRadius: 20, padding: "40px",
        textAlign: "center", color: AppCSS.GRAY,
        border: `1px solid ${AppCSS.BORDER}`,
      }}>
        <p style={{ fontSize: 40, marginBottom: 12 }}>🛍️</p>
        <p style={{ fontSize: 16, fontWeight: 600 }}>No products yet</p>
        <p style={{ fontSize: 14, marginTop: 6 }}>Check back soon for new arrivals!</p>
      </div>
    );
  }

  return (
    <div style={{
      width: "92%",
      background: "#fff",
      borderRadius: 20,
      padding: "28px 28px 32px",
      border: `1px solid ${AppCSS.BORDER}`,
      boxShadow: "0 4px 24px rgba(108,60,225,0.06)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <p style={{
            fontSize: 22, fontWeight: 800, margin: 0,
            color: AppCSS.BLACK, fontFamily: "'Sora', sans-serif",
          }}>
            Top Products
          </p>
          <p style={{ fontSize: 13, color: AppCSS.GRAY, margin: "4px 0 0" }}>
            Handpicked favourites just for you
          </p>
        </div>
        <a href="#" style={{
          fontSize: 13, fontWeight: 600, color: AppCSS.PRIMARY,
          textDecoration: "none",
          padding: "6px 16px", borderRadius: 20,
          border: `1px solid ${AppCSS.PRIMARY}`,
          transition: "all 0.2s",
        }}>View all</a>
      </div>

      <div style={{
        display: "flex", flexDirection: "row", gap: 16,
        overflowX: "auto", paddingBottom: 8,
        scrollbarWidth: "thin",
      }}>
        {products.map(item => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
