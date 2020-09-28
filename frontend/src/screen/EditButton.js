import React, { useCallback, memo, useMemo } from 'react';

import {
  Button,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';

const EditButton = ({ onDelete, developer }) => {
  const handleRemove = useCallback(() => {
    onDelete(developer);
  }, [onDelete, developer]);

  const style = useMemo(() => ({
    marginRight: 8,
  }), []);

  return (
    <Button style={style} onClick={handleRemove} shape="circle" icon={<EditOutlined />} />
  )
};

export default memo(EditButton);
