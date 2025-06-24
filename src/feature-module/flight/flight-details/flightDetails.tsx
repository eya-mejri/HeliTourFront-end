import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import { all_routes } from '../../router/all_routes';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Lightbox from "yet-another-react-lightbox";
import { NextArrow, PrevArrow } from './NextArrow';

interface Ville {
  _id: string;
  Nom: string;
  Description: string;
  photos?: string[]; 

}

interface Circuit {
  _id: string;
  Nom: string;
  Description: string;
  Prix: number;
  Disponibilite: boolean;
  photos?: string[]; 
}

const FlightDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ville, setVille] = useState<Ville | null>(null);
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [gallery, setGallery] = useState(false);
  const sliderForRef = useRef<Slider>(null);
  const sliderNavRef = useRef<Slider>(null);

  // Slider configurations
  const imgslideroption = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const largeImage = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
    // ❌ DO NOT add 'asNavFor' here
  };

  const smallImage = {
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
    // ❌ DO NOT add 'asNavFor' here
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch ville details
        const villeResponse = await fetch(`http://127.0.0.1:3000/ville/getbyid/${id}`);
        if (!villeResponse.ok) throw new Error(`HTTP error! status: ${villeResponse.status}`);
        const villeData: Ville = await villeResponse.json();
        setVille(villeData);

        // Fetch circuits by ville name
        const circuitsResponse = await fetch(`http://127.0.0.1:3000/circuit/getbyVille/${villeData.Nom}`);
        if (circuitsResponse.ok) {
          const circuitsData: Circuit[] = await circuitsResponse.json();
          setCircuits(circuitsData);
        } else {
          setCircuits([]); // Set empty array if no circuits
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleItemClick = (circuitId: string) => {
    setSelectedItems(prev => ({ ...prev, [circuitId]: !prev[circuitId] }));
    navigate(`/circuit/${circuitId}`);
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!ville) return <div className="alert alert-warning">Ville not found</div>;

  return (
    <div>
      <Breadcrumb title={ville.Nom} breadcrumbs={[
        { label: 'Home', link: all_routes.home1, active: false },
        { label: 'Villes', link: all_routes.login, active: false },
        { label: ville.Nom, active: true }
        
      ]} backgroundImage="http://localhost:3000/assets/img/bgTourList.webp"
/>

      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              {/* Ville Details Section */}
              <div className="service-wrap slider-wrap-five mb-4">
                <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                  <div className="mb-2">
                    <h4 className="mb-1 d-flex align-items-center flex-wrap">
                      {ville.Nom}
                      <span className="badge badge-xs bg-success rounded-pill ms-2">
                        <i className="isax isax-ticket-star5 me-1" />
                        Verified
                      </span>
                      <span className="badge badge-xs bg-indigo rounded-pill ms-2">
                        Popular
                      </span>
                    </h4>
                    <div className="d-flex align-items-center flex-wrap">
                      <p className="fs-14 mb-2 me-3 pe-3 border-end d-flex align-items-center">
                        {/*<ImageWithBasePath
                          src="assets/img/icons/airindia.svg"
                          className="me-2 "
                          alt="Img"
                        />*/}
                        {ville.Nom}
                        <span className="bg-primary divide-point mx-2" /> 
                        Top Destination
                      </p>
                      <p className="fs-14 mb-2 me-3 pe-3 border-end">
                        <i className="isax isax-location5 me-2" />
                        {ville.Nom}
                        {/*<Link
                          to="#location"
                          className="link-primary text-decoration-underline fw-medium ms-2"
                        >
                          View Location
                        </Link>*/}
                      </p>
                      {/*<div className="d-flex align-items-center mb-2">
                        <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                          5.0
                        </span>
                        <p className="fs-14">
                          <Link to="#reviews">(400 Reviews)</Link>
                        </p>
                      </div>*/}
                    </div>
                  </div>
                  {/*<div className="d-flex align-items-center mb-3">
                    <Link
                      to="#"
                      className="btn btn-outline-light btn-icon btn-sm d-flex align-items-center justify-content-center me-2"
                    >
                      <i className="isax isax-share" />
                    </Link>
                    <Link
                      to="#"
                      className="btn btn-outline-light btn-sm d-inline-flex align-items-center"
                    >
                      <i className="isax isax-heart5 text-danger me-1" />
                      Save
                    </Link>
                  </div>*/}
                </div>
                    {/* Image Gallery Section */}
                    <div className="service-wrap mb-4">
                    <div className="slider-wrap ">
                        {/* Main Image Slider */}
                        <Slider {...largeImage} ref={sliderForRef} asNavFor={sliderNavRef.current || undefined}   accessibility={false} // 👈 This prevents auto-focus
                        >
                          {ville.photos?.length ? (
                            ville.photos.map((photo, index) => (
                              <div key={index} className="d-flex justify-content-center">
                                <ImageWithBasePath
                                  src={`http://localhost:3000/assets/img/villes/${photo}`}
                                  className=""
                                  alt={`${ville.Nom} ${index + 1}`}
                                  style={{ height: '500px', width: '1000px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                              </div>

                            ))
                          ) : (
                            <>
                              <div className="service-img">
                                <img
                                  src="https://via.placeholder.com/800x400"
                                  className="img-fluid w-100"
                                  alt="Default Ville"
                                />
                              </div>
                            </>
                          )}
                        </Slider>

                    </div>

                    {/* Thumbnail Navigation Slider */}
                    <div className="mt-3">
                    <Slider {...smallImage} ref={sliderNavRef} asNavFor={sliderForRef.current || undefined}   accessibility={false} // 👈 This prevents auto-focus
                    >
                      {ville.photos?.length ? (
                        ville.photos.map((photo, index) => (
                          <div key={index} className="d-flex justify-content-center">
                            <ImageWithBasePath
                              src={`http://localhost:3000/assets/img/villes/${photo}`}
                              className=""
                              alt={`Thumbnail ${index + 1}`}
                              style={{ height: '250px',width:'250px', objectFit: 'cover', borderRadius: '6px' }}
                            />
                          </div>
                        ))
                      ) : (
                        <>
                          <div>
                            <img
                              src="https://via.placeholder.com/150"
                              className="img-fluid"
                              alt="Default Thumbnail"
                            />
                          </div>
                        </>
                      )}
                    </Slider>

                    </div>
                    </div>
              </div>

              {/* Description Section */}
              <div className="accordion custom-accordion accordion-shadow-none">
                <div className="accordion-item border-0 mb-4">
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion_collapse_two"
                      aria-expanded="true"
                    >
                      Description
                    </button>
                  </div>
                  <div
                    id="accordion_collapse_two"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body pt-0">
                      <p className="mb-2">
                        {ville.Description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Available Circuits Section */}
                <div className="accordion-item mb-0 border-0 pb-1">
                  <div className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordion_collapse_six"
                      aria-expanded="true"
                    >
                      Available Tours
                    </button>
                  </div>
                  <div
                    id="accordion_collapse_six"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body pt-0">
                      <div className="hotel-list flight-details-list">
                        {circuits.length ? (
                          circuits.map((circuit) => (
                            <div className="place-item mb-4" key={circuit._id}  style={{ height: '250px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}>
                              <div className="place-img">
                                <div className="img-slider owl-carousel nav-center">
                                  <Slider {...imgslideroption}>
                                      {(circuit.photos && circuit.photos.length > 0 ? circuit.photos : ['default.jpg']).map((photo, index) => (
                                          <div className="slide-images" key={index}>
                                          <Link to={`/circuit/${circuit._id}`}>
                                              <ImageWithBasePath 
                                              src={`http://localhost:3000/assets/img/circuits/${photo}`} 
                                              className="img-fluid" 
                                              alt={`${circuit.Nom} ${index + 1}`} 
                                              style={{ height: '250px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                              />
                                          </Link>
                                          </div>
                                      ))}
                                  </Slider>
                                </div>
                                <div className="fav-item" onClick={() => handleItemClick(circuit._id)}>
                                  <span className="badge bg-pink">Popular</span>
                                  <Link to="#" className={`fav-icon ${selectedItems[circuit._id] ? 'selected' : ''}`}>
                                    <i className="isax isax-heart5" />
                                  </Link>
                                </div>
                              </div>
                              <div className="place-content pb-1">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                  <div className="overflow-hidden">
                                    <h5 className="mb-2 d-inline-flex align-items-center text-truncate">
                                      {circuit.Nom}
                                    </h5>
                                  </div>
                                  <div className="d-flex align-items-center text-nowrap mb-2">
                                    <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">
                                      {circuit.Disponibilite ? 'Available' : 'Sold Out'}
                                    </span>
                                  </div>
                                </div>
                                <p className="mb-3">{circuit.Description}</p>
                                <div className="d-flex align-items-center flex-wrap">
                                  <span className="badge badge-info-100 fs-10 fw-medium rounded-pill me-2 mb-3">
                                  {circuit.Prix} TND
                                  </span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between flex-wrap border-top pt-3">
                                  <h5 className="text-primary me-2">
                                {circuit.Prix}{" "}TND
                                    <span className="fs-14 fw-normal text-default">
                                      / Person
                                    </span>
                                  </h5>
                                  {/*<button 
                                    className="btn btn-primary btn-md"
                                    disabled={!circuit.Disponibilite}
                                  >
                                    {circuit.Disponibilite ? 'Book Now' : 'Sold Out'}
                                  </button>*/}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="alert alert-info">No Tours available for this destination</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;