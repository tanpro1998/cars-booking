import axios from "axios";
import { message } from "antd";

export const userLogin = async (reqObj, dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const res = await axios.post("/api/users/login", reqObj);
    localStorage.setItem("user", JSON.stringify(res.data));
    dispatch({ type: "GET_USER", payload: res.data });
    message.success("Đăng nhập thành công");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    console.log(err);
    message.error("Sai tài khoản hoặc mật khẩu");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = async (reqObj, dispatch, navigate) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/users/register", reqObj);
    message.success("Đăng kí thành công");
    setTimeout(() => {
      navigate("/login");
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    console.log(err);
    message.error("Đăng kí thất bại, vui lòng thử lại");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userLogout = async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    console.log(err);
    message.error("Đăng xuất thất bại");
    dispatch({ type: "LOADING", payload: false });
  }
};
