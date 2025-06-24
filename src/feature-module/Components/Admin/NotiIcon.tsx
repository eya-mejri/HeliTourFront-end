import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { all_routes } from '../../router/all_routes';
import io from 'socket.io-client';

const socket = io('http://localhost:3002');

const NotiIcon = () => {
    const routes = all_routes;
    const [unseenCount, setUnseenCount] = useState(0);

    useEffect(() => {
        // Load unread count from localStorage on mount
        const storedUnread = localStorage.getItem('unreadNotificationIds');
        if (storedUnread) {
            try {
                const parsed = JSON.parse(storedUnread);
                setUnseenCount(parsed.length || 0);
            } catch (err) {
                console.error('Failed to parse unread notifications', err);
            }
        }

        // Update count when new reservation arrives
        const handleNewReservation = () => {
            const stored = localStorage.getItem('unreadNotificationIds');
            const unread = stored ? JSON.parse(stored) : [];
            const updated = [Date.now(), ...unread];
            localStorage.setItem('unreadNotificationIds', JSON.stringify(updated));
            setUnseenCount(updated.length);
        };

        socket.on('new_reservation', handleNewReservation);

        // Optionally, listen to storage change (multi-tab sync)
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'unreadNotificationIds') {
                try {
                    const parsed = JSON.parse(event.newValue || '[]');
                    setUnseenCount(parsed.length);
                } catch (e) {
                    setUnseenCount(0);
                }
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            socket.off('new_reservation', handleNewReservation);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <Link
            to={routes.agentNotification}
            className="rounded-circle btn btn-white d-flex align-items-center justify-content-center p-0 me-2 position-relative"
        >
            <i className="isax isax-notification-bing5 fs-20" />
            {unseenCount > 0 && (
                <span
                    className="position-absolute p-1 bg-secondary rounded-circle"
                    style={{ top: 0, right: 0 }}
                />
            )}
        </Link>
    );
};

export default NotiIcon;
