import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import { all_routes } from '../../router/all_routes';
import FormSearch from '../../home-five/FormSearch';

interface Ville {
  _id: string;
  Nom: string;
  Description: string;
  circuits?: string[];
  photos?: string[]; // matches your backend
}

const ITEMS_PER_PAGE = 6; // Number of items per page

const FlightList = () => {
    const routes = all_routes;
    
    // State declarations
    const [villes, setVilles] = useState<Ville[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Pagination calculations
    const totalItems = villes.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
    const currentVilles = villes.slice(startIndex, endIndex);

    // ImageSlider configuration
    const imgslideroption = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 2000,
        autoplay: false,
        swipe: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1400,
                settings: { slidesToShow: 1 },
            },
            {
                breakpoint: 1300,
                settings: { slidesToShow: 1 },
            },
            {
                breakpoint: 992,
                settings: { slidesToShow: 1 },
            },
            {
                breakpoint: 576,
                settings: { slidesToShow: 1 },
            },
            {
                breakpoint: 0,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    // Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Ville',
            link: routes.home1,
            active: false,
        },
        {
            label: 'Ville',
            active: false,
        },
        {
            label: 'Ville list',
            active: true,
        },
    ];

    // Fetch villes from API
    useEffect(() => {
        const fetchVilles = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3000/ville/getall');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Ville[] = await response.json();
                setVilles(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchVilles();
    }, []);

    // Handle favorite click
    const handleItemClick = (villeId: string) => {
        setSelectedItems(prev => ({
            ...prev,
            [villeId]: !prev[villeId]
        }));
    };

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generate page numbers with ellipsis for large page counts
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, currentPage + 2);
            
            if (currentPage <= 3) {
                endPage = maxVisiblePages;
            } else if (currentPage >= totalPages - 2) {
                startPage = totalPages - maxVisiblePages + 1;
            }
            
            if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) {
                    pages.push('...');
                }
            }
            
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pages.push('...');
                }
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    if (loading) {
        return <div className="text-center py-5">Loading villes...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">Error: {error}</div>;
    }

    return (
        <>
            <Breadcrumb title="Ville" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-05"             
            backgroundImage="http://localhost:3000/assets/img/bgTourList.webp"
/>
            <div className="content">
                <div className="container">
                    <FormSearch />

                    <div className="row mt-5">
                        <div className="col-xl-12 col-lg-12">
                            
                            
                            <div className="hotel-list list-full">
                                <div className="row justify-content-center">
                                    {currentVilles.map((ville) => (
                                        <div className="col-md-12 mt-3" key={ville._id}  style={{ height: '250px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}>
                                            <div className="place-item">
                                                <div className="place-img">
                                                    <div className="img-slider image-slide owl-carousel nav-center">
                                                    <Slider {...imgslideroption}>
                                                        {(ville.photos && ville.photos.length > 0 ? ville.photos : ['default.jpg']).map((photo, index) => (
                                                            <div className="slide-images" key={index}>
                                                            <Link to={`/ville/${ville._id}`}>
                                                                <ImageWithBasePath 
                                                                src={`http://localhost:3000/assets/img/villes/${photo}`} 
                                                                className="img-fluid" 
                                                                alt={`${ville.Nom} ${index + 1}`} 
                                                                
                                                                style={{ height: '250px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                                                />
                                                            </Link>
                                                            </div>
                                                        ))}
                                                    </Slider>

                                                    </div>
                                                    <div className="fav-item" onClick={() => handleItemClick(ville._id)}>
                                                        {/*<div className="d-flex align-items-center">
                                                            <Link to="#" className={`fav-icon me-2${selectedItems[ville._id] ? ' selected' : ''}`}>
                                                                <i className="isax isax-heart5"></i>
                                                            </Link>
                                                            <span className="badge bg-indigo">Popular</span>
                                                        </div>
                                                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium rounded">5.0</span>*/}
                                                    </div>
                                                </div>
                                                <div className="place-content">
                                                    <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-2 mb-3">
                                                        <div>
                                                            <h5 className="text-truncate mb-1">
                                                                <Link to={`/ville/${ville._id}`}>{ville.Nom}</Link>
                                                            </h5>
                                                            <div className="d-flex">
                                                                <p className="fs-14 mb-0">{ville.Description}</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <span className="badge bg-outline-success fs-10 fw-medium me-2">
                                                                {ville.circuits?.length || 0} Tours
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between border-top flex-wrap gap-2 pt-3">
                                                        <div className="date-info p-2">
                                                            <p className="d-flex align-items-center">
                                                                <i className="isax isax-location me-2"></i>
                                                                Explore {ville.Nom}
                                                            </p>
                                                        </div>
                                                        <Link to={`/ville/${ville._id}`} className="btn btn-primary btn-sm">
                                                            View Details
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Enhanced Pagination */}
                            {totalPages > 1 && (
                                <nav className="pagination-nav mt-3">
                                    <ul className="pagination justify-content-center">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                aria-label="Previous"
                                            >
                                                <span aria-hidden="true"><i className="fa-solid fa-chevron-left"></i></span>
                                            </button>
                                        </li>
                                        
                                        {getPageNumbers().map((page, index) => (
                                            <li 
                                                key={index} 
                                                className={`page-item ${page === '...' ? 'disabled' : ''} ${currentPage === page ? 'active' : ''}`}
                                            >
                                                {page === '...' ? (
                                                    <span className="page-link">...</span>
                                                ) : (
                                                    <button 
                                                        className="page-link" 
                                                        onClick={() => handlePageChange(page as number)}
                                                    >
                                                        {page}
                                                    </button>
                                                )}
                                            </li>
                                        ))}
                                        
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                aria-label="Next"
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

export default FlightList;