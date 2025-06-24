import React, { useEffect, useState } from 'react';
import { all_routes } from '../../router/all_routes';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import axios from 'axios';
import ModalCircuit from './ModalCircuit';

interface Circuit {
    _id: string;
    Nom: string;
    Description: string;
    Prix: number;
    Disponibilite: boolean;
    villeId: string;
    photos?: string[]; // <-- add this
}


const CircuitList = () => {
    const routes=all_routes;

    const [circuits, setCircuits] = useState<Circuit[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Number of items per page
    const [selectedCircuitId, setSelectedCircuitId] = useState<string | null>(null);

    const breadcrumbs = [
        {
            label: 'Listings',
            active: false,
            link: routes.home1
        },
        {
            label: 'Circuits',
            active: true,
        },
    ];

    const fetchCircuits = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/circuit/getall');
            if (Array.isArray(response.data)) {
                setCircuits(response.data);
            } else {
                console.error('API response is not an array of circuits:', response.data);
            }
        } catch (error) {
            console.error('Error fetching circuits:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCircuits();
    }, []);

    const refreshList = () => {
        setLoading(true);
        fetchCircuits();
    };


    // Get current circuits for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCircuits = circuits.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(circuits.length / itemsPerPage);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
        return <div className="text-center py-5">Loading circuits...</div>;
    }

    if (circuits.length === 0) {
        return (
            <div className="text-center py-5">
                <p>No Tour found.</p>
                <Link to={routes.addHotel} className="btn btn-primary">
                    Add New Tour
                </Link>
            </div>
        );
    }

    return (
        <>
        <div className="tab-pane fade active show" id="Hotels-list">
                                            <div className="card border-0">
                                                <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                                    <div>
                                                        <h5 className="mb-1">Listings</h5>
                                                        <p>No of Listings :{circuits.length}</p>
                                                    </div>
                                                    <div>
                                                        <Link
                                                            to={routes.addHotel}
                                                            className="btn btn-primary d-inline-flex align-items-center me-0"
                                                        >
                                                            <i className="isax isax-add me-1 fs-16" />
                                                            Add Tour
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row justify-content-center">
                                            <div className="row">
                                        {currentCircuits.map((circuit) => (
                                            <div className="col-xxl-4 col-md-6 d-flex" key={circuit._id}>
                                                <div className="place-item mb-4 flex-fill">
                                                    <div className="place-img">
                                                        <Link to={`/circuit/${circuit._id}`}>
                                                            <ImageWithBasePath
                                                                style={{ height: '200px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                                                src={
                                                                circuit.photos && circuit.photos.length > 0
                                                                    ? `http://localhost:3000/assets/img/circuits/${circuit.photos[0]}`
                                                                    : 'https://cdn.getyourguide.com/img/tour/50bff59d0db8eac3.jpeg/99.jpg'
                                                                    
                                                            }
                                                            className="img-fluid"
                                                            alt={circuit.Nom}
                                                            />
                                                        </Link>
                                                        <div className="edit-delete-item d-flex align-items-center">
                                                            <Link
                                                                to={`/editcircuit/${circuit._id}`}
                                                                className="me-2 d-inline-flex align-items-center justify-content-center"
                                                            >
                                                                <i className="isax isax-edit" />
                                                            </Link>
                                                            <Link
  to="#"
  className="d-inline-flex align-items-center justify-content-center"
  data-bs-toggle="modal"
  data-bs-target="#delete-circuit"
  onClick={() => setSelectedCircuitId(circuit._id)}
>
  <i className="isax isax-trash" />
</Link>

                                                        </div>
                                                    </div>
                                                    <div className="place-content">
                                                        <h5 className="mb-1 text-truncate">
                                                            <Link to={`${routes.circuitDetails}/${circuit._id}`}>{circuit.Nom}</Link>
                                                        </h5>
                                                        <p className="d-flex align-items-center mb-3">
                                                            <i className="isax isax-location5 me-2" />
                                                            {circuit.Description.substring(0, 50)}...
                                                        </p>
                                                        <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                            <div className="d-flex flex-wrap align-items-center me-2">
                                                                <h5 className="text-primary">
                                                                    {circuit.Prix}{" "}TND
                                                                    <span className="fs-14 text-gray-6 fw-normal">
                                                                        / person
                                                                    </span>
                                                                </h5>
                                                            </div>
                                                            <span className={`badge ${circuit.Disponibilite ? 'bg-success' : 'bg-danger'}`}>
                                                                {circuit.Disponibilite ? 'Available' : 'Unavailable'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="col-md-12 mt-4">
                    <nav className="pagination-nav">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => paginate(currentPage - 1)}
                                    aria-label="Previous"
                                >
                                    <span aria-hidden="true">
                                        <i className="fa-solid fa-chevron-left" />
                                    </span>
                                </button>
                            </li>
                            
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li 
                                    key={index} 
                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                >
                                    <button 
                                        className="page-link" 
                                        onClick={() => paginate(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => paginate(currentPage + 1)}
                                    aria-label="Next"
                                >
                                    <span aria-hidden="true">
                                        <i className="fa-solid fa-chevron-right" />
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                    

                </div>
            )}
                                                
                                            </div>
                                            <ModalCircuit
  selectedCircuitId={selectedCircuitId}
  onDeleteSuccess={refreshList}
/>
                                        </div>

        </>
    );
};

export default CircuitList;