import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import InputSearchMobile from "../components/input/InputSearchMobile";
import { useSelector } from "react-redux";
import Menu from "../components/layout/Menu";
import axiosClient from "../axios/configAxios";
import { Table } from "../components/table";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import formatPrice from "../utils/formatPrice";

const OrderStyles = styled.div`
  margin-top: 50px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const MyOrderDetailPage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  let { id } = useParams();
  const [listOrderDetail, setListOrderDetail] = useState([]);
  useEffect(() => {
    const handleGetOrderDetail = async () => {
      const response = await axiosClient.request({
        method: "get",
        url: `/getOrderDetail/${id}`,
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      setListOrderDetail(response);
    };
    handleGetOrderDetail();
  }, [id]);

  return (
    <>
      <Header></Header>
      <Menu></Menu>
      <InputSearchMobile></InputSearchMobile>
      <div className="container">
        <OrderStyles>
          <Table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Hình ảnh</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
              </tr>
            </thead>
            <tbody>
              {listOrderDetail &&
                listOrderDetail.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>
                      <img
                        src={item.image || item.title}
                        className="w-[80px]"
                        alt=""
                      />
                    </td>
                    <td>{item.quantity}</td>
                    <td className="">
                      <p className="text-red-500 truncate">
                        {formatPrice(item.price)}đ
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </OrderStyles>
      </div>
      <Footer></Footer>
    </>
  );
};

export default MyOrderDetailPage;
