export const getSession = (type: "session" | "local", key: string) => {
  console.log("🚀 ~ file: index.ts:2 ~ getSession ~ key:", key);
  if (!key) {
    return;
  }
  const isBrowser: boolean = ((): boolean => typeof window !== "undefined")();
  const value = isBrowser ? window[`${type}Storage`][key] : "";

  console.log("🚀 ~ file: index.ts:8 ~ getSession ~ value:", value);
  // console.log(value);
  return value ? JSON.parse(value) : "";
};
export const setSession = (
  type: "session" | "local",
  key: string,
  value: any,
) => {
  value = JSON.stringify(value);
  if (!key || !value) {
    return;
  }
  const isBrowser: boolean = ((): boolean => typeof window !== "undefined")();
  if (isBrowser) {
    window[`${type}Storage`].setItem(key, value);
  }
};
export const removeSession = (type: "session" | "local", key: string) => {
  const isBrowser: boolean = ((): boolean => typeof window !== "undefined")();
  if (isBrowser) {
    window[`${type}Storage`].removeItem(key);
  }
};
