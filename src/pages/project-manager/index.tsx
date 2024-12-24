import React, { useState } from 'react';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Input, Radio, Space } from 'antd';
import { requestList } from '@/services/api/request';
import EntryForm from './EntryForm';
import API, { ProjectMangerFormValues } from '@/services/pms/typings';
import { updateProjectProgress } from '@/services/pms/api';
import { Modal, message } from 'antd';
import Open from '@/components/Usable/Open';
import StatusTag from '@/components/Usable/StatusTag';
import PriorityTag from '../../components/Usable/PriorityTag';
import { useNavigate } from '@umijs/max';
import { RadioChangeEvent } from 'antd/lib';

const ProductsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>();
  const [data, setData] = useState<{
    current?: ProjectMangerFormValues;
  }>({ current: undefined });
  const [searchKey, setSearchKey] = useState('');
  const { Search } = Input;
  const actionRef = React.useRef<ActionType>();

  const handleCancel = () => {
    setData((prevData) => ({
      ...prevData,
      current: undefined,
    }));
    setIsModalOpen(false);
  };

  const handleOk = async (value: API.ProjectMangerFormValues) => {
    Modal.confirm({
      title: 'Please Confirm',
      content: 'Are you sure you want to save this project?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          await updateProjectProgress(value);
          message.success('Project saved successfully!');
          handleCancel();
          actionRef.current?.reload(); // Reload the table or data
        } catch (error) {
          message.error('Failed to saved project. Please try again.');
        }
      },
      onCancel: () => {
        message.info('Project save canceled.');
      },
    });
  };

  const handleUpdate = (record: ProjectMangerFormValues) => {
    setData({
      ...data,
      current: { ...record },
    });
    setIsModalOpen(true);
  };
  const navigate = useNavigate();
  const handleViewTasks = async (record: ProjectMangerFormValues) => {
    navigate(`/task/manager/project/${record.id}`);
  };

  const handleStatusChange = (e: RadioChangeEvent) => {
    setStatus(e.target.value);
    actionRef.current?.reload();
  };

  return (
    <>
      <ProTable
        scroll={{ x: 'max-content' }}
        defaultSize="large"
        headerTitle={
          <div>
            <Space>
              <Search
                placeholder="Search products"
                allowClear
                onSearch={(value) => {
                  setSearchKey(value);
                  actionRef.current?.reload();
                }}
                style={{ width: 200 }}
              />
              <Radio.Group value={status} onChange={handleStatusChange}>
                <Radio.Button value="">All</Radio.Button>
                <Radio.Button value="Not Started">Not Started</Radio.Button>
                <Radio.Button value="In Progress">In Progress</Radio.Button>
                <Radio.Button value="Completed">Completed</Radio.Button>
                <Radio.Button value="On Hold">On Hold</Radio.Button>
              </Radio.Group>
            </Space>
          </div>
        }
        rowKey="id"
        search={false}
        actionRef={actionRef}
        request={async (params, sort) =>
          await requestList('/api/project/projects-list/', params, sort, { status }, searchKey)
        }
        columns={[
          {
            title: '#',
            dataIndex: '#',
            valueType: 'text',
            render: (_, __, index) => <div>{index + 1}</div>,
          },
          {
            title: 'Name',
            dataIndex: 'name',
            valueType: 'text',
            sorter: true,
            render: (_, record) => (
              <Open
                onClick={() => handleUpdate(record as ProjectMangerFormValues)}
                record={record.name}
              />
            ),
          },
          {
            title: 'Tasks',
            dataIndex: 'view_task',
            valueType: 'view_task',
            render: (_, record) => (
              <Open
                onClick={() => handleViewTasks(record as ProjectMangerFormValues)}
                record={'View Tasks'}
                color="green"
              />
            ),
          },
          {
            title: 'Backend Percentage',
            dataIndex: 'backend_percentage',
            valueType: 'percent', // Assumes percentage values
          },
          {
            title: 'Frontend Percentage',
            dataIndex: 'frontend_percentage',
            valueType: 'percent',
          },
          {
            title: 'Deploy Percentage',
            dataIndex: 'deploy_percentage',
            valueType: 'percent',
          },
          {
            title: 'Testing Percentage',
            dataIndex: 'testing_percentage',
            valueType: 'percent',
          },
          {
            title: 'Launch Percentage',
            dataIndex: 'launch_percentage',
            valueType: 'percent',
          },
          {
            title: 'Status',
            dataIndex: 'status',
            valueType: 'text',
            sorter: true,
            render: (_, record) => <StatusTag record={record.status} />,
          },
          {
            title: 'Priority',
            dataIndex: 'priority',
            valueType: 'text',
            sorter: true,
            render: (_, record) => <PriorityTag record={record.priority} />,
          },
          {
            title: 'Risk Level',
            dataIndex: 'risk_level',
            valueType: 'text',
            sorter: true,
            render: (_, record) => <PriorityTag record={record.risk_level} />,
          },

          {
            title: 'Description',
            dataIndex: 'description',
            valueType: 'text',
            sorter: true,
          },
          {
            title: 'Start Date',
            dataIndex: 'start_date',
            valueType: 'date',
            sorter: true,
          },
          {
            title: 'End Date',
            dataIndex: 'end_date',
            valueType: 'date',
            sorter: true,
          },
          {
            title: 'Tag',
            dataIndex: 'tag',
            valueType: 'text',
            sorter: false,
          },

          {
            title: 'Created At',
            dataIndex: 'created_at',
            valueType: 'dateTime',
            sorter: true,
          },
          {
            title: 'Updated At',
            dataIndex: 'updated_at',
            valueType: 'dateTime',
            sorter: true,
          },
          {
            title: 'Created By',
            dataIndex: 'created_by',
            valueType: 'text',
            sorter: true,
            render: (_, record) => <div>{record.created_by?.full_name}</div>,
          },
          {
            title: 'Updated By',
            dataIndex: 'updated_by',
            valueType: 'text',
            sorter: true,
            render: (_, record) => <div>{record.created_by?.full_name}</div>,
          },
        ]}
        pagination={{
          showQuickJumper: true,
        }}
      />
      <EntryForm
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        data={data}
      />
    </>
  );
};

export default ProductsTable;
