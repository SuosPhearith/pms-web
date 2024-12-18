import React from 'react';
import { Tag } from 'antd';

const STATUS_TAG_MAP: { [key: string]: string } = {
  "pending": "cyan",
  "InProgress": "blue",
  "done": "green",
};


const TaskStatusTag: React.FC<{ record: string }> = ({ record }) => {
  return (
    <div>
      <Tag color={STATUS_TAG_MAP[record] || 'default'}>
        {record}
      </Tag>
    </div>
  );
};

export default TaskStatusTag;
