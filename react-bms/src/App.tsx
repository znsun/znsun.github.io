import React, { useState } from 'react';
import { Layout, Menu, Button, Space, Avatar, Dropdown, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Routes, Route, useNavigate } from 'react-router-dom';
import BreadcrumbComponent from '@/components/Breadcrumb';

// Import pages
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import SystemManagement from '@/pages/SystemManagement';
import UserManagement from '@/pages/system/UserManagement';
import RoleManagement from '@/pages/system/RoleManagement';
import PermissionManagement from '@/pages/system/PermissionManagement';

const { Header, Sider, Content } = Layout;

const AppContent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/system',
      icon: <SettingOutlined />,
      label: '系统管理',
      children: [
        { key: '/system/users', label: '用户管理' },
        { key: '/system/roles', label: '角色管理' },
        { key: '/system/permissions', label: '权限管理' },
      ],
    },
  ];

  const userMenuItems = [
    { key: 'profile', label: '个人资料' },
    { key: 'settings', label: '设置' },
    { key: 'logout', label: '退出登录' },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key.startsWith('/')) {
      navigate(key);
    }
  };

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      // Handle logout logic
      navigate('/login');
    }
  };

  const userMenu = (
    <div style={{ padding: '8px 0' }}>
      {userMenuItems.map(item => (
        <div
          key={item.key}
          style={{
            padding: '8px 16px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          onClick={() => handleUserMenuClick({ key: item.key })}
        >
          {item.label}
        </div>
      ))}
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#fff' }}>
        <div style={{ 
          height: 32, 
          margin: 16, 
          background: '#f0f2f5', 
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1890ff',       
          fontWeight: 'bold'
        }}>
          {collapsed ? 'MS' : '管理系统'}
        </div>
        
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['/']}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ 
            background: '#fff',    
            border: 'none'         
          }}
        />
      </Sider>
      
      <Layout>
        <Header style={{ 
          padding: 0, 
          background: colorBgContainer, 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '16px'
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Space style={{ marginRight: '24px' }}>
            <Dropdown 
              overlay={userMenu} 
              trigger={['click']}
              placement="bottomRight"
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar size="small" icon={<UserOutlined />} />
                <span>管理员</span>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        
        <Content style={{
          background: 'transparent',
          margin: '16px',
          minHeight: 'calc(100vh - 112px)'
        }}>
          <BreadcrumbComponent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/system" element={<SystemManagement />} />
            <Route path="/system/users" element={<UserManagement />} />
            <Route path="/system/roles" element={<RoleManagement />} />
            <Route path="/system/permissions" element={<PermissionManagement />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;
