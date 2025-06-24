import React from 'react'
import { all_routes } from '../../router/all_routes';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import Sidebar from '../sidebar/sidebar';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import AgentListingModal from './modal/agentListingModal';
import AppareilListing from '../../Components/Appareil/AppareilListing';
import VolListing from '../../Components/Vol/VolListing';
import CircuitList from '../../Components/Circuit/CircuitList';
import VilleList from '../../Components/Ville/VilleList';

const AgentListings = () => {
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
                                                Tour
                                            </Link>
                                        </li>
                                        <li className="me-2">
                                            <Link
                                                to="#"
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                                data-bs-target="#Cars-list"
                                            >
                                                Destination
                                            </Link>
                                        </li>
                                        <li className="me-2">
                                            <Link
                                                to="#"
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                                data-bs-target="#Tour-list"
                                            >
                                                Flight
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#"
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                                data-bs-target="#flight-list"
                                            >
                                                Device
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                
                            </div>
                            <div className="tab-content">
                               
                                <CircuitList/>
                                
                                    <VilleList/>
                               
                               <VolListing/>
                               
                                <AppareilListing/>
                               
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

export default AgentListings
