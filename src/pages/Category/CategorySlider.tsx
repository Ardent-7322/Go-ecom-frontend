import React from "react";
import { CategoryModel } from "../../types";
import { AppCSS } from "../../components";


interface CategoryProps {
  cats: CategoryModel[];
  selectedCategoryId?: string;
  onSelectCategory?: (categoryId?: string) => void;
}

const CAT_COLORS = [
  ["#6C3CE1", "#3B82F6"],
  ["#F97316", "#EF4444"],
  ["#10B981", "#3B82F6"],
  ["#9B59B6", "#6C3CE1"],
  ["#F59E0B", "#F97316"],
  ["#EF4444", "#9B59B6"],
];

const CAT_ICONS = ["🛍️", "👗", "📱", "🏠", "⚽", "🎨", "📚", "🎵", "🌿", "💎"];

export const CategorySlider: React.FC<CategoryProps> = ({ cats, selectedCategoryId, onSelectCategory }) => {

  if (!Array.isArray(cats) || cats.length === 0) return null;

  return (
    <div style={{
      width: "92%",
      background: "#fff",
      borderRadius: 20,
      padding: "24px 28px",
      border: `1px solid ${AppCSS.BORDER}`,
      boxShadow: "0 4px 24px rgba(108,60,225,0.06)",
    }}>
      <p style={{
        fontSize: 18, fontWeight: 800, margin: "0 0 20px",
        color: AppCSS.BLACK, fontFamily: "'Sora', sans-serif",
      }}>
        Browse Categories
      </p>
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => onSelectCategory ? onSelectCategory(undefined) : {}}
          style={{
            border: `1px solid ${selectedCategoryId ? AppCSS.BORDER : AppCSS.PRIMARY}`,
            background: selectedCategoryId ? "#fff" : AppCSS.PRIMARY_LIGHT,
            color: selectedCategoryId ? AppCSS.GRAY_DARK : AppCSS.PRIMARY,
            padding: "6px 14px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          All Products
        </button>
      </div>

      <div style={{
        display: "flex", flexDirection: "row", gap: 14,
        overflowX: "auto", paddingBottom: 6,
        scrollbarWidth: "thin",
      }}>
        {cats.map((item, idx) => {
          const [c1, c2] = CAT_COLORS[idx % CAT_COLORS.length];
          const icon = CAT_ICONS[idx % CAT_ICONS.length];

          return (
            <div
              key={item._id}
              onClick={() => onSelectCategory ? onSelectCategory(item._id) : {}}
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 10,
                cursor: "pointer", flexShrink: 0, width: 100,
              }}
            >
              <div
                style={{
                  width: 72, height: 72, borderRadius: 20,
                  background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28,
                  boxShadow: `0 6px 20px ${c1}40`,
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px) scale(1.06)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "";
                }}
              >
                {icon}
              </div>
              <span style={{
                fontSize: 12, fontWeight: 600, color: AppCSS.GRAY_DARK,
                textAlign: "center", lineHeight: 1.3,
                overflow: "hidden", textOverflow: "ellipsis",
                display: "-webkit-box", WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical" as any,
                width: "100%",
                border: selectedCategoryId === item._id ? `1px solid ${AppCSS.PRIMARY}` : "1px solid transparent",
                borderRadius: 999,
                padding: "2px 8px",
              }}>
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
