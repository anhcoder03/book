import axios from "axios";
import * as yup from "yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Field from "../components/field/Field";
import { Input } from "../components/input";
import Label from "../components/label/Label";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Button } from "../components/button";
import { toast } from "react-toastify";
import formatPrice from "../utils/formatPrice";
import { deleteAll } from "../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutStyles = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  .listOrder {
    padding: 40px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .orderItem {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    padding: 5px 0;
    justify-content: space-between;
  }
  .orderInfo {
    width: 50%;
  }
  .orderInfo p {
    font-size: 14px;
  }
  .orderInfo img {
    width: 50px;
  }
  .price {
    color: red;
  }
  .totalPrice .price {
    margin-left: 10px;
  }
  .totalPrice {
    margin-top: 10px;
    font-size: 20px;
  }
`;
const FormCheckOutStyles = styled.form`
  width: 70%;
  padding: 40px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const schema = yup.object({
  username: yup.string().required("Vui lòng nhập username!"),
  email: yup
    .string()
    .email("Please enter valid email address!")
    .required("Please enter your email address!"),
  phone: yup.number().required("Vui lòng nhập số điện thoại!"),
  address: yup.string().required("Vui lòng nhập địa chỉ!"),
});

const CheckoutPage = () => {
  const products = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    setValue("username", user.username);
    setValue("email", user.email);
  }, []);
  const handleOrder = async (values) => {
    const newValues = { ...values, totalAmount: totalPrice, products };
    if (!isValid) return;
    try {
      const response = await axios.post(
        "https://api-book1.onrender.com/insertOrder",
        newValues,
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data) {
        dispatch(deleteAll());
        toast.success("Đặt hàng thành công!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const arrayError = Object.values(errors);
    if (arrayError.length > 0) {
      toast.error(arrayError[0]?.message);
    }
  }, [errors]);
  return (
    <>
      <Header></Header>
      <Menu></Menu>
      <div className="container">
        <CheckoutStyles>
          <FormCheckOutStyles onSubmit={handleSubmit(handleOrder)}>
            <div className="form-layout">
              <Field>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Please enter you username"
                  control={control}
                ></Input>
              </Field>
              <Field>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="text"
                  name="email"
                  placeholder="Please enter you email"
                  control={control}
                ></Input>
              </Field>
            </div>
            <div className="form-layout">
              <Field>
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  type="text"
                  name="phone"
                  placeholder="Please enter you phone number"
                  control={control}
                ></Input>
              </Field>
              <Field>
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  type="text"
                  name="address"
                  placeholder="Please enter you address"
                  control={control}
                ></Input>
              </Field>
            </div>
            <Button
              type="submit"
              style={{
                maxWidth: 300,
                margin: "0 auto",
              }}
              width={"100%"}
              height={"50px"}
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Thanh toán
            </Button>
          </FormCheckOutStyles>
          <div className="listOrder">
            {products &&
              products.map((item) => (
                <div className="orderItem" key={item.id}>
                  <div className="orderInfo">
                    <img src={item.image} alt="" />
                    <p>{item.title}</p>
                  </div>
                  <div className="orderPirce">
                    SL: {item.quantity} x{" "}
                    <span className="price">{formatPrice(item.price)}đ</span>
                  </div>
                </div>
              ))}
            <p className="totalPrice">
              Tổng số tiền:
              <span className="price">{formatPrice(totalPrice)}đ</span>
            </p>
          </div>
        </CheckoutStyles>
      </div>
      <Footer></Footer>
    </>
  );
};

export default CheckoutPage;
