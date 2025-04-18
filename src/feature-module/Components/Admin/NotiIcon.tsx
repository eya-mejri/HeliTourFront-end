import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { all_routes } from '../../router/all_routes';
import io from 'socket.io-client';

const socket = io('http://localhost:3002');
const NotiIcon = () => {
    const routes = all_routes;
    const [unseenNotifications, setUnseenNotifications] = useState(0);

    useEffect(() => {
        // Listen for the 'new_reservation' event
        socket.on('new_reservation', () => {
            setUnseenNotifications((prev) => prev + 1);
        });

        // Clean up the event listener on component unmount
        return () => {
            socket.off('new_reservation');
        };
    }, []);

    return (
        <Link
            to={routes.agentNotification}
            className="rounded-circle btn btn-white d-flex align-items-center justify-content-center p-0 me-2 position-relative"
        >
            <i className="isax isax-notification-bing5 fs-20" />
            {unseenNotifications > 0 && (
                <span className="position-absolute p-1 bg-secondary rounded-circle" />
            )}
        </Link>
    );
};

export default NotiIcon;