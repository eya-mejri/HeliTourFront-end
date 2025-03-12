import React, { useEffect, useState } from 'react'
import ImageWithBasePath from '../imageWithBasePath'
import { all_routes } from '../../../feature-module/router/all_routes'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {

    const routes = all_routes
    const location = useLocation();
    const [subdroptoggle, setsubdroptoggle] = useState(false);
    useEffect(() => {

        return () => {
            location.pathname.includes('customer') ? setsubdroptoggle(true) : setsubdroptoggle(false)
        }
    }, [location.pathname])

    const sidebar_data = [
        {
            link: routes.userDashboard,
            name: 'Dashboard',
            icon: <i className="isax isax-grid-55" />,
        },
        {
            link: routes.userFlightBooking,
            name: 'Flights',
        },
        {
            link: routes.userHotlesBooking,
            name: 'Hotels',
        },
        {
            link: routes.userCarBooking,
            name: 'Car',
        },
        {
            link: routes.userCruiseBooking,
            name: 'Cruise',
        },
        {
            link: routes.userTourBooking,
            name: 'Tour',
        },
        {
            link: routes.userReviews,
            name: 'My Reviews',
            icon: <i className="isax isax-magic-star5" />,
        },
        {
            link: routes.userChat,
            name: 'Messages',
            icon: <i className="isax isax-message-square5" />,
        },
        {
            link: routes.userWishlist,
            name: 'wishlist',
            icon: <i className="isax isax-heart5" />,
        },
        {
            link: routes.userWallet,
            name: 'wallet',
            icon: <i className="isax isax-wallet-add-15" />,
        },
        {
            link: routes.payment,
            name: 'payment',
            icon: <i className="isax isax-money-recive5" />,
        },
        {
            link: routes.myProfile,
            name: 'my-profile',
            icon: <i className="isax isax-money-recive5" />,
        },
        {
            link: routes.notification,
            name: 'notification',
            icon: <i className="isax isax-notification-bing5" />,
        },
        {
            link: routes.profileSettings,
            name: 'Settings',
            icon: <i className="isax isax-setting-25" />,
        },

    ];

    const activeRouterPath = (link: string) => {
        return link === location.pathname;
    };

    return (
        <div>
            {/* Sidebar */}
            <div className="card user-sidebar mb-4 mb-lg-0 theiaStickySidebar">
                <div className="card-header user-sidebar-header">
                    <div className="profile-content rounded-pill">
                        <div className="d-flex align-items-center justify-content-between ">
                            <div className=" d-flex align-items-center justify-content-center ">
                                <ImageWithBasePath
                                    src="assets/img/users/user-01.jpg"
                                    alt="image"
                                    className="img-fluid avatar avatar-lg rounded-circle flex-shrink-0 me-1"
                                />
                                <div>
                                    <h6 className="fs-16">Jeffrey Wilson</h6>
                                    <span className="fs-14 text-gray-6">Since 10 May 2025</span>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Link
                                        to={routes.profileSettings}
                                        className="p-1 rounded-circle btn btn-light d-flex align-items-center justify-content-center"
                                    >
                                        <i className="isax isax-edit-2 fs-14" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body user-sidebar-body">
                    <ul>
                        <li>
                            <span className="fs-14 text-gray-3 fw-medium mb-2">Main</span>
                        </li>
                        <li>
                            <Link
                                to={routes.userDashboard}
                                className={`d-flex align-items-center ${location.pathname === routes.userDashboard && 'active'}`}
                            >
                                <i className="isax isax-grid-55" />
                                Dashboard
                            </Link>
                        </li>
                        <li className="submenu">
                            <Link to="#" onClick={() => setsubdroptoggle(!subdroptoggle)}
                                className={`d-block ${subdroptoggle ? 'subdrop' : ''} ${location.pathname.includes('customer') ? 'active' : ''}`}>
                                <i className="isax isax-calendar-tick5" />
                                <span>My Bookings</span>
                                <span className="menu-arrow" />
                            </Link>
                            <ul className={` ${subdroptoggle && 'd-block'}`}>
                                <li>
                                    <Link
                                        to={routes.userFlightBooking}
                                        className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('customer-flight-booking') ? 'active' : ''}`}
                                    >
                                        Flights
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={routes.userHotlesBooking}
                                        className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('customer-hotel-booking') ? 'active' : ''}`}
                                    >
                                        Hotels
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={routes.userCarBooking}
                                        className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('customer-car-booking') ? 'active' : ''}`}
                                    >
                                        Cars
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={routes.userCruiseBooking}
                                        className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('customer-cruise-booking') ? 'active' : ''}`}
                                    >
                                        Cruise
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={routes.userTourBooking}
                                        className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('customer-tour-booking') ? 'active' : ''}`}
                                    >
                                        Tour
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to={routes.userReviews} className={`d-flex align-items-center ${location.pathname.includes('review') ? 'active' : ''}`}>
                                <i className="isax isax-magic-star5" /> My Reviews
                            </Link>
                        </li>
                        <li>
                            <div className="message-content">
                                <Link to={routes.userChat} className={`d-flex align-items-center ${location.pathname.includes('chat') ? 'active' : ''}`}>
                                    <i className="isax isax-message-square5" /> Messages
                                </Link>
                                <span className="msg-count rounded-circle">02</span>
                            </div>
                        </li>
                        <li className="mb-2">
                            <Link to={routes.wishlist} className={`d-flex align-items-center ${location.pathname.includes('wishlist') ? 'active' : ''}`}>
                                <i className="isax isax-heart5" /> Wishlist
                            </Link>
                        </li>
                        <li>
                            <span className="fs-14 text-gray-3 fw-medium mb-2">Finance</span>
                        </li>
                        <li>
                            <Link to={routes.userWallet} className={`d-flex align-items-center ${location.pathname.includes('wallet') ? 'active' : ''}`}>
                                <i className="isax isax-wallet-add-15" /> Wallet
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link to={routes.payment} className={`d-flex align-items-center ${location.pathname.includes('payment') ? 'active' : ''}`}>
                                <i className="isax isax-money-recive5" /> Payments
                            </Link>
                        </li>
                        <li>
                            <span className="fs-14 text-gray-3 fw-medium mb-2">Account</span>
                        </li>
                        <li>
                            <Link to={routes.myProfile} className={`d-flex align-items-center ${location.pathname.includes('my-profile') ? 'active' : ''}`}>
                                <i className="isax isax-profile-tick5" /> My Profile
                            </Link>
                        </li>
                        <li>
                            <div className="message-content">
                                <Link
                                    to={routes.notification}
                                    className={`d-flex align-items-center ${location.pathname.includes('notifications') ? 'active' : ''}`}
                                >
                                    <i className="isax isax-notification-bing5" /> Notifications
                                </Link>
                                <span className="msg-count bg-purple rounded-circle">05</span>
                            </div>
                        </li>
                        <li>
                            <Link
                                to={routes.profileSettings}
                                className={`d-flex align-items-center ${location.pathname.includes('settings') ? 'active' : ''}`}
                            >
                                <i className="isax isax-setting-25" /> Settings
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.home1} className="d-flex align-items-center pb-0">
                                <i className="isax isax-logout-15" /> Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* /Sidebar */}

        </div>
    )
}

export default Sidebar
