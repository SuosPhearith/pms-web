import React from 'react';
import { Tag } from 'antd';

const PRIORITY_TAG_MAP: { [key: string]: string } = {
  low: "green",
  medium: "orange",
  high: "red",
};
const PriorityTag: React.FC<{ record: string }> = ({ record }) => {
  return (
    <div>
      <Tag color={PRIORITY_TAG_MAP[record] || 'default'}>
        {record.charAt(0).toUpperCase() + record.slice(1)}
      </Tag>
    </div>
  );
};

export default PriorityTag;
