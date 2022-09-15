import axios from "axios";
import { message } from "antd";

export const bookCar = async (reqObj, dispatch, navigate) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/bookings/bookcar", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success("Đặt xe thành công!");
    setTimeout(() => {
      navigate("/")
    },500)
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOADING", payload: false });
    message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const res = await axios.get("/api/bookings/getallbookings");
    dispatch({ type: "GET_ALL_BOOKINGS", payload: res.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOADING", payload: false });
  }
};
