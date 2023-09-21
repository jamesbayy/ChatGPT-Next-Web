"use client";
import React, { useState } from "react";
import { useLogin } from "../store/login";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { loginIn } from "./api/api";
import { setSession } from "@/app/utils/api";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { showModal } from "../components/ui-lib";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
function Login() {
  const [form] = Form.useForm<{ phoneNumber: string; password: string }>();
  const router = useRouter();
  const onFinish = async (values: any) => {
    const data = await loginIn(values);
    console.log("🚀 ~ file: page.tsx:22 ~ onFinish ~ data:", data);

    if (data.code === 1) {
      setSession("local", "defaultToken", data.data.token);
      router.push("/");
    } else {
      showModal({ title: "error" });
    }
  };
  return (
    <>
      <Form
        name="normal_login"
        className=""
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "请输入电话号码!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="电话号码"
            className="w-full"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>

        <Form.Item>
          <>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
            <a
              className="text-white hover:text-blue-400 mt-3 ml-1"
              href="/register"
            >
              去注册
            </a>
          </>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
