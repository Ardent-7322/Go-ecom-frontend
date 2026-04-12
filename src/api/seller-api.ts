import { SellerProgramInput } from "../types";
import { BASE_URL } from "../utils/AppConst";
import { axiosAuth } from "./common";

export const JoinSellerProgramAPI = async (input: SellerProgramInput) => {
  const auth = axiosAuth();

  const response = await auth.post(
    `${BASE_URL}/users/become-seller`,
    input
  );

  // IMPORTANT: return full response data
  return response.data;
};
