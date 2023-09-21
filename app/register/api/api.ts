import { post } from "@/app/request/client";

export const fetchVerificationCode = async (phone: string) => {
  const data = await post("login/sendsms", { phone: phone });
  return data;
};

export const register = async (Register: {
  password: string;
  phone: string;
  verify: string;
}) => {
  const data = await post("login/register", register);
  return data;
};
