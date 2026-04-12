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
        if (!categories.length) onFetchCategories();
        if (!products.length) onFetchProducts();
    }, []);

    const onFetchProducts = async () => {
        const { data } = await FetchProducts();
        if (data) dispatch(setProducts(data as ProductModel[]));
    };

    const onFetchCategories = async () => {
        const { data } = await FetchCategories();
        if (data) dispatch(sellerCategories(data as CategoryModel[]));
    };

    const selectedCategory = useMemo(
        () => categories.find(cat => String(cat._id) === String(id)),
        [categories, id]
    );

    const filteredProducts = useMemo(() => {
        if (!id) return [];

        return products.filter(product => {
            const productCategoryId = String(product.category_id);
            if (productCategoryId === String(id)) return true;

            if (selectedCategory && Number(productCategoryId) === Number(selectedCategory.id)) return true;

            return false;
        });
    }, [products, id, selectedCategory]);

    return (
        <div style={{ width: "92%", margin: "20px auto 60px" }}>
            <button
                onClick={() => navigate("/")}
                style={{
                    cursor: "pointer",
                    border: "1px solid #E8E4F5",
                    background: "#fff",
                    borderRadius: 8,
                    padding: "8px 12px",
                    fontWeight: 600,
                    marginBottom: 16,
                }}
            >
                Back
            </button>

            <h2 style={{ margin: "0 0 16px", fontSize: 20 }}>
                {selectedCategory ? selectedCategory.name : "Category"}
            </h2>

            <TopPrducts products={filteredProducts} />
        </div>
    );
};

export default CategoryPage;
