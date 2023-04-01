import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams, useLocation } from "react-router-dom";
import axiosClient from "../axios/configAxios";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";
import * as yup from "yup";
import ProductDescription from "../components/product_detail/ProductDescription";
import ProductDetailMain from "../components/product_detail/ProductDetailMain";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "../components/button";
import { toast } from "react-toastify";
import { Textarea } from "../components/textarea";
import styled from "styled-components";
import convertTimestampToDateTime from "../utils/convertTime";
import ProductSimilar from "../components/product_detail/ProductSimilar";
import { Rating, Tab, Tabs } from "@mui/material";
import TabPanel from "../components/tabpanel/Tabpanel";

const CommentStyles = styled.div`
  margin-top: 30px;
  .commentBtn {
    max-width: 300px;
    margin: 0 auto;
    margin-top: 20px;
  }
  @media screen and (max-width: 767.98px) {
    .heading {
      font-size: 20px;
    }
    .commentBtn {
      width: 100%;
      height: 50px;
      margin-top: 20px;
    }
  }
`;

const TabStyles = styled.div`
  padding: 30px;
  margin-top: 30px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 12px;
`;

function ProductDetailPage() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [rating, setRating] = React.useState(5);
  const username = user?.username;
  const userImage = user?.image;
  const accessToken = user?.accessToken;
  const location = useLocation();
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  const [listComment, setListComment] = useState([]);
  const [renderPage, setRenderPage] = useState(false);
  const schema = yup.object({
    review: yup.string().required("Vui long nhập nội dung đánh giá"),
  });
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleGetProduct = async () => {
    const response = await axiosClient.request({
      method: "get",
      url: `getProduct/${slug}`,
    });
    setProduct(response.data);
  };
  useEffect(() => {
    handleGetProduct();
  }, [slug, renderPage]);
  const {
    _id,
    image,
    title,
    price,
    year,
    desc,
    author,
    category,
    average_score,
    review_count,
  } = product;
  const productId = _id;
  const handleGetComment = async () => {
    const response = await axiosClient.request({
      method: "get",
      url: `getCommentAll/${_id}`,
    });
    setListComment(response.data);
  };
  useEffect(() => {
    handleGetComment();
  }, [_id, slug, renderPage]);
  const handleSubmitComment = async (values) => {
    if (!isValid) return;
    try {
      await axiosClient
        .request({
          method: "post",
          url: `/addComment`,
          data: { ...values, rating, username, productId, userImage },
          headers: {
            token: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          toast.success("Bình luận sản phẩm thành công");
          setRenderPage(true);
        });
    } catch (error) {
      console.log(error);
      const message = error.response.data.message;
      toast.error(message);
    }
  };
  useEffect(() => {
    const arrayError = Object.values(errors);
    if (arrayError.length > 0) {
      toast.error(arrayError[0]?.message);
    }
  }, [errors]);
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <>
      <Header></Header>
      <Menu></Menu>
      <div className="container">
        <ProductDetailMain
          image={image}
          title={title}
          author={author}
          year={year}
          id={_id}
          price={price}
          averageScore={average_score}
          reviewCount={review_count}
        ></ProductDetailMain>
        <TabStyles>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Mô tả" {...a11yProps(0)} />
            <Tab label="Đánh giá" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <ProductDescription desc={desc}></ProductDescription>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CommentStyles className="comment-wrraper">
              <div className="listComment mt-8">
                {listComment.length > 0 ? (
                  listComment.map((item) => (
                    <div key={item._id} className="mb-5">
                      <div className="flex gap-x-4 items-center">
                        <img
                          src={item?.userImage}
                          className="w-[40px] h-[40px] rounded-full object-cover"
                          alt={item.title}
                        />
                        <div className="">
                          <p className="font-medium">{item.username}</p>
                          <p className="flex items-center text-xs lg:text-lg">
                            <Rating readOnly value={item?.rating} />
                            <span>
                              {convertTimestampToDateTime(item.createdAt)}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm">{item.review}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center  text-primary">
                    Chưa có đánh giá nào cho sản phẩm này.
                  </p>
                )}
              </div>
              {!user ? (
                <div>
                  <h1 className=" mt-10 text-sm lg:text:lg font-semibold">
                    Để lại đánh giá cho sản phẩm này
                  </h1>
                  <p className="mt-10 text-center">
                    Đăng nhập mới có thể đánh giá sản phẩm.
                  </p>
                  <NavLink
                    to="/sign-in"
                    className={"mt-2 text-center text-blue-400 block"}
                  >
                    Đăng nhập
                  </NavLink>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(handleSubmitComment)}
                  className="comment"
                >
                  <h1 className=" mt-10 text-lg font-semibold">
                    Để lại đánh giá cho sản phẩm này
                  </h1>
                  <div className="rating mt-5 ">
                    <h3 className="font-semibold text-xs lg:text-sm text-[#666]">
                      Đánh giá sao *
                    </h3>
                    <span className="flex gap-x-1">
                      <Rating
                        name="rating"
                        value={rating}
                        onChange={(event, newValue) => {
                          setRating(newValue);
                        }}
                      />
                    </span>
                  </div>
                  <Textarea
                    children={"Viết đánh giá cho sản phẩm này *"}
                    name={"review"}
                    control={control}
                  ></Textarea>
                  <Button
                    type="submit"
                    className="commentBtn"
                    width={"100%"}
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Bình luận
                  </Button>
                </form>
              )}
            </CommentStyles>
          </TabPanel>
        </TabStyles>

        <ProductSimilar category={category}></ProductSimilar>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ProductDetailPage;
