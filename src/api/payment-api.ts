import { ResponseModel } from "../types";
import { BASE_URL } from "../utils/AppConst";
import { axiosAuth } from "./common";

export const CollectPaymentApi = async (token: string): Promise<ResponseModel> => {
  try {
    const auth = axiosAuth();
    // GET hai POST nahi, aur pubKey return karta hai publishableKey nahi
    const response = await auth.get(`${BASE_URL}/buyer/payment`);
    const raw = response.data;
    return {
      message: raw.message,
      data: {
        secret: raw.secret,
        publishableKey: raw.pubKey,  // backend pubKey bhejta hai
      },
    };
  } catch (error: any) {
    return {
      message: error?.response?.data?.message || "Payment initiation failed",
    };
  }
};

export const VerifyPayment = async () => {
  try {
    const auth = axiosAuth();
    const response = await auth.post(`${BASE_URL}/buyer/verify`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { message: "error occured" };
  }
};