import React, { useEffect, useState } from 'react';
import { Table, Modal, Select, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';

interface Role {
  _id: string;
  Nom: string;
}

interface User {
    _id: string;
    Nom: string;
    Prenom: string;
    Email: string;
    Role: Role;
    Num_Telephone: number;
    Adresse: {
        Rue: string;
        Ville: string;
        Code_Postal: string;
        Pays: string;
    };
    Date_Creation: string;
}

interface TableData {
    key: string;
    fullName: string;
    email: string;
    role: string;
    roleId: string;
    phone: string;
    address: string;
    joinDate: string;
    userId: string;
}

interface FetchUsersParams {
    Email?: string;
}

const UsersTable = (props: { numPage: any }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchEmail, setSearchEmail] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [newRoleId, setNewRoleId] = useState<string>("");
    const [roles, setRoles] = useState<Role[]>([]);

    // Fetch all users (with optional email filter)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                let url = 'http://127.0.0.1:3000/utilisateur/getAllUsersWithDetails';
                const params: FetchUsersParams = {};
                if (searchEmail) params.Email = searchEmail;

                const response = await axios.get(url, { params });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [searchEmail]);

    // Fetch all roles (once on mount)
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/role/getAllRoles');
                setRoles(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();
    }, []);

    const transformedData: TableData[] = users.map((user) => ({
        key: user._id,
        fullName: `${user.Prenom} ${user.Nom}`,
        email: user.Email,
        role: user.Role?.Nom || "N/A",
        roleId: user.Role?._id || "",
        phone: user.Num_Telephone.toString(),
        address: `${user.Adresse?.Rue || ''}, ${user.Adresse?.Ville || ''}, ${user.Adresse?.Code_Postal || ''}, ${user.Adresse?.Pays || ''}`,
        joinDate: new Date(user.Date_Creation).toLocaleDateString(),
        userId: user._id,
    }));

    const columns: ColumnsType<TableData> = [
        {
            title: "Name",
            dataIndex: "fullName",
            key: "fullName",
            render: (text: string, record: TableData) => (
                <a
                  href="#!"
                  onClick={() => {
                    const user = users.find(u => u._id === record.userId);
                    setSelectedUser(user || null);
                    setNewRoleId(record.roleId);
                    setModalVisible(true);
                  }}
                >
                  {text}
                </a>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            render: (address: string) => (
                <span className="text-truncate" style={{ maxWidth: '200px' }} title={address}>
                    {address}
                </span>
            ),
        },
        {
            title: "Join Date",
            dataIndex: "joinDate",
            key: "joinDate",
        },
    ];

    const handleModalOk = async () => {
        if (!selectedUser) return;
        if (newRoleId === selectedUser.Role._id) {
            message.info("No role change detected");
            setModalVisible(false);
            return;
        }
        try {
            await axios.patch(`http://127.0.0.1:3000/utilisateur/updateUserRole/${selectedUser._id}`, {
                roleId: newRoleId,
            });
            message.success("User role updated successfully");
            setModalVisible(false);
            setSelectedUser(null);
            // Refresh users list
            setLoading(true);
            const res = await axios.get('http://127.0.0.1:3000/utilisateur/getAllUsersWithDetails');
            setUsers(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to update user role:", error);
            message.error("Failed to update user role");
        }
    };

    return (
        <div className="col-xl-12">
            {/* Users Header */}
            <div className="card booking-header border-0">
                <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap">
                    <div>
                        <h6 className="mb-1">All Users</h6>
                        <p className="fs-14 text-gray-6 fw-normal">
                            Total Users: {users.length}
                        </p>
                    </div>
                </div>
                <div className="input-icon-start me-2 position-relative mb-3">
                    <span className="icon-addon">
                        <i className="isax isax-search-normal-1 fs-14" />
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by email"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                    />
                </div>
            </div>
            
            {/* Users List */}
            <div className="card user-list">
                <div className="card-body p-0">
                    <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                        <h6>User List</h6>
                    </div>
                    <Table
                        columns={columns}
                        dataSource={transformedData}
                        loading={loading}
                        pagination={{
                            pageSize: props.numPage,
                            showSizeChanger: false,
                            pageSizeOptions: ["5", "10", "20", "30"],
                        }}
                        scroll={{ x: true }}
                    />
                </div>
            </div>

            {/* Modal for role change */}
            <Modal
                title={`Change Role for ${selectedUser?.Prenom} ${selectedUser?.Nom}`}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={handleModalOk}
                okText="Update"
                cancelText="Cancel"
            >
                <Select
                    style={{ width: "100%" }}
                    value={newRoleId}
                    onChange={setNewRoleId}
                >
                    {roles.map(role => (
                        <Select.Option key={role._id} value={role._id}>
                            {role.Nom}
                        </Select.Option>
                    ))}
                </Select>
            </Modal>
        </div>
    );
};

export default UsersTable;
