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
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { orderStatus } from "../../utils/constants";
import { LabelStatus } from "../../components/label";

const OrderManage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const navigate = useNavigate();
  const [listOrder, setListOrder] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const handlePageClick = (event) => {
    setNextPage(event.selected + 1);
  };
  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await axiosClient.request({
          method: "get",
          url: `/getOrders?page=${nextPage}`,
          headers: {
            token: `Bearer ${accessToken}`,
          },
        });
        setListOrder(data.data);
        setPageCount(Math.ceil(data.totalPage));
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, [nextPage]);

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
                <td className="text-xs">
                  {convertTimestampToDateTime(item.createdAt)}
                </td>
                <td>
                  {item.status === orderStatus.APPROVED && (
                    <LabelStatus type="success">Thành công</LabelStatus>
                  )}
                  {item.status === orderStatus.PENDING && (
                    <LabelStatus type="warning">Chờ xác nhận</LabelStatus>
                  )}
                  {item.status === orderStatus.REJECTED && (
                    <LabelStatus type="danger">Thất bại</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <ActionView
                      onClick={() => {
                        navigate(`/manage/order_detail/${item._id}`);
                      }}
                    ></ActionView>
                    {item.status !== orderStatus.APPROVED &&
                      item.status !== orderStatus.REJECTED && (
                        <ActionEdit
                          onClick={() =>
                            navigate(`/manage/update_order/${item._id}`)
                          }
                        ></ActionEdit>
                      )}
                    {item.status === orderStatus.PENDING && (
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
      <div className="pb-10">
        <ReactPaginate
          hrefBuilder={() => {
            return "#";
          }}
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          disableInitialCallback={true}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="mb-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-[6px] text-[15px] text-[#ececec] lg:gap-x-3 lg:text-base lg:mb-0 "
          pageLinkClassName="bg-[#33292E] bg-opacity-80 page-link transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
          previousClassName="bg-[#33292E] bg-opacity-80  transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
          nextClassName="bg-[#33292E] nextPage bg-opacity-80  transition-all hover:bg-opacity-100 py-1 px-2 rounded-[5px]"
          activeClassName="page-active text-primary"
          disabledClassName="opacity-40"
          disabledLinkClassName="hover:cursor-default"
        />
      </div>
    </>
  );
};

export default OrderManage;
