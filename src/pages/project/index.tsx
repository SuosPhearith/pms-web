import React, { useEffect, useState } from 'react';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Button, Input } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { requestList } from '@/services/api/request';
import EntryForm from './EntryForm';
import API, { ProjectFormValues } from '@/services/pms/typings';
import {
  createProject,
  deleteBulkProject,
  optionManagers,
  updateProject,
} from '@/services/pms/api';
import { Modal, message } from 'antd';
import Open from '@/components/Usable/Open';
import StatusTag from '@/components/Usable/StatusTag';
import PriorityTag from '../../components/Usable/PriorityTag';

const ProductsTable = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<{
    managers: API.OptionValue[];
    current?: ProjectFormValues;
  }>({ managers: [], current: undefined });
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

  const handleOk = async (value: API.ProjectFormValues) => {
    Modal.confirm({
      title: 'Please Confirm',
      content: 'Are you sure you want to save this project?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          if (value.id) {
            await updateProject(value);
          } else {
            await createProject(value);
          }
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

  const handleBulkDelete = async () => {
    Modal.confirm({
      title: 'Please Confirm',
      content: 'Are you sure you want to delete this project?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteBulkProject({ ids: selectedIds });
          setSelectedIds([])
          message.success('Project created successfully!');
          handleCancel();
          actionRef.current?.reload();
        } catch (error) {
          message.error('Failed to delete project. Please try again.');
        }
      },
      onCancel: () => {
        message.info('Project delete canceled.');
      },
    });
  };

  const handleUpdate = (record: ProjectFormValues) => {
    setData({
      ...data,
      managers: data?.managers || [],
      current: { ...record, manager_id: record.manager.id },
    });
    setIsModalOpen(true);
  };

  const getOptionMangers = async () => {
    try {
      const res = await optionManagers();
      setData({ ...data?.current, managers: res });
    } catch (error) {
      message.error('Something went wrong!');
    }
  };

  useEffect(() => {
    getOptionMangers();
  }, []);

  return (
    <>
      <ProTable
        scroll={{ x: 'max-content' }}
        defaultSize="large"
        headerTitle={
          <Search
            placeholder="Search products"
            allowClear
            onSearch={(value) => {
              setSearchKey(value);
              actionRef.current?.reload();
            }}
            style={{ width: 200 }}
          />
        }
        rowKey="id"
        search={false}
        actionRef={actionRef}
        request={async (params, sort, filter) =>
          await requestList('/api/project/projects/', params, sort, filter, searchKey)
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
                onClick={() => handleUpdate(record as ProjectFormValues)}
                record={record.name}
              />
            ),
          },
          {
            title: 'Manager',
            dataIndex: 'manager',
            valueType: 'text',
            sorter: true,
            render: (_, record) => <div>{record.manager?.full_name}</div>,
          },
          {
            title: 'Status',
            dataIndex: 'status',
            valueType: 'text',
            sorter: true,
            render: (_, record) => (
              <StatusTag record={record.status} />
            ),
          },
          {
            title: 'Priority',
            dataIndex: 'priority',
            valueType: 'text',
            sorter: true,
            render: (_, record) => (
              <PriorityTag record={record.priority} />
            ),
          },
          {
            title: 'Risk Level',
            dataIndex: 'risk_level',
            valueType: 'text',
            sorter: true,
            render: (_, record) => (
              <PriorityTag record={record.risk_level} />
            ),
          },
          {
            title: 'Budget',
            dataIndex: 'budget',
            valueType: 'money', // Assumes monetary values
            sorter: true,
          },
          {
            title: 'Spent',
            dataIndex: 'spent',
            valueType: 'money',
            sorter: true,
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
            title: 'Backend Percentage',
            dataIndex: 'backend_percentage',
            valueType: 'percent', // Assumes percentage values
            sorter: true,
          },
          {
            title: 'Frontend Percentage',
            dataIndex: 'frontend_percentage',
            valueType: 'percent',
            sorter: true,
          },
          {
            title: 'Deploy Percentage',
            dataIndex: 'deploy_percentage',
            valueType: 'percent',
            sorter: true,
          },
          {
            title: 'Testing Percentage',
            dataIndex: 'testing_percentage',
            valueType: 'percent',
            sorter: true,
          },
          {
            title: 'Launch Percentage',
            dataIndex: 'launch_percentage',
            valueType: 'percent',
            sorter: true,
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
        toolBarRender={() => [
          <Button
            key="primary"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          />,
          <Button
            disabled={selectedIds.length === 0}
            key="danger"
            type="primary"
            danger
            onClick={() => handleBulkDelete()}
            icon={<DeleteOutlined />}
          />,
        ]}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedIds(selectedRows.map((row) => row.id));
          },
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
