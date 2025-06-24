import React, { useEffect, useState } from 'react';
import { all_routes } from '../../router/all_routes';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import CustomSelect from '../../../core/common/commonSelect';
import { City, CountryOption, State } from '../../../core/common/selectOption/json/selectOption';
import Sidebar from '../../agent-dashboard/sidebar/sidebar';

interface Adresse {
    _id: string;
    Pays: string;
    Ville: string;
    Code_Postal: string;
    Adresse_Locale: string;
}

interface Role {
    _id: string;
    Nom: string;
}

interface UserInfo {
    _id: string;
    Nom: string;
    Prenom: string;
    Email: string;
    Num_Telephone: number;
    Adresse: Adresse;
    Role: Role;
    Date_Creation: string;
}

const Profile = () => {
    const routes = all_routes;
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    // Fetch user info on component mount
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from local storage
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await fetch('http://localhost:3000/utilisateur/userInfo', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user info');
                }

                const data = await response.json();
                setUserInfo(data); // Store the fetched user info in state
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    // Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Settings',
            active: false,
            link: routes.home1,
        },
        {
            label: 'Settings',
            active: true,
        },
    ];

    return (
        <div>
            <Breadcrumb title="Settings" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />

            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-4">
                            <Sidebar />
                        </div>
                        {/* /Sidebar */}
                        {/* Profile Settings */}
                        <div className="col-xl-9 col-lg-8">
                            <div className="card settings mb-0">
                                <div className="card-header">
                                    <h6>Settings</h6>
                                </div>
                                <div className="card-body pb-3">
                                    <div className="settings-link d-flex align-items-center flex-wrap">
                                        <Link to={routes.Profile} className="active ps-3">
                                            <i className="isax isax-user-octagon me-2" />
                                            Profile
                                        </Link>
                                        <Link to={routes.agentSettings}>
                                            <i className="fa-solid fa-pen-to-square me-2 "></i>
                                            Edit Profile
                                        </Link>
                                        <Link to={routes.AddAdmin}>
                                            <i className="isax isax-user-octagon me-2" />
                                            Add Admin 
                                        </Link>
                                        <Link to={routes.agentAccountSettings} className="ps-3">
                                            <i className="isax isax-wallet-money me-2" />
                                            Admins listing
                                        </Link>
                                        
                                    </div>
                                    {/* Settings Content */}
                                    <form>
                                        <div className="settings-content mb-3">
                                            <h6 className="fs-16 mb-3">Basic Information</h6>
                                            <div className="row gy-2">
                                                <div className="col-lg-12">
                                                    <div className="d-flex align-items-center">
                                                       
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">First Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={userInfo?.Nom || ''}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Last Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={userInfo?.Prenom || ''}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Email</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            value={userInfo?.Email || ''}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Phone number</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={userInfo?.Num_Telephone || ''}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Role</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={userInfo?.Role?.Nom || ''}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Address Information */}
                                        <div className="settings-content">
                                            <h6 className="fs-16 mb-3">Address Information</h6>
                                            <div className="row gy-2">
                                                <div className="col-lg-12">
                                                    <div>
                                                        <label className="form-label">local Address</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={userInfo?.Adresse?.Adresse_Locale || ''}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Country</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={userInfo?.Adresse?.Pays || ''}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">City</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={userInfo?.Adresse?.Ville || ''}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">postal code</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={userInfo?.Adresse?.Code_Postal || ''}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                 
                                    </form>
                                    {/* /Settings Content*/}
                                </div>
                            </div>
                        </div>
                        {/* /Profile Settings */}
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}
        </div>
    );
};

export default Profile;