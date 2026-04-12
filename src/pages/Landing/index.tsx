import { ReactNode, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import DealsPage from "../Deals";
import { CategorySlider } from "../Category/CategorySlider";
import { useAppSelector } from "../../state/hooks";
import { CategoryModel, ProductModel } from "../../types";
import { FetchCategories, FetchProducts } from "../../api/product-api";
import { sellerCategories, setProducts } from "../../state/reducers/productSlice";
import { TopPrducts } from "../TopProducts";

interface LandingPageProps {
  dashboard?: ReactNode;
}

const LandingPage: React.FC<LandingPageProps> = () => {
  const dispatch = useDispatch();
  const { products, categories } = useAppSelector(state => state.productReducer);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);

  useEffect(() => {
    onFetchCategories();
    onFetchProducts();
  }, []);

  const onFetchProducts = async () => {
    const { data } = await FetchProducts();
    if (data) dispatch(setProducts(data as ProductModel[]));
  };

  const onFetchCategories = async () => {
    const { data } = await FetchCategories();
    if (data) dispatch(sellerCategories(data as CategoryModel[]));
  };

  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId) return products;
    return (products || []).filter((item) => {
      const catId = String(item.category_id).trim();
      const selId = String(selectedCategoryId).trim();
      return catId === selId;
    });
  }, [products, selectedCategoryId]);

  const selectedCategoryName = useMemo(() => {
    if (!selectedCategoryId) return "All Products";
    const cat = (categories || []).find(
      (item) => String(item._id) === String(selectedCategoryId)
    );
    return cat?.name || "Selected Category";
  }, [categories, selectedCategoryId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, paddingBottom: 60 }}>
      <div style={{ width: "100%" }}>
        <DealsPage />
      </div>

      <CategorySlider
        cats={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
      />

      <TopPrducts
        products={filteredProducts}
        title={selectedCategoryName}
        subtitle={selectedCategoryId ? `Showing products in ${selectedCategoryName}` : undefined}
      />

      {/* Trust bar - minimal */}
      <div style={{
        width: "92%", display: "flex", justifyContent: "space-around",
        background: "#fff", borderRadius: 10, padding: "20px 24px",
        border: "1px solid #EBEBEB", flexWrap: "wrap", gap: 12,
      }}>
        {[
          { title: "Free Shipping", sub: "On orders above ₹4,000" },
          { title: "Secure Payment", sub: "256-bit SSL encryption" },
          { title: "Easy Returns", sub: "30-day return policy" },
          { title: "24/7 Support", sub: "Always here to help" },
        ].map((f, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <p style={{ fontSize: 13, fontWeight: 700, margin: 0, color: "#1a1a1a" }}>{f.title}</p>
            <p style={{ fontSize: 11, color: "#888", margin: "2px 0 0" }}>{f.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
