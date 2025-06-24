import React, { useEffect, useState } from 'react';
import { all_routes } from '../../router/all_routes';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import axios from 'axios';
import ModalVille from './ModalVille';

interface Ville {
    _id: string;
    Nom: string;
    Description: string;
    photos?: string[]; // Changed from image to photos array
    circuits: string[];
}

const VilleList = () => {
    const navigate = useNavigate();
    const routes =all_routes;

    const [villes, setVilles] = useState<Ville[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [selectedVilleId, setSelectedVilleId] = useState<string | null>(null);

    const breadcrumbs = [
        {
            label: 'Listings',
            active: false,
            link: routes.home1
        },
        {
            label: 'Villes',
            active: true,
        },
    ];
    const fetchVilles = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/ville/getall');
            if (Array.isArray(response.data)) {
                setVilles(response.data);
            } else {
                console.warn('Unexpected response structure:', response.data);
            }
        } catch (error) {
            console.error('API Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVilles();
    }, []);

    const refreshList = async () => {
        try {
          setLoading(true);
          const response = await axios.get('http://127.0.0.1:3000/ville/getall');
      
          if (Array.isArray(response.data)) {
            setVilles(response.data);
      
            // Fix: if current page is now out of range after deletion
            const newTotalPages = Math.ceil(response.data.length / itemsPerPage);
            if (currentPage > newTotalPages) {
              setCurrentPage(newTotalPages || 1); // fallback to 1 if 0
            }
          }
        } catch (error) {
          console.error('Error refreshing villes:', error);
        } finally {
          setLoading(false);
        }
      };
      

    // Get current villes for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentVilles = villes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(villes.length / itemsPerPage);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
        return <div className="text-center py-5">Loading cities...</div>;
      }
      
      if (!loading && villes.length === 0) {
        return (
          <div className="text-center py-5">
            <p>No cities found.</p>
            <Link to={routes.addCar} className="btn btn-primary">
              Add ville
            </Link>
          </div>
        );
      }
    return (
        <>
        <div className="tab-pane fade" id="Cars-list">
                                            <div className="card border-0">
                                                <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                                                    <div>
                                                        <h5 className="mb-1">Listings</h5>
                                                        <p>No of Listings :{villes.length}</p>
                                                    </div>
                                                    <div>
                                                        <Link
                                                            to={routes.addCar}
                                                            className="btn btn-primary d-inline-flex align-items-center me-0"
                                                        >
                                                            <i className="isax isax-add me-1 fs-16" />
                                                            Add Destination
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                    {currentVilles.map((ville) => (
                                                        <div className="col-xxl-4 col-md-6 d-flex" key={ville._id}>
                                                            <div className="place-item mb-4 flex-fill">
                                                                <div className="place-img">
                                                                    <Link to={`/ville/${ville._id}`}>
                                                                        <ImageWithBasePath
                                                                            style={{ height: '200px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                                                            src={
                                                                                ville.photos && ville.photos.length > 0
                                                                                    ? `http://localhost:3000/assets/img/villes/${ville.photos[0]}`
                                                                                    : 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/101205610.jpg?k=6571064cbbc83ff3bf41d283571e29d0f27c1ecb6e9aa8913b7d1138fa94b381&o=&hp=1'
                                                                            }
                                                                            className="img-fluid"
                                                                            alt={ville.Nom}
                                                                        />
                                                                    </Link>
                                                                    <div className="edit-delete-item d-flex align-items-center">
                                                                        <Link
                                                                            to={`/edit-city/${ville._id}`}
                                                                            className="me-2 d-inline-flex align-items-center justify-content-center"
                                                                        >
                                                                            <i className="isax isax-edit" />
                                                                        </Link>
                                                                        <Link
  to="#"
  className="d-inline-flex align-items-center justify-content-center"
  data-bs-toggle="modal"
  data-bs-target="#delete-ville-modal"
  onClick={() => setSelectedVilleId(ville._id)}
>
  <i className="isax isax-trash" />
</Link>

                                                                    </div>
                                                                </div>
                                                                <div className="place-content">
                                                                    <h5 className="mb-1 text-truncate">
                                                                        <Link to={`/ville/${ville._id}`}>{ville.Nom}</Link>
                                                                    </h5>
                                                                    <p className="d-flex align-items-center mb-3">
                                                                        <i className="isax isax-location5 me-2" />
                                                                        {ville.Description.substring(0, 50)}
                                                                    </p>
                                                                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                                        <div className="d-flex flex-wrap align-items-center me-2">
                                                                            <span className="fs-14 text-gray-6 fw-normal">
                                                                                {ville.circuits.length} Tours available
                                                                            </span>
                                                                        </div>
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
                                                <ModalVille
  selectedVilleId={selectedVilleId}
  onDeleteSuccess={refreshList}
/>

                                        </div>
            
        </>
    );
};

export default VilleList;