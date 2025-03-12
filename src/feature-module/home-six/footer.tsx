import React from 'react'
import { Link } from 'react-router-dom'
import ImageWithBasePath from '../../core/common/imageWithBasePath'
import { all_routes } from '../router/all_routes'

const FooterSix = () => {

    const routes = all_routes;

    return (
        <>
            <>
                {/* Footer */}
                <footer className="footer-three footer-six">
                    <div className="footer-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="footer-widget">
                                        <div className="footer-about">
                                            <div className="mb-4">
                                                <Link to={routes.home1} className="d-inline-block mb-1">
                                                    <ImageWithBasePath src="assets/img/logo.svg" alt="logo" />
                                                </Link>
                                                <p>
                                                    Our mission is to offer you a seamless and enjoyable car
                                                    rental experience. Whether you’re planning a road trip
                                                </p>
                                            </div>
                                        </div>
                                        <ul className="social-icon">
                                            <li>
                                                <Link to="#">
                                                    <i className="fa-brands fa-facebook" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fa-brands fa-x-twitter" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fa-brands fa-instagram" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fa-brands fa-linkedin" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fa-brands fa-pinterest" />
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div>
                                        <h5 className="mb-2 text-white">Subscribe to Keep Updated</h5>
                                        <div className="footer-input">
                                            <div className="input-group align-items-center justify-content-center">
                                                <span className="input-group-text px-1">
                                                    <i className="isax isax-message-favorite5" />
                                                </span>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Enter Email Address"
                                                />
                                                <button type="submit" className="btn btn-primary btn-md">
                                                    Subscribe
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-6">
                                    <div className="footer-widget">
                                        <h5>Pages</h5>
                                        <ul className="footer-menu">
                                            <li>
                                                <Link to={routes.teams}>Our Team</Link>
                                            </li>
                                            <li>
                                                <Link to={routes.pricingPlan}>Pricing Plans</Link>
                                            </li>
                                            <li>
                                                <Link to={routes.Gallery}>Gallery</Link>
                                            </li>
                                            <li>
                                                <Link to={routes.profileSettings}>Settings</Link>
                                            </li>
                                            <li>
                                                <Link to={routes.myProfile}>Profile</Link>
                                            </li>
                                            <li>
                                                <Link to={routes.agentListing}>Listings</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="footer-widget">
                                        <h5>Company</h5>
                                        <ul className="footer-menu">
                                            <li>
                                                <Link to={routes.about_us}>About Us</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Careers</Link>
                                            </li>
                                            <li>
                                                <Link to={routes.blogGrid}>Blog</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Affiliate Program</Link>
                                            </li>
                                            <li>
                                                <Link to={routes.addTour}>Add Your Listing</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Our Partners</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="footer-widget">
                                        <h5>Destinations</h5>
                                        <ul className="footer-menu">
                                            <li>
                                                <Link to="#">Hawai</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Istanbul</Link>
                                            </li>
                                            <li>
                                                <Link to="#">San Diego</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Belgium</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Newyork</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Los Angeles</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="footer-widget">
                                        <h5>Quick Links</h5>
                                        <ul className="footer-menu">
                                            <li>
                                                <Link to="#">Legal Notice</Link>
                                            </li>
                                            <li>
                                                <Link to={routes.privacyPolicy}>Privacy Policy</Link>
                                            </li>
                                            <li>
                                                <Link to={routes.termsConditions}>Terms and Conditions</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Refund Policy</Link>
                                            </li>
                                            <li>
                                                <Link to={routes.userChat}>Chat Support</Link>
                                            </li>
                                            <li>
                                                <Link to="#">Tickets</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Footer Bottom */}
                    <div className="footer-bottom">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-5 mx-auto">
                                    <p className="text-center">
                                        Copyright © 2025. All Rights Reserved,{" "}
                                        <Link to="#" className="text-primary fw-medium">
                                            DreamsTour
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Footer Bottom */}
                </footer>
                {/* /Footer */}
            </>

        </>
    )
}

export default FooterSix


