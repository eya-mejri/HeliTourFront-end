import React from 'react'
import ImageWithBasePath from '../../../core/common/imageWithBasePath'
import { Link } from 'react-router-dom'
import { all_routes } from '../../router/all_routes'

const AboutSection = () => {
 const routes = all_routes

    return (
        <>
            {/* About Section */}
            <section className="section about">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                              <div>
                                            <ImageWithBasePath src="http://localhost:3000/assets/img/about (2).png" alt="icon" />
                                        </div>
                                        
                        </div>
                        <div className="col-lg-6">
                            <div className="about-content mb-4">
                                <h6 className="text-primary fs-14 fw-medium mb-2">
                                    About Helitour
                                </h6>
                                <h2 className="display-6 mb-2">
                                    All-in-one platform for unforgettable travel experiences!
                                </h2>
                                <p className="mb-4">
                                    At DreamsTour, we believe that travel should be simple, seamless,
                                    and tailored to your needs. Whether you're dreaming of an exotic
                                    beach getaway, a cultural city tour, or a luxury cruise, we are
                                    here to turn your travel dreams into reality.
                                </p>
                                <div className="d-flex align-items-center mb-4">
                                    <span className="avatar avatar-xl bg-primary rounded-circle flex-shrink-0 me-3">
                                        <i className="isax isax-map5 fs-24" />
                                    </span>
                                    <p>
                                        Clients navigate their journeys, whether for travel or
                                        educational purposes, primarily in Canada, the U.S., and the U.K
                                    </p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="avatar avatar-xl bg-secondary rounded-circle flex-shrink-0 me-3">
                                        <i className="isax isax-trade5 fs-24 text-gray-9" />
                                    </span>
                                    <p>
                                        Provides a range of services from immigration advice to
                                        study-abroad support and vacation planning.
                                    </p>
                                </div>
                            </div>
                            <div className="about-mission">
                                <h6 className="text-primary fs-14 fw-medium mb-3">Our Mission</h6>
                                <p className="fs-16 text-gray-6">
                                    Our mission is to make travel more accessible, enjoyable, and
                                    hassle-free for everyone. With our range of services
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
            {/* /About Section */}
        </>

    )
}

export default AboutSection
