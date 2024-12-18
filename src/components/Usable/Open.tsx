import { ExportOutlined } from '@ant-design/icons';
import React from 'react';

interface OpenProps {
  onClick: (record: any) => void; 
  record: string;                   
}

const Open: React.FC<OpenProps> = ({ onClick, record }) => {
  return (
    <div
      style={{ cursor: 'pointer', color: 'blue' }}
      onClick={() => onClick(record)} 
    >
      <ExportOutlined /> {record}
    </div>
  );
};

export default Open;
