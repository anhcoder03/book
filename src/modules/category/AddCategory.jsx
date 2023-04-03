import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axiosClient from "../../axios/configAxios";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { toast } from "react-toastify";
import DashboardHeading from "../../drafts/DashboardHeading";
import { useSelector } from "react-redux";

const FormUpdateStyles = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
`;
const schema = yup.object({
  categoryName: yup.string().required("Vui lòng nhập tên danh mục!"),
});

const AddCategory = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const navigate = useNavigate();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleCreateCategory = async (values) => {
    if (!isValid) return;
    try {
      await axiosClient
        .request({
          method: "post",
          url: `/create_category`,
          data: values,
          headers: {
            token: `Bearer ${accessToken}`,
          },
        })
        .then((data) => {
          toast.success("Thêm danh mục thành công");
          navigate("/manage/category");
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
      <DashboardHeading title="Update User"></DashboardHeading>
      <FormUpdateStyles
        className="form"
        onSubmit={handleSubmit(handleCreateCategory)}
      >
        <Field>
          <Label htmlFor="categoryName">Tên danh mục</Label>
          <Input
            type="text"
            name="categoryName"
            placeholder="Please enter you categoryname"
            control={control}
          ></Input>
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
          Thêm danh mục
        </Button>
      </FormUpdateStyles>
    </div>
  );
};

export default AddCategory;
