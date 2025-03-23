import React, { useEffect, useState } from 'react';
import { all_routes } from '../../router/all_routes';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import axios from 'axios';

// Define the Appareil interface
interface Appareil {
    _id: string;
    nom: string;
    date_de_creation: string;
    photo: string;
    description: string;
    __v: number;
}

const AppareilListing = () => {
    const routes = all_routes;
    const [appareils, setAppareils] = useState<Appareil[]>([]); // Use the Appareil interface
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [itemsPerPage] = useState(6); // Number of items per page

    // Fetch appareils from the backend
    useEffect(() => {
        const fetchAppareils = async () => {
            try {
                const response = await axios.get<Appareil[]>('http://127.0.0.1:3000/appareil/getall');
                setAppareils(response.data); // Set the fetched data to state
            } catch (error) {
                console.error('Error fetching appareils:', error);
            }
        };

        fetchAppareils();
    }, []);

    // Calculate the indexes for slicing the appareils array
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = appareils.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Calculate total number of pages
    const totalPages = Math.ceil(appareils.length / itemsPerPage);

    // Generate page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="tab-pane fade" id="flight-list">
            <div className="card border-0">
                <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                    <div>
                        <h5 className="mb-1">Appareil</h5>
                        <p>No of Listings : {appareils.length}</p>
                    </div>
                    <div>
                        <Link
                            to={routes.addFlight}
                            className="btn btn-primary d-inline-flex align-items-center me-0"
                        >
                            <i className="isax isax-add me-1 fs-16" />
                            Add Appareil
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                {/* Map through the current items and render cards */}
                {currentItems.map((appareil) => (
                    <div className="col-xxl-4 col-md-6 d-flex" key={appareil._id}>
                        <div className="place-item mb-4 flex-fill">
                            <div className="place-img">
                                <Link to={routes.flightDetails}>
                                    <ImageWithBasePath
                                        src={`http://127.0.0.1:3000/assets/img/${appareil.photo}`}
                                        className="img-fluid"
                                        alt="img"
                                    />
                                </Link>
                                <div className="edit-delete-item d-flex align-items-center">
                                    <Link
                                        to={`/agent/agent-AppareilEdit/${appareil._id}`}
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
                                    <Link to={routes.flightDetails}>{appareil.nom}</Link>
                                </h5>
                                <div className="d-flex align-items-center justify-content-between border-top pt-3">
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
                ))}
                {/* Pagination */}
                <div className="col-md-12">
                    <nav className="pagination-nav">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <Link
                                    className="page-link"
                                    to="#"
                                    aria-label="Previous"
                                    onClick={() => paginate(currentPage - 1)}
                                >
                                    <span aria-hidden="true">
                                        <i className="fa-solid fa-chevron-left" />
                                    </span>
                                </Link>
                            </li>
                            {pageNumbers.map((number) => (
                                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                    <Link
                                        className="page-link"
                                        to="#"
                                        onClick={() => paginate(number)}
                                    >
                                        {number}
                                    </Link>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <Link
                                    className="page-link"
                                    to="#"
                                    aria-label="Next"
                                    onClick={() => paginate(currentPage + 1)}
                                >
                                    <span aria-hidden="true">
                                        <i className="fa-solid fa-chevron-right" />
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default AppareilListing;


