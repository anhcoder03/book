import React from "react";
import styled from "styled-components";
import Statistical from "../../modules/dashboard/partials/Statistical";
import DashboardHeading from "../../drafts/DashboardHeading";
import { useEffect } from "react";
import axiosClient from "../../axios/configAxios";
import { useState } from "react";
import formatPrice from "../../utils/formatPrice";

const DashboardPageStyles = styled.div``;

const DashboardPage = () => {
  const [statistical, setStatistical] = useState({});
  useEffect(() => {
    async function getData() {
      const response = await axiosClient.request({
        method: "get",
        url: "/statistical",
      });
      setStatistical(response);
      console.log(response);
    }
    getData();
  }, []);
  const {
    countProduct,
    countCategory,
    countUser,
    countComment,
    countOrder,
    countOrderDetail,
    totalAmount,
  } = statistical;
  // const price = formatPrice(totalAmount);
  if (!statistical) return;
  return (
    <DashboardPageStyles>
      <DashboardHeading title="Thống kê"></DashboardHeading>
      <div className="flex items-start justify-between gap-x-5 mb-5">
        <Statistical
          number={countProduct}
          className="bg-green-400"
          icon={<i className="fa-solid fa-folder"></i>}
          title="Sản phẩm"
        ></Statistical>
        <Statistical
          className="bg-red-400"
          number={countCategory}
          icon={<i className="fa-solid fa-list-check"></i>}
          title="Danh mục"
        ></Statistical>
        <Statistical
          number={countUser}
          title="User"
          icon={<i className="fa-regular fa-user"></i>}
          className="bg-pink-400"
        ></Statistical>
        <Statistical
          className="bg-blue-500"
          title="Đánh giá"
          icon={<i className="fa-solid fa-comment"></i>}
          number={countComment}
        ></Statistical>
      </div>
      <div className="flex items-center justify-between gap-x-5">
        <Statistical
          number={countOrder}
          className="bg-purple-500"
          title="Đơn hàng"
        ></Statistical>
        <Statistical
          number={countOrderDetail}
          className="bg-blue-300"
          title="Sản phẩm được mua"
        ></Statistical>
        <Statistical
          className="bg-primary"
          size={"18px"}
          number={formatPrice(totalAmount) + " đ"}
          title="Doanh thu"
        ></Statistical>
      </div>
    </DashboardPageStyles>
  );
};

export default DashboardPage;
