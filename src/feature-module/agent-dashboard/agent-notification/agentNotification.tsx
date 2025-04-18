import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import { Link } from 'react-router-dom';
import DeleteModal from './deleteModal';
import { all_routes } from '../../router/all_routes';
import Sidebar from '../sidebar/sidebar';
import io from 'socket.io-client';

// Move socket outside component to prevent re-creation
const socket = io('http://localhost:3002', { autoConnect: true });

interface CustomNotification {
  id: number;
  type: string;
  message: string;
  time: string;
}

const AgentNotification = () => {
  const routes = all_routes;
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<CustomNotification[]>([]);
  const [unreadIds, setUnreadIds] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('notifications');
    setNotifications(stored ? JSON.parse(stored) : []);
  
    const unreadStored = localStorage.getItem('unreadNotificationIds');
    setUnreadIds(unreadStored ? JSON.parse(unreadStored) : []);
  }, []);
  // Socket listener
  useEffect(() => {
    const handleNewReservation = (data: any) => {
      const newNotification: CustomNotification = {
        id: Date.now(),
        type: 'New Reservation',
        message: `New reservation: ${data.reservation?.Num_Reservation || 'Unknown'}`,
        time: new Date().toLocaleTimeString()
      };

      // Add to main list
      setNotifications(prev => {
        const updated = [newNotification, ...prev];
        localStorage.setItem('notifications', JSON.stringify(updated));
        return updated;
      });

      // Mark as unread
      setUnreadIds(prev => {
        const updated = [newNotification.id, ...prev];
        localStorage.setItem('unreadNotificationIds', JSON.stringify(updated));
        return updated;
      });
    };

    if (!socket.connected) socket.connect();
    socket.on('new_reservation', handleNewReservation);

    return () => {
      socket.off('new_reservation', handleNewReservation);
    };
  }, []);

  // Delete one notification
  const handleDelete = (id: number) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      localStorage.setItem('notifications', JSON.stringify(updated));
      return updated;
    });

    setUnreadIds(prev => {
      const updated = prev.filter(uid => uid !== id);
      localStorage.setItem('unreadNotificationIds', JSON.stringify(updated));
      return updated;
    });
  };

  // Delete all notifications
  const handleDeleteAll = () => {
    setNotifications([]);
    setUnreadIds([]);
    localStorage.removeItem('notifications');
    localStorage.removeItem('unreadNotificationIds');
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setUnreadIds([]);
    localStorage.setItem('unreadNotificationIds', JSON.stringify([]));
  };

  const breadcrumbs = [
    {
      label: 'Notifications',
      link: routes.home1,
      active: false,
    },
    {
      label: 'Notifications',
      active: true,
    },
  ];

  return (
    <div>
      <Breadcrumb
        title="Notifications"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-01"
      />

      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 theiaStickySidebar">
              <Sidebar />
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="card shadow-none mb-0">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-3">
                    <h6>Notifications</h6>
                    <div className="d-flex">
                      <Link
                        to="#"
                        className="btn btn-light btn-sm d-flex align-items-center me-2"
                        onClick={handleMarkAllAsRead}
                      >
                        <i className="isax isax-tick-square me-2" />
                        Mark all as Read
                      </Link>
                      <Link
  to="#"
  className="btn btn-primary btn-sm d-flex align-items-center"
  data-bs-toggle="modal"
  data-bs-target="#delete_modal"
  onClick={() => setSelectedId(null)} // 👈 THIS LINE is the fix
>
  <i className="isax isax-trash me-2" />
  Delete All
</Link>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  {notifications.map((notification) => {
                    const isUnread = unreadIds.includes(notification.id);
                    return (
                      <div
                        key={notification.id}
                        className={`card notification-card ${isUnread ? 'bg-light' : ''}`}
                      >
                        <div className="card-body d-sm-flex align-items-center">
                          <span className="avatar avatar-lg rounded-circle bg-info flex-shrink-0 me-sm-3 mb-3 mb-sm-0">
                            <i className="isax isax-calendar-edit5" />
                          </span>
                          <div className="flex-fill">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <h6 className="fs-16">{notification.type}</h6>
                              <Link
                                to="#"
                                className="notification-delete-btn btn btn-primary btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                                onClick={() => setSelectedId(notification.id)}
                              >
                                Delete
                              </Link>
                            </div>
                            <p className="mb-1">{notification.message}</p>
                            <p className="text-gray-9">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        onDelete={() => {
          if (selectedId !== null) {
            handleDelete(selectedId);
          }
        }}
        onDeleteAll={handleDeleteAll}
        isDeleteAll={selectedId === null}
      />
    </div>
  );
};

export default AgentNotification;
