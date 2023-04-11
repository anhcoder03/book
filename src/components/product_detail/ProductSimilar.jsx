import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import axiosClient from "../../axios/configAxios";
import ProductItem from "../common/ProductItem";

const ProductSimilarStyles = styled.div`
  margin-top: 50px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 12px;
  padding: 30px;
  .heading {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
  }
`;

const ProductSimilar = ({ category }) => {
  const [productSimilar, setProductSimilar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getProductSimilar = async () => {
    setIsLoading(true);
    const response = await axiosClient.request({
      method: "get",
      url: `/getProductAll?category=${category}`,
    });
    if (!response?.data) setIsLoading(true);
    else setIsLoading(false);
    setProductSimilar(response.data);
  };
  useEffect(() => {
    getProductSimilar();
  }, [category]);
  return (
    <ProductSimilarStyles>
      <h1 className="heading">Sản Phẩm Tương Tự</h1>
      <div className="mt-6 slider_popular">
        <Swiper
          breakpoints={{
            350: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
            1023: {
              slidesPerView: 5,
            },
          }}
          spaceBetween={10}
          slidesPerGroup={5}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {productSimilar &&
            !isLoading &&
            productSimilar.map((item) => (
              <SwiperSlide key={item._id}>
                <ProductItem item={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </ProductSimilarStyles>
  );
};

export default ProductSimilar;
