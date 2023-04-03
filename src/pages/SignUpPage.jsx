import React, { useEffect, useState } from "react";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { Field } from "../components/field";
import { Button } from "../components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import axiosClient from "../axios/configAxios";

const schema = yup.object({
  fullname: yup.string().required("Vui lòng nhập fullname!"),
  username: yup.string().required("Vui lòng nhập username!"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu!")
    .min(8, "Mật khẩu ít nhất phải 8 ký tự!"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu nhập lại không khớp!"),
  email: yup
    .string()
    .required("Vui lòng nhập email!")
    .email("Vui lòng nhập đúng định dạng email!"),
});
const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (values) => {
    const { rePassword, ...newValue } = values;
    try {
      if (!isValid) return;
      await axiosClient.request({
        method: "post",
        url: "/register",
        data: newValue,
      });
      toast.success("Đăng ký tài khoản thành công !");
      navigate("/sign-in");
    } catch (err) {
      console.log(err);
    }
  };
  const [togglePassword, setTogglePassword] = useState(false);
  useEffect(() => {
    const arrayError = Object.values(errors);
    if (arrayError.length > 0) {
      toast.error(arrayError[0]?.message);
    }
  }, [errors]);
  useEffect(() => {
    document.title = "Sign Up";
  }, []);
  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Please enter you fullname"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            name="username"
            placeholder="Please enter you username"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type={togglePassword ? "text" : "password"}
            name="password"
            placeholder="Please enter you password"
            control={control}
          >
            {!togglePassword ? (
              <IconEyeClose
                onClick={() => {
                  setTogglePassword((t) => !t);
                }}
              ></IconEyeClose>
            ) : (
              <IconEyeOpen
                onClick={() => {
                  setTogglePassword((t) => !t);
                }}
              ></IconEyeOpen>
            )}
          </Input>
        </Field>
        <Field>
          <Label htmlFor="rePassword">Re-Password</Label>
          <Input
            type={togglePassword ? "text" : "password"}
            name="rePassword"
            placeholder="Please enter you re-password"
            control={control}
          >
            {!togglePassword ? (
              <IconEyeClose
                onClick={() => {
                  setTogglePassword((t) => !t);
                }}
              ></IconEyeClose>
            ) : (
              <IconEyeOpen
                onClick={() => {
                  setTogglePassword((t) => !t);
                }}
              ></IconEyeOpen>
            )}
          </Input>
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            name="email"
            placeholder="Please enter you email"
            control={control}
          ></Input>
        </Field>
        <div className="have-account">
          You already have an account? <NavLink to={"/sign-in"}>Login</NavLink>
        </div>
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
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
