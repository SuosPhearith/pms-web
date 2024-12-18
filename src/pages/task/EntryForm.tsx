import React from 'react';
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { Col, Row } from 'antd';
import API, { TaskFormValues } from '@/services/pms/typings';

interface EntryFormProps {
  isModalOpen: boolean;
  handleOk: (values: any) => void;
  handleCancel: () => void;
  data?: {
    projects: API.OptionValue[];
    developers: API.OptionValue[];
    current?: TaskFormValues;
  };
}
const style: React.CSSProperties = { padding: '8px 0' };

const EntryForm: React.FC<EntryFormProps> = ({ isModalOpen, handleOk, handleCancel, data }) => {
  return (
    <ModalForm<TaskFormValues>
      title="Create new Project"
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
              name="project"
              label="Project"
              options={data?.projects}
              placeholder="Select Project"
              rules={[{ required: true, message: 'Project is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormSelect
              name="stage"
              label="Stage"
              options={[
                { label: 'Backend', value: 'Backend' },
                { label: 'Frontend', value: 'Frontend' },
                { label: 'Deploy', value: 'Deploy' },
                { label: 'Testing', value: 'Testing' },
                { label: 'Launch', value: 'Launch' },
              ]}
              placeholder="Select Stage"
              rules={[{ required: true, message: 'Stage is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormText
              name="name"
              label="Task Name"
              placeholder="Enter Task name"
              rules={[{ required: true, message: 'Task name is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormText
              name="description"
              label="Description"
              placeholder="Enter task description"
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormSelect
              name="assigned_to"
              label="Assign To"
              options={data?.developers}
              placeholder="Select Developer"
              rules={[{ required: true, message: 'Developer is required' }]}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormDateTimePicker
              name="due_at"
              label="Due Date"
              placeholder="Select deu date"
              rules={[{ required: true, message: 'due date is required' }]}
              style={{ width: '100%' }}
            />
          </div>
        </Col>
      </Row>
    </ModalForm>
  );
};

export default EntryForm;
