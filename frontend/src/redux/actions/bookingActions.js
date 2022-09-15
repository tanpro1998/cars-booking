import axios from "axios";
import { message } from "antd";
import { publicRequest } from "../../utils/axiosInstance.js";

export const bookCar = async (reqObj, dispatch, navigate) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await publicRequest.post("/api/bookings/bookcar", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success("Đặt xe thành công!");
    setTimeout(() => {
      navigate("/");
    }, 500);
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOADING", payload: false });
    message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const res = await publicRequest.get("/api/bookings/getallbookings");
    dispatch({ type: "GET_ALL_BOOKINGS", payload: res.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOADING", payload: false });
  }
};
