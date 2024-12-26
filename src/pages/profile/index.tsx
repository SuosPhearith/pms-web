import { currentUser, updatePassword, updateProfile } from '@/services/pms/api';
import { UpdatePassword, UpdateProfileData, CurrentUser as User } from '@/services/pms/typings';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Card, message, Modal, Spin, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';

const UpdateProfile = () => {
  const [current, setCurrent] = useState<User>();
  const [passwordForm] = ProForm.useForm(); // Use form instance for password form

  const handleUpdateProfile = async (values: UpdateProfileData) => {
    Modal.confirm({
      title: 'Please Confirm',
      content: 'Are you sure you want to update your profile?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          await updateProfile(values);
          message.success('Updated successfully.');
        } catch (error: any) {
          message.error(error?.response?.data?.message);
        }
      },
    });
  };

  const handleSubmit = async (values: UpdatePassword) => {
    Modal.confirm({
      title: 'Please Confirm',
      content: 'Are you sure you want to update your password?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          await updatePassword(values);
          message.success('Password updated successfully.');
          passwordForm.resetFields(); // Reset password form fields
        } catch (error: any) {
          message.error(error?.response?.data?.message);
        }
      },
    });
  };

  const getMe = async () => {
    try {
      const res = await currentUser();
      setCurrent(res);
    } catch (error) {
      message.error('Something went wrong.');
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  if (!current) {
    return <Spin />;
  }

  return (
    <Card>
      <Row gutter={[24, 24]} justify="center">
        {/* Profile Update Form */}
        <Col xs={24} sm={24} md={12} lg={10}>
          <ProForm
            onFinish={handleUpdateProfile}
            layout="vertical"
            submitter={{
              searchConfig: {
                submitText: 'Update Profile',
              },
              resetButtonProps: false,
            }}
            initialValues={current}
          >
            <ProFormText
              name="first_name"
              label="First Name"
              placeholder="Enter your first name"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            />
            <ProFormText
              name="last_name"
              label="Last Name"
              placeholder="Enter your last name"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            />
            <ProFormText
              name="username"
              label="Username"
              placeholder="Enter your username"
              rules={[
                { required: true, message: 'Please input your username!' },
                { min: 3, message: 'Username must be at least 3 characters.' },
              ]}
            />
            <ProFormText
              name="email"
              label="Email"
              placeholder="Enter your email address"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email address.' },
              ]}
            />
          </ProForm>
        </Col>

        {/* Password Update Form */}
        <Col xs={24} sm={24} md={12} lg={10}>
          <ProForm
            form={passwordForm} // Pass the form instance
            onFinish={handleSubmit}
            layout="vertical"
            submitter={{
              searchConfig: {
                submitText: 'Update Password',
              },
              resetButtonProps: false,
            }}
          >
            <ProFormText.Password
              name="current_password"
              label="Current Password"
              placeholder="Enter your current password"
              rules={[
                { required: true, message: 'Please input your current password!' },
                { min: 6, message: 'Password must be at least 6 characters.' },
              ]}
            />
            <ProFormText.Password
              name="new_password"
              label="New Password"
              placeholder="Enter your new password"
              rules={[
                { required: true, message: 'Please input your new password!' },
                { min: 6, message: 'Password must be at least 6 characters.' },
              ]}
            />
            <ProFormText.Password
              name="confirm_password"
              label="Confirm Password"
              placeholder="Confirm your new password"
              rules={[
                { required: true, message: 'Please confirm your new password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            />
          </ProForm>
        </Col>
      </Row>
    </Card>
  );
};

export default UpdateProfile;
