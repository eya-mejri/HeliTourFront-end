import React from 'react'
import { all_routes } from '../../router/all_routes';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import Sidebar from '../sidebar/sidebar';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import AgentListingModal from './modal/agentListingModal';

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
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                                data-bs-target="#flight-list"
                                            >
                                                Flights
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
                                {/* Hotels List */}
                                <div className="tab-pane fade active show" id="Hotels-list">
                                    <div className="card border-0">
                                        <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                            <div>
                                                <h5 className="mb-1">Listings</h5>
                                                <p>No of Listings : 200</p>
                                            </div>
                                            <div>
                                                <Link
                                                    to={routes.addHotel}
                                                    className="btn btn-primary d-inline-flex align-items-center me-0"
                                                >
                                                    <i className="isax isax-add me-1 fs-16" />
                                                    Add Listing
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        {/* Hotel Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.hotelDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/hotels/hotel-01.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editHotel}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.hotelDetails}>Hotel Plaza Athenee</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-2">
                                                        <i className="isax isax-location5 me-2" />
                                                        Ciutat Vella, Barcelona
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <h5 className="text-primary text-nowrap me-2">
                                                            $500{" "}
                                                            <span className="fs-14 fw-normal text-default">
                                                                / Night
                                                            </span>
                                                        </h5>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}
                                        {/* Hotel Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.hotelDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/hotels/hotel-05.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editHotel}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.hotelDetails}>The Luxe Haven</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-2">
                                                        <i className="isax isax-location5 me-2" />
                                                        Oxford Street, London
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <h5 className="text-primary text-nowrap me-2">
                                                            $600{" "}
                                                            <span className="fs-14 fw-normal text-default">
                                                                / Night
                                                            </span>
                                                        </h5>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}
                                        {/* Hotel Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.hotelDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/hotels/hotel-06.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editHotel}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.hotelDetails}>The Urban Retreat</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-2">
                                                        <i className="isax isax-location5 me-2" />
                                                        Princes Street, Edinburgh
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <h5 className="text-primary text-nowrap me-2">
                                                            $500{" "}
                                                            <span className="fs-14 fw-normal text-default">
                                                                / Night
                                                            </span>
                                                        </h5>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}
                                        {/* Hotel Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.hotelDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/hotels/hotel-07.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editHotel}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.hotelDetails}>The Grand Horizon</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-2">
                                                        <i className="isax isax-location5 me-2" />
                                                        Deansgate, Manchester
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <h5 className="text-primary text-nowrap me-2">
                                                            $400{" "}
                                                            <span className="fs-14 fw-normal text-default">
                                                                / Night
                                                            </span>
                                                        </h5>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link to="#" className="me-2 d-inline-flex">
                                                                <i className="isax isax-edit" />
                                                            </Link>
                                                            <Link to="#" className="me-2 d-inline-flex">
                                                                <i className="isax isax-trash" />
                                                            </Link>
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}
                                        {/* Hotel Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.hotelDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/hotels/hotel-08.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editHotel}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.hotelDetails}>Hotel Evergreen </Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-2">
                                                        <i className="isax isax-location5 me-2" />
                                                        King’s Road, Chelsea
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <h5 className="text-primary text-nowrap me-2">
                                                            $550{" "}
                                                            <span className="fs-14 fw-normal text-default">
                                                                / Night
                                                            </span>
                                                        </h5>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}
                                        {/* Hotel Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.hotelDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/hotels/hotel-09.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editHotel}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.hotelDetails}>Stardust Hotel</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-2">
                                                        <i className="isax isax-location5 me-2" />
                                                        Bold Street, Liverpool
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <h5 className="text-primary text-nowrap me-2">
                                                            $450{" "}
                                                            <span className="fs-14 fw-normal text-default">
                                                                / Night
                                                            </span>
                                                        </h5>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}
                                        {/* Hotel Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.hotelDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/hotels/hotel-10.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editHotel}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.hotelDetails}>Hotel Serene Valley</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-2">
                                                        <i className="isax isax-location5 me-2" />
                                                        Broad Street, Bristol
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <h5 className="text-primary text-nowrap me-2">
                                                            $350{" "}
                                                            <span className="fs-14 fw-normal text-default">
                                                                / Night
                                                            </span>
                                                        </h5>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}
                                        {/* Hotel Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.hotelDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/hotels/hotel-11.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editHotel}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.hotelDetails}>Hotel Skyline Vista</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-2">
                                                        <i className="isax isax-location5 me-2" />
                                                        Chapel Street, Salford
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <h5 className="text-primary text-nowrap me-2">
                                                            $700{" "}
                                                            <span className="fs-14 fw-normal text-default">
                                                                / Night
                                                            </span>
                                                        </h5>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}
                                        {/* Hotel Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.hotelDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/hotels/hotel-12.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editHotel}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.hotelDetails}>Hotel Aurora Bliss</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-2">
                                                        <i className="isax isax-location5 me-2" />
                                                        Castle Street, Cambridge
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <h5 className="text-primary text-nowrap me-2">
                                                            $650{" "}
                                                            <span className="fs-14 fw-normal text-default">
                                                                / Night
                                                            </span>
                                                        </h5>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Hotel Grid */}
                                        <div className="col-md-12">
                                            {/* Pagination */}
                                            <nav className="pagination-nav">
                                                <ul className="pagination justify-content-center">
                                                    <li className="page-item disabled">
                                                        <Link
                                                            className="page-link"
                                                            to="#"
                                                            aria-label="Previous"
                                                        >
                                                            <span aria-hidden="true">
                                                                <i className="fa-solid fa-chevron-left" />
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            1
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            2
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            3
                                                        </Link>
                                                    </li>
                                                    <li className="page-item active">
                                                        <Link className="page-link" to="#">
                                                            4
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            5
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link
                                                            className="page-link"
                                                            to="#"
                                                            aria-label="Next"
                                                        >
                                                            <span aria-hidden="true">
                                                                <i className="fa-solid fa-chevron-right" />
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                            {/* /Pagination */}
                                        </div>
                                    </div>
                                </div>
                                {/* /Hotels List */}
                                {/* Cars List */}
                                <div className="tab-pane fade" id="Cars-list">
                                    <div className="card border-0">
                                        <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                            <div>
                                                <h5 className="mb-1">Listings</h5>
                                                <p>No of Listings : 200</p>
                                            </div>
                                            <div>
                                                <Link
                                                    to={routes.addCar}
                                                    className="btn btn-primary d-inline-flex align-items-center me-0"
                                                >
                                                    <i className="isax isax-add me-1 fs-16" />
                                                    Add Listing
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        {/* Car Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.carDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cars/car-06.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCar}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                                        <div className="d-flex flex-wrap align-items-center">
                                                            <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                                                Sedan
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.carDetails}>Toyota Camry SE 400</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Ciutat Vella, Barcelona
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $500{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Car Grid */}
                                        {/* Car Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.carDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cars/car-07.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCar}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                                        <div className="d-flex flex-wrap align-items-center">
                                                            <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                                                Sedan
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.carDetails}>Ford Mustang 4.0 AT</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Oxford Street, London
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $600{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Car Grid */}
                                        {/* Car Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.carDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cars/car-08.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCar}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                                        <div className="d-flex flex-wrap align-items-center">
                                                            <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                                                Sedan
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.carDetails}>Ferrari 458 MM Special</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Princes Street, Edinburgh
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $300{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Car Grid */}
                                        {/* Car Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.carDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cars/car-09.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCar}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                                        <div className="d-flex flex-wrap align-items-center">
                                                            <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                                                Sedan
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.carDetails}>Mercedes-benz Convertible</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Princes Street, Edinburgh
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $400{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#active_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center text-danger"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Inactive
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Car Grid */}
                                        {/* Car Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.carDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cars/car-10.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCar}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                                        <div className="d-flex flex-wrap align-items-center">
                                                            <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                                                Sedan
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.carDetails}>BMW 3.0 Gran Turismo</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        King’s Road, Chelsea
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $550{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Car Grid */}
                                        {/* Car Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.carDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cars/car-11.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCar}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                                        <div className="d-flex flex-wrap align-items-center">
                                                            <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                                                Sedan
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.carDetails}>Infiniti QX60 </Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Bold Street, Liverpool
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $450{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Car Grid */}
                                        {/* Car Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.carDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cars/car-12.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCar}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                                        <div className="d-flex flex-wrap align-items-center">
                                                            <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                                                Sedan
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.carDetails}>Toyota 86 Sports</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Broad Street, Bristol
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $350{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Car Grid */}
                                        {/* Car Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.carDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cars/car-13.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCar}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                                        <div className="d-flex flex-wrap align-items-center">
                                                            <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                                                Sedan
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.carDetails}>Jeep Wrangler</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Chapel Street, Salford
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $700{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#active_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center text-danger"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Inactive
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Car Grid */}
                                        {/* Car Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.carDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cars/car-14.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCar}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                                        <div className="d-flex flex-wrap align-items-center">
                                                            <span className="badge badge-secondary  fs-10 fw-medium me-1">
                                                                Sedan
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.carDetails}>Jaguar XK</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Castle Street, Cambridge
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $650{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Car Grid */}
                                        <div className="col-md-12">
                                            {/* Pagination */}
                                            <nav className="pagination-nav">
                                                <ul className="pagination justify-content-center">
                                                    <li className="page-item disabled">
                                                        <Link
                                                            className="page-link"
                                                            to="#"
                                                            aria-label="Previous"
                                                        >
                                                            <span aria-hidden="true">
                                                                <i className="fa-solid fa-chevron-left" />
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            1
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            2
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            3
                                                        </Link>
                                                    </li>
                                                    <li className="page-item active">
                                                        <Link className="page-link" to="#">
                                                            4
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            5
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link
                                                            className="page-link"
                                                            to="#"
                                                            aria-label="Next"
                                                        >
                                                            <span aria-hidden="true">
                                                                <i className="fa-solid fa-chevron-right" />
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                            {/* /Pagination */}
                                        </div>
                                    </div>
                                </div>
                                {/* /Cars List */}
                                {/* Cruise List */}
                                <div className="tab-pane fade" id="Cruise-list">
                                    <div className="card border-0">
                                        <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                            <div>
                                                <h5 className="mb-1">Listings</h5>
                                                <p>No of Listings : 200</p>
                                            </div>
                                            <div>
                                                <Link
                                                    to={routes.addCruise}
                                                    className="btn btn-primary d-inline-flex align-items-center me-0"
                                                >
                                                    <i className="isax isax-add me-1 fs-16" />
                                                    Add Listing
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        {/* Cruise Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.cruiseDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cruise/cruise-05.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCruise}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.cruiseDetails}>Super Aquamarine</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Ciutat Vella, Barcelona
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $700{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Cruise Grid */}
                                        {/* Cruise Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.flightDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cruise/cruise-12.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCruise}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.cruiseDetails}>Bonnie Yacht</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Oxford Street, London
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $600{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#active_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center text-danger"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Inactive
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Cruise Grid */}
                                        {/* Cruise Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.flightDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cruise/cruise-09.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCruise}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.cruiseDetails}>Coral Cruiser</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Princes Street, Edinburgh
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $300{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Cruise Grid */}
                                        {/* Cruise Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.flightDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cruise/cruise-09.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to="#"
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.cruiseDetails}>Harbor Haven</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Princes Street, Edinburgh
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $300{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Cruise Grid */}
                                        {/* Cruise Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.cruiseDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cruise/cruise-01.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCruise}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.cruiseDetails}>Albert Yacht</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        King’s Road, Chelsea
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $550{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#active_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center text-danger"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Inactive
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Cruise Grid */}
                                        {/* Cruise Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.flightDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cruise/cruise-11.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCruise}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.cruiseDetails}>Shelly Yacht</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Bold Street, Liverpool
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $450{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Cruise Grid */}
                                        {/* Cruise Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.cruiseDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cruise/cruise-07.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCruise}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.cruiseDetails}>Sunny Sailor</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Broad Street, Bristol
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $350{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Cruise Grid */}
                                        {/* Cruise Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.cruiseDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cruise/cruise-06.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCruise}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.cruiseDetails}>Ocean Voyager</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Chapel Street, Salford
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $700{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Cruise Grid */}
                                        {/* Cruise Grid */}
                                        <div className="col-xl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.cruiseDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/cruise/cruise-08.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editCruise}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.cruiseDetails}>Sailor’s Delight</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Castle Street, Cambridge
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $650{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Cruise Grid */}
                                        <div className="col-md-12">
                                            {/* Pagination */}
                                            <nav className="pagination-nav">
                                                <ul className="pagination justify-content-center">
                                                    <li className="page-item disabled">
                                                        <Link
                                                            className="page-link"
                                                            to="#"
                                                            aria-label="Previous"
                                                        >
                                                            <span aria-hidden="true">
                                                                <i className="fa-solid fa-chevron-left" />
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            1
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            2
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            3
                                                        </Link>
                                                    </li>
                                                    <li className="page-item active">
                                                        <Link className="page-link" to="#">
                                                            4
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            5
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link
                                                            className="page-link"
                                                            to="#"
                                                            aria-label="Next"
                                                        >
                                                            <span aria-hidden="true">
                                                                <i className="fa-solid fa-chevron-right" />
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                            {/* /Pagination */}
                                        </div>
                                    </div>
                                </div>
                                {/* /Cruise List */}
                                {/* Tour List */}
                                <div className="tab-pane fade" id="Tour-list">
                                    <div className="card border-0">
                                        <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                            <div>
                                                <h5 className="mb-1">Listings</h5>
                                                <p>No of Listings : 200</p>
                                            </div>
                                            <div>
                                                <Link
                                                    to={routes.addHotel}
                                                    className="btn btn-primary d-inline-flex align-items-center me-0"
                                                >
                                                    <i className="isax isax-add me-1 fs-16" />
                                                    Add Listing
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        {/* Tours Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.tourDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/tours/tours-07.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editTour}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.tourDetails}>Rainbow Mountain Valley</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Ciutat Vella, Barcelona
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $650{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Tours Grid */}
                                        {/* Tours Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.tourDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/tours/tours-08.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editTour}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.tourDetails}>Mystic Falls</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Oxford Street, London
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $600{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Tours Grid */}
                                        {/* Tours Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.tourDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/tours/tours-09.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editTour}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.tourDetails}>Crystal Lake</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Princes Street, Edinburgh
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $300{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Tours Grid */}
                                        {/* Tours Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.tourDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/tours/tours-10.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editTour}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.tourDetails}>Majestic Peaks</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Deansgate, Manchester
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $400{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Tours Grid */}
                                        {/* Tours Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.tourDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/tours/tours-11.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editTour}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.tourDetails}>Enchanted Forest</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        King’s Road, Chelsea
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $500{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#active_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center text-danger"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Inactive
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Tours Grid */}
                                        {/* Tours Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.tourDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/tours/tours-12.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editTour}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.tourDetails}>Serene Bay</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Bold Street, Liverpool
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $450{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Tours Grid */}
                                        {/* Tours Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.tourDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/tours/tours-13.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editTour}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.tourDetails}>Ancient Ruins</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Broad Street, Bristol
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $350{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Tours Grid */}
                                        {/* Tours Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.tourDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/tours/tours-14.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editTour}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.tourDetails}>Mystical Caves</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Chapel Street, Salford
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $700{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#active_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center text-danger"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Inactive
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Tours Grid */}
                                        {/* Tours Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.tourDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/tours/tours-15.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editTour}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="mb-1 text-truncate">
                                                        <Link to={routes.tourDetails}>Frosted Peaks</Link>
                                                    </h5>
                                                    <p className="d-flex align-items-center mb-3">
                                                        <i className="isax isax-location5 me-2" />
                                                        Castle Street, Cambridge
                                                    </p>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $650{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Tours Grid */}
                                        <div className="col-md-12">
                                            {/* Pagination */}
                                            <nav className="pagination-nav">
                                                <ul className="pagination justify-content-center">
                                                    <li className="page-item disabled">
                                                        <Link
                                                            className="page-link"
                                                            to="#"
                                                            aria-label="Previous"
                                                        >
                                                            <span aria-hidden="true">
                                                                <i className="fa-solid fa-chevron-left" />
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            1
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            2
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            3
                                                        </Link>
                                                    </li>
                                                    <li className="page-item active">
                                                        <Link className="page-link" to="#">
                                                            4
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            5
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link
                                                            className="page-link"
                                                            to="#"
                                                            aria-label="Next"
                                                        >
                                                            <span aria-hidden="true">
                                                                <i className="fa-solid fa-chevron-right" />
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                            {/* /Pagination */}
                                        </div>
                                    </div>
                                </div>
                                {/* /Tour List */}
                                {/* Flight List */}
                                <div className="tab-pane fade" id="flight-list">
                                    <div className="card border-0">
                                        <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                            <div>
                                                <h5 className="mb-1">Listings</h5>
                                                <p>No of Listings : 200</p>
                                            </div>
                                            <div>
                                                <Link
                                                    to={routes.addFlight}
                                                    className="btn btn-primary d-inline-flex align-items-center me-0"
                                                >
                                                    <i className="isax isax-add me-1 fs-16" />
                                                    Add Listing
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        {/* Flight Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.flightDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/flight/flight-09.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editFlight}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="text-truncate mb-1">
                                                        <Link to={routes.flightDetails}>Antonov An-32</Link>
                                                    </h5>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="avatar avatar-sm me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/icons/airindia.svg"
                                                                className="rounded-circle"
                                                                alt="icon"
                                                            />
                                                        </span>
                                                        <p className="fs-14 mb-0 me-2">Air India</p>
                                                        <p className="fs-14 mb-0">
                                                            <i className="ti ti-point-filled text-primary me-2" />
                                                            1-stop at Texas
                                                        </p>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $500{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Flight Grid */}
                                        {/* Flight Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.flightDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/flight/flight-08.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editFlight}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="text-truncate mb-1">
                                                        <Link to={routes.flightDetails}>SkyBound 102</Link>
                                                    </h5>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="avatar avatar-sm me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/icons/airindia.svg"
                                                                className="rounded-circle"
                                                                alt="icon"
                                                            />
                                                        </span>
                                                        <p className="fs-14 mb-0 me-2">Indigo</p>
                                                        <p className="fs-14 mb-0">
                                                            <i className="ti ti-point-filled text-primary me-2" />
                                                            1-stop at Dubai
                                                        </p>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $600{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Flight Grid */}
                                        {/* Flight Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.flightDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/flight/flight-06.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editFlight}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="text-truncate mb-1">
                                                        <Link to={routes.flightDetails}>Nimbus 345</Link>
                                                    </h5>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="avatar avatar-sm me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/icons/airindia.svg"
                                                                className="rounded-circle"
                                                                alt="icon"
                                                            />
                                                        </span>
                                                        <p className="fs-14 mb-0 me-2">Indigo</p>
                                                        <p className="fs-14 mb-0">
                                                            <i className="ti ti-point-filled text-primary me-2" />
                                                            1-stop at Dubai
                                                        </p>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $300{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#active_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center text-danger"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Inactive
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Flight Grid */}
                                        {/* Flight Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.flightDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/flight/flight-01.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editFlight}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="text-truncate mb-1">
                                                        <Link to={routes.flightDetails}>AstraFlight 215</Link>
                                                    </h5>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="avatar avatar-sm me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/icons/airindia.svg"
                                                                className="rounded-circle"
                                                                alt="icon"
                                                            />
                                                        </span>
                                                        <p className="fs-14 mb-0 me-2">Indigo</p>
                                                        <p className="fs-14 mb-0">
                                                            <i className="ti ti-point-filled text-primary me-2" />
                                                            1-stop at Frankfurt
                                                        </p>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $300{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Flight Grid */}
                                        {/* Flight Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.flightDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/flight/flight-02.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editFlight}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="text-truncate mb-1">
                                                        <Link to={routes.flightDetails}>Cloudrider 789</Link>
                                                    </h5>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="avatar avatar-sm me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/icons/airindia.svg"
                                                                className="rounded-circle"
                                                                alt="icon"
                                                            />
                                                        </span>
                                                        <p className="fs-14 mb-0 me-2">Air India</p>
                                                        <p className="fs-14 mb-0">
                                                            <i className="ti ti-point-filled text-primary me-2" />
                                                            1-stop at Dallas
                                                        </p>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $550{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Flight Grid */}
                                        {/* Flight Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.flightDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/flight/flight-03.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editFlight}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="text-truncate mb-1">
                                                        <Link to={routes.flightDetails}>Aether Express 901</Link>
                                                    </h5>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="avatar avatar-sm me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/icons/airindia.svg"
                                                                className="rounded-circle"
                                                                alt="icon"
                                                            />
                                                        </span>
                                                        <p className="fs-14 mb-0 me-2">Indigo</p>
                                                        <p className="fs-14 mb-0">
                                                            <i className="ti ti-point-filled text-primary me-2" />
                                                            1-stop at Seoul
                                                        </p>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $450{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Flight Grid */}
                                        {/* Flight Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.flightDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/flight/flight-07.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editFlight}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="text-truncate mb-1">
                                                        <Link to={routes.flightDetails}>Voyager 658</Link>
                                                    </h5>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="avatar avatar-sm me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/icons/airindia.svg"
                                                                className="rounded-circle"
                                                                alt="icon"
                                                            />
                                                        </span>
                                                        <p className="fs-14 mb-0 me-2">Air India</p>
                                                        <p className="fs-14 mb-0">
                                                            <i className="ti ti-point-filled text-primary me-2" />
                                                            1-stop at Sydney
                                                        </p>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $350{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Flight Grid */}
                                        {/* Flight Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.flightDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/flight/flight-04.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editFlight}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="text-truncate mb-1">
                                                        <Link to={routes.flightDetails}>Silverwing 505</Link>
                                                    </h5>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="avatar avatar-sm me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/icons/airindia.svg"
                                                                className="rounded-circle"
                                                                alt="icon"
                                                            />
                                                        </span>
                                                        <p className="fs-14 mb-0 me-2">Air India</p>
                                                        <p className="fs-14 mb-0">
                                                            <i className="ti ti-point-filled text-primary me-2" />
                                                            1-stop at London
                                                        </p>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $700{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Flight Grid */}
                                        {/* Flight Grid */}
                                        <div className="col-xxl-4 col-md-6 d-flex">
                                            <div className="place-item mb-4 flex-fill">
                                                <div className="place-img">
                                                    <Link to={routes.flightDetails}>
                                                        <ImageWithBasePath
                                                            src="assets/img/flight/flight-05.jpg"
                                                            className="img-fluid"
                                                            alt="img"
                                                        />
                                                    </Link>
                                                    <div className="edit-delete-item d-flex align-items-center">
                                                        <Link
                                                            to={routes.editFlight}
                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                        >
                                                            <i className="isax isax-edit" />
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="d-inline-flex align-items-center justify-content-center"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-list"
                                                        >
                                                            <i className="isax isax-trash" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <h5 className="text-truncate mb-1">
                                                        <Link to={routes.flightDetails}>Altair 333</Link>
                                                    </h5>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span className="avatar avatar-sm me-2">
                                                            <ImageWithBasePath
                                                                src="assets/img/icons/airindia.svg"
                                                                className="rounded-circle"
                                                                alt="icon"
                                                            />
                                                        </span>
                                                        <p className="fs-14 mb-0 me-2">Air India</p>
                                                        <p className="fs-14 mb-0">
                                                            <i className="ti ti-point-filled text-primary me-2" />
                                                            1-stop at Los Angeles
                                                        </p>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                            <h5 className="text-primary">
                                                                $650{" "}
                                                                <span className="fs-14 text-gray-6 fw-normal">
                                                                    / day
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className="d-flex align-items-center lh-1">
                                                            <Link
                                                                to="#inactive_list"
                                                                data-bs-toggle="modal"
                                                                className="d-flex align-items-center"
                                                            >
                                                                <i className="isax isax-info-circle me-1" />
                                                                Active
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Flight Grid */}
                                        <div className="col-md-12">
                                            {/* Pagination */}
                                            <nav className="pagination-nav">
                                                <ul className="pagination justify-content-center">
                                                    <li className="page-item disabled">
                                                        <Link
                                                            className="page-link"
                                                            to="#"
                                                            aria-label="Previous"
                                                        >
                                                            <span aria-hidden="true">
                                                                <i className="fa-solid fa-chevron-left" />
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            1
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            2
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            3
                                                        </Link>
                                                    </li>
                                                    <li className="page-item active">
                                                        <Link className="page-link" to="#">
                                                            4
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#">
                                                            5
                                                        </Link>
                                                    </li>
                                                    <li className="page-item">
                                                        <Link
                                                            className="page-link"
                                                            to="#"
                                                            aria-label="Next"
                                                        >
                                                            <span aria-hidden="true">
                                                                <i className="fa-solid fa-chevron-right" />
                                                            </span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                            {/* /Pagination */}
                                        </div>
                                    </div>
                                </div>
                                {/* /Flight List */}
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
