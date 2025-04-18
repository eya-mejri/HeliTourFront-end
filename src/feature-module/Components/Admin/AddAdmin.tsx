import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { all_routes } from '../../router/all_routes';

import Sidebar from '../../agent-dashboard/sidebar/sidebar';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';

interface AdresseData {
    Pays: string;
    Ville: string;
    Code_Postal: string;
    Adresse_Locale: string;
}

const AddAdmin = () => {
    const routes = all_routes;
    const [formData, setFormData] = useState({
        Nom: '',
        Prenom: '',
        Email: '',
        MDP: '',
        Num_Telephone: '',
        AdresseData: {
            Pays: '',
            Ville: '',
            Code_Postal: '',
            Adresse_Locale: '',
        },
    });

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name in formData.AdresseData) {
            setFormData((prevData) => ({
                ...prevData,
                AdresseData: {
                    ...prevData.AdresseData,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
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

            const response = await fetch('http://localhost:3000/utilisateur/registerAdmin', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add admin');
            }

            const data = await response.json();
            alert(data.message || 'Admin added successfully!');
            setFormData({
                Nom: '',
                Prenom: '',
                Email: '',
                MDP: '',
                Num_Telephone: '',
                AdresseData: {
                    Pays: '',
                    Ville: '',
                    Code_Postal: '',
                    Adresse_Locale: '',
                },
            });
        } catch (error) {
            console.error('Error adding admin:', error);
            alert('Failed to add admin');
        }
    };

    // Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Dashboard',
            active: false,
            link: routes.home1,
        },
        {
            label: 'Add Admin',
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
                                    <Link to={routes.Profile} >
                                        <i className="isax isax-user-octagon me-2" />
                                        Profile
                                    </Link>
                                    <Link to={routes.agentSettings}>
                                        <i className="fa-solid fa-pen-to-square me-2 "></i>
                                        Edit Profile
                                    </Link>
                                    <Link to={routes.AddAdmin} className="active ps-3">
                                        <i className="isax isax-user-octagon me-2" />
                                        Add Admin 
                                    </Link>
                                    <Link to={routes.agentAccountSettings} className="ps-3">
                                        <i className="isax isax-wallet-money me-2" />
                                        Admins listing
                                    </Link>
                                    {/*<Link to={routes.agentSecuritySettings}>
                                        <i className="isax isax-shield-tick me-2" />
                                        Security
                                    </Link>
                                    <Link to={routes.agentPlanSettings}>
                                        <i className="isax isax-star me-2" />
                                        Plans &amp; Billing
                                    </Link>*/}
                                </div>
                                {/* Settings Content */}
                                <form onSubmit={handleSubmit}>
                                        <div className="settings-content mb-3">
                                            <h6 className="fs-16 mb-3">Basic Information</h6>
                                            <div className="row gy-2">
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Nom</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Nom"
                                                            value={formData.Nom}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Prenom</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Prenom"
                                                            value={formData.Prenom}
                                                            onChange={handleInputChange}
                                                            required
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
                                                            value={formData.Email}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Password</label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            name="MDP"
                                                            value={formData.MDP}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Numéro de Téléphone</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Num_Telephone"
                                                            value={formData.Num_Telephone}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Address Information */}
                                        <div className="settings-content">
                                            <h6 className="fs-16 mb-3">Address Information</h6>
                                            <div className="row gy-2">
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Pays</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Pays"
                                                            value={formData.AdresseData.Pays}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Ville</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Ville"
                                                            value={formData.AdresseData.Ville}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Code Postal</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Code_Postal"
                                                            value={formData.AdresseData.Code_Postal}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Adresse Locale</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Adresse_Locale"
                                                            value={formData.AdresseData.Adresse_Locale}
                                                            onChange={handleInputChange}
                                                            required
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
                                                Add Admin
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

export default AddAdmin;




