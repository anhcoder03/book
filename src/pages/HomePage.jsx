import React from "react";
import styled from "styled-components";
import InputSearchMobile from "../components/input/InputSearchMobile";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";
import Slider from "../components/layout/Slider";
import ChildrenBook from "../modules/home/ChildrenBook";
import Literature from "../modules/home/Literature";
import Service from "../modules/home/Service";

const HomePageStyles = styled.div``;

const HomePage = () => {
  return (
    <HomePageStyles>
      <Header></Header>
      <Menu></Menu>
      <InputSearchMobile></InputSearchMobile>
      <Slider></Slider>
      <div className="container">
        <Service></Service>
        <Literature></Literature>
        <ChildrenBook></ChildrenBook>
      </div>
      <Footer></Footer>
    </HomePageStyles>
  );
};

export default HomePage;
