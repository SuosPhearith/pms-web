import React from 'react';
import { Tag } from 'antd';

const STATUS_TAG_MAP: { [key: string]: string } = {
  "Not Started": "cyan",
  "In Progress": "blue",
  "Completed": "green",
  "On Hold": "magenta",
};


const StatusTag: React.FC<{ record: string }> = ({ record }) => {
  return (
    <div>
      <Tag color={STATUS_TAG_MAP[record] || 'default'}>
        {record}
      </Tag>
    </div>
  );
};

export default StatusTag;
