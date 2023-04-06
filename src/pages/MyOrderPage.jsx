import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import InputSearchMobile from "../components/input/InputSearchMobile";
import { useSelector } from "react-redux";
import Menu from "../components/layout/Menu";
import axiosClient from "../axios/configAxios";
import { Table } from "../components/table";
import { ActionDelete, ActionEdit, ActionView } from "../drafts/action";
import convertTimestampToDateTime from "../utils/convertTime";
import formatPrice from "../utils/formatPrice";
import styled from "styled-components";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderStyles = styled.div`
  margin-top: 50px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const MyOrderPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const username = user?.username;
  const accessToken = user?.accessToken;
  const [listOrder, setListOrder] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await axiosClient.request({
          method: "get",
          url: `/getOrderByUser/${username}`,
          headers: {
            token: `Bearer ${accessToken}`,
          },
        });
        setListOrder(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  const handleDeleteOrder = (id) => {
    Swal.fire({
      title: "Bạn muốn xoá đơn hàng này?",
      text: "Thao tác này sẽ khiến đơn hàng bị xoá vĩnh viễn!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosClient.request({
            method: "delete",
            url: `/deleteOrder/${id}`,
            headers: {
              token: `Bearer ${accessToken}`,
            },
          });
          const updatedList = listOrder.filter((item) => item._id !== id); // Filter out deleted product from list
          setListOrder(updatedList); // Update state
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (err) {
          toast.error("Đã xẩy ra lỗi");
        }
      }
    });
  };

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
                <th>Ngày mua</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listOrder.length > 0 &&
                listOrder.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{convertTimestampToDateTime(item.createdAt)}</td>
                    <td className="">
                      <p className="text-red-500 truncate">
                        {formatPrice(item.totalAmount)}đ
                      </p>
                    </td>
                    <td>{item.status}</td>
                    <td>
                      <div className="flex items-center gap-x-3 text-gray-500">
                        <ActionView
                          onClick={() => {
                            navigate(`/order-detail/${item._id}`);
                          }}
                        ></ActionView>
                        {item.status === "Chờ xác nhận" && (
                          <ActionDelete
                            onClick={() => handleDeleteOrder(item._id)}
                          ></ActionDelete>
                        )}
                      </div>
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

export default MyOrderPage;
