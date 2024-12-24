import React, { useEffect, useState } from 'react';
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { Col, Form, Row } from 'antd';
import API, { TaskFormValues } from '@/services/pms/typings';
import { optionDevelopers } from '@/services/pms/api';

interface EntryFormProps {
  isModalOpen: boolean;
  handleOk: (values: any) => void;
  handleCancel: () => void;
  data?: {
    projects: API.OptionValue[];
    developers: API.OptionValue[];
    current?: TaskFormValues;
  };
  id: string | undefined;
}
const style: React.CSSProperties = { padding: '8px 0' };

const EntryForm: React.FC<EntryFormProps> = ({ isModalOpen, handleOk, handleCancel, data, id }) => {
  const [developersOptions, setDevelopersOptions] = useState<API.OptionValue[]>([]);
  const [form] = Form.useForm();
  const handleUpdateDevelopersOption = async (value: number) => {
    form.setFieldsValue({ assigned_to: undefined });
    if (value) {
      const options = await optionDevelopers({ projectId: value });
      setDevelopersOptions(options);
    } else {
      setDevelopersOptions([]);
    }
  };
  useEffect(() => {
    if (id) {
      handleUpdateDevelopersOption(+id);
    }
  }, []);
  return (
    <ModalForm<TaskFormValues>
      title="Task"
      form={form}
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
        {!id ? (
          <Col className="gutter-row" span={6}>
            <div style={style}>
              <ProFormSelect
                name="project"
                label="Project"
                options={data?.projects}
                placeholder="Select Project"
                onChange={(e) => handleUpdateDevelopersOption(e as number)}
                rules={[{ required: true, message: 'Project is required' }]}
              />
            </div>
          </Col>
        ) : (
          <ProFormSelect
            name="project"
            label="Project"
            options={data?.projects}
            initialValue={id}
            placeholder="Select Project"
            rules={[{ required: true, message: 'Project is required' }]}
            hidden
          />
        )}
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <ProFormSelect
              name="assigned_to"
              label="Assign To"
              options={developersOptions}
              placeholder="Select Developer"
              rules={[{ required: true, message: 'Developer is required' }]}
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
