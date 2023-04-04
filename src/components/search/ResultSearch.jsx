import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ResultSearchStyle = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  z-index: 9;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 10px 15px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  gap: 20px 0;

  .product-item {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .product-image {
    height: 100%;
  }
  .product-title {
    font-size: 12px;
  }
  .product-image img {
    object-fit: cover;
    /* width: 100%; */
    width: 60px;
    height: 100%;
  }
  @media screen and (max-width: 767.98px) {
    width: 90%;
    margin: 0 20px;
    top: 100%;
    .product-item {
      max-height: 80px;
      gap: 20px;
    }
    .product-image {
      width: 50px;
    }
    .product-name {
      width: 70%;
    }
    .product-title {
      font-size: 12px;
    }
  }
`;
function ResultSearch({ data, show = true, nodeRef }) {
  return (
    <>
      {show && (
        <ResultSearchStyle>
          {data.length > 0 ? (
            data.map((item) => (
              <div className="product-item" key={item._id}>
                <div className="product-image">
                  <img src={item.image} alt="" />
                </div>
                <div className="product-name">
                  <NavLink to={`/product-detail/${item.slug}`}>
                    <p className="product-title">{item.title}</p>
                  </NavLink>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full text-xs italic font-thin leading-9 text-center transition-all">
              No products
            </div>
          )}
        </ResultSearchStyle>
      )}
    </>
  );
}

export default ResultSearch;
