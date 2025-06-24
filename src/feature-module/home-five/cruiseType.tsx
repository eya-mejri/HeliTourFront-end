import React, { useEffect, useState } from 'react';
import ImageWithBasePath from '../../core/common/imageWithBasePath';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { all_routes } from '../router/all_routes';
import axios from 'axios';

interface Circuit {
    _id: string;
    Nom: string;
    Description: string;
    Prix: number;
    Disponibilite: boolean;
    villeId: string;
    photos?: [string]; // Assuming you might add images to your circuits
}

const CruiseType = () => {
    const routes = all_routes;
    const [circuits, setCircuits] = useState<Circuit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCircuits = async () => {
            try {
                const response = await axios.get('http://localhost:3000/circuit/getall');
                setCircuits(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load circuits');
                setLoading(false);
                console.error('Error fetching circuits:', err);
            }
        };

        fetchCircuits();
    }, []);

    const CustomNextArrow = ({ className, onClick }: any) => (
        <div className="owl-nav">
            <button type="button" role="presentation" className="owl-next" onClick={onClick}>
                <i className="fa-solid fa-chevron-right" />
            </button>
        </div>
    );

    const CustomPrevArrow = ({ className, onClick }: any) => (
        <div className="owl-nav">
            <button type="button" role="presentation" className="owl-prev" onClick={onClick}>
                <i className="fa-solid fa-chevron-left" />
            </button>
        </div>
    );

    const placeSectionSlick = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 6,
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
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 0,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    

    if (loading) {
        return (
            <section className="section destination-section blog-section">
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
            <section className="section destination-section blog-section">
                <div className="container">
                    <div className="alert alert-danger">{error}</div>
                </div>
            </section>
        );
    }

    return (
        <>
            {/* Circuit Section */}
            <section className="section destination-section blog-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-10 text-center aos" data-aos="fade-up">
                            <div className="section-header text-center">
                                <h2 className="mb-2">Explore Our <span className="text-primary text-decoration-underline">Tour Types</span></h2>
                                <p className="sub-title">Find the perfect travel experience tailored to your unique interests.</p>
                            </div>
                        </div>
                    </div>
                    <div>{/*{circuit.imageUrl || getCircuitImage(index)} */}
                        <Slider className="owl-carousel place-slider cruise-slider nav-center aos" {...placeSectionSlick} data-aos="fade-up">
                            {circuits.map((circuit, index) => (
                                <div className="cruise-type" key={circuit._id}>
                                    <ImageWithBasePath 
                                        src={
                                            circuit.photos && circuit.photos.length > 0
                                            ? `http://localhost:3000/assets/img/circuits/${circuit.photos[0]}`
                                            : 'https://via.placeholder.com/400x300?text=No+Image'
                                        }
                                        className="img-fluid"
                                        alt={`${circuit.Nom} 1`}
                                        style={{ height: '250px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                        />

                                    <h6><Link to={`/circuit/${circuit._id}`}>{circuit.Nom}</Link></h6>
                                    <p className="circuit-price">From {circuit.Prix} TND</p>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="text-center view-all aos" data-aos="fade-up">
                        <Link to={routes.cruiseList} className="btn btn-primary">
                            More Tours<i className="isax isax-arrow-right-3 ms-2"></i>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Support Section */}
            <section className="support-section bg-dark support-section-five aos" data-aos="fade-up">
                <div className="horizontal-slide d-flex" data-direction="left" data-speed="slow" data-animated="true">
                    <div className="slide-list d-flex">
                        <div className="support-item">
                            <h5>Personalized Itineraries</h5>
                        </div>
                        <div className="support-item">
                            <h5>Comprehensive Planning</h5>
                        </div>
                        <div className="support-item">
                            <h5>Expert Guidance</h5>
                        </div>
                        <div className="support-item">
                            <h5>Local Experience</h5>
                        </div>
                        <div className="support-item">
                            <h5>Customer Support</h5>
                        </div>
                        <div className="support-item">
                            <h5>Sustainability Efforts</h5>
                        </div>
                        <div className="support-item">
                            <h5>Multiple Regions</h5>
                        </div>
                        <div className="support-item" aria-hidden="true">
                            <h5>Personalized Itineraries</h5>
                        </div>
                        <div className="support-item" aria-hidden="true">
                            <h5>Comprehensive Planning</h5>
                        </div>
                        <div className="support-item" aria-hidden="true">
                            <h5>Expert Guidance</h5>
                        </div>
                        <div className="support-item" aria-hidden="true">
                            <h5>Local Experience</h5>
                        </div>
                        <div className="support-item" aria-hidden="true">
                            <h5>Customer Support</h5>
                        </div>
                        <div className="support-item" aria-hidden="true">
                            <h5>Sustainability Efforts</h5>
                        </div>
                        <div className="support-item" aria-hidden="true">
                            <h5>Multiple Regions</h5>
                        </div>
                    </div>
                </div>
            </section>


    {/* who we are */}
    <section className="section">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="years-off  aos" data-aos="fade-up" >
                                <h4 className="text-light"> 15 Years of Experience</h4>
                            </div>
                            <div className="discover-set-img-left  aos "data-aos="fade-up" >
                                <ImageWithBasePath src="http://127.0.0.1:3000/assets/img/whoweare1.jpg" alt="Img" style={{ height: '358px', width: '100%'}} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="discover-set-img-right aos" data-aos="fade-up">
                                <ImageWithBasePath src="http://127.0.0.1:3000/assets/img/whoweare2.jpg" alt="Img" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="section-header mb-4  aos" data-aos="fade-up">
                        <h2 className="mb-2">Discover  <span className="text-primary  text-decoration-underline">Who We Are</span></h2>
                        <p className="sub-title">Helitour Tunisie offers breathtaking helicopter tours across Tunisia, showcasing iconic landscapes from the air. From the Mediterranean coastline to the Sahara Desert, each flight delivers a unique and unforgettable view. Ideal for tourists seeking luxury, adventure, and panoramic experiences. </p>
                    </div>
                    <div className="row">
                        <div className="col-lg-6  mb-3  aos" data-aos="fade-up">
                            <div className="card border-0">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <ImageWithBasePath src="assets/img/icons/extensive.svg" alt="Img" />
                                        <div className="ms-2">
                                            <h6 className="fs-16 mb-2">Extensive Cruise Options</h6>
                                            <p>We partner with top aviation providers to offer a diverse selection of scenic helicopter tours across Tunisia.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6  mb-3  aos" data-aos="fade-up">
                            <div className="card border-0">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <ImageWithBasePath src="assets/img/icons/trust.svg" alt="Img" />
                                        <div className="ms-2">
                                            <h6 className="fs-16  mb-2">Trust and Expertise</h6>
                                            <p>With years of aviation expertise , we deliver unforgettable helicopter tour experiences across Tunisia.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12  aos" data-aos="fade-up">
                            <Link to={routes.about_us} className="btn btn-primary">More About Us <i className="isax isax-arrow-right-3 ms-2"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* who we are */}
    </>
  )
}

export default CruiseType