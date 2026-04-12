import { ReactNode, useEffect } from "react";
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

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, paddingBottom: 60 }}>
      {/* Hero carousel */}
      <div style={{ width: "100%" }}>
        <DealsPage />
      </div>

      {/* Categories */}
      <CategorySlider cats={categories} />

      {/* Products */}
      <TopPrducts products={products} />

      {/* Trust bar */}
      <div style={{
        width: "92%", display: "flex", justifyContent: "space-around",
        background: "#fff", borderRadius: 20, padding: "24px 28px",
        border: "1px solid #E8E4F5", flexWrap: "wrap", gap: 16,
      }}>
        {[
          { icon: "🚚", title: "Free Shipping", sub: "On orders above $50" },
          { icon: "🔒", title: "Secure Payment", sub: "256-bit SSL encryption" },
          { icon: "↩️", title: "Easy Returns", sub: "30-day return policy" },
          { icon: "🎧", title: "24/7 Support", sub: "Always here to help" },
        ].map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: "#EDE8FD", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 22,
              flexShrink: 0,
            }}>{f.icon}</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, margin: 0, color: "#1E1A2E" }}>{f.title}</p>
              <p style={{ fontSize: 12, color: "#9B93B8", margin: 0 }}>{f.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
