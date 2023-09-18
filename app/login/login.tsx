"use client";
import React, { useState } from "react";
import { useLogin } from "../store/login";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { getVerifyCode } from "./api/api";
const onFinish = (values: any) => {
  console.log(values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
function Login() {
  const isLogin = useLogin((state) => state.isLogin);
  const [registerButton, setRegisterButton] = useState(false);
  const [form] = Form.useForm<{ phoneNumber: string; password: string }>();
  const phoneNumberValue = Form.useWatch("phoneNumber", form);

  const sendVerifyCode = async (phoneNumberValue: string) => {
    return getVerifyCode(phoneNumberValue);
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
          name="phoneNumber"
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
        {registerButton && (
          <Form.Item
            name="verifyCode"
            rules={[{ required: true, message: "请输入电话号码!" }]}
          >
            <div className="flex flex-row ">
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="验证码"
              />
              <div
                className=" w-[100px] ml-3"
                onClick={() => {
                  sendVerifyCode(phoneNumberValue);
                }}
              >
                发送验证码
              </div>
            </div>
          </Form.Item>
        )}
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          {registerButton === false ? (
            <>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </>
          ) : (
            ""
          )}{" "}
          <Button
            onClick={() => {
              setRegisterButton(() => true);
            }}
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Login;
