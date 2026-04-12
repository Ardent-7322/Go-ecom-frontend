import { useEffect, useState } from "react";
import { FetchProduct, AddToCartApi } from "../../api/product-api";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProduct } from "../../state/reducers/productSlice";
import { ProductModel } from "../../types";
import { useAppSelector } from "../../state/hooks";
import { ColDiv, RowDiv } from "../../components/Misc/misc.styled";
import ProductPlaceholder from "../../images/place_holder.jpg";
import { AppCSS, TapButton } from "../../components";
import { toast } from "react-toastify";
import { formatUsdAsInr } from "../../utils/currency";

export const ProductDetails = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  const productReducer = useAppSelector((state) => state.productReducer);
  const profile = useAppSelector((state) => state.userReducer.userProfile);
  const authToken = profile?.token || localStorage.getItem("token") || "";

  const { currentProduct } = productReducer;

  useEffect(() => {
    if (id) onFetchProduct(id);
  }, [id]);

  const onFetchProduct = async (id: string) => {
    const { message, data } = await FetchProduct(id);
    if (data) {
      dispatch(setProduct(data as ProductModel));
    } else {
      console.log(`Error: ${message}`);
    }
  };

  const onAddToCart = async () => {
    if (!authToken) {
      toast("Please login to add items to cart", { type: "warning" });
      navigate("/login");
      return;
    }
    setAdding(true);
    try {
      const result = await AddToCartApi(currentProduct.id, qty);
      // success if no error flag and no error-like message
      if (result && !result.error && !String(result.message || "").toLowerCase().includes("error")) {
        toast("Added to cart!", { type: "success" });
      } else {
        toast(result?.message || "Failed to add to cart", { type: "error" });
      }
    } catch (e) {
      toast("Something went wrong. Please try again.", { type: "error" });
    } finally {
      setAdding(false);
    }
  };

  return (
    <RowDiv style={{ display: "flex", marginTop: 40, padding: "0 40px", gap: 40, flexWrap: "wrap" }}>
      {/* Image */}
      <ColDiv style={{ width: 440, height: 440, background: "#F7F7F7", borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
        <img
          draggable={false}
          src={currentProduct.image_url || ProductPlaceholder}
          alt={currentProduct.name || "product"}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          onError={(e) => { (e.target as HTMLImageElement).src = ProductPlaceholder; }}
        />
      </ColDiv>

      {/* Details */}
      <ColDiv style={{ flex: 1, minWidth: 280, padding: "10px 0" }}>
        <p style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{currentProduct.name}</p>
        <p style={{ fontSize: 14, color: "#666", marginTop: 10, lineHeight: 1.6 }}>{currentProduct.description}</p>

        <p style={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a", marginTop: 20, marginBottom: 4 }}>
          {formatUsdAsInr(Number(currentProduct.price))}
        </p>
        <p style={{ fontSize: 13, color: currentProduct.stock > 0 ? "#16a34a" : "#dc2626", marginBottom: 20 }}>
          {currentProduct.stock > 0 ? `${currentProduct.stock} in stock` : "Out of stock"}
        </p>

        {/* Qty selector */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #ddd", cursor: "pointer", fontSize: 16, background: "#fff" }}
          >−</button>
          <span style={{ fontSize: 16, fontWeight: 600, minWidth: 24, textAlign: "center" }}>{qty}</span>
          <button
            onClick={() => setQty(Math.min(currentProduct.stock || 99, qty + 1))}
            style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #ddd", cursor: "pointer", fontSize: 16, background: "#fff" }}
          >+</button>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <TapButton
            onTap={onAddToCart}
            title={adding ? "Adding..." : "Add to Cart"}
            bgColor={AppCSS.ORANGE}
            color={AppCSS.WHITE}
            width={150}
            radius={6}
          />
          <TapButton
            onTap={() => navigate("/cart")}
            title="View Cart"
            bgColor="#fff"
            color="#333"
            width={110}
            radius={6}
          />
        </div>
      </ColDiv>
    </RowDiv>
  );
};
