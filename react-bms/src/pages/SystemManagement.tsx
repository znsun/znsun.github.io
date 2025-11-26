import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

const SystemManagement: React.FC = () => {
  return (
    <div style={{ background: 'transparent' }}>
      <Card style={{ marginBottom: '16px' }}>
        <Title level={4}>系统管理</Title>
        <Text>管理系统模块，包含用户、角色、权限等管理功能</Text>
      </Card>
      
      <Card>
        <Text>请选择左侧菜单项进行操作</Text>
      </Card>
    </div>
  );
};

export default SystemManagement;