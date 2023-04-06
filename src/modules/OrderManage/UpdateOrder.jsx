import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axios/configAxios";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styled from "styled-components";
import DashboardHeading from "../../drafts/DashboardHeading";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import DropdownStatusOrder from "../../drafts/DropdownStatusOrder";
import { toast } from "react-toastify";

const FormUpdateStyles = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
`;
const statusOrder = {
  pending: "Chờ xác nhận",
  rejected: "Thất bại",
  success: "Thành công",
};
const UpdateOrder = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const navigate = useNavigate();
  const schema = yup.object({
    status: yup
      .string()
      .required("Vui lòng chọn trạng thái giao hàng!")
      .oneOf(["Chờ xác nhận", "Thất bại", "Thành công"]),
  });
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const handleGetOrder = async () => {
      const response = await axiosClient.request({
        method: "get",
        url: `getOrderById/${id}`,
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      // reset(response.data);
      console.log(response);
    };
    handleGetOrder();
  }, [id]);
  const handleUpdate = async (values) => {
    try {
      await axiosClient
        .request({
          method: "put",
          url: `/updateOrder/${id}`,
          data: values,
          headers: {
            token: `Bearer ${accessToken}`,
          },
        })
        .then((data) => {
          toast.success(data.message);
          navigate("/manage/order");
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
  return (
    <div>
      <DashboardHeading title="Update Order"></DashboardHeading>
      <FormUpdateStyles className="form" onSubmit={handleSubmit(handleUpdate)}>
        <Field>
          <Label htmlFor="status">Status</Label>
          <DropdownStatusOrder
            control={control}
            setValue={setValue}
            name="status"
            data={statusOrder}
          ></DropdownStatusOrder>
        </Field>
        <Button
          type="submit"
          style={{
            maxWidth: 300,
            margin: "0 auto",
          }}
          width={"100%"}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update Status
        </Button>
      </FormUpdateStyles>
    </div>
  );
};

export default UpdateOrder;
