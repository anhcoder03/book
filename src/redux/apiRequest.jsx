import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
} from "./authSlice";

export const login = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("https://api-book1.onrender.com/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(loginFailed(error.response.data));
  }
};

export const logout = async (dispatch, navigate, accessToken) => {
  dispatch(logoutStart());
  try {
    const res = await axios.post(
      "https://api-book1.onrender.com/logout",
      null,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    if (res.status === 200) {
      dispatch(logoutSuccess());
      navigate("/sign-in");
    } else {
      dispatch(logoutFailed());
    }
  } catch (err) {
    dispatch(logoutFailed());
  }
};
