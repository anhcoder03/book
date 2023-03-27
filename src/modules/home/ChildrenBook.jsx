import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import GetData from "../../components/common/GetData";
import ChildrenBookItem from "./ChildrenBookItem";

// import LiteratureItem from "./LiteratureItem";

const ChildrenBookStyles = styled.div`
  margin-top: 50px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: #fff;
  .heading {
    padding: 10px 15px;
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    color: #000;
  }
  @media screen and (max-width: 768px) {
    .heading {
      width: auto;
      font-size: 20px;
      padding: 0;
    }
    hr {
      display: none;
    }
    .load-more {
      background-color: transparent;
      width: auto;
    }
  }
`;

const ChildrenBook = ({ data }) => {
  const listBook = data?.data;
  return (
    <ChildrenBookStyles>
      <div className="flex items-center justify-between mb-5">
        <h1 className="heading">Sách Thiếu Nhi</h1>
        <hr className="w-full" />
        <NavLink
          className="load-more w-[150px] ml-5 block bg-primary text-center
        py-3 px-4 text-xs rounded text-black  lg:text-white"
          to={"/product"}
        >
          Xem thêm <i className="fa-solid fa-arrow-right"></i>
        </NavLink>
      </div>
      <div className="celeb-list grid grid-cols-2 lg:grid-cols-5 gap-3">
        {listBook.length > 0 &&
          listBook.map((item) => (
            <ChildrenBookItem item={item} key={item._id}></ChildrenBookItem>
          ))}
      </div>
    </ChildrenBookStyles>
  );
};
// /product_of_category/:category
export default GetData(ChildrenBook, "/product_of_category/sach-thieu-nhi");
