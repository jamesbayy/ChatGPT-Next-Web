import { Post } from "@/app/api/config/baseFetch";
import { baseUrl } from "@/app/api/config/baseUrl";

export const getVerifyCode = async (phoneNumber: string) => {
  const url = baseUrl + "login/sendsms";
  //   const formData = new FormData();
  //   formData.append("phone", phoneNumber);

  const verifyCode = await Post(url, { phone: phoneNumber });
  return verifyCode;
};
