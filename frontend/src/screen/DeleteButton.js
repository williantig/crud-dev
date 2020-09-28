import React, { useCallback, memo } from 'react';

import {
  Button, Popconfirm,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';


const DeleteButton = ({ onDelete, developer }) => {
  const handleRemove = useCallback(() => {
    onDelete(developer);
  }, [onDelete, developer]);

  return (
    <Popconfirm
      title="Deseja remover este desenvolvedor?"
      okText="Sim"
      cancelText="Não"
      onConfirm={handleRemove}
    >
      <Button shape="circle" danger icon={<DeleteOutlined />} />
    </Popconfirm>
  )
};

export default memo(DeleteButton);
