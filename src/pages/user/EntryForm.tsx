import React from 'react';
import { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { Col, Row } from 'antd';
import { UserFormValues } from '@/services/pms/typings';

interface EntryFormProps {
  isModalOpen: boolean;
  handleOk: (values: any) => void;
  handleCancel: () => void;
  data?: {
    current?: UserFormValues;
  };
}
const style: React.CSSProperties = { padding: '8px 0' };

const EntryForm: React.FC<EntryFormProps> = ({ isModalOpen, handleOk, handleCancel, data }) => {
  return (
    <ModalForm<UserFormValues>
      title="Create new User"
      open={isModalOpen}
      onFinish={async (values) => {
        handleOk(values);
        return true;
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: handleCancel,
      }}
      initialValues={data?.current || {}}
    >
      <Row gutter={16}>
        <ProFormDigit name="id" label="id" min={0} hidden />
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormText
              name="first_name"
              label="First name"
              placeholder="Enter User first_name"
              rules={[{ required: true, message: 'User first_name is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormText
              name="last_name"
              label="Last name"
              placeholder="Enter User last_name"
              rules={[{ required: true, message: 'User last_name is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormText
              name="username"
              label="Username"
              placeholder="Enter User username"
              rules={[{ required: true, message: 'User username is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormText
              name="email"
              label="Email"
              placeholder="Enter User email"
              rules={[
                { required: true, message: 'User email is required' },
                { type: 'email', message: 'Enter a valid email address' },
              ]}
              fieldProps={{
                type: 'email',
              }}
            />
          </div>
        </Col>

        {!data?.current?.email ? (
          <>
            <Col className="gutter-row" span={6}>
              <div style={style}>
                <ProFormText
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  rules={[{ required: true, message: 'Password is required' }]}
                  fieldProps={{
                    type: 'password',
                  }}
                />
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={style}>
                <ProFormText
                  name="password2"
                  label="Confirm Password"
                  placeholder="Enter your Confirm Password"
                  rules={[{ required: true, message: 'Confirm Password is required' }]}
                  fieldProps={{
                    type: 'password',
                  }}
                />
              </div>
            </Col>
          </>
        ) : (
          ''
        )}

        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormSelect
              name="role"
              label="role"
              options={[
                { label: 'Admin', value: 'ADMIN' },
                { label: 'Manager', value: 'MANAGER' },
                { label: 'Developer', value: 'DEVELOPER' },
              ]}
              placeholder="Select project role"
              rules={[{ required: true, message: 'role is required' }]}
            />
          </div>
        </Col>
      </Row>
    </ModalForm>
  );
};

export default EntryForm;
