import React, { useState } from 'react';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Button, Input } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { requestList } from '@/services/api/request';
import API, { UserFormValues } from '@/services/pms/typings';
import { createUser, deleteBulkProject, updateUser } from '@/services/pms/api';
import { Modal, message } from 'antd';
import Open from '@/components/Usable/Open';
import EntryForm from './EntryForm';

const UserTable = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<{
    current?: UserFormValues;
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

  const handleOk = async (value: API.UserFormValues) => {
    Modal.confirm({
      title: 'Please Confirm',
      content: 'Are you sure you want to save this project?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          if (value.id) {
            await updateUser(value);
          } else {
            await createUser(value);
          }
          message.success('Project saved successfully!');
          handleCancel();
          actionRef.current?.reload(); // Reload the table or data
        } catch ({ response } : any) {
            // console.log(response.data.email.at(0))
          message.error(response.data.email.at(0));
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
          setSelectedIds([]);
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

  const handleUpdate = (record: UserFormValues) => {
    setData({
      ...data,
      current: record,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <ProTable
        scroll={{ x: 'max-content' }}
        defaultSize="large"
        headerTitle={
          <Search
            placeholder="Search users"
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
          await requestList('/api/user/users-view/', params, sort, filter, searchKey)
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
            dataIndex: 'full_name',
            valueType: 'text',
            render: (_, record) => (
              <Open
                onClick={() => handleUpdate(record as UserFormValues)}
                record={record.full_name}
              />
            ),
          },
          {
            title: 'Username',
            dataIndex: 'username',
            valueType: 'text',
            sorter: true,
          },
          {
            title: 'Email',
            dataIndex: 'email',
            valueType: 'text',
            sorter: true,
          },
          {
            title: 'Role',
            dataIndex: 'role',
            valueType: 'text',
          },
          {
            title: 'Joined Date',
            dataIndex: 'date_joined',
            valueType: 'dateTime',
            sorter: true,
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

export default UserTable;
