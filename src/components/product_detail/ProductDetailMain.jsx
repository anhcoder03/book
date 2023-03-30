import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addItem } from "../../redux/cart/cartSlice";
import formatPrice from "../../utils/formatPrice";
import { Button } from "../button";
import Quantity from "../quantity/Quantity";
import StarRating from "../rating/StarRating";

const ProductDetailMainStyles = styled.div`
  margin-top: 50px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 12px;
  .product-wrapper {
    padding: 30px;
    display: flex;
  }
  .product-image {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product-image img {
    display: block;
    max-width: 400px;
  }
  .product-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  .product-info {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .product-year,
  .product-author {
    font-weight: 500;
  }
  .product-price {
    font-size: 24px;
    font-weight: 600;
    color: ${(props) => props.theme.red};
  }
  .addToCart {
    margin-top: 60px;
    display: flex;
    gap: 50px;
  }
  @media screen and (max-width: 767.98px) {
    .product-wrapper {
      flex-direction: column;
      gap: 50px;
    }
    .product-image img {
      max-width: 200px;
    }
    .product-image {
      width: 100%;
    }
    .product-title {
      font-size: 18px;
    }
    .product-info {
      font-size: 16px;
    }
    .btn-add {
      width: 100%;
    }
  }
`;
function ProductDetailMain({
  reviewCount,
  averageScore,
  id,
  title,
  image,
  author,
  year,
  price,
}) {
  console.log(averageScore);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: id,
        title: title,
        price: price,
        quantity: quantity,
      })
    );
  };
  return (
    <ProductDetailMainStyles>
      <div className="product-wrapper">
        <div className="product-image">
          <img src={image} alt={title} />
        </div>
        <div className="product-content">
          <h2 className="product-title">{title}</h2>
          <h4 className="product-info">
            <span>Tác giả:</span>
            <span className="product-author">{author}</span>
          </h4>
          <h4 className="product-info">
            <span>Năm xuất bản: </span>
            <span className="product-year">{year}</span>
          </h4>
          <div className="flex items-center mt-3">
            <StarRating rating={averageScore}></StarRating>
            <span>({reviewCount} đánh giá)</span>
          </div>
          <p className="product-info">
            <span>Giá: </span>
            <span className="product-price">
              {price && formatPrice(price)} đ
            </span>
          </p>
          <Quantity quantity={quantity} setQuantity={setQuantity}></Quantity>
          <div className="addToCart">
            <Button
              height={"50px"}
              onClick={handleAddToCart}
              className="btn-add"
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>
    </ProductDetailMainStyles>
  );
}

export default ProductDetailMain;
