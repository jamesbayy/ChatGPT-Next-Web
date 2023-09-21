import qs from "qs";
import cloneDeep from "lodash/cloneDeep";
import jwtDecode from "jwt-decode";
import { getSession } from "@/app/utils/api";
import { IResponse, IAuthType, IQueryParams } from "@/app/types/api";
const defaultHost = process.env.NEXT_PUBLIC_BASE_URL;
console.log("🚀 ~ file: utils.ts:7 ~ defaultHost:", defaultHost);

export const hostMap = {
  noToken: defaultHost,
  default: defaultHost,
};

export const isExpToken = (expTime: number) => {
  // get now time stamp
  const expTimeStamp = parseInt(`${expTime}000`);
  const nowTime = Date.parse(new Date().toString()) + 3 * 60 * 1000;
  return nowTime > expTimeStamp;
};

// format jwt token
export const parseJWT = (
  token: string,
): { exp: number; iat: number; sub: number; userAddr: string } => {
  try {
    return jwtDecode(token);
  } catch (err) {
    return { exp: 0, iat: 0, sub: 0, userAddr: "" };
  }
};

export async function handleResponse<T>(
  response: globalThis.Response,
): Promise<IResponse<T>> {
  // 可以把浏览器状态码错误直接抛出错误，也可以配置一个map文件，状态码直接匹配自定义的文本并且弹消息提醒
  // if (!response.ok) throw new Error(response.statusText);
  // 这里直接将浏览器抛出的异常信息处理成和后端抛出的信息格式一致
  if (!response.ok) {
    const resData = await response.json();
    return {
      message: resData.message,
      data: null,
      code: resData.statusCode,
    } as IResponse<T>;
  }
  const contentType = response.headers.get("content-type");
  // 如果是json格式调用json解析
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return {
    code: response.status,
    data: response.text(),
    message: response.statusText,
  } as IResponse<T>;
}

export const getStringParams = (params: IQueryParams) => {
  // 深克隆一下，以免传来的参数是redux等里面的数据，修改会报错
  const paramsCopy = cloneDeep(params);
  for (let key in paramsCopy) {
    if (paramsCopy[key] === "" || paramsCopy[key] === undefined) {
      paramsCopy[key] = null;
    }
  }
  return qs.stringify(paramsCopy, { skipNulls: true });
};

export const getAuthorization = async (authType: IAuthType) => {
  if (authType === "noToken") {
    return "";
  }
  const tokenKey = `${authType}Token`;
  // 封装的获取localstorage等数据的方法
  const accessToken = getSession("local", tokenKey);
  const tokenInfo = parseJWT(accessToken);
  let authorization = accessToken.token;

  //TODO:检查token过期时间

  if (accessToken && !isExpToken(tokenInfo.exp)) {
    // authorization = accessToken;
  } else {
    // token 过期了，重新登录请求然后给请求头设置好token
    // 获取token的方法等也可以根据authType的不同进行自定义设置
    // const res = await getToken("账号密码等");
    // setSession("local", tokenKey, res?.data);
    // authorization = `Bearer ${res?.data}`;
  }
  console.log(
    "🚀 ~ file: utils.ts:78 ~ getAuthorization ~ authorization:",
    authorization,
  );
  return authorization;
};
