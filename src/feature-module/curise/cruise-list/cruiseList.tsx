import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import Slider from 'react-slick';
import { all_routes } from '../../router/all_routes';
import axios from 'axios';
import FormSearch from '../../home-five/FormSearch';

interface Ville {
    _id: string;
    Nom: string;
    Description: string;
}

interface Circuit {
    _id: string;
    Nom: string;
    Description: string;
    Prix: number;
    Disponibilite: boolean;
    villeId: string;
    photos?: string[]; // matches your backend

}

const CruiseList = () => {
    const routes = all_routes;
    const navigate = useNavigate();
    const [circuits, setCircuits] = useState<Circuit[]>([]);
    const [villes, setVilles] = useState<Record<string, Ville>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<boolean[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [circuitsPerPage] = useState(5);

    // Fonction déplacée à l'intérieur du composant

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // 1. Correction du endpoint des villes
                const [circuitsResponse, villesResponse] = await Promise.all([
                    axios.get<Circuit[]>('http://localhost:3000/circuit/getall'),
                    axios.get<Ville[]>('http://localhost:3000/ville/getall') // Changé à 'villes' pluriel
                ]);

                // 2. Vérification des données reçues
                console.log('Circuits:', circuitsResponse.data);
                console.log('Villes:', villesResponse.data);

                const villesDict = villesResponse.data.reduce((acc, ville) => {
                    acc[ville._id] = ville;
                    return acc;
                }, {} as Record<string, Ville>);

                // 3. Vérification du dictionnaire créé
                console.log('Dictionnaire des villes:', villesDict);

                setVilles(villesDict);
                setCircuits(circuitsResponse.data);
                setSelectedItems(new Array(circuitsResponse.data.length).fill(false));
            } catch (err) {
                console.error('Error:', err);
                setError('Échec du chargement des données. Veuillez réessayer.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    // 4. Ajout d'une vérification de chargement des villes
    const getVilleNom = (villeId: string) => {
        if (!villes) return 'Chargement...'; // Ajouté
        const ville = villes[villeId];
        return ville?.Nom || 'Ville inconnue';
    };
    // Handle circuit click - navigation to details
    const handleCircuitClick = (circuitId: string) => {
        navigate(`/circuit/${circuitId}`);
    };

    // Handle favorite click
    const handleFavoriteClick = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const newSelectedItems = [...selectedItems];
        newSelectedItems[index] = !newSelectedItems[index];
        setSelectedItems(newSelectedItems);
    };

    // Pagination logic
    const indexOfLastCircuit = currentPage * circuitsPerPage;
    const indexOfFirstCircuit = indexOfLastCircuit - circuitsPerPage;
    const currentCircuits = circuits.slice(indexOfFirstCircuit, indexOfLastCircuit);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(circuits.length / circuitsPerPage); i++) {
        pageNumbers.push(i);
    }

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading tours...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5">
                <div className="alert alert-danger">{error}</div>
                <button 
                    className="btn btn-primary"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        );
    }
  
    return (
        <>
            <Breadcrumb
                title="Tour List"
                breadcrumbs={[
                    { label: 'Tours', link: routes.home1, active: false },
                    { label: 'Tour List', active: true }
                ]}
                backgroundClass="breadcrumb-bg-06"
                backgroundImage="http://localhost:3000/assets/img/bgTourList.webp"
            />
            
            
            <div className="content">
                <div className="container">
                    <FormSearch />
                    <div className="row mt-5"></div>
                   
                    <div className="row mt-5">
                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-4">
                            
                        </div>
                        
                        {/* Main Content */}
                        <div className="col-xl-12 col-lg-12 theiaStickySidebar">
                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-4">
                                <h6 className="mb-0">{circuits.length} Tours Found</h6>
                                <div className="d-flex align-items-center flex-wrap">
                                    {/*<div className="list-item d-flex align-items-center mb-3">
                                        <Link to={routes.cruiseGrid} className="list-icon me-2">
                                            <i className="isax isax-grid-1"></i>
                                        </Link>
                                        <Link to={routes.cruiseList} className="list-icon active me-2">
                                            <i className="isax isax-firstline"></i>
                                        </Link>
                                        <Link to={routes.cruiseMap} className="list-icon me-2">
                                            <i className="isax isax-map-1"></i>
                                        </Link>
                                    </div>*/}
                                    {/*<div className="dropdown mb-3">
                                        <Link to="#" className="dropdown-toggle py-2" data-bs-toggle="dropdown">
                                            <span className="fw-medium text-gray-9">Sort By: </span>Recommended
                                        </Link>
                                        <div className="dropdown-menu dropdown-sm">
                                            <form>
                                                <h6 className="fw-medium fs-16 mb-3">Sort By</h6>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" type="radio" name="sort" id="recommend1" defaultChecked />
                                                    <label className="form-check-label ms-2" htmlFor="recommend1">Recommended</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" type="radio" name="sort" id="priceLow" />
                                                    <label className="form-check-label ms-2" htmlFor="priceLow">Price: Low to High</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" type="radio" name="sort" id="priceHigh" />
                                                    <label className="form-check-label ms-2" htmlFor="priceHigh">Price: High to Low</label>
                                                </div>
                                            </form>
                                        </div>
                                    </div>*/}
                                </div>
                            </div>
                            
                            
                            
                            <div className="hotel-list list-full">
                                <div className="row justify-content-center">
                                    <div className="col-md-12" >
                                        {currentCircuits.length > 0 ? (
                                            currentCircuits.map((circuit, index) => {
                                                const globalIndex = (currentPage - 1) * circuitsPerPage + index;
                                                return (
                                                    <div 
                                                        className="place-item mb-4" 
                                                        key={circuit._id}
                                                        onClick={() => handleCircuitClick(circuit._id)}
                                                        
                                                        style={{ height: '250px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                                    >
                                                       <div className="place-img" >
                                                            <div className="img-slider image-slide owl-carousel nav-center">
                                                                <div onClick={(e) => e.stopPropagation()}>
                                                                <Slider
                                                                    dots={true}
                                                                    arrows={true}
                                                                    infinite={true}
                                                                    speed={500}
                                                                    slidesToShow={1}
                                                                    slidesToScroll={1}
                                                                    autoplay={false}
                                                                >
                                                                    {(circuit.photos && circuit.photos.length > 0 ? circuit.photos : ['default.jpg']).map((photo, index) => (
                                                                    <div className="slide-images" key={index} onClick={() => handleCircuitClick(circuit._id)}>
                                                                        <ImageWithBasePath 
                                                                        src={`http://localhost:3000/assets/img/circuits/${photo}`}
                                                                        className="img-fluid"
                                                                        alt={`${circuit.Nom} ${index + 1}`}
                                                                        style={{ height: '250px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                                                        />
                                                                    </div>
                                                                    ))}
                                                                </Slider>
                                                                </div>

                                                            </div>

                                                            {/* Favorite and Availability Tags */}
                                                            <div 
                                                                className="fav-item" 
                                                                onClick={(e) => handleFavoriteClick(globalIndex, e)}
                                                            >
                                                                {/*<span className={`fav-icon ${selectedItems[globalIndex] ? 'selected' : ''}`}>
                                                                <i className="isax isax-heart5"></i>
                                                                </span>*/}
                                                                {circuit.Disponibilite ? (
                                                                <span className="badge bg-success d-inline-flex align-items-center">
                                                                    <i className="isax isax-tick-circle me-1"></i>Available
                                                                </span>
                                                                ) : (
                                                                <span className="badge bg-danger d-inline-flex align-items-center">
                                                                    <i className="isax isax-close-circle me-1"></i>Unavailable
                                                                </span>
                                                                )}
                                                            </div>
                                                            </div>

                                                        <div className="place-content">
                                                            <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                                <div>
                                                                    <h5 className="mb-1 text-truncate">
                                                                        {circuit.Nom}
                                                                    </h5>
                                                                  
                                                                    <p className="d-flex align-items-center fs-14">
                                                                        <i className="isax isax-location5 me-2"></i>
                                                                        {getVilleNom(circuit.villeId)}
                                                                    </p>
                                                                </div>
                                                                {/*<div className="d-flex align-items-center">
                                                                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                                                        4.5
                                                                    </span>
                                                                    <p className="fs-14 text-truncate">(25 reviews)</p>
                                                                </div>*/}
                                                            </div>
                                                            
                                                            <p className="fs-14 line-ellipsis mb-3">
                                                                {circuit.Description || 'No description available'}
                                                            </p>
                                                            
                                                            <div className="d-flex align-items-center justify-content-between cruise-list-item border-top flex-wrap row-gap-2 pt-3 mb-3">
                                                                <p className="fs-14 mb-0">
                                                                    <i className="isax isax-tag-user me-1"></i>
                                                                    Availability: <span className="text-dark fw-medium">
                                                                        {circuit.Disponibilite ? 'Yes' : 'No'}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            
                                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                                <div className="d-flex align-items-center">
                                                                    {/*<i className="isax isax-home-wifi ms-2 me-2"></i>
                                                                    <i className="isax isax-scissor me-2"></i>
                                                                    <i className="isax isax-profile-2user me-2"></i>
                                                                    <span className="fs-14 fw-normal text-default d-inline-block">+2</span>*/}
                                                                </div>
                                                                <h5 className="text-primary text-nowrap me-2">
                                                                    {circuit.Prix} DT <span className="fs-14 fw-normal text-default">/ Person</span>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="col-md-12 text-center py-5">
                                                <div className="alert alert-info">
                                                    <h4>No Tours available</h4>
                                                    <p className="mb-0">We couldn't find any Tours matching your search.</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Pagination */}
                            {circuits.length > 0 && (
                                <nav className="pagination-nav mt-4">
                                    <ul className="pagination justify-content-center">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => paginate(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            >
                                                <span aria-hidden="true"><i className="fa-solid fa-chevron-left"></i></span>
                                            </button>
                                        </li>
                                        
                                        {pageNumbers.map(number => (
                                            <li 
                                                key={number} 
                                                className={`page-item ${currentPage === number ? 'active' : ''}`}
                                            >
                                                <button 
                                                    className="page-link" 
                                                    onClick={() => paginate(number)}
                                                >
                                                    {number}
                                                </button>
                                            </li>
                                        ))}
                                        
                                        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => paginate(currentPage + 1)}
                                                disabled={currentPage === pageNumbers.length}
                                            >
                                                <span aria-hidden="true"><i className="fa-solid fa-chevron-right"></i></span>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CruiseList;