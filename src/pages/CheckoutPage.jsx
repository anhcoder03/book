import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";

const CheckoutPage = () => {
  const listCart = useSelector((state) => state.cart.items);
  console.log(listCart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  return (
    <>
      <Header></Header>
      <Menu></Menu>
      <div className="container"></div>
      <Footer></Footer>
    </>
  );
};

export default CheckoutPage;
