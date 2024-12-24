/*
=====================================================================
  If we want to allow Admin to CRUD task please uncomment in the code
=====================================================================
*/

import React, { useEffect, useState } from 'react';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Input, Radio, Select, Space } from 'antd';
import { requestList } from '@/services/api/request';
import API, { ProjectFormValues, TaskFormValues } from '@/services/pms/typings';
import {
  createTask,
  deleteBulkTask,
  optionDevelopers,
  optionProjects,
  updateTask,
} from '@/services/pms/api';
import { Modal, message } from 'antd';
import Open from '@/components/Usable/Open';
import { RadioChangeEvent } from 'antd/lib';
import TaskStatusTag from '@/components/Usable/TaskStatusTag';
import EntryForm from './EntryForm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useParams } from '@umijs/max';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const TasksTable = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<{ open: boolean; data: any }>({ open: false, data: {} });
  const [status, setStatus] = useState<string>();
  const [stage, setStage] = useState<string>();
  const { id } = useParams();
  const [projectId, setProjectId] = useState<number | undefined>();
  const [data, setData] = useState<{
    projects: API.OptionValue[];
    developers: API.OptionValue[];
    current?: TaskFormValues;
  }>({ projects: [], developers: [], current: undefined });
  const [searchKey, setSearchKey] = useState('');
  const { Search } = Input;
  const actionRef = React.useRef<ActionType>();
  dayjs.extend(utc);

  const handleCancel = () => {
    setData((prevData) => ({
      ...prevData,
      current: undefined,
    }));
    setIsModalOpen(false);
  };

  const handleOk = async (value: API.TaskFormValues) => {
    const utcDate = dayjs(value.due_at).utc().format();
    Modal.confirm({
      title: 'Please Confirm',
      content: 'Are you sure you want to save this Task?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          if (value.id) {
            await updateTask({ ...value, due_at: utcDate });
          } else {
            await createTask({ ...value, due_at: utcDate });
          }
          message.success('Task saved successfully!');
          handleCancel();
          actionRef.current?.reload(); // Reload the table or data
        } catch (error) {
          message.error('Failed to saved Task. Please try again.');
        }
      },
      onCancel: () => {
        message.info('Task save canceled.');
      },
    });
  };

  const handleBulkDelete = async () => {
    Modal.confirm({
      title: 'Please Confirm',
      content: 'Are you sure you want to delete this Task?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteBulkTask({ ids: selectedIds });
          setSelectedIds([]);
          message.success('Task created successfully!');
          handleCancel();
          actionRef.current?.reload();
        } catch (error) {
          message.error('Failed to delete Task. Please try again.');
        }
      },
      onCancel: () => {
        message.info('Task delete canceled.');
      },
    });
  };

  const handleUpdate = (record: any) => {
    console.log(record);
    setData({
      ...data,
      current: { ...record, assigned_to: record.assigned_to?.id, project: record.project?.id },
    });
    setIsModalOpen(true);
  };

  const getOptions = async () => {
    try {
      if (id) {
        setProjectId(+id);
      } else {
        setProjectId(undefined);
      }
      const projectOptions = await optionProjects();
      const developersOptions = await optionDevelopers({ projectId: 41 });
      setData({ ...data?.current, projects: projectOptions, developers: developersOptions });
    } catch (error) {
      message.error('Something went wrong!');
    }
  };

  const onChange = (value: number) => {
    setProjectId(value);
    actionRef.current?.reload();
  };

  const handleStatusChange = (e: RadioChangeEvent) => {
    setStatus(e.target.value);
    actionRef.current?.reload();
  };

  const handleStageChange = (value: string) => {
    setStage(value);
    actionRef.current?.reload();
  };
  const showDrawer = (record: any) => {
    setOpen({ open: true, data: record });
  };

  const onClose = () => {
    setOpen({ data: {}, open: false });
  };

  useEffect(() => {
    getOptions();
    actionRef.current?.reload();
  }, [id]);

  return (
    <>
      <ProTable
        scroll={{ x: 'max-content' }}
        defaultSize="large"
        headerTitle={
          <div>
            <Space>
              <Search
                placeholder="Search Task"
                allowClear
                onSearch={(value) => {
                  setSearchKey(value);
                  actionRef.current?.reload();
                }}
                style={{ width: 200 }}
              />
              {!id ? (
                <Select
                  showSearch
                  allowClear
                  placeholder="Select a Project"
                  optionFilterProp="label"
                  onChange={onChange}
                  options={data.projects}
                  style={{ minWidth: '200px' }}
                />
              ) : (
                ''
              )}
              <Select
                showSearch
                allowClear
                placeholder="Select a Stage"
                optionFilterProp="label"
                onChange={handleStageChange}
                options={[
                  { label: 'Backend', value: 'Backend' },
                  { label: 'Frontend', value: 'Frontend' },
                  { label: 'Deploy', value: 'Deploy' },
                  { label: 'Testing', value: 'Testing' },
                  { label: 'Launch', value: 'Launch' },
                ]}
                style={{ minWidth: '200px' }}
              />
              <Radio.Group value={status} onChange={handleStatusChange}>
                <Radio.Button value="">All</Radio.Button>
                <Radio.Button value="pending">Pending</Radio.Button>
                <Radio.Button value="InProgress">In Progress</Radio.Button>
                <Radio.Button value="done">Done</Radio.Button>
              </Radio.Group>
            </Space>
          </div>
        }
        rowKey="id"
        search={false}
        actionRef={actionRef}
        request={async (params, sort) =>
          await requestList(
            '/api/task/tasks-view/',
            params,
            sort,
            { project: projectId, status: status, stage: stage },
            searchKey,
          )
        }
        columns={[
          {
            title: '#',
            dataIndex: '#',
            valueType: 'text',
            render: (_, __, index) => <div>{index + 1}</div>,
          },
          {
            title: 'Task',
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
            title: 'Project',
            dataIndex: 'project_name',
            valueType: 'text',
            sorter: true,
            render: (_, record) => <div>{record.project?.name}</div>,
          },

          {
            title: 'Stage',
            dataIndex: 'stage',
            valueType: 'text',
            sorter: true,
          },
          {
            title: 'Manager',
            dataIndex: 'manager',
            valueType: 'text',
            render: (_, record) => <div>{record.project?.manager?.full_name}</div>,
          },
          {
            title: 'Assign to',
            dataIndex: 'assigned_to',
            valueType: 'text',
            sorter: true,
            render: (_, record) => (
              <Open
                onClick={() => showDrawer(record.assigned_to)}
                record={record.assigned_to?.full_name}
              />
            ),
          },
          {
            title: 'Status',
            dataIndex: 'status',
            valueType: 'text',
            sorter: true,
            render: (_, record) => <TaskStatusTag record={record.status} />,
          },
          {
            title: 'Due At',
            dataIndex: 'due_at',
            valueType: 'dateTime',
            sorter: true,
          },
          {
            title: 'Submited At',
            dataIndex: 'submited_at',
            valueType: 'dateTime',
            sorter: true,
          },
          {
            title: 'Submited Status',
            dataIndex: 'submited_status',
            valueType: 'text',
            sorter: true,
          },
          {
            title: 'Description',
            dataIndex: 'description',
            valueType: 'text',
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
        id={id}
      />
      <Drawer title="Developer" onClose={onClose} open={open.open}>
        <p>
          <span style={{ color: 'gray' }}>Name:</span> {open.data?.first_name}{' '}
          {open.data?.last_name}
        </p>
        <p>
          <span style={{ color: 'gray' }}>Username:</span> {open.data?.username}
        </p>
        <p>
          <span style={{ color: 'gray' }}>Email:</span> {open.data?.email}
        </p>
      </Drawer>
    </>
  );
};

export default TasksTable;
