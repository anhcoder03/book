import React from "react";
import { useSelector } from "react-redux";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";

function CartPage() {
  const listCart = useSelector((state) => state.cart);
  console.log(listCart);
  return (
    <>
      <Header></Header>
      <Menu></Menu>
      <div className="container">Cartpage</div>
      <Footer></Footer>
    </>
  );
}

export default CartPage;
