import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ImageWithBasePath from '../../core/common/imageWithBasePath'
import { DatePicker } from 'antd'
import dayjs from 'dayjs';

import BannerCounter from '../../core/common/banner-counter/counter';
import { all_routes } from '../router/all_routes';
const FlightSearch = () => {
        const routes = all_routes
      const [flightRadio,setFlightRadio] = useState<string>('oneway')
      const [defaultDate] = useState(dayjs());
  return (
    <>
     {/* Flight Search */}
     <div className="card">
        <div className="card-body">
            <div className="banner-form">
            <form >
                    <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                    <div className="d-flex align-items-center flex-wrap">
                        <div className="form-check d-flex align-items-center me-3 mb-2">
                        <input
                            className="form-check-input mt-0"
                            type="radio"
                            name="Radio"
                            id="oneway"
                            onChange={()=>setFlightRadio('oneway')}                                    
                            checked={flightRadio === 'oneway'? true : false}
                        />
                        <label
                            className="form-check-label fs-14 ms-2"
                            htmlFor="oneway"
                        >
                            Oneway
                        </label>
                        </div>
                        <div className="form-check d-flex align-items-center me-3 mb-2">
                        <input
                            className="form-check-input mt-0"
                            type="radio"
                            name="Radio"
                            id="roundtrip"
                            onChange={()=>setFlightRadio('roundtrip')}                                    
                            checked={flightRadio === 'roundtrip'? true : false}
                        />
                        <label
                            className="form-check-label fs-14 ms-2"
                            htmlFor="roundtrip"
                        >
                            Round Trip
                        </label>
                        </div>
                        <div className="form-check d-flex align-items-center me-3 mb-2">
                        <input
                            className="form-check-input mt-0"
                            type="radio"
                            name="Radio"
                            id="multiway"
                            defaultValue="multiway"
                            onChange={()=>setFlightRadio('multiway')}
                            checked ={flightRadio === 'multiway' ? true : false}
                        />
                        <label
                            className="form-check-label fs-14 ms-2"
                            htmlFor="multiway"
                        >
                            Multi Trip
                        </label>
                        </div>
                    </div>
                    <h6 className="fw-medium fs-16 mb-2">
                        Millions of cheap flights. One simple search
                    </h6>
                    </div>
                    <div className="normal-trip" style={{display: flightRadio === 'multiway'? 'none' : 'block'}}>
                    <div className="d-lg-flex">
                        <div className="d-flex  form-info">
                        <div className="form-item dropdown">
                            <div
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"

                            role="menu"
                            >
                            <label className="form-label fs-14 text-default mb-1">
                                From
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue="Newyork"
                            />
                            <p className="fs-12 mb-0">
                                Ken International Airport
                            </p>
                            </div>
                            <div className="dropdown-menu dropdown-md p-0">
                            <div className="input-search p-3 border-bottom">
                                <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Location"
                                />
                                <span className="input-group-text px-2 border-start-0">
                                    <i className="isax isax-search-normal" />
                                </span>
                                </div>
                            </div>
                            <ul>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Newyork
                                    </h6>
                                    <p>Ken International Airport</p>
                                </Link>
                                </li>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Boston
                                    </h6>
                                    <p>
                                    Boston Logan International Airport
                                    </p>
                                </Link>
                                </li>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Northern Virginia
                                    </h6>
                                    <p>Dulles International Airport</p>
                                </Link>
                                </li>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Los Angeles
                                    </h6>
                                    <p>Los Angeles International Airport</p>
                                </Link>
                                </li>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Orlando
                                    </h6>
                                    <p>Orlando International Airport</p>
                                </Link>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <div className="form-item dropdown ps-2 ps-sm-3">
                            <div
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"

                            role="menu"
                            >
                            <label className="form-label fs-14 text-default mb-1">
                                To
                            </label>
                            <h5>Las Vegas</h5>
                            <p className="fs-12 mb-0">
                                Martini International Airport
                            </p>
                            <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                <i className="fa-solid fa-arrow-right-arrow-left" />
                            </span>
                            </div>
                            <div className="dropdown-menu dropdown-md p-0">
                            <div className="input-search p-3 border-bottom">
                                <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Location"
                                />
                                <span className="input-group-text px-2 border-start-0">
                                    <i className="isax isax-search-normal" />
                                </span>
                                </div>
                            </div>
                            <ul>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Newyork
                                    </h6>
                                    <p>Ken International Airport</p>
                                </Link>
                                </li>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Boston
                                    </h6>
                                    <p>
                                    Boston Logan International Airport
                                    </p>
                                </Link>
                                </li>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Northern Virginia
                                    </h6>
                                    <p>Dulles International Airport</p>
                                </Link>
                                </li>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Los Angeles
                                    </h6>
                                    <p>Los Angeles International Airport</p>
                                </Link>
                                </li>
                                <li>
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Orlando
                                    </h6>
                                    <p>Orlando International Airport</p>
                                </Link>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <div className="form-item">
                            <label className="form-label fs-14 text-default mb-1">
                            Departure
                            </label>
                            <DatePicker
                            className="form-control datetimepicker"
                            placeholder="dd/mm/yyyy"
                            defaultValue={defaultDate}
                            format="DD-MM-YYYY"
                            />
                            <p className="fs-12 mb-0">Monday</p>
                        </div>
                        <div className="form-item round-drip" style={{display:flightRadio === 'roundtrip'?'block':'none'}}>
                            <label className="form-label fs-14 text-default mb-1">
                            Return
                            </label>
                            <input
                            type="text"
                            className="form-control datetimepicker"
                            defaultValue="23-10-2024"
                            />
                            <p className="fs-12 mb-0">Wednesday</p>
                        </div>
                        <div className="form-item dropdown">
                            <div
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"

                            role="menu"
                            >
                            <label className="form-label fs-14 text-default mb-1">
                                Travellers and cabin class
                            </label>
                            <h5>
                                4{" "}
                                <span className="fw-normal fs-14">
                                Persons
                                </span>
                            </h5>
                            <p className="fs-12 mb-0">1 Adult, Economy</p>
                            </div>
                            <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                            <h5 className="mb-3">
                                Select Travelers &amp; Class
                            </h5>
                            <div className="mb-3 border br-10 info-item pb-1">
                                <h6 className="fs-16 fw-medium mb-2">
                                Travellers
                                </h6>
                                <div className="row">
                                <div className="col-md-4">
                                    <div className="mb-3">
                                    <label className="form-label text-gray-9 mb-2">
                                        Adults{" "}
                                        <span className="text-default fw-normal">
                                        ( 12+ Yrs )
                                        </span>
                                    </label>
                                    <BannerCounter />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                    <label className="form-label text-gray-9 mb-2">
                                        Childrens{" "}
                                        <span className="text-default fw-normal">
                                        ( 2-12 Yrs )
                                        </span>
                                    </label>
                                    <BannerCounter />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                    <label className="form-label text-gray-9 mb-2">
                                        Infants
                                        <span className="text-default fw-normal">
                                        ( 0-12 Yrs )
                                        </span>
                                    </label>
                                    <BannerCounter />
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="mb-3 border br-10 info-item pb-1">
                                <h6 className="fs-16 fw-medium mb-2">
                                Travellers
                                </h6>
                                <div className="d-flex align-items-center flex-wrap">
                                <div className="form-check me-3 mb-3">
                                    <input
                                    className="form-check-input"
                                    type="radio"
                                    defaultValue="Economy"
                                    name="cabin-class"
                                    id="economy"
                                    defaultChecked
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="economy"
                                    >
                                    Economy
                                    </label>
                                </div>
                                <div className="form-check me-3 mb-3">
                                    <input
                                    className="form-check-input"
                                    type="radio"
                                    defaultValue="Economy"
                                    name="cabin-class"
                                    id="premium-economy"
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="premium-economy"
                                    >
                                    Premium Economy
                                    </label>
                                </div>
                                <div className="form-check me-3 mb-3">
                                    <input
                                    className="form-check-input"
                                    type="radio"
                                    defaultValue="Business"
                                    name="cabin-class"
                                    id="business"
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="business"
                                    >
                                    Business
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                    className="form-check-input"
                                    type="radio"
                                    defaultValue="First Class"
                                    name="cabin-class"
                                    id="first-class"
                                    />
                                    <label
                                    className="form-check-label"
                                    htmlFor="first-class"
                                    >
                                    First Class
                                    </label>
                                </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <Link
                                to="#"
                                className="btn btn-light btn-sm me-2"
                                >
                                Cancel
                                </Link>

                                <Link
                                to={all_routes.flightGrid}
                                className="btn btn-primary btn-sm"
                                >
                                Apply
                                </Link>
                            </div>
                            </div>
                        </div>
                        </div>

                        <Link
                        to={all_routes.flightGrid}
                        className="btn btn-primary search-btn rounded"
                        >
                        Search
                        </Link>
                    </div>
                    </div>
                    <div className="multi-trip" style={{display: flightRadio === 'multiway'? 'block' : 'none'}}>
                    <div className="d-lg-flex">
                        <div className="d-flex  form-info">
                        <div className="form-item dropdown">
                            <div
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                            role="menu"
                            >
                            <label className="form-label fs-14 text-default mb-1">
                                From
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue="Newyork"
                            />
                            <p className="fs-12 mb-0">
                                Ken International Airport
                            </p>
                            </div>
                            <div className="dropdown-menu dropdown-md p-0">
                            <div className="input-search p-3 border-bottom">
                                <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Location"
                                />
                                <span className="input-group-text px-2 border-start-0">
                                    <i className="isax isax-search-normal" />
                                </span>
                                </div>
                            </div>
                            <ul>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Newyork
                                    </h6>
                                    <p>Ken International Airport</p>
                                </Link>
                                </li>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Boston
                                    </h6>
                                    <p>
                                    Boston Logan International Airport
                                    </p>
                                </Link>
                                </li>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Northern Virginia
                                    </h6>
                                    <p>Dulles International Airport</p>
                                </Link>
                                </li>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Los Angeles
                                    </h6>
                                    <p>Los Angeles International Airport</p>
                                </Link>
                                </li>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Orlando
                                    </h6>
                                    <p>Orlando International Airport</p>
                                </Link>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <div className="form-item dropdown ps-2 ps-sm-3">
                            <div
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                            role="menu"
                            >
                            <label className="form-label fs-14 text-default mb-1">
                                To
                            </label>
                            <h5>Las Vegas</h5>
                            <p className="fs-12 mb-0">
                                Martini International Airport
                            </p>
                            <span className="way-icon badge badge-primary rounded-pill translate-middle">
                                <i className="fa-solid fa-arrow-right-arrow-left" />
                            </span>
                            </div>
                            <div className="dropdown-menu dropdown-md p-0">
                            <div className="input-search p-3 border-bottom">
                                <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Location"
                                />
                                <span className="input-group-text px-2 border-start-0">
                                    <i className="isax isax-search-normal" />
                                </span>
                                </div>
                            </div>
                            <ul>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Newyork
                                    </h6>
                                    <p>Ken International Airport</p>
                                </Link>
                                </li>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Boston
                                    </h6>
                                    <p>
                                    Boston Logan International Airport
                                    </p>
                                </Link>
                                </li>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Northern Virginia
                                    </h6>
                                    <p>Dulles International Airport</p>
                                </Link>
                                </li>
                                <li className="border-bottom">
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Los Angeles
                                    </h6>
                                    <p>Los Angeles International Airport</p>
                                </Link>
                                </li>
                                <li>
                                <Link
                                    className="dropdown-item"
                                    to="#"
                                >
                                    <h6 className="fs-16 fw-medium">
                                    Orlando
                                    </h6>
                                    <p>Orlando International Airport</p>
                                </Link>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <div className="form-item">
                            <label className="form-label fs-14 text-default mb-1">
                            Departure
                            </label>
                            <DatePicker
                            className="form-control datetimepicker"
                            placeholder="dd/mm/yyyy"
                            defaultValue={defaultDate}
                            format="DD-MM-YYYY"
                            />
                            <p className="fs-12 mb-0">Monday</p>
                        </div>
                        </div>
                        <Link
                        to={all_routes.flightGrid}
                        className="btn btn-primary search-btn rounded"
                        >
                        Search
                        </Link>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    {/* /Flight Search */}

    {/* Flight Types */}
    <div className="mb-2">
        <div className="mb-3">
            <h5 className="mb-2">Choose type of Flights you are interested</h5>
        </div>
        <div className="row">
            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                    <Link to={routes.flightGrid} className="avatar avatar-lg">
                        <ImageWithBasePath src="assets/img/flight/flight-company-01.svg" className="rounded-circle" alt="img" />
                    </Link>
                    <div className="ms-2">
                        <h6 className="fs-16 fw-medium"><Link to={routes.flightGrid}>American Airline</Link></h6>
                        <p className="fs-14">216 Flights</p>
                    </div>
                </div>
            </div>
            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                    <Link to={routes.flightGrid} className="avatar avatar-lg">
                        <ImageWithBasePath src="assets/img/flight/flight-company-02.svg" className="rounded-circle" alt="img" />
                    </Link>
                    <div className="ms-2">
                        <h6 className="fs-16 fw-medium"><Link to={routes.flightGrid}>Delta Airlines</Link></h6>
                        <p className="fs-14">569 Flights</p>
                    </div>
                </div>
            </div>
            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                    <Link to={routes.flightGrid} className="avatar avatar-lg">
                        <ImageWithBasePath src="assets/img/flight/flight-company-03.svg" className="rounded-circle" alt="img" />
                    </Link>
                    <div className="ms-2">
                        <h6 className="fs-16 fw-medium"><Link to={routes.flightGrid}>Emirates</Link></h6>
                        <p className="fs-14">129 Flights</p>
                    </div>
                </div>
            </div>
            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                    <Link to={routes.flightGrid} className="avatar avatar-lg">
                        <ImageWithBasePath src="assets/img/flight/flight-company-04.svg" className="rounded-circle" alt="img" />
                    </Link>
                    <div className="ms-2">
                        <h6 className="fs-16 fw-medium"><Link to={routes.flightGrid}>Air France</Link></h6>
                        <p className="fs-14">600 Flights</p>
                    </div>
                </div>
            </div>
            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                    <Link to={routes.flightGrid} className="avatar avatar-lg">
                        <ImageWithBasePath src="assets/img/flight/flight-company-05.svg" className="rounded-circle" alt="img" />
                    </Link>
                    <div className="ms-2">
                        <h6 className="fs-16 fw-medium"><Link to={routes.flightGrid}>Qatar Airways</Link></h6>
                        <p className="fs-14">200 Flights</p>
                    </div>
                </div>
            </div>
            <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6">
                <div className="d-flex align-items-center hotel-type-item mb-3">
                    <Link to={routes.flightGrid} className="avatar avatar-lg">
                        <ImageWithBasePath src="assets/img/flight/flight-company-06.svg" className="rounded-circle" alt="img" />
                    </Link>
                    <div className="ms-2">
                        <h6 className="fs-16 fw-medium"><Link to={routes.flightGrid}>Air India</Link></h6>
                        <p className="fs-14">180 Flights</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* /Flight Types */}
    </>
  )
}

export default FlightSearch