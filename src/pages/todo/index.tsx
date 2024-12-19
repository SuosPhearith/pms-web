import React, { useEffect, useState } from 'react';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Button, Col, Drawer, Flex, Input, Radio, Row, Select, Space, Tag } from 'antd';
import { requestList } from '@/services/api/request';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import API, { TaskFormValues } from '@/services/pms/typings';
import {
  createRemark,
  optionDevelopers,
  optionProjects,
  updateTodoStatus,
} from '@/services/pms/api';
import { Modal, message } from 'antd';
import Open from '@/components/Usable/Open';
import { RadioChangeEvent } from 'antd/lib';
import utc from 'dayjs/plugin/utc';
import TextArea from 'antd/es/input/TextArea';
dayjs.extend(duration);

const TodoTable = () => {
  const [open, setOpen] = useState<{
    open: boolean;
    data: { taskId: number; remark_note: string; remark_status: string };
  }>({ open: false, data: { taskId: 0, remark_note: '', remark_status: '' } });
  const [status, setStatus] = useState<string>();
  const [stage, setStage] = useState<string>();
  const [projectId, setProjectId] = useState<number>();
  const [data, setData] = useState<{
    projects: API.OptionValue[];
    developers: API.OptionValue[];
    current?: TaskFormValues;
  }>({ projects: [], developers: [], current: undefined });
  const [searchKey, setSearchKey] = useState('');
  const { Search } = Input;
  const actionRef = React.useRef<ActionType>();
  dayjs.extend(utc);

  const getOptions = async () => {
    try {
      const projectOptions = await optionProjects();
      const developersOptions = await optionDevelopers();
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
  const onClose = () => {
    setOpen({ open: false, data: { taskId: 0, remark_note: '', remark_status: '' } });
  };

  const plainOptions = ['pending', 'InProgress', 'done'];
  const onChangeStatus = ({ target: { value } }: RadioChangeEvent, id: number) => {
    Modal.confirm({
      title: 'Please Confirm',
      content: `Switch status to ${value}?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          await updateTodoStatus({ taskId: id, status: value });
          message.success('Updated successfully!');
          actionRef.current?.reload();
        } catch (error) {
          message.error('Failed. Please try again.');
        }
      },
      onCancel: () => {
        //   message.info('Task update canceled.');
      },
    });
  };

  const handleCreateRemark = () => {
    if (!open.data.taskId || !open.data.remark_note || !open.data.remark_status){
        return message.error("Please check you fields.")
    }
    Modal.confirm({
      title: 'Please Confirm',
      content: `Are you sure to save remark?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          console.log(open.data);
          await createRemark({ ...open.data });
          onClose();
          message.success('Updated successfully!');
          actionRef.current?.reload();
        } catch (error) {
          message.error('Failed. Please try again.');
        }
      },
      onCancel: () => {
        //   message.info('Task update canceled.');
      },
    });
  };

  useEffect(() => {
    getOptions();
  }, []);

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
              <Select
                showSearch
                allowClear
                placeholder="Select a Project"
                optionFilterProp="label"
                onChange={onChange}
                options={data.projects}
                style={{ minWidth: '200px' }}
              />
              <Select
                showSearch
                allowClear
                placeholder="Select a Project"
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
            '/api/todo/todos-view/',
            params,
            sort,
            { project__id: projectId, status: status, stage: stage },
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
            title: 'Remark',
            dataIndex: 'remark',
            valueType: 'text',
            render: (_, record) => (
              <Open
                onClick={() =>
                  setOpen({
                    open: true,
                    data: {
                      taskId: record.id,
                      remark_note: record.remark_note,
                      remark_status: record.remark_status,
                    },
                  })
                }
                record={'Make Remark'}
              />
            ),
          },
          {
            title: 'Task',
            dataIndex: 'name',
            valueType: 'text',
            sorter: true,
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
            sorter: true,
            render: (_, record) => <div>{record.created_by?.full_name}</div>,
          },
          {
            title: 'Status',
            dataIndex: 'status',
            valueType: 'text',
            sorter: true,
            render: (_, record) => (
              <Flex>
                <Radio.Group
                  options={plainOptions}
                  onChange={(e) => onChangeStatus(e, record.id)}
                  value={record.status}
                />
              </Flex>
            ),
          },
          {
            title: 'Due At',
            dataIndex: 'due_at',
            valueType: 'dateTime',
            sorter: true,
            renderText: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
          },
          {
            title: 'Remaining Time',
            dataIndex: 'due_at',
            renderText: (value) => {
              const now = dayjs();
              const due = dayjs(value);
              const diff = due.diff(now);

              if (diff <= 0) {
                return <Tag color="red">Overdue</Tag>;
              }

              const duration = dayjs.duration(diff);
              return (
                <Tag color="purple">
                  {duration.days()}d {duration.hours()}h {duration.minutes()}m
                </Tag>
              );
            },
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
        ]}
        pagination={{
          showQuickJumper: true,
        }}
        rowSelection={false}
      />
      <Drawer
        title="Add a Remark"
        width={720}
        onClose={onClose}
        open={open.open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={handleCreateRemark}>
              Submit
            </Button>
          </Space>
        }
      >
        <Row gutter={16}>
          <Col span={24}>
            <Space style={{ marginBottom: '5px' }}>
              <span style={{ color: 'red', fontSize: '25px' }}>*</span>{' '}
              <div style={{ paddingBottom: '10px' }}>Remark Note</div>
            </Space>
            <TextArea
              rows={4}
              placeholder="Please enter your remark"
              value={open.data.remark_note}
              onChange={(e) =>
                setOpen({
                  open: open.open,
                  data: { ...open.data, remark_note: e.target.value },
                })
              }
            />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={24}>
            <Space style={{ marginBottom: '5px' }}>
              <span style={{ color: 'red', fontSize: '25px' }}>*</span>{' '}
              <div style={{ paddingBottom: '10px' }}>Remark Status</div>
            </Space>
            <Select
              placeholder="Please select a remark status"
              style={{ width: '100%' }}
              options={[
                { value: 'Information', label: 'Information' },
                { value: 'Suggestion', label: 'Suggestion' },
                { value: 'Requirement', label: 'Requirement' },
                { value: 'Unimplement', label: 'Unimplement' },
              ]}
              value={open.data.remark_status}
              onChange={(e) =>
                setOpen({
                  open: open.open,
                  data: { ...open.data, remark_status: e },
                })
              }
            />
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default TodoTable;
