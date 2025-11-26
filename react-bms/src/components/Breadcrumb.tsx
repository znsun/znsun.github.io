import React from 'react';
import { Breadcrumb as AntdBreadcrumb, Space } from 'antd';
import { 
  HomeOutlined, 
  SettingOutlined, 
  UserOutlined, 
  SafetyOutlined, 
  KeyOutlined 
} from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';

const BreadcrumbComponent: React.FC = () => {
  const location = useLocation();
  
  const routeConfig: Record<string, { title: string; icon?: React.ReactNode }> = {
    '/': { title: '首页', icon: <HomeOutlined /> },
    '/system': { title: '系统管理', icon: <SettingOutlined /> },
    '/system/users': { title: '用户管理', icon: <UserOutlined /> },
    '/system/roles': { title: '角色管理', icon: <SafetyOutlined /> },
    '/system/permissions': { title: '权限管理', icon: <KeyOutlined /> },
  };

  const pathSnippets = location.pathname.split('/').filter(i => i);
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const routeInfo = routeConfig[url];
    
    if (!routeInfo) return null;
    
    const isLast = index === pathSnippets.length - 1;
    
    return {
      key: url,
      title: isLast ? (
        <Space size={4}>
          {routeInfo.icon}
          <span>{routeInfo.title}</span>
        </Space>
      ) : (
        <Link to={url}>
          <Space size={4}>
            {routeInfo.icon}
            <span>{routeInfo.title}</span>
          </Space>
        </Link>
      ),
    };
  }).filter(Boolean);

  // Add home breadcrumb at the beginning
  const homeBreadcrumb = {
    key: '/',
    title: (
      <Link to="/">
        <Space size={4}>
          <HomeOutlined />
          <span>首页</span>
        </Space>
      </Link>
    ),
  };

  const finalBreadcrumbItems = [homeBreadcrumb, ...breadcrumbItems].filter(Boolean);

  return (
    <div style={{ 
      borderBottom: '1px solid #f0f0f0', 
      marginBottom: '16px',
      paddingBottom: '8px'
    }}>
      <AntdBreadcrumb 
        items={finalBreadcrumbItems as any}
        style={{ fontSize: '14px' }}
      />
    </div>
  );
};

export default BreadcrumbComponent;