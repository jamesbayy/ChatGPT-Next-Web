"use client";
import { Analytics } from "@vercel/analytics/react";
import { Home } from "./components/home";
import react, { useEffect } from "react";
import { getServerSideConfig } from "./config/server";
import { useLogin } from "./store/login";
import Login from "./login/page";
import { getSession } from "./utils/api";
import { redirect } from "next/navigation";
const serverConfig = getServerSideConfig();

export default function App() {
  useEffect(() => {
    const token = getSession("local", "defaultToken");
    if (!token) {
      redirect("/login");
    }
  }, []);
  return (
    <>
      <Home />
      {serverConfig?.isVercel && <Analytics />}
    </>
  );
}
