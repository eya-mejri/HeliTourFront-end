import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';

interface User {
    _id: string;
    Nom: string;
    Prenom: string;
    Email: string;
    Role: {
        _id: string;
        Nom: string;
    };
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
    phone: string;
    address: string;
    joinDate: string;
}
interface FetchUsersParams {
    Email?: string;
    // Add other possible query parameters here if needed
  }

const AdminTable = (props: { numPage: any }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchEmail, setSearchEmail] = useState("");

useEffect(() => {
    const fetchUsers = async () => {
        try {
            setLoading(true);
            let url = 'http://127.0.0.1:3000/utilisateur/getAdminUsersWithDetails';
            
            // Add email parameter if searchEmail exists
            const params: FetchUsersParams = {};
                if (searchEmail) {
                params.Email = searchEmail;
                }
            
            const response = await axios.get(url, { params });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchUsers();
}, [searchEmail]); // Re-run when searchEmail changes

   

    const transformedData: TableData[] = users.map((user) => ({
        key: user._id,
        fullName: `${user.Prenom} ${user.Nom}`,
        email: user.Email,
        role: user.Role?.Nom || "N/A",
        phone: user.Num_Telephone.toString(),
        address: `${user.Adresse?.Rue || ''}, ${user.Adresse?.Ville || ''}, ${user.Adresse?.Code_Postal || ''}, ${user.Adresse?.Pays || ''}`,
        joinDate: new Date(user.Date_Creation).toLocaleDateString(),
    }));

    const columns: ColumnsType<TableData> = [
        {
            title: "Name",
            dataIndex: "fullName",
            key: "fullName",
            
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
            /*filters: [
                { text: 'Admin', value: 'Admin' },
                { text: 'User', value: 'User' },
                { text: 'Agent', value: 'Agent' },
            ],
            onFilter: (value, record) => record.role === value,*/
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
            /*render: (address: string) => (
                <span className="text-truncate" style={{ maxWidth: '200px' }} title={address}>
                    {address}
                </span>
            ),*/
        },
        {
            title: "Join Date",
            dataIndex: "joinDate",
            key: "joinDate",
            /*sorter: (a, b) => new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(),*/
        },
    ];

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
                    
                    {/* Users Table */}
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
        </div>
    );
};

export default AdminTable;