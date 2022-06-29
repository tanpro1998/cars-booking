import axios from "axios";
import { message } from "antd";

export const getAllCars = async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const res = await axios.get("/api/cars/getallcars");
    dispatch({ type: "GET_ALL_CARS", payload: res.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const addCar = async (reqObj, dispatch, navigate) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/cars/addcar", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success("Thêm xe thành công");
    setTimeout(() => {
      navigate("/admin");
    }, 500);
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOADING", payload: false });
    message.error("Thêm xe thất bại");
  }
};

export const editCar = async (reqObj, dispatch, navigate) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/cars/editcar", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success("Chỉnh sửa thành công");
    setTimeout(() => {
      navigate("/admin");
    }, 500);
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOADING", payload: false });
    message.error("Chỉnh sửa thất bại");
  }
};

export const deleteCar = async (reqObj, dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/cars/deletecar", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success("Xóa xe thành công");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOADING", payload: false });
    message.error("Xóa xe thất bại");
  }
};
