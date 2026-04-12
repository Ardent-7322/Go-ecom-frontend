import { useEffect, useState } from "react";
import { FetchProduct, AddToCartApi } from "../../api/product-api";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProduct } from "../../state/reducers/productSlice";
import { ProductModel } from "../../types";
import { useAppSelector } from "../../state/hooks";
import { ColDiv, RowDiv } from "../../components/Misc/misc.styled";
import ProductPlaceholder from "../../images/place_holder.jpg";
import { AppCSS, TapButton } from "../../components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ProductDetails = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const productReducer = useAppSelector((state) => state.productReducer);
  const profile = useAppSelector((state) => state.userReducer.userProfile);
  const authToken = profile?.token || localStorage.getItem("token") || "";

  const { currentProduct } = productReducer;

  useEffect(() => {
    if (id) {
      onFetchProduct(id);
    }
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
    const result = await AddToCartApi(currentProduct.id, qty);
    if (result && !result.message?.includes("error")) {
      toast("Added to cart!", { type: "success" });
    } else {
      toast(result?.message || "Failed to add to cart", { type: "error" });
    }
  };

  return (
    <RowDiv
      style={{
        display: "flex",
        marginTop: 50,
      }}
    >
      <ColDiv style={{ width: 480, height: 480, marginLeft: 50 }}>
        <img
          draggable={false}
          src={currentProduct.image_url || ProductPlaceholder}
          alt={currentProduct.name || "product"}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          onError={(e) => { (e.target as HTMLImageElement).src = ProductPlaceholder; }}
        />
      </ColDiv>
      <ColDiv style={{ padding: 20, background: "#fff", marginRight: 50 }}>
        <p style={{ fontSize: 30, fontWeight: "700" }}>{currentProduct.name}</p>
        <p style={{ fontSize: 16, color: "#666", marginTop: 10 }}>{currentProduct.description}</p>
        <p style={{ fontSize: 28, fontWeight: "700", color: AppCSS.ORANGE, marginTop: 16 }}>
          ${Number(currentProduct.price).toFixed(2)}
        </p>
        <p style={{ fontSize: 14, color: currentProduct.stock > 0 ? "green" : "red", marginTop: 4 }}>
          {currentProduct.stock > 0 ? `${currentProduct.stock} in stock` : "Out of stock"}
        </p>
        <RowDiv style={{ alignItems: "center", marginTop: 20, gap: 12 }}>
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #ddd", cursor: "pointer", fontSize: 18 }}
          >−</button>
          <span style={{ fontSize: 18, fontWeight: "600", minWidth: 24, textAlign: "center" }}>{qty}</span>
          <button
            onClick={() => setQty(Math.min(currentProduct.stock || 99, qty + 1))}
            style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #ddd", cursor: "pointer", fontSize: 18 }}
          >+</button>
        </RowDiv>
        <RowDiv style={{ marginTop: 24, gap: 12 }}>
          <TapButton
            onTap={onAddToCart}
            title="Add to Cart"
            bgColor={AppCSS.ORANGE}
            color={AppCSS.WHITE}
            width={160}
            radius={30}
          />
          <TapButton
            onTap={() => navigate("/cart")}
            title="View Cart"
            bgColor={AppCSS.WHITE}
            color={AppCSS.ORANGE}
            width={120}
            radius={30}
          />
        </RowDiv>
      </ColDiv>
    </RowDiv>
  );
};
