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

  const handleCategoryClick = (item: CategoryModel) => {
    if (onSelectCategory) {
      onSelectCategory(String(item.id));  // numeric id, not _id
    } else {
      navigate(`/category/${item.id}`);   // numeric id
    }
  };

  return (
    <div style={{
      width: "92%",
      background: "#fff",
      borderRadius: 12,
      padding: "20px 24px",
      border: "1px solid #EBEBEB",
    }}>
      <p style={{
        fontSize: 15, fontWeight: 700, margin: "0 0 16px",
        color: "#1a1a1a",
      }}>
        Categories
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {onSelectCategory && (
          <button
            onClick={() => onSelectCategory(undefined)}
            style={{
              border: `1px solid ${!selectedCategoryId ? "#333" : "#ddd"}`,
              background: !selectedCategoryId ? "#1a1a1a" : "#fff",
              color: !selectedCategoryId ? "#fff" : "#555",
              padding: "6px 14px",
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
          const isSelected = selectedCategoryId === item._id;
          return (
            <button
              key={item._id}
              onClick={() => handleCategoryClick(item)}
              style={{
                border: `1px solid ${isSelected ? "#333" : "#ddd"}`,
                background: isSelected ? "#1a1a1a" : "#fff",
                color: isSelected ? "#fff" : "#555",
                padding: "6px 14px",
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
