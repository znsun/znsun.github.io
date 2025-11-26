import React from 'react';
import { Empty as AntdEmpty } from 'antd';

const EmptyComponent: React.FC<{ description?: string }> = ({ description = '暂无数据' }) => {
  return <AntdEmpty description={description} />;
};

export default EmptyComponent;