import React, { useEffect, useState } from 'react'
import { all_routes } from '../../../feature-module/router/all_routes'
import { Link, useLocation } from 'react-router-dom'
import ImageWithBasePath from '../../../core/common/imageWithBasePath'

const Sidebar = () => {

    const routes = all_routes
    const location = useLocation();
    const [subdroptoggle, setsubdroptoggle] = useState(false);
    useEffect(() => {

        return () => {
            location.pathname.includes('booking') ? setsubdroptoggle(true) : setsubdroptoggle(false)
        }
    }, [location.pathname])

    const activeRouterPath = (link: string) => {
        return link === location.pathname;
    };

    return (
        <div>
            {/* Sidebar */}
            <div className="card user-sidebar agent-sidebar mb-4 mb-lg-0 theiaStickySidebar">
                <div className="card-header user-sidebar-header text-center bg-gray-transparent">
                    <div className="agent-profile d-inline-flex">
                        <ImageWithBasePath
                            src="assets/img/users/user-43.jpg"
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
                    <h6 className="fs-16">Chris Foxy</h6>
                    <p className="fs-14 mb-2">Member Since 10 May 2025</p>
                    <div className="d-flex align-items-center justify-content-center notify-item">
                        <Link
                            to={routes.agentNotification}
                            className="rounded-circle btn btn-white d-flex align-items-center justify-content-center p-0 me-2 position-relative"
                        >
                            <i className="isax isax-notification-bing5 fs-20" />
                            <span className="position-absolute p-1 bg-secondary rounded-circle" />
                        </Link>
                        <Link
                            to={routes.agentChat}
                            className="rounded-circle btn btn-white d-flex align-items-center justify-content-center p-0 position-relative"
                        >
                            <i className="isax isax-message-square5 fs-20" />
                            <span className="position-absolute p-1 bg-danger rounded-circle" />
                        </Link>
                    </div>
                </div>
                <div className="card-body user-sidebar-body">
                    <ul>
                        <li>
                            <Link
                                to={routes.agentDashboard}
                                className={`d-flex align-items-center  ${location.pathname === routes.agentDashboard && 'active'}`}
                            >
                                <i className="isax isax-grid-55 me-2" />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.agentListing} className={`d-flex align-items-center ${location.pathname === routes.agentListing && 'active'}`}>
                                <i className="isax isax-menu-14 me-2" />
                                Listings
                            </Link>
                        </li>
                        <li className="submenu" >
                            <Link to="#" onClick={() => setsubdroptoggle(!subdroptoggle)}
                                className={`d-block ${subdroptoggle ? 'subdrop' : ''} ${location.pathname.includes('booking') ? 'active' : ''}`}>
                                <i className="isax isax-calendar-tick5 me-2" />
                                <span>Bookings</span>
                                <span className="menu-arrow" />
                            </Link>
                            <ul className={` ${subdroptoggle && 'd-block'}`}>
                                <li>
                                    <Link
                                        to={routes.agentHotelBooking}
                                        className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('agent-hotel-booking') ? 'active' : ''}`}>
                                        Hotels
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={routes.agentCarBooking}
                                        className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('agent-car-booking') ? 'active' : ''}`}
                                    >
                                        Cars
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={routes.agentCruiseBooking}
                                        className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('agent-cruise-booking') ? 'active' : ''}`}
                                    >
                                        Cruise
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={routes.agentTourBooking}
                                        className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('agent-tour-booking') ? 'active' : ''}`}
                                    >
                                        Tour
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={routes.agentFlightBooking}
                                        className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes('agent-flight-booking') ? 'active' : ''}`}
                                    >
                                        Flights
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to={routes.agentEnquirers} className={`d-flex align-items-center ${location.pathname === routes.agentEnquirers && 'active'}`}>
                                <i className="isax isax-magic-star5 me-2" />
                                Enquiries
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.agentEarnings} className={`d-flex align-items-center ${location.pathname === routes.agentEarnings && 'active'}`}>
                                <i className="isax isax-wallet-add-15 me-2" />
                                Earnings
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.agentReview} className={`d-flex align-items-center ${location.pathname === routes.agentReview && 'active'}`}>
                                <i className="isax isax-magic-star5 me-2" />
                                Reviews
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.agentSettings} className={`d-flex align-items-center ${location.pathname.includes('settings') ? 'active' : ''}`}>
                                <i className="isax isax-setting-25" /> Settings
                            </Link>
                        </li>
                        <li className="logout-link">
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
