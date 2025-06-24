import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { all_routes } from '../../router/all_routes';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import { Link } from 'react-router-dom';
import Sidebar from '../../../core/common/sidebar/sidebar';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import axios from 'axios';


// Define types based on your schema
type Address = {
    _id: string;
    Pays: string;
    Ville: string;
    Code_Postal: string;
    Adresse_Locale: string;
};

type ProfileData = {
    _id: string;
    Nom: string;
    Prenom: string;
    Email: string;
    Num_Telephone: number | string;
    Adresse: Address | string | null; // sécurité ici
    Role:String;
    Date_Creation?: Date;
};

type MessageType = {
    text: string;
    type: 'success' | 'error' | '';
};

const ProfileSettings = () => {
    const routes = all_routes;
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<MessageType>({ text: '', type: '' });
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [addressData, setAddressData] = useState<Address | null>(null);
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                
                // Get user data from localStorage
                const userString = localStorage.getItem('userData');
                console.log(userString)
                if (!userString) throw new Error('User data not found in localStorage');
                
                const userData: ProfileData = JSON.parse(userString);
                
                // Fetch complete address data if Adresse is an ID
                let address: Address | null = null;
                if (typeof userData.Adresse === 'string') {
                    const addressResponse = await axios.get(`http://127.0.0.1:3000/adresse/get/${userData.Adresse}`);
                    console.log(addressResponse)
                    address = addressResponse.data;
                    setAddressData(address);
                } else {
                    address = userData.Adresse;
                    setAddressData(address);
                }

                setProfileData({
                    ...userData,
                    Num_Telephone: userData.Num_Telephone.toString()
                });
                
            } catch (error) {
                setMessage({ 
                    text: error instanceof Error ? error.message : 'Failed to load profile data', 
                    type: 'error' 
                });
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserData();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (profileData) {
            setProfileData({
                ...profileData,
                [name]: value
            });
        }
    };

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (addressData) {
            setAddressData({
                ...addressData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!profileData || !addressData) return;
        
        setLoading(true);
        setMessage({ text: '', type: '' });
        
        try {
            // 1. First update the address
            const addressResponse = await axios.put(
                `http://127.0.0.1:3000/adresse/update/${typeof profileData.Adresse === 'string' ? profileData.Adresse : addressData._id}`, 
                addressData
            );
            
            // 2. Prepare user update data according to API expectations
            const userUpdateData = {
                Email: profileData.Email, // Required by backend to find user
                Nom: profileData.Nom,
                Prenom: profileData.Prenom,
                Num_Telephone: Number(profileData.Num_Telephone),
                Adresse: addressResponse.data._id // Updated address reference
            };
    
            // 3. Update user profile
            const userResponse = await axios.put(
                'http://127.0.0.1:3000/utilisateur/putuser', 
                userUpdateData, 
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
    
            // 4. Update local storage and state
            const updatedUserData = {
                ...userResponse.data,
                Num_Telephone: userResponse.data.Num_Telephone.toString(),
                Adresse: addressResponse.data._id // Store just the ID
            };
            
            localStorage.setItem('userData', JSON.stringify(updatedUserData));
            setProfileData(updatedUserData);
            setAddressData(addressResponse.data);
            
            setMessage({ 
                text: 'Profile updated successfully', 
                type: 'success' 
            });
            
        } catch (error) {
            const errorMsg = axios.isAxiosError(error) 
                ? error.response?.data?.error || error.message 
                : 'Failed to update profile';
            setMessage({ 
                text: errorMsg, 
                type: 'error' 
            });
        } finally {
            setLoading(false);
        }
    };
    const breadcrumbs = [
        {
            label: 'Profile',
            link: routes.home1,
            active: false,
        },
        {
            label: 'Edit Profile',
            active: true,
        },
    ];

    if (!profileData || !addressData) {
        return <div>Loading profile data...</div>;
    }

    return (
        <div>
            <Breadcrumb
                title="Edit Profile"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-04"
            />

            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4">
                            <Sidebar />
                        </div>
                        <div className="col-xl-9 col-lg-8">
                            <form onSubmit={handleSubmit}>
                                <div className="card settings mb-0">
                                    <div className="card-header">
                                        <h6>Edit Profile</h6>
                                    </div>
                                    <div className="card-body pb-3">
                                        {message.text && (
                                            <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'}`}>
                                                {message.text}
                                            </div>
                                        )}

                                        <div className="settings-content mb-3">
                                            <h6 className="fs-16 mb-3">Basic Information</h6>
                                            <div className="row gy-2">
                                                <div className="col-lg-12">
                                                    {/*<div className="d-flex align-items-center">
                                                        <ImageWithBasePath
                                                            src="assets/img/users/user-01.jpg"
                                                            alt="profile"
                                                            className="img-fluid avatar avatar-xxl br-10 flex-shrink-0 me-3"
                                                        />
                                                        <div>
                                                            <p className="fs-14 text-gray-6 fw-normal mb-2">
                                                                Recommended dimensions are typically 400 x 400 pixels.
                                                            </p>
                                                            <div className="d-flex align-items-center">
                                                                <div className="me-2">
                                                                    <label className="upload-btn" htmlFor="fileUpload">
                                                                        Upload
                                                                    </label>
                                                                    <input
                                                                        type="file"
                                                                        id="fileUpload"
                                                                        style={{ display: "none" }}
                                                                    />
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-light btn-md"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>*/}
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">First Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Prenom"
                                                            value={profileData.Prenom}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Last Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Nom"
                                                            value={profileData.Nom}
                                                            onChange={handleChange}
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
                                                            value={profileData.Email}
                                                            onChange={handleChange}
                                                            required
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Phone</label>
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            name="Num_Telephone"
                                                            value={profileData.Num_Telephone}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="settings-content">
                                            <h6 className="fs-16 mb-3">Address Information</h6>
                                            <div className="row gy-2">
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Country</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Pays"
                                                            value={addressData.Pays}
                                                            onChange={handleAddressChange}
                                                            required
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
                                                            value={addressData.Ville}
                                                            onChange={handleAddressChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Postal Code</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Code_Postal"
                                                            value={addressData.Code_Postal}
                                                            onChange={handleAddressChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div>
                                                        <label className="form-label">Street Address</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="Adresse_Locale"
                                                            value={addressData.Adresse_Locale}
                                                            onChange={handleAddressChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="d-flex align-items-center justify-content-end">
                                            <Link to={routes.Profile} className="btn btn-light me-2">
                                                Cancel
                                            </Link>
                                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                                {loading ? 'Saving...' : 'Save Changes'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;