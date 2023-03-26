import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";
import ListProduct from "../components/product/ListProduct";

function ProductPage() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return (
    <>
      <Header></Header>
      <Menu></Menu>
      <div className="container">
        <ListProduct></ListProduct>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ProductPage;
