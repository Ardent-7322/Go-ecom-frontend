import React from "react";
import { CategoryModel } from "../../types";
import { useNavigate } from "react-router-dom";

interface CategoryProps {
  cats: CategoryModel[];
  selectedCategoryId?: string;
  onSelectCategory?: (categoryId?: string) => void;
}

export const CategorySlider: React.FC<CategoryProps> = ({ cats, selectedCategoryId, onSelectCategory }) => {
  const navigate = useNavigate();

  if (!Array.isArray(cats) || cats.length === 0) return null;

  const handleClick = (item: CategoryModel) => {
    if (onSelectCategory) {
      onSelectCategory(String(item.id));
    } else {
      navigate(`/category/${item.id}`);
    }
  };

  return (
    <div style={{
      width: "92%",
      background: "#fff",
      borderRadius: 10,
      padding: "18px 20px",
      border: "1px solid #e8e0d8",
    }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: "#999", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 0.8 }}>
        Categories
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {onSelectCategory && (
          <button
            onClick={() => onSelectCategory(undefined)}
            style={{
              border: `1px solid ${!selectedCategoryId ? "#1a1a1a" : "#e8e0d8"}`,
              background: !selectedCategoryId ? "#1a1a1a" : "#fff",
              color: !selectedCategoryId ? "#fff" : "#555",
              padding: "5px 14px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            All
          </button>
        )}
        {cats.map((item) => {
          const isSelected = String(selectedCategoryId) === String(item.id);
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              style={{
                border: `1px solid ${isSelected ? "#1a1a1a" : "#e8e0d8"}`,
                background: isSelected ? "#1a1a1a" : "#fff",
                color: isSelected ? "#fff" : "#555",
                padding: "5px 14px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
