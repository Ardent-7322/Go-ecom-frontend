import axios from "axios";
import { BASE_URL } from "../utils/AppConst";

export const axiosAuth = () => {
  const token = localStorage.getItem("token");

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return instance;
};
