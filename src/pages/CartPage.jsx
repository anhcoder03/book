import React from "react";
import ListCart from "../components/cart/ListCart";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";

function CartPage() {
  return (
    <>
      <Header></Header>
      <Menu></Menu>
      <div className="container">
        <ListCart></ListCart>
      </div>
      <Footer></Footer>
    </>
  );
}

export default CartPage;
