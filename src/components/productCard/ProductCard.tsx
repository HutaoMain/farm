import {
  Remove,
  Add,
  FavoriteBorder,
  Favorite,
  ShoppingBag,
} from "@mui/icons-material";

import "./ProductCard.css";
import { useCartStore } from "../../zustand/CartStore";
import React, { useEffect, useState } from "react";
import { ProductInterface } from "../../types/Types";
// import { useQuery } from "react-query";
import axios from "axios";
import useAuthStore from "../../zustand/AuthStore";

interface Props {
  product: ProductInterface;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const user = useAuthStore((state) => state.user);
  const addItem = useCartStore((state) => state.addItem);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  // const { data } = useQuery<boolean>(
  //   ["isFavorite", user, product.id],
  //   async () => {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_APP_API_URL}/api/favorite/isFavorite/${user}/${
  //         product.id
  //       }`
  //     );
  //     return response.data;
  //   },
  //   {
  //     onSuccess: (favorite) => {
  //       setIsFavorite(favorite);
  //     },
  //   }
  // );

  useEffect(() => {
    if (product.quantity === 0) {
      setQuantity(0);
    }
  }, [product.quantity]);

  const handleQuantity = (type: string) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      product.quantity > 0 && setQuantity(quantity + 1);
    }

    if (quantity > product.quantity || product.quantity === 0) {
      setQuantity(0);
    }
  };

  const handleCheckAddFavorite = async () => {
    if (!isFavorite) {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/favorite/create`,
        {
          productId: product.id,
          email: user,
        }
      );
      setIsFavorite(true);
      window.location.reload();
    } else {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/favorite/delete/${product.id}`
      );
      setIsFavorite(false);
      window.location.reload();
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addItem(product, quantity);
    } else {
      alert("Quantity is 0");
    }
  };

  return (
    <div className="product-card">
      <section className="product-heart-fav" onClick={handleCheckAddFavorite}>
        {isFavorite ? <Favorite sx={{ color: "red" }} /> : <FavoriteBorder />}
      </section>
      <section className="product-image-container">
        <img
          className="product-image"
          src={product.productImage}
          alt={product.productName}
        />
      </section>
      <section className="product-info-container">
        <section className="product-info">
          {/* <div className="product-name-section">
            <span className="product-category">
              {product.category?.categoryName}
            </span>
            <span className="product-name">{product.productName}</span>
          </div> */}
          <div className="product-price-section">
            <span className="product-price">₱{product.price}.00</span>
          </div>
        </section>
        <section className="product-btns">
          {quantity === 0 ? (
            "Out of stock"
          ) : (
            <div className="product-quantity-btn">
              <Remove
                onClick={() => handleQuantity("dec")}
                style={{ cursor: "pointer", fontSize: "20px" }}
              />
              {/* <span style={{ fontSize: "20px" }}>10</span> */}
              <input
                type="number"
                className="product-amount"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setQuantity(value);
                  if (value > product.quantity) {
                    window.alert(
                      `The quantity cannot add more than ${product.quantity}`
                    );
                    setQuantity(product.quantity);
                  }
                }}
                min="0"
                max={product.quantity}
                disabled={product.quantity < 1}
              />
              <Add
                onClick={() => handleQuantity("inc")}
                style={{ cursor: "pointer", fontSize: "20px" }}
              />
            </div>
          )}

          <div>
            <ShoppingBag
              onClick={handleAddToCart}
              style={{ fontSize: "20px", cursor: "pointer" }}
            />
          </div>
        </section>
      </section>
    </div>
  );
};

export default ProductCard;
