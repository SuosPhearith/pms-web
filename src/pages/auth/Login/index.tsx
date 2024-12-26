import React from 'react';
import type { FormProps } from 'antd';
import { Button, Card, Form, Input, message, Space, Typography } from 'antd';
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
        if (msg.role === 'ADMIN') {
          window.location.href = '/';
        } else if (msg.role === 'MANAGER') {
          window.location.href = '/manager/project';
        } else if (msg.role === 'DEVELOPER') {
          window.location.href = '/todo';
        } else {
          message.error('Invalid Role.');
        }
        return;
      }
    } catch (error: any) {
      message.error(error.response.data.detail);
    }
  };
  const { Title, Text } = Typography;


  const onFinishFailed: FormProps<API.LoginPayload>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Card
        style={{
          width: 400,
          padding: '20px 30px',
          borderRadius: 10,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={3}>Login to Your Account</Title>
            <Text type="secondary">Enter your credentials to continue</Text>
          </div>

          <Form
            name="login"
            layout="vertical"
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
              <Input placeholder="Enter your username" size="large" />
            </Form.Item>

            <Form.Item<API.LoginPayload>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Enter your password" size="large" />
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Login;
