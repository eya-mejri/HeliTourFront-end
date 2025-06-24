import React from 'react'
import { Link } from 'react-router-dom'
import ImageWithBasePath from '../imageWithBasePath'
import { all_routes } from '../../../feature-module/router/all_routes'

const Footer = () => {

  const routes = all_routes

  return (
    <>
      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1">
              <div className="col">
                <div className="footer-widget">
                  <h5>Pages</h5>
                  
                </div>
              </div>
              <div className="col">
                <div className="footer-widget">
                  <h5>Company</h5>
                  
                </div>
              </div>
              <div className="col">
                <div className="footer-widget">
                  <h5>Destinations</h5>
                  
                </div>
              </div>
              <div className="col">
                <div className="footer-widget">
                  <h5>Support</h5>
                  
                </div>
              </div>
              <div className="col">
                <div className="footer-widget">
                  <h5>Services</h5>
                  
                </div>
              </div>
            </div>
            <div className="footer-wrap bg-white">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-3 col-xxl-3">
                  <div className="mb-3 text-center text-xl-start">
                    <Link to={routes.home1} className="d-block footer-logo-light">
                      <ImageWithBasePath 
                       style={{ height: '120px', width: '150px', objectFit: 'cover', borderRadius: '8px' }}
                      src="http://localhost:3000/assets/img/logo1.png" alt="logo" />
                    </Link>
                   
                  </div>
                </div>
                <div className="col-lg-6 col-xl-4 col-xxl-4">
                  <div className="d-flex align-items-center justify-content-center flex-wrap">
                    <h6 className="fs-14 fw-medium me-2 mb-2">Available on : </h6>
                   
                  </div>
                </div>
                <div className="col-lg-12 col-xl-5 col-xxl-5">
                  <div className="d-sm-flex align-items-center justify-content-center justify-content-xl-end">
                    <div className="d-flex align-items-center justify-content-center justify-content-sm-start me-0 pe-0 me-sm-3 pe-sm-3 border-end mb-3">
                      <span className="avatar avatar-lg bg-primary rounded-circle flex-shrink-0">
                        <i className="ti ti-headphones-filled fs-24" />
                      </span>
                      <div className="ms-2">
                        <p className="mb-1">Customer Support</p>
                        <p className="fw-medium text-dark">+216 21065627</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center justify-content-sm-start mb-3">
                      <span className="avatar avatar-lg bg-secondary rounded-circle flex-shrink-0">
                        <i className="ti ti-message fs-24 text-gray-9" />
                      </span>
                      <div className="ms-2">
                        <p className="mb-1">Drop Us an Email</p>
                        <p className="fw-medium text-dark">helitour.tunisie@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex align-items-center justify-content-between flex-wrap">
                  <p className="fs-14">
                    Copyright © 2025. All Rights Reserved,{" "}
                    <Link
                      to="#"
                      className="text-primary fw-medium"
                    >
                      Helitour
                    </Link>
                  </p>
                  <div className="d-flex align-items-center">
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
              </div>
            </div>
          </div>
        </div>
        {/* /Footer Bottom */}
      </footer>
      {/* /Footer */}
    </>

  )
}

export default Footer