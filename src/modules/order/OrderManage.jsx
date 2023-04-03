import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios/configAxios";
import { Table } from "../../components/table";
import { ActionDelete, ActionEdit, ActionView } from "../../drafts/action";
import DashboardHeading from "../../drafts/DashboardHeading";
import convertTimestampToDateTime from "../../utils/convertTime";
import formatPrice from "../../utils/formatPrice";

const OrderManage = () => {
  const navigate = useNavigate();
  const [listOrder, setListOrder] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await axiosClient.request({
          method: "get",
          url: `/getOrders?page=${nextPage}`,
        });
        setListOrder(data.data);
        // setPageCount(Math.ceil(data.totalPage));
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, [nextPage]);
  return (
    <>
      <DashboardHeading title="Quản lý giỏ hàng"></DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Username</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Tổng tiền</th>
            <th>Ngày mua</th>
            <th>Trạng thái</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listOrder.length > 0 &&
            listOrder.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td className="truncate max-w-[200px]">{item.email}</td>
                <td className="max-w-[200px]">
                  <span className="text-gray-500 truncate">0{item.phone}</span>
                </td>
                <td className="">
                  <p className="text-red-500 truncate">
                    {formatPrice(item.totalAmount)}đ
                  </p>
                </td>
                <td>{convertTimestampToDateTime(item.createdAt)}</td>
                <td>{item.status}</td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <ActionView
                      onClick={() => {
                        navigate(`/manage/order_detail/${item._id}`);
                      }}
                    ></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update_order/${item._id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                    // onClick={() => handleDeleteProduct(item._id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default OrderManage;
