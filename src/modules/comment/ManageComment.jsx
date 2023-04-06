import React, { useEffect, useState } from "react";
import axiosClient from "../../axios/configAxios";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { ActionDelete } from "../../drafts/action";
import { Table } from "../../components/table";
import DashboardHeading from "../../drafts/DashboardHeading";
import { Rating } from "@mui/material";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function ManageComment() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const [listComment, setListComment] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const handlePageClick = (event) => {
    setNextPage(event.selected + 1);
  };
  useEffect(() => {
    const handleGetComment = async () => {
      const response = await axiosClient.request({
        method: "get",
        url: `/getCommentAll?page=${nextPage}`,
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      setListComment(response.data);
      setPageCount(Math.ceil(response.totalPage));
    };
    handleGetComment();
  }, [nextPage]);
  const handleDeleteComment = (id) => {
    Swal.fire({
      title: "Bạn muốn sản phẩm này?",
      text: "Thao tác này sẽ khiến sản phẩm bị xoá vĩnh viễn!",
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
            url: `/deleteComment/${id}`,
            headers: {
              token: `Bearer ${accessToken}`,
            },
          });
          const updatedList = listComment.filter((item) => item._id !== id);
          setListComment(updatedList);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (err) {
          toast.error("Đã xẩy ra lỗi");
        }
      }
    });
  };

  return (
    <div>
      <DashboardHeading title="Quản lý bình luận"></DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>STT</th>
            <th>username</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listComment.length > 0 &&
            listComment.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td className="truncate max-w-[200px]">
                  <Rating readOnly value={item?.rating} />
                </td>
                <td>{item.review}</td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <ActionDelete
                      onClick={() => handleDeleteComment(item._id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className=" mt-5 pb-10">
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
    </div>
  );
}

export default ManageComment;
