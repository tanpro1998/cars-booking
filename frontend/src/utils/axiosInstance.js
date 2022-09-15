import axios from "axios";

const BASE_URL = "https://flash-car-shop.herokuapp.com";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
