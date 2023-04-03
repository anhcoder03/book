import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios/configAxios";
import { Table } from "../../components/table";
import { ActionDelete, ActionEdit } from "../../drafts/action";
import DashboardHeading from "../../drafts/DashboardHeading";
import formatPrice from "../../utils/formatPrice";
import { useSelector } from "react-redux";

const OrderDetail = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  let { id } = useParams();
  const [listOrderDetail, setListOrderDetail] = useState();
  useEffect(() => {
    const handleGetOrderDetail = async () => {
      const response = await axiosClient.request({
        method: "get",
        url: `/getOrderDetail/${id}`,
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      setListOrderDetail(response);
    };
    handleGetOrderDetail();
  }, [id]);
  return (
    <>
      <DashboardHeading title="Quản lý giỏ hàng"></DashboardHeading>
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
    </>
  );
};

export default OrderDetail;
