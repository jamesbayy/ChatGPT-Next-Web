"use client";
import { Analytics } from "@vercel/analytics/react";

import { Home } from "./components/home";

import { getServerSideConfig } from "./config/server";
import { useLogin } from "./store/login";
import Login from "./login/login";

const serverConfig = getServerSideConfig();

export default async function App() {
  const isLogin = useLogin((state) => state.isLogin);

  return (
    <>
      {isLogin ? <Home /> : <Login />}
      {serverConfig?.isVercel && <Analytics />}
    </>
  );
}
