import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { all_routes } from "../../router/all_routes";
import NotiIcon from "./NotiIcon";
import React, { useEffect, useState } from 'react';


interface Role {
    _id: string;
    Nom: string;
}

interface UserInfo {
    _id: string;
    Nom: string;
    Prenom: string;
    Email: string;
    Role: Role;
    Date_Creation: string;
}

const ProfileCard = () => {
    const routes = all_routes;
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    
    // Format date to be more readable
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Fetch user info on component mount
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
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
                setUserInfo(data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="card-header user-sidebar-header text-center bg-gray-transparent">
            <div className="agent-profile d-inline-flex">
                <ImageWithBasePath
                    src="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_640.png"
                    alt="image"
                    className="img-fluid rounded-circle"
                />
                <Link
                    to={routes.agentSettings}
                    className="avatar avatar-sm rounded-circle btn btn-primary d-flex align-items-center justify-content-center p-0"
                >
                    <i className="isax isax-edit-2 fs-14" />
                </Link>
            </div>
            <h6 className="fs-16">
                {userInfo ? `${userInfo.Prenom} ${userInfo.Nom}` : 'Loading...'}
            </h6>
            <p className="fs-14 mb-2">
                Member Since {userInfo ? formatDate(userInfo.Date_Creation) : 'Loading...'}
            </p>
            <p className="fs-14 mb-2">
                 {userInfo ? (userInfo.Email) : 'Loading...'}
            </p>
            <div className="d-flex align-items-center justify-content-center notify-item">
                <NotiIcon/>
                {/*<Link
                    to={routes.agentChat}
                    className="rounded-circle btn btn-white d-flex align-items-center justify-content-center p-0 position-relative"
                >
                    <i className="isax isax-message-square5 fs-20" />
                    <span className="position-absolute p-1 bg-danger rounded-circle" />
                </Link>*/}
            </div>
        </div>
    )
}

export default ProfileCard;