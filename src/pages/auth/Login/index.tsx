import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { useIntl } from '@umijs/max';
import API from '@/services/pms/typings';
import { login } from '@/services/pms/api';

const Login = () => {
  const intl = useIntl();

  const onFinish: FormProps<API.LoginPayload>['onFinish'] = async (values) => {
    try {
      const msg = await login({ ...values });
      if (msg.access) {
        window.localStorage.setItem('access', msg.access);
        window.localStorage.setItem('refresh', msg.refresh);
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        window.location.href = "/todo"
        return;
      }
    } catch (error: any) {
      message.error(error.response.data.detail);
    }
  };

  const onFinishFailed: FormProps<API.LoginPayload>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<API.LoginPayload>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<API.LoginPayload>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
