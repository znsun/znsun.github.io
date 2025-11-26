import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Space, Tag, List, Avatar, Typography, Grid } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  SafetyCertificateOutlined, 
  KeyOutlined,
  SettingOutlined,
  CloudUploadOutlined,
  FileTextOutlined,
  LoginOutlined,
  EditOutlined,
  PlusOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const Home: React.FC = () => {
  const screens = useBreakpoint();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock data for statistics
  const statsData = [
    { title: '总用户数', value: 1234, icon: <UserOutlined />, color: '#52c41a', change: '+12%' },
    { title: '在线用户', value: 89, icon: <TeamOutlined />, color: '#1890ff', change: '+5%' },
    { title: '系统角色', value: 15, icon: <SafetyCertificateOutlined />, color: '#722ed1', change: '+2%' },
    { title: '权限数量', value: 42, icon: <KeyOutlined />, color: '#fa8c16', change: '+3%' },
  ];

  // Mock data for quick actions
  const quickActions = [
    { title: '新增用户', icon: <PlusOutlined />, color: '#1890ff' },
    { title: '角色管理', icon: <SafetyCertificateOutlined />, color: '#722ed1' },
    { title: '权限分配', icon: <KeyOutlined />, color: '#fa8c16' },
    { title: '系统设置', icon: <SettingOutlined />, color: '#52c41a' },
    { title: '数据备份', icon: <CloudUploadOutlined />, color: '#13c2c2' },
    { title: '日志查看', icon: <FileTextOutlined />, color: '#f5222d' },
  ];

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, user: '张三', action: '登录系统', time: new Date(Date.now() - 300000), type: 'login' },
    { id: 2, user: '李四', action: '编辑用户信息', time: new Date(Date.now() - 600000), type: 'edit' },
    { id: 3, user: '王五', action: '新增角色', time: new Date(Date.now() - 900000), type: 'add' },
    { id: 4, user: '赵六', action: '删除权限', time: new Date(Date.now() - 1200000), type: 'delete' },
    { id: 5, user: '钱七', action: '登录系统', time: new Date(Date.now() - 1500000), type: 'login' },
  ];

  // Mock data for system status
  const systemStatus = [
    { title: 'CPU 使用率', value: '24%', status: 'normal' },
    { title: '内存使用率', value: '45%', status: 'normal' },
    { title: '磁盘使用率', value: '67%', status: 'warning' },
    { title: '网络连接数', value: '128', status: 'normal' },
    { title: '数据库连接', value: '正常', status: 'normal' },
    { title: '系统运行时间', value: '24天', status: 'normal' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  return (
    <div style={{ background: 'transparent' }}>
      {/* Welcome card */}
      <Card style={{ marginBottom: '16px' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Title level={4} style={{ marginBottom: '4px' }}>
                早上好，管理员！
              </Title>
              <Text type="secondary">
                {format(currentTime, 'yyyy年MM月dd日 HH:mm:ss', { locale: zhCN })}
              </Text>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Text>系统状态</Text>
              <Tag color="success">运行正常</Tag>
            </div>
          </div>
          <Text>欢迎使用管理系统，您可以在这里管理用户、角色和权限。</Text>
        </Space>
      </Card>

      {/* Statistics cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card>
              <Space direction="vertical" align="center" style={{ width: '100%' }}>
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: '50%', 
                  backgroundColor: `${stat.color}20`, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <span style={{ fontSize: 20, color: stat.color }}>{stat.icon}</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Text type="secondary" strong>{stat.title}</Text>
                  <div style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>{stat.value}</div>
                  <Tag color="processing" style={{ marginTop: 4 }}>{stat.change}</Tag>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Main content area */}
      <Row gutter={[16, 16]}>
        {/* Left column - Quick actions and system status */}
        <Col xs={24} lg={12}>
          {/* Quick actions */}
          <Card title="快捷操作" style={{ marginBottom: '16px' }}>
            <Row gutter={[12, 12]}>
              {quickActions.map((action, index) => (
                <Col span={8} key={index}>
                  <Card 
                    size="small" 
                    hoverable
                    style={{ 
                      textAlign: 'center', 
                      cursor: 'pointer',
                      border: '1px solid #f0f0f0'
                    }}
                  >
                    <div style={{ 
                      fontSize: 24, 
                      color: action.color, 
                      marginBottom: 8 
                    }}>
                      {action.icon}
                    </div>
                    <Text strong>{action.title}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>

          {/* System status */}
          <Card title="系统状态">
            <Row gutter={[16, 16]}>
              {systemStatus.map((status, index) => (
                <Col xs={12} md={8} key={index}>
                  <Card size="small" style={{ textAlign: 'center' }}>
                    <Text type="secondary">{status.title}</Text>
                    <div style={{ fontSize: 16, fontWeight: 500, marginTop: 4 }}>{status.value}</div>
                    <Tag color={getStatusColor(status.status)} style={{ marginTop: 4 }}>
                      {status.status === 'normal' ? '正常' : status.status === 'warning' ? '警告' : '异常'}
                    </Tag>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* Right column - Recent activities */}
        <Col xs={24} lg={12}>
          <Card title="最近活动">
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={
                      <Space>
                        {item.user}
                        <Tag 
                          color={
                            item.type === 'login' ? 'blue' : 
                            item.type === 'edit' ? 'orange' : 
                            item.type === 'add' ? 'green' : 'red'
                          }
                        >
                          {item.action}
                        </Tag>
                      </Space>
                    }
                    description={format(item.time, 'HH:mm:ss', { locale: zhCN })}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;