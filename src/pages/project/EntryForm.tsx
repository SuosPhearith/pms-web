import React from 'react';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { Col, Row } from 'antd';
import API, { ProjectFormValues } from '@/services/pms/typings';

interface EntryFormProps {
  isModalOpen: boolean;
  handleOk: (values: any) => void;
  handleCancel: () => void;
  data?: {
    managers: API.OptionValue[];
    developers: API.OptionValue[];
    current?: ProjectFormValues;
  };
}
const style: React.CSSProperties = { padding: '8px 0' };

const EntryForm: React.FC<EntryFormProps> = ({ isModalOpen, handleOk, handleCancel, data }) => {
  return (
    <ModalForm<ProjectFormValues>
      title="Project"
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
        <ProFormDigit name="id" label="id" placeholder="Enter project id" min={0} hidden/>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormText
              name="name"
              label="Project Name"
              placeholder="Enter project name"
              rules={[{ required: true, message: 'Project name is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormText
              name="description"
              label="Description"
              placeholder="Enter project description"
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormDatePicker
              name="start_date"
              label="Start Date"
              placeholder="Select start date"
              rules={[{ required: true, message: 'Start date is required' }]}
              style={{ width: '100%' }}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormDatePicker
              name="end_date"
              label="End Date"
              placeholder="Select end date"
              rules={[{ required: true, message: 'End date is required' }]}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormSelect
              name="status"
              label="Status"
              options={[
                { label: 'Not Started', value: 'Not Started' },
                { label: 'In Progress', value: 'In Progress' },
                { label: 'Completed', value: 'Completed' },
                { label: 'On Hold', value: 'On Hold' },
              ]}
              placeholder="Select project status"
              rules={[{ required: true, message: 'Status is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormSelect
              name="priority"
              label="Priority"
              options={[
                { label: 'Low', value: 'low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' },
              ]}
              placeholder="Select priority"
              rules={[{ required: true, message: 'Priority is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormDigit
              name="budget"
              label="Budget"
              placeholder="Enter project budget"
              min={0}
              rules={[{ required: true, message: 'Budget is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormDigit
              name="spent"
              label="Spent"
              placeholder="Enter spent amount"
              min={0}
              rules={[{ required: true, message: 'Spent amount is required' }]}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormSelect
              name="risk_level"
              label="Risk Level"
              options={[
                { label: 'Low', value: 'low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' },
              ]}
              placeholder="Select risk level"
              rules={[{ required: true, message: 'Risk level is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormText name="tag" label="Tag" placeholder="Enter project tag" />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormSelect
              name="manager_id"
              label="Manager"
              options={data?.managers}
              placeholder="Select Manager"
              rules={[{ required: true, message: 'Manager is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={24}>
          <div style={style}>
            <ProFormSelect
              name="dev_ids"
              mode="multiple"
              label="Developers"
              options={data?.developers}
              placeholder="Select Developers"
            />
          </div>
        </Col>
      </Row>
    </ModalForm>
  );
};

export default EntryForm;
