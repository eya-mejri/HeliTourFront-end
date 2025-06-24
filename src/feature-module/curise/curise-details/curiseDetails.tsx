    import React, { useEffect, useRef, useState } from 'react'
    import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb'
    import { all_routes } from '../../router/all_routes';
    import CruiseInfo from './cruise-info';
    import ImageWithBasePath from '../../../core/common/imageWithBasePath';
    import { Link, useParams, useNavigate } from 'react-router-dom';
    import Lightbox from "yet-another-react-lightbox";
    import "yet-another-react-lightbox/styles.css";
    import axios from 'axios';
    import dayjs from 'dayjs';
    import Slider from 'react-slick';
    import { NextArrow, PrevArrow } from '../../flight/flight-details/NextArrow';

    interface Circuit {
        imageUrl: string;
        _id: string;
        Nom: string;
        Description: string;
        Duree: number;
        Prix: number;
        Disponibilite: boolean;
        villeId?: string;
        photos?: string[]; // Pour plusieurs images
        videoUrl?:string;
    }

    const getYouTubeId = (url: string): string => {
        const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu.be\/([^&]+)/);
        return match ? match[1] : '';
    };

    const CruiseDetails = () => {
        const { id } = useParams<{ id: string }>();
        const navigate = useNavigate();
        const [circuit, setCircuit] = useState<Circuit | null>(null);
        const [relatedCircuits, setRelatedCircuits] = useState<Circuit[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);
        const routes = all_routes;
        const [lightboxOpen, setLightboxOpen] = useState(false);
    
    
            const [open, setOpen] = React.useState(false);
            const [open2, setOpen2] = React.useState(false);
            const [defaultDate] = useState(dayjs());
            const [isPolicy,setIsPolicy] = useState(true);
            const [isPolicy2,setIsPolicy2] = useState(false);
            const [isPolicy3,setIsPolicy3] = useState(false);
            const [isPolicy4,setIsPolicy4] = useState(false);
            //Breadcrumb Data
        
                const sliderForRef = useRef<any>(null);
                const sliderNavRef = useRef<any>(null);
                const [navSync, setNavSync] = useState<any>({ sliderFor: null, sliderNav: null });
                const CustomNextArrow = ({ className, onClick }: any) => (
                    <div className="owl-nav">
                    <button type="button" role="presentation" className="owl-next"  onClick={onClick}>
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
                useEffect(() => {
                    setNavSync({
                    sliderFor: sliderNavRef.current,
                    sliderNav: sliderForRef.current,
                    });
                }, []);
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
                            settings: {
                                slidesToShow: 1,
                            },
                        },
                        {
                            breakpoint: 1300,
                            settings: {
                                slidesToShow: 1,
                            },
                        },
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 1,
                            },
                        },
                        {
                            breakpoint: 576,
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
                const sliderForSettings = {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: true,
                    fade: true,
                    nextArrow: <CustomNextArrow />,
                    prevArrow: <CustomPrevArrow />,
                    asNavFor: navSync.sliderFor,
                };
                
                const sliderNavSettings = {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: true,
                    infinite: true,
                    nextArrow: <CustomNextArrow />,
                    prevArrow: <CustomPrevArrow />,
                    focusOnSelect: true,
                    asNavFor: navSync.sliderNav,
                    responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                        slidesToShow: 5,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 580,
                        settings: {
                        slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 0,
                        settings: {
                        vertical: false,
                        slidesToShow: 1,
                        },
                    },
                    ],
                };
        
        
                

        useEffect(() => {
            if (!id) {
                setError("Circuit ID is missing");
                setLoading(false);
                navigate(routes.home1);
                return;
            }
        
            const fetchCircuitData = async () => {
                try {
                    setLoading(true);
                    setError(null);
                    
                    const circuitResponse = await axios.get<Circuit>(
                        `http://localhost:3000/circuit/getbyid/${id}`
                    );
                    
                    if (!circuitResponse.data) {
                        throw new Error("Circuit not found");
                    }
                    
                    setCircuit(circuitResponse.data);
                    
                    if (circuitResponse.data.villeId) {
                        try {
                            const circuitsResponse = await axios.get<Circuit[]>(
                                `http://localhost:3000/circuit/getbyvilleid/${circuitResponse.data.villeId}`
                            );
                            setRelatedCircuits(
                                circuitsResponse.data.filter(c => c._id !== id)
                            );
                        } catch (err) {
                            console.error("Error fetching related circuits:", err);
                            setRelatedCircuits([]);
                        }
                    }
                } catch (err) {
                    console.error("Error:", err);
                    setError(err instanceof Error ? err.message : 'An unknown error occurred');
                } finally {
                    setLoading(false);
                }
            };
            
            fetchCircuitData();
        }, [id, navigate, routes.home1]);
        


        const largeImageSettings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            infinite: true,
            speed: 500,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        };
        
        const smallImageSettings = {
            slidesToShow: 5,
            slidesToScroll: 1,
            focusOnSelect: true,
            dots: false,
            arrows: false,
            infinite: false,
            speed: 500,
            responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 4 } },
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            ],
        };
        
        // Breadcrumb Data
        const breadcrumbs = [
            {
                label: 'Tour',
                link: routes.home1,
                active: false,
            },
            {
                label: 'Tour',
                active: true,
            },
            {
                label: circuit?.Nom || 'Loading...',
                active: true,
            },
        ];

        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;
        if (!circuit) return <div>tour not found</div>;

        return (
            <>
                <Breadcrumb
                    title="Tour"
                    breadcrumbs={breadcrumbs}
                    backgroundClass="breadcrumb-bg-06"
                    backgroundImage='http://localhost:3000/assets/img/bgTourDetail.jpg'

                />
                <div className="content">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8">
                            <div className="service-wrap slider-wrap mb-4">
                                <div className="slider-wrap">
                                    {/* Main Big Image Slider */}
                                    <Slider
                                    {...largeImageSettings}
                                    ref={sliderForRef}
                                    asNavFor={sliderNavRef.current || undefined}
                                    accessibility={false}
                                    >
                                    {circuit.photos?.length ? (
                                        circuit.photos.map((photo, index) => (
                                        <div key={index} className="service-img" onClick={() => setLightboxOpen(true)}>
                                            <ImageWithBasePath
                                            src={`http://localhost:3000/assets/img/circuits/${photo}`}
                                            className="img-fluid w-100"
                                            alt={`Circuit ${index + 1}`}
                                            style={{ height: '600px', objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                        </div>
                                        ))
                                    ) : (
                                        <div className="service-img">
                                        <img
                                            src="https://via.placeholder.com/800x400"
                                            className="img-fluid w-100"
                                            alt="Default"
                                        />
                                        </div>
                                    )}
                                    </Slider>

                                    {/* Lightbox */}
                                    <Lightbox
                                    open={lightboxOpen}
                                    close={() => setLightboxOpen(false)}
                                    slides={(circuit.photos || []).map(photo => ({
                                        src: `http://localhost:3000/assets/img/circuits/${photo}`,
                                    }))}
                                    />
                                </div>

                                {/* Thumbnail Navigation Slider */}
                                <div className="mt-3">
                                    <Slider
                                    {...smallImageSettings}
                                    ref={sliderNavRef}
                                    asNavFor={sliderForRef.current || undefined}
                                    accessibility={false}
                                    >
                                    {circuit.photos?.length ? (
                                        circuit.photos.map((photo, index) => (
                                        <div key={index}  className="d-flex justify-content-center">
                                            <ImageWithBasePath
                                            src={`http://localhost:3000/assets/img/circuits/${photo}`}
                                            className=""
                                            alt={`Thumbnail ${index + 1}`}
                                            style={{  height: '250px',width:'250px', objectFit: 'cover', borderRadius: '6px' }}
                                            />
                                        </div>
                                        ))
                                    ) : (
                                        <div>
                                        <img
                                            src="https://via.placeholder.com/150"
                                            className="img-fluid"
                                            alt="Default Thumbnail"
                                        />
                                        </div>
                                    )}
                                    </Slider>
                                </div>
                                </div>

                        
                                <div className="accordion custom-accordion accordion-shadow">
                                    {/* Description Section */}
                                    <div className="accordion-item border-0 mb-4">
                                        <div className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_two" aria-expanded="true">
                                                Description
                                            </button>
                                        </div>
                                        <div id="accordion_collapse_two" className="accordion-collapse collapse show">
                                            <div className="accordion-body">
                                                <p className="mb-2">{circuit.Description}</p>
                                                {/*<Link to="#" className="fs-14 fw-medium text-decoration-underline mb-2">Show More</Link>*/}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Details Section */}
                                    <div className="accordion-item border-0 mb-4">
                                        <div className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_one" aria-expanded="true">
                                                Details
                                            </button>
                                        </div>
                                        <div id="accordion_collapse_one" className="accordion-collapse collapse show">
                                            <div className="accordion-body">
                                                <div className="row gy-3">
                                                    {/*<div className="col-md-6 col-lg-4">
                                                        {/*<div className="d-flex align-items-center">
                                                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                                <i className="isax isax-timer fs-16"></i>
                                                            </span>
                                                            {/*<div>
                                                                <h6 className="mb-1">Duration</h6>
                                                                <span>{circuit.Duree} Minutes</span>
                                                            </div>
                                                        </div>
                                                    </div>*/}
                                                    <div className="col-md-6 col-lg-4">
                                                        <div className="d-flex align-items-center">
                                                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                                <i className="isax isax-profile-2user fs-16"></i>
                                                            </span>
                                                            <div>
                                                                <h6 className="mb-1">Price</h6>
                                                                <span>{circuit.Prix}TND</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-4">
                                                        <div className="d-flex align-items-center">
                                                            <span className="avatar avatar-md bg-primary-transparent rounded-circle me-2">
                                                                <i className="isax isax-calendar fs-16"></i>
                                                            </span>
                                                            <div>
                                                                <h6 className="mb-1">Availability</h6>
                                                                <span>{circuit.Disponibilite ? 'Available' : 'Not Available'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Available Cabins Section */}
                                    <div className="accordion-item mb-4 border-0">
                                        <div className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_six" aria-expanded="true">
                                                Available Tour in the same Destination 
                                            </button>
                                        </div>
                                        <div id="accordion_collapse_six" className="accordion-collapse collapse show">
    <div className="accordion-body">
        {relatedCircuits.map((circuit, index) => (
  <div 
    className="place-item mb-4" 
    key={circuit._id}
    onClick={() => navigate(`/circuit/${circuit._id}`)}
    style={{ cursor: 'pointer' }}
  >
    <div className="place-img">
      <Slider
        dots={true}
        arrows={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
      >
        {(circuit.photos && circuit.photos.length > 0 ? circuit.photos : ['default.jpg']).map((photo, idx) => (
          <div className="slide-images" key={idx}>
            <ImageWithBasePath 
              src={`http://localhost:3000/assets/img/circuits/${photo}`}
              className="img-fluid"
              alt={`${circuit.Nom} ${idx + 1}`}
              style={{ height: '250px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
        ))}
      </Slider>

      <div className="fav-item">
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
          {/* Optional: include ville name if available */}
        </div>
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
        <h5 className="text-primary text-nowrap me-2">
          {circuit.Prix} DT <span className="fs-14 fw-normal text-default">/ Person</span>
        </h5>
      </div>
    </div>
  </div>
))}

    </div>
    </div>
                                    </div>
                                
                                    
                                    {/* Video Section */}
                                    <div className="accordion-item mb-4 border-0">
                                        <div className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_five" aria-expanded="true">
                                                Video
                                            </button>
                                        </div>
                                        <div id="accordion_collapse_five" className="accordion-collapse collapse show">
                                            <div className="accordion-body">
                                                <div className="video-container ratio ratio-16x9">
                                                
                                                <iframe
                                                    src="https://www.youtube.com/embed/Lq6LEYtJW2c"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    loading="lazy"
                                                    title="Circuit Video"
                                                    className="w-100" 
                                                    style={{ minHeight: "400px", borderRadius: "8px" }}
                                                    />
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Location Section 
                                    <div className="accordion-item mb-4 border-0">
                                        <div className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_seven" aria-expanded="true">
                                                Location
                                            </button>
                                        </div>
                                        <div id="accordion_collapse_seven" className="accordion-collapse collapse show">
                                            <div className="accordion-body">
                                                <div>
                                                    <iframe 
                                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6509170.989457427!2d-123.80081967108484!3d37.192957227641294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sin!4v1669181581381!5m2!1sen!2sin"
                                                        allowFullScreen 
                                                        loading="lazy" 
                                                        referrerPolicy="no-referrer-when-downgrade" 
                                                        className="tour-detail-map w-100"
                                                        title="Location Map"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>*/}
                                    
                                    {/* FAQ Section */}
                                    <div className="accordion-item mb-4 border-0" id="location">
                                        <div className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accordion_collapse_eight" aria-expanded="true">
                                                Frequently Asked Questions
                                            </button>
                                        </div>
                                        <div id="accordion_collapse_eight" className="accordion-collapse collapse show">
                                            <div className="accordion-body">
                                                <div className="accordion faq-accordion" id="accordionFaq">
                                                    <div className="accordion-item show mb-2">
                                                        <div className="accordion-header">
                                                            <button className="accordion-button fw-medium" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapseOne" aria-controls="faq-collapseOne">
                                                                How old do I need to be to rent a car?
                                                            </button>
                                                        </div>
                                                        <div id="faq-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFaq">
                                                            <div className="accordion-body">
                                                                <p className="mb-0">
                                                                    We offer a diverse fleet of vehicles to suit every need, including compact cars, sedans, SUVs and luxury vehicles. You can browse our selection online or contact us for assistance in choosing the right vehicle for you
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item mb-2">
                                                        <div className="accordion-header">
                                                            <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-two" aria-controls="faq-two">
                                                                What documents do I need to rent a car?
                                                            </button>
                                                        </div>
                                                        <div id="faq-two" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                                            <div className="accordion-body">
                                                                <p className="mb-0">
                                                                    We offer a diverse fleet of vehicles to suit every need, including compact cars, sedans, SUVs and luxury vehicles. You can browse our selection online or contact us for assistance in choosing the right vehicle for you
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item mb-2">
                                                        <div className="accordion-header">
                                                            <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-three" aria-controls="faq-three">
                                                                What types of vehicles are available for rent?
                                                            </button>
                                                        </div>
                                                        <div id="faq-three" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                                            <div className="accordion-body">
                                                                <p className="mb-0">
                                                                    We offer a diverse fleet of vehicles to suit every need, including compact cars, sedans, SUVs and luxury vehicles. You can browse our selection online or contact us for assistance in choosing the right vehicle for you
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item">
                                                        <div className="accordion-header">
                                                            <button className="accordion-button fw-medium collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-four" aria-controls="faq-four">
                                                                Can I rent a car with a debit card?
                                                            </button>
                                                        </div>
                                                        <div id="faq-four" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                                            <div className="accordion-body">
                                                                <p className="mb-0">
                                                                    We offer a diverse fleet of vehicles to suit every need, including compact cars, sedans, SUVs and luxury vehicles. You can browse our selection online or contact us for assistance in choosing the right vehicle for you
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Details */}
                            <div className="col-xl-4">
                            <CruiseInfo circuitId={circuit._id} circuitName={circuit.Nom} circuitPrice={circuit.Prix} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    export default CruiseDetails;