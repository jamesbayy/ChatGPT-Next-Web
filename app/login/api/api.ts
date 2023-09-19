import { baseUrl } from "@/app/api/config/baseUrl";

export const loginIn = async (params: any) => {
  const url = baseUrl + "login/in";

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};
