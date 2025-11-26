import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Input, 
  Space, 
  Modal, 
  Form, 
  Select, 
  Tag, 
  message,
  Row,
  Col
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EyeOutlined, 
  EditOutlined, 
  DeleteOutlined 
} from '@ant-design/icons';

const { TextArea } = Input;

interface User {
  id: string;
  userId: string;
  userName: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createTime: string;
  lastLogin: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  // Mock data initialization
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        userId: 'U001',
        userName: '张三',
        email: 'zhangsan@example.com',
        role: '管理员',
        status: 'active',
        createTime: '2024-01-15 10:30:00',
        lastLogin: '2024-07-30 09:15:00'
      },
      {
        id: '2',
        userId: 'U002',
        userName: '李四',
        email: 'lisi@example.com',
        role: '普通用户',
        status: 'active',
        createTime: '2024-02-20 14:20:00',
        lastLogin: '2024-07-29 16:45:00'
      },
      {
        id: '3',
        userId: 'U003',
        userName: '王五',
        email: 'wangwu@example.com',
        role: '访客',
        status: 'inactive',
        createTime: '2024-03-10 09:15:00',
        lastLogin: '2024-06-15 11:30:00'
      },
      {
        id: '4',
        userId: 'U004',
        userName: '赵六',
        email: 'zhaoliu@example.com',
        role: '编辑',
        status: 'active',
        createTime: '2024-04-05 16:45:00',
        lastLogin: '2024-07-30 10:20:00'
      },
      {
        id: '5',
        userId: 'U005',
        userName: '钱七',
        email: 'qianqi@example.com',
        role: '普通用户',
        status: 'active',
        createTime: '2024-05-12 11:30:00',
        lastLogin: '2024-07-28 14:10:00'
      },
    ];
    setUsers(mockUsers);
  }, []);

  const getStatusTag = (status: string) => {
    const statusMap = {
      'active': { color: 'success', text: '启用' },
      'inactive': { color: 'error', text: '禁用' }
    };
    const config = statusMap[status as keyof typeof statusMap] || { color: 'default', text: '未知' };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const columns = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 120,
      align: 'center' as const,
      render: (text: string, record: User) => (
        <Space size={4} style={{ whiteSpace: 'nowrap' }}>
          <span style={{ fontWeight: 500 }}>{text}</span>
          <Tag size="small" style={{ margin: 0, fontSize: '11px', padding: '0 4px' }}>
            {record.id}
          </Tag>
        </Space>
      ),
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      width: 180,
      align: 'center' as const,
      render: (text: string, record: User) => (
        <Space size={4} style={{ whiteSpace: 'nowrap' }}>
          <span style={{ fontWeight: 500 }}>{text}</span>
          <Tag size="small" style={{ margin: 0, fontSize: '11px', padding: '0 4px' }}>
            {record.userId}
          </Tag>
        </Space>
      ),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      align: 'center' as const,
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      align: 'center' as const,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center' as const,
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160,
      align: 'center' as const,
      sorter: (a: User, b: User) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
    },
    {
      title: '最后登录',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      width: 160,
      align: 'center' as const,
      sorter: (a: User, b: User) => new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime(),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      align: 'center' as const,
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<EyeOutlined />} 
            onClick={() => handleViewDetail(record)} 
            size="small"
          >
            详情
          </Button>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)} 
            size="small"
          >
            编辑
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record)} 
            size="small"
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleViewDetail = (user: User) => {
    setSelectedUser(user);
    setDetailModalVisible(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setModalVisible(true);
  };

  const handleDelete = (user: User) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除用户 ${user.userName} 吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setUsers(prev => prev.filter(u => u.id !== user.id));
        message.success('删除成功');
      }
    });
  };

  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      if (editingUser) {
        // Update existing user
        setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...values } : u));
        message.success('用户信息更新成功');
      } else {
        // Add new user
        const newUser: User = {
          ...values,
          id: Date.now().toString(),
          userId: `U${Date.now().toString().slice(-3)}`,
          createTime: new Date().toLocaleString('sv-SE'),
          lastLogin: '-'
        };
        setUsers(prev => [...prev, newUser]);
        message.success('用户添加成功');
      }
      setModalVisible(false);
    });
  };

  // Filter users based on search text
  const filteredUsers = users.filter(user => 
    user.userName.includes(searchText) || 
    user.email.includes(searchText) || 
    user.userId.includes(searchText)
  );

  return (
    <div style={{ background: 'transparent' }}>
      {/* Search and action bar */}
      <Card style={{ marginBottom: '16px' }}>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Input
              placeholder="搜索用户..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
              新增用户
            </Button>
          </Col>
        </Row>
      </Card>

      {/* User table */}
      <Card>
        <Table 
          dataSource={filteredUsers} 
          columns={columns} 
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
          }}
          scroll={{ x: 'max-content' }}
        />
      </Card>

      {/* Edit modal */}
      <Modal
        title={editingUser ? '编辑用户' : '新增用户'}
        open={modalVisible}
        onOk={handleSave}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="userName"
                label="用户名"
                rules={[{ required: true, message: '请输入用户名!' }]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { required: true, message: '请输入邮箱!' },
                  { type: 'email', message: '请输入正确的邮箱格式!' }
                ]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="role"
                label="角色"
                rules={[{ required: true, message: '请选择角色!' }]}
              >
                <Select placeholder="请选择角色">
                  <Select.Option value="管理员">管理员</Select.Option>
                  <Select.Option value="编辑">编辑</Select.Option>
                  <Select.Option value="普通用户">普通用户</Select.Option>
                  <Select.Option value="访客">访客</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="状态"
                rules={[{ required: true, message: '请选择状态!' }]}
              >
                <Select placeholder="请选择状态">
                  <Select.Option value="active">启用</Select.Option>
                  <Select.Option value="inactive">禁用</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Detail modal */}
      <Modal
        title="用户详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedUser && (
          <Form layout="vertical" disabled>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="用户ID">
                  <Input value={selectedUser.userId} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="用户名">
                  <Input value={selectedUser.userName} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="邮箱">
                  <Input value={selectedUser.email} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="角色">
                  <Input value={selectedUser.role} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="状态">
                  <Input value={getStatusTag(selectedUser.status).props.children} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="创建时间">
                  <Input value={selectedUser.createTime} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="最后登录">
              <Input value={selectedUser.lastLogin} />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;