import React, { useEffect, useState } from 'react';
import { all_routes } from '../../router/all_routes';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import Sidebar from '../sidebar/sidebar';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import CustomSelect from '../../../core/common/commonSelect';
import { City, CountryOption, State } from '../../../core/common/selectOption/json/selectOption';
interface UserInfo {
    Nom: string;
    Prenom: string;
    Email: string;
    Num_Telephone: number | string;
    Adresse: {
        _id: string;
        Pays: string;
        Ville: string;
        Code_Postal: string;
        Adresse_Locale: string;
    };
}


const AgentSettings = () => {
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
                console.log(data)
                setUserInfo(data); // Store the fetched user info in state
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    // Handle input changes for basic information
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo!,
            [name]: value,
        }));
    };

    // Handle input changes for address information
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo!,
            Adresse: {
                ...prevUserInfo!.Adresse,
                [name]: value,
            },
        }));
    };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        // 1. Update address first
        const addressRes = await fetch(
            `http://localhost:3000/adresse/update/${userInfo?.Adresse._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo?.Adresse),
            }
        );

        if (!addressRes.ok) {
            throw new Error('Failed to update address');
        }

        const updatedAddress = await addressRes.json();

        // 2. Update user with the updated address ID
        const userUpdateData = {
            Nom: userInfo?.Nom,
            Prenom: userInfo?.Prenom,
            Email: userInfo?.Email,
            Num_Telephone: userInfo?.Num_Telephone,
            Adresse: updatedAddress._id, // Only ID
        };

        const userRes = await fetch('http://localhost:3000/utilisateur/updateProfile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userUpdateData),
        });

        if (!userRes.ok) {
            throw new Error('Failed to update profile');
        }

        alert('Profile updated successfully!');
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile');
    }
};


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
                                        <Link to={routes.Profile}>
                                            <i className="isax isax-user-octagon me-2" />
                                            Profile
                                        </Link>
                                        <Link to={routes.agentSettings} className="active ps-3">
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
                                    <form onSubmit={handleSubmit}>
                                        <div className="settings-content mb-3">
                                            <h6 className="fs-16 mb-3">Basic Information</h6>
                                            <div className="row gy-2">
                                                <div className="col-lg-12">
                                                    <div className="d-flex align-items-center">
                                                       
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Last Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Nom"
                                                            value={userInfo?.Nom || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">First name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Prenom"
                                                            value={userInfo?.Prenom || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Email</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            name="Email"
                                                            value={userInfo?.Email || ''}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Phone number</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Num_Telephone"
                                                            value={userInfo?.Num_Telephone || ''}
                                                            onChange={handleInputChange}
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
                                                        <label className="form-label">Local Address</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Adresse_Locale"
                                                            value={userInfo?.Adresse?.Adresse_Locale || ''}
                                                            onChange={handleAddressChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Country</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Pays"
                                                            value={userInfo?.Adresse?.Pays || ''}
                                                            onChange={handleAddressChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">City</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Ville"
                                                            value={userInfo?.Adresse?.Ville || ''}
                                                            onChange={handleAddressChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Postal code</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Code_Postal"
                                                            value={userInfo?.Adresse?.Code_Postal || ''}
                                                            onChange={handleAddressChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-end mt-3">
                                            <Link to="#" className="btn btn-light me-2">
                                                Cancel
                                            </Link>
                                            <button type="submit" className="btn btn-primary">
                                                Save
                                            </button>
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

export default AgentSettings;