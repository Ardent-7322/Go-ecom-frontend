import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../state/hooks";
import { CategoryModel, ProductModel } from "../../types";
import { FetchCategories, FetchProducts } from "../../api/product-api";
import { sellerCategories, setProducts } from "../../state/reducers/productSlice";
import { TopPrducts } from "../TopProducts";

const CategoryPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, categories } = useAppSelector(state => state.productReducer);

    useEffect(() => {
        // Always refetch when category changes
        onFetchCategories();
        onFetchProducts();
    }, [id]);

    const onFetchProducts = async () => {
        const { data } = await FetchProducts();
        if (data) dispatch(setProducts(data as ProductModel[]));
    };

    const onFetchCategories = async () => {
        const { data } = await FetchCategories();
        if (data) dispatch(sellerCategories(data as CategoryModel[]));
    };

    const selectedCategory = useMemo(
        () => categories.find(cat =>
            String(cat._id) === String(id) || String(cat.id) === String(id)
        ),
        [categories, id]
    );

    const filteredProducts = useMemo(() => {
        if (!id || !products.length) return [];

        return products.filter(product => {
            // Backend sends category_id as number, id param is string
            return String(product.category_id) === String(id);
        });
    }, [products, id]);
    return (
        <div style={{ width: "92%", margin: "24px auto 60px" }}>
            <button
                onClick={() => navigate("/")}
                style={{
                    cursor: "pointer",
                    border: "1px solid #ddd",
                    background: "#fff",
                    borderRadius: 6,
                    padding: "7px 16px",
                    fontWeight: 600,
                    fontSize: 13,
                    marginBottom: 20,
                    color: "#333",
                }}
            >
                ← Back
            </button>

            <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 700, color: "#1a1a1a" }}>
                {selectedCategory ? selectedCategory.name : "Category"}
                <span style={{ fontSize: 13, fontWeight: 400, color: "#888", marginLeft: 10 }}>
                    ({filteredProducts.length} products)
                </span>
            </h2>

            <TopPrducts products={filteredProducts} />
        </div>
    );
};

export default CategoryPage;
