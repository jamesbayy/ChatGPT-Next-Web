import { baseUrl } from "@/app/api/config/baseUrl";

export const fetchVerificationCode = async (phone: string) => {
  const url = baseUrl + "login/sendsms";
  const formData = new FormData();
  formData.append("phone", phone);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data;
};

export const register = async (Register: {
  password: string;
  phone: string;
  verify: string;
}) => {
  const url = baseUrl + "login/register";

  const formData = new FormData();
  formData.append("phone", Register.phone);
  formData.append("verify", Register.verify);
  formData.append("password", Register.password);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};
