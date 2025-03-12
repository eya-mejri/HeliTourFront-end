import React, { useState } from 'react'
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import { all_routes } from '../../router/all_routes';
import SearchOption from '../searchOption';
import HotelFilter from '../hotelFilter';

const HotelGrid = () => {
    const routes = all_routes

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Hotel',
            link: routes.home1,
            active: false,
        },
        {
            label: 'Hotels',
            active: false,
        },
        {
            label: 'Hotel Grid',
            active: true,
        },
    ];

    //ImageSlider
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

    const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
    const handleItemClick = (index: number) => {
        setSelectedItems((prevSelectedItems) => {
            const updatedSelectedItems = [...prevSelectedItems];
            updatedSelectedItems[index] = !updatedSelectedItems[index];
            return updatedSelectedItems;
        });
    };


    return (
        <>
            <Breadcrumb title="Hotel" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-01" />
            <div className="content">
                <div className="container">

                    <SearchOption />

                    <div className="row">

                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-3 ">
                            <HotelFilter />
                        </div>
                        {/* /Sidebar */}

                        <div className="col-xl-9 col-lg-8 theiaStickySidebar">
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <h6 className="mb-3">1920 Hotels Found on Your Search</h6>
                                <div className="d-flex align-items-center flex-wrap">
                                    <div className="list-item d-flex align-items-center mb-3">
                                        <Link to={routes.hotelGrid} className="list-icon active me-2"><i className="isax isax-grid-1"></i></Link>
                                        <Link to={routes.hotelList} className="list-icon me-2"><i className="isax isax-firstline"></i></Link>
                                        <Link to={routes.hotelMap} className="list-icon me-2"><i className="isax isax-map-1"></i></Link>
                                    </div>
                                    <div className="dropdown mb-3">
                                        <Link to="#" className="dropdown-toggle py-2" data-bs-toggle="dropdown" >
                                            <span className="fw-medium text-gray-9">Sort By : </span>Recommended
                                        </Link>
                                        <div className="dropdown-menu dropdown-sm">
                                            <form>
                                                <h6 className="fw-medium fs-16 mb-3">Sort By</h6>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend1" defaultChecked />
                                                    <label className="form-check-label ms-2" htmlFor="recommend1">Recommended</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend2" />
                                                    <label className="form-check-label ms-2" htmlFor="recommend2">Price: low to high</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend3" />
                                                    <label className="form-check-label ms-2" htmlFor="recommend3">Price: high to low</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend4" />
                                                    <label className="form-check-label ms-2" htmlFor="recommend4">Newest</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-2">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend5" />
                                                    <label className="form-check-label ms-2" htmlFor="recommend5">Ratings</label>
                                                </div>
                                                <div className="form-check d-flex align-items-center ps-0 mb-0">
                                                    <input className="form-check-input ms-0 mt-0" name="recommend" type="checkbox" id="recommend6" />
                                                    <label className="form-check-label ms-2" htmlFor="recommend6">Reviews</label>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-end border-top pt-3 mt-3">
                                                    <Link to="#" className="btn btn-light btn-sm me-2">Reset</Link>
                                                    <button type="button" className="btn btn-primary btn-sm">Apply</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-info br-10 p-3 pb-2 mb-4">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <p className="fs-14 fw-medium mb-2 d-inline-flex align-items-center"><i className="isax isax-info-circle me-2"></i>Save an average of 15% on thousands of hotels when you're signed in</p>
                                    <Link to={routes.login} className="btn btn-white btn-sm mb-2">Sign In</Link>
                                </div>
                            </div>
                            <div className="row justify-content-center">

                                {/* Hotel Grid */}
                                <div className="col-xl-4 col-md-6 d-flex">
                                    <div className="place-item common-grid-slider mb-4 flex-fill">
                                        <div className="place-img">
                                            <div className="img-slider image-slide owl-carousel nav-center">
                                                <Slider {...imgslideroption}>
                                                    <div className="slide-images">
                                                        <Link to={routes.hotelDetails}>
                                                            <ImageWithBasePath src="assets/img/hotels/hotel-01.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link to={routes.hotelDetails}>
                                                            <ImageWithBasePath src="assets/img/hotels/hotel-02.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link to={routes.hotelDetails}>
                                                            <ImageWithBasePath src="assets/img/hotels/hotel-03.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                </Slider>
                                            </div>
                                            <div className="fav-item" key={1} onClick={() => handleItemClick(1)}>
                                                <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                <Link to="#" className={`fav-icon ${selectedItems[1] ? 'selected' : ''}`}>
                                                    <i className="isax isax-heart5"></i>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="place-content">
                                            <div className="d-flex align-items-center mb-1">
                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">5.0</span>
                                                <p className="fs-14">(400 Reviews)</p>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link to={routes.hotelDetails}>Hotel Plaza Athenee</Link></h5>
                                            <p className="d-flex align-items-center mb-2"><i className="isax isax-location5 me-2"></i>Ciutat Vella, Barcelona</p>
                                            <div className="border-top pt-2 mb-2">
                                                <h6 className="d-flex align-items-center">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link to="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <h5 className="text-primary text-nowrap me-2">$500 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                <Link to="#" className="d-flex align-items-center overflow-hidden">
                                                    <span className="avatar avatar-md flex-shrink-0 me-2">
                                                        <ImageWithBasePath src="assets/img/users/user-08.jpg" className="rounded-circle" alt="img" />
                                                    </span>
                                                    <p className="fs-14">Beth Will</p>
                                                </Link>
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
                                                <ImageWithBasePath src="assets/img/hotels/hotel-05.jpg" className="img-fluid" alt="img" />
                                            </Link>
                                            <div className="fav-item" key={2} onClick={() => handleItemClick(2)}>
                                                <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                <Link to="#" className={`fav-icon ${selectedItems[2] ? 'selected' : ''}`}>
                                                    <i className="isax isax-heart5"></i>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="place-content">
                                            <div className="d-flex align-items-center mb-1">
                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.7</span>
                                                <p className="fs-14">(360 Reviews)</p>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link to={routes.hotelDetails}>The Luxe Haven</Link></h5>
                                            <p className="d-flex align-items-center mb-2"><i className="isax isax-location5 me-2"></i>Oxford Street, London</p>
                                            <div className="border-top pt-2 mb-2">
                                                <h6 className="d-flex align-items-center">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link to="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <h5 className="text-primary text-nowrap me-2">$600 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                <Link to="#" className="d-flex align-items-center overflow-hidden">
                                                    <span className="avatar avatar-md flex-shrink-0 me-2">
                                                        <ImageWithBasePath src="assets/img/users/user-09.jpg" className="rounded-circle" alt="img" />
                                                    </span>
                                                    <p className="fs-14">Andrews</p>
                                                </Link>
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
                                                <ImageWithBasePath src="assets/img/hotels/hotel-06.jpg" className="img-fluid" alt="img" />
                                            </Link>
                                            <div className="fav-item"  key={3} onClick={() => handleItemClick(3)}>
                                                <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                <Link to="#" className={`fav-icon ${selectedItems[3] ? 'selected' : ''}`}>
                                                    <i className="isax isax-heart5"></i>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="place-content">
                                            <div className="d-flex align-items-center mb-1">
                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.5</span>
                                                <p className="fs-14">(500 Reviews)</p>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link to={routes.hotelDetails}>The Urban Retreat</Link></h5>
                                            <p className="d-flex align-items-center mb-2"><i className="isax isax-location5 me-2"></i>Princes Street, Edinburgh</p>
                                            <div className="border-top pt-2 mb-2">
                                                <h6 className="d-flex align-items-center">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link to="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <h5 className="text-primary text-nowrap me-2">$500 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                <Link to="#" className="d-flex align-items-center overflow-hidden">
                                                    <span className="avatar avatar-md flex-shrink-0 me-2">
                                                        <ImageWithBasePath src="assets/img/users/user-10.jpg" className="rounded-circle" alt="img" />
                                                    </span>
                                                    <p className="fs-14">Robert</p>
                                                </Link>
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
                                                <ImageWithBasePath src="assets/img/hotels/hotel-07.jpg" className="img-fluid" alt="img" />
                                            </Link>
                                            <div className="fav-item"  key={4} onClick={() => handleItemClick(4)}>
                                                <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                <Link to="#"className={`fav-icon ${selectedItems[4] ? 'selected' : ''}`}>
                                                    <i className="isax isax-heart5"></i>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="place-content">
                                            <div className="d-flex align-items-center mb-1">
                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.9</span>
                                                <p className="fs-14">(450 Reviews)</p>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link to={routes.hotelDetails}>The Grand Horizon</Link></h5>
                                            <p className="d-flex align-items-center mb-2"><i className="isax isax-location5 me-2"></i>Deansgate, Manchester</p>
                                            <div className="border-top pt-2 mb-2">
                                                <h6 className="d-flex align-items-center">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link to="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <h5 className="text-primary text-nowrap me-2">$400 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                <Link to="#" className="d-flex align-items-center overflow-hidden">
                                                    <span className="avatar avatar-md flex-shrink-0 me-2">
                                                        <ImageWithBasePath src="assets/img/users/user-11.jpg" className="rounded-circle" alt="img" />
                                                    </span>
                                                    <p className="fs-14">Kenneth Pal</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Hotel Grid */}

                                {/* Hotel Grid */}
                                <div className="col-xl-4 col-md-6 d-flex">
                                    <div className="place-item common-grid-slider mb-4 flex-fill">
                                        <div className="place-img">
                                            <div className="img-slider image-slide owl-carousel nav-center">
                                                <Slider {...imgslideroption}>
                                                    <div className="slide-images">
                                                        <Link to={routes.hotelDetails}>
                                                            <ImageWithBasePath src="assets/img/hotels/hotel-08.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link to={routes.hotelDetails}>
                                                            <ImageWithBasePath src="assets/img/hotels/hotel-02.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link to={routes.hotelDetails}>
                                                            <ImageWithBasePath src="assets/img/hotels/hotel-03.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                </Slider>
                                            </div>
                                            <div className="fav-item" key={5} onClick={() => handleItemClick(5)}>
                                                <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                <Link to="#" className={`fav-icon ${selectedItems[5] ? 'selected' : ''}`}>
                                                    <i className="isax isax-heart5"></i>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="place-content">
                                            <div className="d-flex align-items-center mb-1">
                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.3</span>
                                                <p className="fs-14">(380 Reviews)</p>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link to={routes.hotelDetails}>Hotel Evergreen </Link></h5>
                                            <p className="d-flex align-items-center mb-2"><i className="isax isax-location5 me-2"></i>King’s Road, Chelsea</p>
                                            <div className="border-top pt-2 mb-2">
                                                <h6 className="d-flex align-items-center">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link to="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <h5 className="text-primary text-nowrap me-2">$550 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                <Link to="#" className="d-flex align-items-center overflow-hidden">
                                                    <span className="avatar avatar-md flex-shrink-0 me-2">
                                                        <ImageWithBasePath src="assets/img/users/user-12.jpg" className="rounded-circle" alt="img" />
                                                    </span>
                                                    <p className="fs-14">Timothy</p>
                                                </Link>
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
                                                <ImageWithBasePath src="assets/img/hotels/hotel-09.jpg" className="img-fluid" alt="img" />
                                            </Link>
                                            <div className="fav-item" key={6} onClick={() => handleItemClick(6)}>
                                                <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                <Link to="#" className={`fav-icon ${selectedItems[6] ? 'selected' : ''}`}>
                                                    <i className="isax isax-heart5"></i>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="place-content">
                                            <div className="d-flex align-items-center mb-1">
                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.1</span>
                                                <p className="fs-14">(270 Reviews)</p>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link to={routes.hotelDetails}>Stardust Hotel</Link></h5>
                                            <p className="d-flex align-items-center mb-2"><i className="isax isax-location5 me-2"></i>Bold Street, Liverpool</p>
                                            <div className="border-top pt-2 mb-2">
                                                <h6 className="d-flex align-items-center">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link to="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <h5 className="text-primary text-nowrap me-2">$450 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                <Link to="#" className="d-flex align-items-center overflow-hidden">
                                                    <span className="avatar avatar-md flex-shrink-0 me-2">
                                                        <ImageWithBasePath src="assets/img/users/user-14.jpg" className="rounded-circle" alt="img" />
                                                    </span>
                                                    <p className="fs-14">Mark Arrin</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Hotel Grid */}

                                {/* Hotel Grid */}
                                <div className="col-xl-4 col-md-6 d-flex">
                                    <div className="place-item common-grid-slider mb-4 flex-fill">
                                        <div className="place-img">
                                            <div className="img-slider image-slide owl-carousel nav-center">
                                                <Slider {...imgslideroption}>
                                                    <div className="slide-images">
                                                        <Link to={routes.hotelDetails}>
                                                            <ImageWithBasePath src="assets/img/hotels/hotel-10.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link to={routes.hotelDetails}>
                                                            <ImageWithBasePath src="assets/img/hotels/hotel-04.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link to={routes.hotelDetails}>
                                                            <ImageWithBasePath src="assets/img/hotels/hotel-06.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                </Slider>
                                            </div>
                                            <div className="fav-item" key={7} onClick={() => handleItemClick(7)}>
                                                <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                <Link to="#" className={`fav-icon ${selectedItems[7] ? 'selected' : ''}`}>
                                                    <i className="isax isax-heart5"></i>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="place-content">
                                            <div className="d-flex align-items-center mb-1">
                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.6</span>
                                                <p className="fs-14">(650 Reviews)</p>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link to={routes.hotelDetails}>Hotel Serene Valley</Link></h5>
                                            <p className="d-flex align-items-center mb-2"><i className="isax isax-location5 me-2"></i>Broad Street, Bristol</p>
                                            <div className="border-top pt-2 mb-2">
                                                <h6 className="d-flex align-items-center">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link to="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <h5 className="text-primary text-nowrap me-2">$350 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                <Link to="#" className="d-flex align-items-center overflow-hidden">
                                                    <span className="avatar avatar-md flex-shrink-0 me-2">
                                                        <ImageWithBasePath src="assets/img/users/user-15.jpg" className="rounded-circle" alt="img" />
                                                    </span>
                                                    <p className="fs-14">Brent Hole</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Hotel Grid */}

                                {/* Hotel Grid */}
                                <div className="col-xl-4 col-md-6 d-flex">
                                    <div className="place-item common-grid-slider mb-4 flex-fill">
                                        <div className="place-img">
                                            <div className="img-slider image-slide owl-carousel nav-center">
                                                <Slider {...imgslideroption}>
                                                    <div className="slide-images">
                                                        <Link to={routes.hotelDetails}>
                                                            <ImageWithBasePath src="assets/img/hotels/hotel-11.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link to={routes.hotelDetails}>
                                                            <ImageWithBasePath src="assets/img/hotels/hotel-05.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link to={routes.hotelDetails}>
                                                            <ImageWithBasePath src="assets/img/hotels/hotel-03.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                </Slider>
                                            </div>
                                            <div className="fav-item" key={8} onClick={() => handleItemClick(8)}>
                                                <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                <Link to="#" className={`fav-icon ${selectedItems[8] ? 'selected' : ''}`}>
                                                    <i className="isax isax-heart5"></i>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="place-content">
                                            <div className="d-flex align-items-center mb-1">
                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.2</span>
                                                <p className="fs-14">(550 Reviews)</p>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link to={routes.hotelDetails}>Hotel Skyline Vista</Link></h5>
                                            <p className="d-flex align-items-center mb-2"><i className="isax isax-location5 me-2"></i>Chapel Street, Salford</p>
                                            <div className="border-top pt-2 mb-2">
                                                <h6 className="d-flex align-items-center">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link to="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <h5 className="text-primary text-nowrap me-2">$700 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                <Link to="#" className="d-flex align-items-center overflow-hidden">
                                                    <span className="avatar avatar-md flex-shrink-0 me-2">
                                                        <ImageWithBasePath src="assets/img/users/user-16.jpg" className="rounded-circle" alt="img" />
                                                    </span>
                                                    <p className="fs-14 text-truncate">John James</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Hotel Grid */}

                                {/* Hotel Grid */}
                                <div className="col-xl-4 col-md-6 d-flex">
                                    <div className="place-item common-grid-slider mb-4 flex-fill">
                                        <div className="place-img">
                                            <div className="img-slider image-slide owl-carousel nav-center">
                                                <Slider {...imgslideroption}>
                                                    <div className="slide-images">
                                                        <Link to={routes.hotelDetails}>
                                                            <ImageWithBasePath src="assets/img/hotels/hotel-12.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link to={routes.hotelDetails}>
                                                            <ImageWithBasePath src="assets/img/hotels/hotel-08.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                    <div className="slide-images">
                                                        <Link to={routes.hotelDetails}>
                                                            <ImageWithBasePath src="assets/img/hotels/hotel-10.jpg" className="img-fluid" alt="img" />
                                                        </Link>
                                                    </div>
                                                </Slider>
                                            </div>
                                            <div className="fav-item" key={9} onClick={() => handleItemClick(9)}>
                                                <span className="badge bg-info d-inline-flex align-items-center"><i className="isax isax-ranking me-1"></i>Trending</span>
                                                <Link to="#" className={`fav-icon ${selectedItems[9] ? 'selected' : ''}`}>
                                                    <i className="isax isax-heart5"></i>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="place-content">
                                            <div className="d-flex align-items-center mb-1">
                                                <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium me-2">4.8</span>
                                                <p className="fs-14">(700 Reviews)</p>
                                            </div>
                                            <h5 className="mb-1 text-truncate"><Link to={routes.hotelDetails}>Hotel Aurora Bliss</Link></h5>
                                            <p className="d-flex align-items-center mb-2"><i className="isax isax-location5 me-2"></i>Castle Street, Cambridge</p>
                                            <div className="border-top pt-2 mb-2">
                                                <h6 className="d-flex align-items-center">Facillities :<i className="isax isax-home-wifi ms-2 me-2 text-primary"></i><i className="isax isax-scissor me-2 text-primary"></i><i className="isax isax-profile-2user me-2 text-primary"></i><i className="isax isax-wind-2 me-2 text-primary"></i><Link to="#" className="fs-14 fw-normal text-default d-inline-block">+2</Link></h6>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between border-top pt-3">
                                                <h5 className="text-primary text-nowrap me-2">$650 <span className="fs-14 fw-normal text-default">/ Night</span></h5>
                                                <Link to="#" className="d-flex align-items-center overflow-hidden">
                                                    <span className="avatar avatar-md flex-shrink-0 me-2">
                                                        <ImageWithBasePath src="assets/img/users/user-01.jpg" className="rounded-circle" alt="img" />
                                                    </span>
                                                    <p className="fs-14">Ronald</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /Hotel Grid */}

                            </div>

                            {/* Pagination */}
                            <nav className="pagination-nav">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled">
                                        <Link className="page-link" to="#" aria-label="Previous">
                                            <span aria-hidden="true"><i className="fa-solid fa-chevron-left"></i></span>
                                        </Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                    <li className="page-item active"><Link className="page-link" to="#">4</Link></li>
                                    <li className="page-item"><Link className="page-link" to="#">5</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link" to="#" aria-label="Next">
                                            <span aria-hidden="true"><i className="fa-solid fa-chevron-right"></i></span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            {/* /Pagination */}

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default HotelGrid