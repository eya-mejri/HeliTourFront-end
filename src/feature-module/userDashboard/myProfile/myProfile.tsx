import React, { useEffect, useState } from 'react'
import { all_routes } from '../../router/all_routes';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import Sidebar from '../../../core/common/sidebar/sidebar';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface User {
  Nom: string;
  Prenom: string;
  Email: string;
  Num_Telephone: number;
  Adresse: {
    Pays: string;
    Ville: string;
    Code_Postal: string;
    Adresse_Locale: string;
  };
  Role: {
    Nom: string;
  };
}

const MyProfile = () => {
  const routes = all_routes;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'My Profile',
      link: routes.home1,
      active: false,
    },
    {
      label: 'My Profile',
      active: true,
    },
  ];

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store token in localStorage
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://127.0.0.1:3000/utilisateur/userInfo', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!user) return <div className="alert alert-warning">User not found</div>;

  return (
    <div>
      <Breadcrumb
        title="My Profile"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-01"
        backgroundImage="http://localhost:3000/assets/img/bgTourList.webp"
      />

      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-4">
              <Sidebar />
            </div>
            {/* /Sidebar */}
            {/* My Profile */}
            <div className="col-xl-9 col-lg-8">
              <div className="card shadow-none mb-0">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h6>My Profile</h6>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link
                      to={routes.profileSettings}
                      className="p-1 rounded-circle btn btn-light d-flex align-items-center justify-content-center"
                    >
                      <i className="isax isax-edit-2 fs-14" />
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="fs-16 mb-3">Basic Information</h6>
                  {/*<div className="d-flex align-items-center mb-3">
                    <span className="avatar avatar-xl flex-shrink-0 me-3 ">
                      <ImageWithBasePath
                        src="assets/img/users/user-01.jpg"
                        alt="Img"
                        className="img-fluid rounded"
                      />
                    </span>
                    <div className="profile-upload">
                      <div className="mb-2">
                        <p className="fs-12">
                          Recommended image size is 40px x 40px
                        </p>
                      </div>
                      <div className="profile-uploader d-flex align-items-center">
                        <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                          Upload
                          <input
                            type="file"
                            className="form-control image-sign"
                            multiple
                          />
                        </div>
                        <Link
                          to="#"
                          className="btn btn-light btn-sm"
                        >
                          Cancel
                        </Link>
                      </div>
                    </div>
                  </div>*/}
                  <div className="row border-bottom pb-2 mb-3">
                    <div className="col-md-6">
                      <div className="mb-2">
                        <h6 className="fs-14">First Name</h6>
                        <p>{user.Prenom}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-2">
                        <h6 className="fs-14">Last Name</h6>
                        <p>{user.Nom}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-2">
                        <h6 className="fs-14">Email</h6>
                        <p>{user.Email}</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-2">
                        <h6 className="fs-14">Phone</h6>
                        <p>{user.Num_Telephone}</p>
                      </div>
                    </div>
                  </div>
                  <h6 className="fs-16 mb-3">Address Information</h6>
                  {user.Adresse && (
  <div className="row g-2">
    <div className="col-md-12">
      <div>
        <h6 className="fs-14">Address</h6>
        <p>{user.Adresse.Adresse_Locale}</p>
      </div>
    </div>
    <div className="col-md-12">
      <div>
        <h6 className="fs-14">Country</h6>
        <p>{user.Adresse.Pays}</p>
      </div>
    </div>
    <div className="col-md-12">
      <div>
        <h6 className="fs-14">City</h6>
        <p>{user.Adresse.Ville}</p>
      </div>
    </div>
    <div className="col-md-12">
      <div>
        <h6 className="fs-14">Postal Code</h6>
        <p>{user.Adresse.Code_Postal}</p>
      </div>
    </div>
  </div>
)}

                </div>
              </div>
            </div>
            {/* /My Profile */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile