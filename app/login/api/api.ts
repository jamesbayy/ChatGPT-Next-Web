import { post } from "@/app/request/client";

export const loginIn = async (params: any) => {
  const data = await post("login/in", params);

  return data;
};
