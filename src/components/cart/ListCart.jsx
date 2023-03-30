import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
} from "../../redux/cart/cartSlice";
import formatPrice from "../../utils/formatPrice";
import { Button } from "../button";

const ListCartStyles = styled.div`
  margin-top: 50px;
  background-color: white;
  .cart-wrapper {
    margin-top: 20px;
    padding: 20xp;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  .cart-content,
  .cart-header {
    display: flex;
    padding: 20px 50px;
  }
  .cart-bottom {
    padding: 10px 20px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  .cart-header {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  .cart-content {
    border-bottom: 1px solid #f1f1f1;
  }
  .cart-header__left,
  .cart-content__left {
    width: 50%;
  }
  .cart-header__right,
  .cart-content__right {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cart-content__info {
    display: flex;
    align-items: center;
  }
  .cart-content__info img {
    width: 80px;
    object-fit: cover;
  }
  .cart-content__info span {
    font-size: 16px;
    font-weight: 500;
  }
  .price {
    color: red;
    font-size: 14px;
    font-weight: 500;
  }
  .totalPrice {
    color: red;
    font-size: 18px;
    font-weight: 600;
  }
  .quantity-title {
    font-size: 18px;
    font-weight: 600;
  }
  .quantity-wrapper {
    display: flex;
    align-items: center;
    gap: 30px;
    padding: 5px 15px;
    border-radius: 8px;
    border: 1px solid gray;
    max-width: 200px;
    justify-content: space-between;
  }
  .quantity-button {
    font-size: 24px;
    font-weight: 600;
    color: gray;
  }
  .cart-delete {
    cursor: pointer;
  }
  .cart-delete:hover {
    color: red;
  }
  .no-cart {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
  }
  @media screen and (max-width: 767.98px) {
    .cart-delete,
    .cart-header {
      display: none;
    }
    .cart-content {
      flex-direction: column;
      gap: 20px;
    }
    .cart-content__left {
      width: 100%;
    }
    .cart-content__right {
      gap: 20px;
    }
    .cart-price {
      display: none;
    }
    .cart-bottom {
      padding-top: 10px;
      flex-direction: column;
      width: 100%;
    }
    .cart-bottom button {
      width: 200px;
    }
    .no-cart p {
      font-size: 14px;
    }
    .no-cart button {
      width: 200px;
      height: 50px;
    }
  }
`;

const ListCart = () => {
  const listCart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  return (
    <ListCartStyles>
      <div className="cart-header">
        <div className="cart-header__left">Sản phẩm</div>
        <div className="cart-header__right">
          <div className="cart-header-item">Đơn giá</div>
          <div className="cart-header-item">Số lượng</div>
          <div className="cart-header-item">Số tiền</div>
          <div className="cart-header-item">Thao tác</div>
        </div>
      </div>
      <div className="cart-wrapper">
        {listCart.length > 0 ? (
          listCart.map((item) => (
            <div className="cart-content" key={item.id}>
              <div className="cart-content__left">
                <div className="cart-content__info">
                  <img src={item.image} alt={item.image} />
                  <span>{item.title}</span>
                </div>
              </div>
              <div className="cart-content__right">
                <div className="cart-price">{formatPrice(item.price)}đ</div>
                <div className="cart-content-item">
                  <div className="quantity-wrapper">
                    <button
                      className="quantity-button"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-content-item">
                  <span className="price">
                    {formatPrice(item.price * item.quantity)}đ
                  </span>
                </div>
                <div
                  className="cart-delete"
                  onClick={() => dispatch(deleteItem(item.id))}
                >
                  Xoá
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-cart">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn8T6ADaMld2sfLFu6mR1dK7_G53ibKSnoCJTMkwP4YWvi64XuLZMPYDRoRWyXvGTqpIM&usqp=CAU"
              alt=""
            />
            <p>Không có sản phẩm nào trong giỏ hàng</p>
            <NavLink to={"/product"}>
              <Button width={"250px"}>Mua ngay</Button>
            </NavLink>
          </div>
        )}
      </div>
      <div className="cart-bottom">
        <div className="totalPrice">Tổng tiền: {formatPrice(totalPrice)}đ</div>
        <div className="cart-header-item">
          <Button height={"50px"} width={"250px"}>
            Thanh toán
          </Button>
        </div>
      </div>
    </ListCartStyles>
  );
};

export default ListCart;
