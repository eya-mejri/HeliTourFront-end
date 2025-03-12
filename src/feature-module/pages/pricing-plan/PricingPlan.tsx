import React from 'react'
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb'
import { all_routes } from '../../router/all_routes';
import { Link } from 'react-router-dom';

const PricingPlan = () => {
  const routes = all_routes
  const breadcrumbs = [
    {
        label: 'Pricing Plan',
        link: routes.home1,
        active: false,
    },
    {
        label: 'Pages',
        active: false,
    },
    {
        label: 'Pricing Plan',
        active: true,
    },
];
  return (
    <>
        <Breadcrumb title="Pricing Plan" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-01" />
       {/* Page Wrapper */}
    <div className="content">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="header-section text-center mb-4">
                        <h2 className="mb-2">Choose Your Perfect Travel Package</h2>
                        <p>Choose flexible one-time, monthly, or annual travel plans for uninterrupted access to exclusive deals on flights, hotels, and tours</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="place-nav pricing-plan-tab">
                    <div className="nav justify-content-center">
                        <div className="tab-btn d-flex align-items-center">
                            <div>
                                <Link to="#" className="nav-link active" data-bs-toggle="tab" data-bs-target="#pricing-list-01">
									Monthly
								</Link>
                            </div>
                            <div>
                                <Link to="#" className="nav-link" data-bs-toggle="tab" data-bs-target="#pricing-list-02">
									Yearly
								</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-content">

                   {/* Pricing Plan List */}
                    <div className="tab-pane fade active show" id="pricing-list-01">
                        <div className="row">
                            <div className="col-lg-3 d-flex">
                                <div className="card flex-fill mb-0">
                                    <div className="card-header">
                                        <div className="mb-3">
                                            <div className="mb-2">
                                                <h4>Basic Plan</h4>
                                            </div>
                                            <div className="mb-2">
                                                <p className="fs-16 text-gray-6">For casual travelers who just need simple bookings.</p>
                                            </div>
                                            <div>
                                                <h5 className="fs-32 fw-bold">$99 <span className="fs-16 fw-normal">/ monthly</span></h5>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to="# " className="btn btn-dark d-flex align-items-center justify-content-center ">Choose Plan <i className="ms-2 isax isax-arrow-right-3"></i></Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <h6 className="fs-16">Features Include</h6>
                                        </div>
                                        <div className="pricing-list-items">
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Flight, hotel, car bookings</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Basic search filters</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Email support</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Weekday support</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>General deals access</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Itinerary tracking</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Travel updates</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Save recent searches</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 d-flex">
                                <div className="card flex-fill mb-0 bg-light-400">
                                    <div className="card-header">
                                        <div className="mb-3">
                                            <div className="mb-2 pricing-header d-flex align-items-center justify-content-between">
                                                <h4 className="text-truncate">Explorer Plan</h4>
                                                <span className="rounded-pill">Recommended</span>
                                            </div>
                                            <div className="mb-2">
                                                <p className="fs-16 text-gray-6">Ideal for travelers seeking deals and convenience.</p>
                                            </div>
                                            <div>
                                                <h5 className="fs-32 fw-bold">$199 <span className="fs-16 fw-normal">/ monthly</span></h5>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to="# " className="btn btn-primary d-flex align-items-center justify-content-center ">Choose Plan <i className="ms-2 isax isax-arrow-right-3"></i></Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <h6 className="fs-16">Features Include</h6>
                                        </div>
                                        <div className="pricing-list-items">
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Everything in Basic</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Advanced filters</p>
                                            <p className="d-flex align-items-center text-truncate"><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Priority email & chat support</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Early sale access</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Fare tracking</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Itinerary tracking</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Price alerts</p>
                                            <p className="d-flex align-items-center text-truncate"><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Personalized recommendations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 d-flex">
                                <div className="card flex-fill mb-0">
                                    <div className="card-header">
                                        <div className="mb-3">
                                            <div className="mb-2 ">
                                                <h4 className="text-truncate">Premium Plan</h4>
                                            </div>
                                            <div className="mb-2">
                                                <p className="fs-16 text-gray-6">Perfect for frequent travelers who want top-tier features</p>
                                            </div>
                                            <div>
                                                <h5 className="fs-32 fw-bold">$299 <span className="fs-16 fw-normal">/ monthly</span></h5>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to="# " className="btn btn-dark d-flex align-items-center justify-content-center ">Choose Plan <i className="ms-2 isax isax-arrow-right-3"></i></Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <h6 className="fs-16">Features Include</h6>
                                        </div>
                                        <div className="pricing-list-items">
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Everything in Explorer</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>24/7 VIP support</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Exclusive deals</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Unlimited booking changes</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Free lounge access</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Personal travel consultant</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Free upgrades</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Priority check-in/boarding</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 d-flex">
                                <div className="card flex-fill mb-0">
                                    <div className="card-header">
                                        <div className="mb-3">
                                            <div className="mb-2 ">
                                                <h4 className="text-truncate">Business Plan</h4>
                                            </div>
                                            <div className="mb-2">
                                                <p className="fs-16 text-gray-6">Tailored for business travelers with high demands.</p>
                                            </div>
                                            <div>
                                                <h5 className="fs-32 fw-bold">$399 <span className="fs-16 fw-normal">/ monthly</span></h5>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to="# " className="btn btn-dark d-flex align-items-center justify-content-center ">Choose Plan <i className="ms-2 isax isax-arrow-right-3"></i></Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <h6 className="fs-16">Features Include</h6>
                                        </div>
                                        <div className="pricing-list-items">
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Everything in Premium</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>24/7 business advisor</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Corporate expense tools</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Priority upgrades</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>VIP airport transfers</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Advanced trip analytics</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Multi-city trip planning</p>
                                            <p className="d-flex align-items-center text-truncate"><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Fast-track security clearance</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                   {/* /Pricing Plan List */}

                   {/* Pricing Plan List */}
                    <div className="tab-pane fade " id="pricing-list-02">
                        <div className="row">
                            <div className="col-lg-3 d-flex">
                                <div className="card flex-fill mb-0">
                                    <div className="card-header">
                                        <div className="mb-3">
                                            <div className="mb-2">
                                                <h4>Basic Plan</h4>
                                            </div>
                                            <div className="mb-2">
                                                <p className="fs-16 text-gray-6">For casual travelers who just need simple bookings.</p>
                                            </div>
                                            <div>
                                                <h5 className="fs-32 fw-bold">$99 <span className="fs-16 fw-normal">/ monthly</span></h5>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to="# " className="btn btn-dark d-flex align-items-center justify-content-center ">Choose Plan <i className="ms-2 isax isax-arrow-right-3"></i></Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <h6 className="fs-16">Features Include</h6>
                                        </div>
                                        <div className="pricing-list-items">
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Flight, hotel, car bookings</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Basic search filters</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Email support</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Weekday support</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>General deals access</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Itinerary tracking</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Travel updates</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Save recent searches</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 d-flex">
                                <div className="card flex-fill mb-0 bg-light-400">
                                    <div className="card-header">
                                        <div className="mb-3">
                                            <div className="mb-2 pricing-header d-flex align-items-center justify-content-between">
                                                <h4 className="text-truncate">Explorer Plan</h4>
                                                <span className="rounded-pill">Recommended</span>
                                            </div>
                                            <div className="mb-2">
                                                <p className="fs-16 text-gray-6">Ideal for travelers seeking deals and convenience.</p>
                                            </div>
                                            <div>
                                                <h5 className="fs-32 fw-bold">$199 <span className="fs-16 fw-normal">/ monthly</span></h5>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to="# " className="btn btn-primary d-flex align-items-center justify-content-center ">Choose Plan <i className="ms-2 isax isax-arrow-right-3"></i></Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <h6 className="fs-16">Features Include</h6>
                                        </div>
                                        <div className="pricing-list-items">
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Everything in Basic</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Advanced filters</p>
                                            <p className="d-flex align-items-center text-truncate"><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Priority email & chat support</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Early sale access</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Fare tracking</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Itinerary tracking</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Price alerts</p>
                                            <p className="d-flex align-items-center text-truncate"><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Personalized recommendations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 d-flex">
                                <div className="card flex-fill mb-0">
                                    <div className="card-header">
                                        <div className="mb-3">
                                            <div className="mb-2 ">
                                                <h4 className="text-truncate">Premium Plan</h4>
                                            </div>
                                            <div className="mb-2">
                                                <p className="fs-16 text-gray-6">Perfect for frequent travelers who want top-tier features</p>
                                            </div>
                                            <div>
                                                <h5 className="fs-32 fw-bold">$299 <span className="fs-16 fw-normal">/ monthly</span></h5>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to="# " className="btn btn-dark d-flex align-items-center justify-content-center ">Choose Plan <i className="ms-2 isax isax-arrow-right-3"></i></Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <h6 className="fs-16">Features Include</h6>
                                        </div>
                                        <div className="pricing-list-items">
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Everything in Explorer</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>24/7 VIP support</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Exclusive deals</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Unlimited booking changes</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Free lounge access</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Personal travel consultant</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Free upgrades</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Priority check-in/boarding</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 d-flex">
                                <div className="card flex-fill mb-0">
                                    <div className="card-header">
                                        <div className="mb-3">
                                            <div className="mb-2 ">
                                                <h4 className="text-truncate">Business Plan</h4>
                                            </div>
                                            <div className="mb-2">
                                                <p className="fs-16 text-gray-6">Tailored for business travelers with high demands.</p>
                                            </div>
                                            <div>
                                                <h5 className="fs-32 fw-bold">$399 <span className="fs-16 fw-normal">/ monthly</span></h5>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to="# " className="btn btn-dark d-flex align-items-center justify-content-center ">Choose Plan <i className="ms-2 isax isax-arrow-right-3"></i></Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <h6 className="fs-16">Features Include</h6>
                                        </div>
                                        <div className="pricing-list-items">
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Everything in Premium</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>24/7 business advisor</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Corporate expense tools</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Priority upgrades</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>VIP airport transfers</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Advanced trip analytics</p>
                                            <p className="d-flex align-items-center "><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Multi-city trip planning</p>
                                            <p className="d-flex align-items-center text-truncate"><i className="isax isax-tick-circle5 text-gray-1 me-1"></i>Fast-track security clearance</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   {/* /Pricing Plan List */}

                </div>
            </div>

        </div>
    </div>
   {/* /Page Wrapper */}
    </>
  )
}

export default PricingPlan