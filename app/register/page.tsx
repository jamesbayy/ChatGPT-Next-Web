"use client";
import React, { useState } from "react";
import { useLogin } from "../store/login";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { CountdownButton } from "../components/countDownButton";
import { register } from "./api/api";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
function Register() {
  const login = useLogin((state) => state.login);
  const router = useRouter();
  const [form] = Form.useForm<{ phoneNumber: string; password: string }>();
  const phoneNumberValue = Form.useWatch("phone", form);
  const onFinish = async (values: any) => {
    const data = await register(values);
    if (data.code === 1) {
      localStorage.setItem("defaultToken", data.data.token);
      router.push("/");
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

        <Form.Item
          name="verify"
          rules={[{ required: true, message: "请输入电话号码!" }]}
        >
          <div className="flex justify-center items-center ">
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="验证码"
            />

            <CountdownButton phone={phoneNumberValue} />
          </div>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">注册</Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Register;
