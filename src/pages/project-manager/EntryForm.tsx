import React from 'react';
import { ModalForm, ProFormDigit, ProFormSelect } from '@ant-design/pro-form';
import { Col, Row } from 'antd';
import { ProjectMangerFormValues } from '@/services/pms/typings';

interface EntryFormProps {
  isModalOpen: boolean;
  handleOk: (values: any) => void;
  handleCancel: () => void;
  data?: {
    current?: ProjectMangerFormValues;
  };
}
const style: React.CSSProperties = { padding: '8px 0' };

const EntryForm: React.FC<EntryFormProps> = ({ isModalOpen, handleOk, handleCancel, data }) => {
  return (
    <ModalForm<ProjectMangerFormValues>
      title="Update Progress"
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
        <ProFormDigit name="id" label="id" placeholder="Enter project id" min={0} hidden />
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormSelect
              name="backend_percentage"
              label="Backend percentage"
              placeholder="Enter Backend percentage"
              options={[
                { value: 0, label: '0%' },
                { value: 10, label: '10%' },
                { value: 20, label: '20%' },
                { value: 30, label: '30%' },
                { value: 40, label: '40%' },
                { value: 50, label: '50%' },
                { value: 60, label: '60%' },
                { value: 70, label: '70%' },
                { value: 80, label: '80%' },
                { value: 90, label: '90%' },
                { value: 100, label: '100%' },
              ]}
              rules={[{ required: true, message: 'Backend percentage is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormSelect
              name="frontend_percentage"
              label="Frontend percentage"
              placeholder="Enter Frontend percentage"
              options={[
                { value: 0, label: '0%' },
                { value: 10, label: '10%' },
                { value: 20, label: '20%' },
                { value: 30, label: '30%' },
                { value: 40, label: '40%' },
                { value: 50, label: '50%' },
                { value: 60, label: '60%' },
                { value: 70, label: '70%' },
                { value: 80, label: '80%' },
                { value: 90, label: '90%' },
                { value: 100, label: '100%' },
              ]}
              rules={[{ required: true, message: 'Frontend percentage is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormSelect
              name="testing_percentage"
              label="Testing percentage"
              placeholder="Enter Testing percentage"
              options={[
                { value: 0, label: '0%' },
                { value: 10, label: '10%' },
                { value: 20, label: '20%' },
                { value: 30, label: '30%' },
                { value: 40, label: '40%' },
                { value: 50, label: '50%' },
                { value: 60, label: '60%' },
                { value: 70, label: '70%' },
                { value: 80, label: '80%' },
                { value: 90, label: '90%' },
                { value: 100, label: '100%' },
              ]}
              rules={[{ required: true, message: 'Testing percentage is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormSelect
              name="deploy_percentage"
              label="Deploy percentage"
              placeholder="Enter Deploy percentage"
              options={[
                { value: 0, label: '0%' },
                { value: 10, label: '10%' },
                { value: 20, label: '20%' },
                { value: 30, label: '30%' },
                { value: 40, label: '40%' },
                { value: 50, label: '50%' },
                { value: 60, label: '60%' },
                { value: 70, label: '70%' },
                { value: 80, label: '80%' },
                { value: 90, label: '90%' },
                { value: 100, label: '100%' },
              ]}
              rules={[{ required: true, message: 'Deploy percentage is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormSelect
              name="launch_percentage"
              label="Launch percentage"
              placeholder="Enter Launch percentage"
              options={[
                { value: 0, label: '0%' },
                { value: 10, label: '10%' },
                { value: 20, label: '20%' },
                { value: 30, label: '30%' },
                { value: 40, label: '40%' },
                { value: 50, label: '50%' },
                { value: 60, label: '60%' },
                { value: 70, label: '70%' },
                { value: 80, label: '80%' },
                { value: 90, label: '90%' },
                { value: 100, label: '100%' },
              ]}
              rules={[{ required: true, message: 'Launch percentage is required' }]}
            />
          </div>
        </Col>
      </Row>
    </ModalForm>
  );
};

export default EntryForm;
