import React, { useEffect, useState } from 'react';
import ImageWithBasePath from '../../core/common/imageWithBasePath';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { all_routes } from '../router/all_routes';
import axios from 'axios';

interface Ville {
    _id: string;
    Nom: string;
    Description: string;
    photos?: [string];
    circuits?: string[]; // Assuming you might want to show circuit count
}

const PopularFive = () => {
    const routes = all_routes;
    const [villes, setVilles] = useState<Ville[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVilles = async () => {
            try {
                const response = await axios.get('http://localhost:3000/ville/getall');
                setVilles(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load destinations');
                setLoading(false);
                console.error('Error fetching villes:', err);
            }
        };

        fetchVilles();
    }, []);

    const clientSliderTwo = {
        infinite: true,
        speed: 2000,
        autoplay: true,
        dots: false,
        arrows: false,
        slidesToShow: 7,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 7,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 0,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    // Default images if ville doesn't have one
    const getVilleImage = (index: number) => {
        const defaultImages = [
            'assets/img/destination/destination-07.jpg',
            'assets/img/destination/destination-08.jpg',
            'assets/img/destination/destination-09.jpg',
            'assets/img/destination/destination-10.jpg',
            'assets/img/destination/destination-11.jpg',
            'assets/img/destination/destination-12.jpg',
            'assets/img/destination/destination-13.jpg',
            'assets/img/destination/destination-14.jpg'
        ];
        return defaultImages[index % defaultImages.length];
    };

    if (loading) {
        return (
            <section className="section place-section">
                <div className="container">
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="section place-section">
                <div className="container">
                    <div className="alert alert-danger">{error}</div>
                </div>
            </section>
        );
    }

    // Split villes into groups of 2 for the grid layout
    const groupedVilles = [];
    for (let i = 0; i < villes.length; i += 2) {
        groupedVilles.push(villes.slice(i, i + 2));
    }

    return (
        <>
            <section className="section place-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-10 text-center aos" data-aos="fade-up">
                            <div className="section-header text-center">
                                <h2 className="mb-2">Popular <span className="text-primary text-decoration-underline">Destinations</span></h2>
                                <p className="sub-title">Explore our most sought-after travel destinations</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {groupedVilles.map((villePair, groupIndex) => (
                            <div className="col-lg-3 col-md-6 col-12" key={`group-${groupIndex}`}>
                                {villePair.map((ville, index) => (
                                    <div className="destination-set aos" data-aos="fade-up" key={ville._id}>
                                        <div className="destination-img">
                                            
                                        <ImageWithBasePath 
                                        src={
                                            ville.photos && ville.photos.length > 0
                                            ? `http://localhost:3000/assets/img/villes/${ville.photos[0]}`
                                            : 'https://via.placeholder.com/400x300?text=No+Image'
                                        }
                                        className="img-fluid"
                                        alt={`${ville.Nom} 1`}
                                        />
                                        </div>
                                        <div className="destination-content d-flex align-items-center justify-content-center flex-column w-100">
                                            <h5 className="text-white fs-20 fw-semibold mb-1">{ville.Nom}</h5>
                                            <h6 className="text-light fs-16 fw-normal">
                                                {ville.circuits?.length || '0'} Tours
                                            </h6>
                                        </div>
                                        <div className="destination-btn">
                                            <Link to={`/ville/${ville._id}`}>
                                                <i className="fa fa-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
   

    {/* Client Section */}
    <section className="support-company-section bg-primary support-section-five  aos" data-aos="fade-up">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="owl-carousel client-slider">
                    <Slider {...clientSliderTwo}>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-01.svg" className="img-white" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-02.svg" className="img-white" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-03.svg" className="img-white" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-04.svg" className="img-white" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-05.svg" className="img-white" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-06.svg" className="img-white" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-07.svg" className="img-white" alt="img" />
                        </div>
                        <div className="client-img">
                            <ImageWithBasePath src="assets/img/clients/client-04.svg" className="img-white" alt="img" />
                        </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* /Client Section */}
    </>
  )
}

export default PopularFive