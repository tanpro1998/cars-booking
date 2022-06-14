import axios from "axios";
import { message } from "antd";

export const userLogin = async (reqObj, dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const res = await axios.post("/api/users/login", reqObj);
    localStorage.setItem("user", JSON.stringify(res.data));
    dispatch({ type: "GET_USER", payload: res.data });
    message.success("Login Success");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    console.log(err);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = async (reqObj, dispatch, navigate) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/users/register", reqObj);
    message.success("Register Success");
    setTimeout(() => {
      navigate("/login");
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    console.log(err);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userLogout = async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/login";
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    console.log(err);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};
