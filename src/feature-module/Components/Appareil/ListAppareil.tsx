import React from 'react'
import { all_routes } from '../../router/all_routes';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';

import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';

import AppareilListing from '../../Components/Appareil/AppareilListing';
import VolListing from '../../Components/Vol/VolListing';
import Sidebar from '../../agent-dashboard/sidebar/sidebar';
import AgentListingModal from '../../agent-dashboard/listing/modal/agentListingModal';

const ListAppareil = () => {
    const routes = all_routes;
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Listings',
            active: false,
            link: routes.home1
        },
        {
            label: 'Listings',
            active: true,
        },
    ];


    return (
        <div>
            <Breadcrumb title="Listings" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />
            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-4">
                            <Sidebar />
                        </div>
                        {/* /Sidebar */}
                        <div className="col-xl-9 col-lg-8">
                            <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                                <div className="place-nav listing-nav">
                                    <ul className="nav mb-2">
                                        <li className="me-2">
                                            <Link
                                                to="#"
                                                className="nav-link active"
                                                data-bs-toggle="tab"
                                                data-bs-target="#Hotels-list"
                                            >
                                                Hotels
                                            </Link>
                                        </li>
                                        <li className="me-2">
                                            <Link
                                                to="#"
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                                data-bs-target="#Cars-list"
                                            >
                                                Cars
                                            </Link>
                                        </li>
                                        <li className="me-2">
                                            <Link
                                                to="#"
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                                data-bs-target="#Cruise-list"
                                            >
                                                Cruise
                                            </Link>
                                        </li>
                                        <li className="me-2">
                                            <Link
                                                to="#"
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                                data-bs-target="#Tour-list"
                                            >
                                                Tour
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#"
                                                className="nav-link active"
                                                data-bs-toggle="tab"
                                                data-bs-target="#flight-list"
                                            >
                                                Appareil
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="dropdown mb-4">
                                    <Link
                                        to="#"
                                        className="dropdown-toggle text-gray-6 btn  rounded border d-inline-flex align-items-center"
                                        data-bs-toggle="dropdown"
                                        
                                    >
                                        All Listing
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-end p-3">
                                        <li>
                                            <Link
                                                to="#"
                                                className="dropdown-item rounded-1"
                                            >
                                                Active
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#"
                                                className="dropdown-item rounded-1"
                                            >
                                                Inactive
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="tab-content">
                                {/* Appareil  List */}
                                <AppareilListing/>
                                {/*  Appareil List */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}

            <AgentListingModal />

        </div>
    )
}

export default ListAppareil;
