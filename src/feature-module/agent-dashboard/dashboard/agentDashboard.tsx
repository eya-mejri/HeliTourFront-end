import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import Sidebar from '../sidebar/sidebar'
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import { all_routes } from '../../router/all_routes';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import ReactApexChart from 'react-apexcharts';
/*import { TableData } from '../../../core/common/data/interface';*/
/*import Table from "../../../core/common/dataTable/index";*/
/*import { AgentDashboardData } from '../../../core/common/data/json/agentDashboardData';*/
import AgentDhashboardModal from './agentDhashboardModal';
import AdminCard from '../../Components/adminCard';
import EarningCard from '../../Components/EarningCard';
import AddCard from '../../Components/addCard';
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import BookingTable from '../../Components/BookingTable';
import BookingStat from '../../Components/BookingStat';
  


const AgentDashboard = () => {

  const routes = all_routes;
  //def of the variables
  const [bookingCount, setBookingCount] = useState<number>(0);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [profilCount, setProfilCount] = useState<number>(0);
  const [villeBookings, setVilleBookings] = useState<{ name: string; count: number ; color: string}[]>([]);
  const [numberVille, setNumberVille] = useState<number>(0);
  const [circuitCount, setCircuitCount] = useState<number>(0);
  const [reservationCount, setReservationCount] = useState<number>(0);
  const [dataReserv, setDataReserv] = useState<any>([]);
  
  
  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'Admin Dashboard',
      active: false,
      link: routes.home1,
    },
    {
      label: 'Admin Dashboard',
      active: true,
    },
  ];

  const [donutChart, setDonutChart] = useState<any>({
    series: [],
    options: {
      chart: {
        height: 181,
        type: 'donut',
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      colors: [],
      labels: [],
      plotOptions: {
        pie: {
          donut: {
            size: '65%', // Adjust the inner radius of the donut
          },
        },
      },
      stroke: {
        width: 3, // Adds space between segments
        colors: ['#fff'], // Color of the gap (white in this case)
      },
      dataLabels: {
        enabled: false, // Hides the data labels
      },
    },
  });
  const colorList = [
    '#212E47', // Teal
    '#3538CD', // Blue
    '#0E9384', // Green
    '#CF3425', // Red
    '#98AA30', // Yellow
    '#6C757D', // Gray
    '#FFC107', // Amber
    '#17A2B8', // Cyan
    '#6610F2', // Purple
    '#E83E8C', // Pink
  ];
  //douraaaa
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch the list of villes
        const villesResponse = await axios.get('http://127.0.0.1:3000/ville/getall');
        const villes = villesResponse.data;
        setNumberVille(villes.length);
        
  
        // Step 2: Fetch the count of reservations for each ville
        const series: number[] = []; // Create a new array for series
        const labels: string[] = []; // Create a new array for labels
        const colors: string[] = []; // Create a new array for colors
        const bookings = [];
  
        for (let i = 0; i < villes.length; i++) {
          const ville = villes[i];
          
          const reservationsResponse = await axios.get(
            `http://127.0.0.1:3000/reservation/getByVilleName/${ville.Nom}`
          );
          const count = reservationsResponse.data !== null ? reservationsResponse.data.length : 0;
          bookings.push({ name: ville.Nom, count, color: colorList[i] }); // Assign color from colorList
          setVilleBookings(bookings);
          
  
          // Check if reservationsResponse.data is not null
          if (reservationsResponse.data !== null) {
            series.push(reservationsResponse.data.length); // Add count to the series array
            labels.push(ville.Nom); // Add ville name to the labels array
            colors.push(colorList[i]); // Add color to the colors array
          }
        }
  
        // Step 3: Update the donutChart state immutably
        setDonutChart((prevState: any) => ({
          ...prevState,
          series, // Use the new series array
          options: {
            ...prevState.options,
            labels, // Use ville names as labels
            colors, // Use the colors array
          },
        }));
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/reservation/getReservationsWithDetails');
        if (!response.ok) {
          throw new Error('Failed to fetch Reservations');
        }
        const data = await response.json();
        
        /*console.log('API Data:', data); // Log the API response*/
      setDataReserv(data); // Update state
      /*console.log('State update called with:', data)*/
      } catch (error) {
        console.error('Error fetching reservation:', error);
      }
    };

    fetchReservationDetails(); // Call the function inside useEffect
  }, []); 
  useEffect(() => {
    /*console.log('Updated dataReserv:', dataReserv);*/
  }, [dataReserv]);

  
  /*const data = AgentDashboardData;
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: any, render: any) => (
        <Link
          to="#"
          className="link-primary fw-medium"
          data-bs-toggle="modal"
          data-bs-target={`#${render.id}`}
        >
          {render.id}
        </Link>

      ),
      sorter: (a: TableData, b: TableData) => a.id.length - b.id.length,
    },
    {
      title: "Hotel",
      dataIndex: "hotel",
      key: "hotel",
      render: (text: any, render: any) => (
        <div className="d-flex align-items-center">
          <Link to={routes.hotelDetails} className="avatar avatar-lg">
            <ImageWithBasePath
              src={render.hotelImage}
              className="img-fluid rounded-circle"
              alt="img"
            />
          </Link>
          <div className="ms-2">
            <p className="text-dark mb-0 fw-medium fs-14">
              <Link to={routes.hotelDetails}>{render.hotelName}</Link>
            </p>
            <span className="fs-14 fw-normal text-gray-6">{render.location}</span>
          </div>
        </div>
      ),
      sorter: (a: TableData, b: TableData) =>
        a.hotel.length - b.hotel.length,
    },
    {
      title: "Room & Guest",
      dataIndex: "room",
      key: "room",
      render: (text: any, render: any) => (
        <>
          <h6 className="fs-14 mb-1">{render.room}</h6>
          <span className="fs-14 fw-normal text-gray-6">{render.guest}</span>
        </>

      ),
      sorter: (a: TableData, b: TableData) => a.room.length - b.room.length,
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
      sorter: (a: TableData, b: TableData) => a.days.length - b.days.length,
    },
    {
      title: "Pricing",
      dataIndex: "pricing",
      key: "pricing",
      sorter: (a: TableData, b: TableData) => a.pricing.length - b.pricing.length,
    },
    {
      title: "Booked on",
      dataIndex: "bookedOn",
      key: "bookedOn",
      sorter: (a: TableData, b: TableData) => a.date.length - b.date.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: any, render: any) => (
        <span className={`badge rounded-pill d-inline-flex align-items-center fs-10 ${text === 'Upcoming' ? 'badge-info' : text === 'Pending' ? 'badge-secondary' : text === 'Cancelled' ? 'badge-danger' : text === 'Completed' ? 'badge-success' : ''}`}>
          <i className="fa-solid fa-circle fs-5 me-1" />
          {render.status}
        </span>

      ),
      sorter: (a: TableData, b: TableData) => a.status.length - b.status.length,
    },
    {
      title: "",
      dataIndex: "action",
      render: (text: any, render: any) => (
        <div className="d-flex align-items-center">
          <Link
            to="#"
            data-bs-toggle="modal"
            data-bs-target={`#${render.action}`}
          >
            <i className="isax isax-eye" />
          </Link>
        </div>
      ),
      sorter: (a: TableData, b: TableData) => a.action.length - b.action.length,
    },
  ];*/
   // Fetch the number of bookings from the backend
   useEffect(() => {
    const fetchBookingCount = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/reservation/getall');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookingCount(data.length); // Set the count of bookings
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookingCount();
  }, []); 
  // Empty dependency array ensures this runs only once on mount
//fetch  the total earning 
  useEffect(() => {
    const fetchTotalEarnings = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/paiements/getAllPaiements');
        if (!response.ok) {
          throw new Error('Failed to fetch earnings');
        }
        const data = await response.json();
        const total = data.reduce((sum: number, paiement: { montant: number }) => {
          return sum + paiement.montant;
        }, 0);

        // Set the total earnings in state
        setTotalEarnings(total);
      } catch (error) {
        console.error('Error fetching earnings :', error);
      }
    };

    fetchTotalEarnings();
  }, []); // Empty dependency array ensures this runs only once on mount
// Fetch the number of profiles from the backend
useEffect(() => {
  const fetchProfileCount = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/utilisateur/getallUsers');
      if (!response.ok) {
        throw new Error('Failed to fetch profils');
      }
      const data = await response.json();
      setProfilCount(data.length); // Set the count of cities
    } catch (error) {
      console.error('Error fetching profils:', error);
    }
  };

  fetchProfileCount();
}, []); 

useEffect(() => {
  const fetchCircuitCount = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/circuit/getall');
      if (!response.ok) {
        throw new Error('Failed to fetch circuit');
      }
      const data = await response.json();
      setCircuitCount(data.length); // Set the count of tours
    } catch (error) {
      console.error('Error fetching profils:', error);
    }
  };

  fetchCircuitCount();
}, []);
useEffect(() => {
  const fetchReservationCount = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/reservation/getall');
      if (!response.ok) {
        throw new Error('Failed to fetch Reservation ');
      }
      const data = await response.json();
      setReservationCount(data.length); // Set the count of bookings
    } catch (error) {
      console.error('Error fetching profils:', error);
    }
  };

  fetchReservationCount();
}, []);

useEffect(() => {
  const fetchReservationCount = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/reservation/getall');
      if (!response.ok) {
        throw new Error('Failed to fetch Reservation ');
      }
      const data = await response.json();
      setReservationCount(data.length); // Set the count of bookings
    } catch (error) {
      console.error('Error fetching profils:', error);
    }
  };

  fetchReservationCount();
}, []);


  return (
    <div>

      <Breadcrumb title="Admin Dashboard" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />

      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-4">
              <Sidebar />
            </div>
            {/* /Sidebar */}
            <div className="col-xl-9 col-lg-8">
              <div className="row">
                <AdminCard value={bookingCount} title="Total Bookings" class="isax-calendar-15" class2="bg-success"/>
                <AdminCard value='23' title="Total Listing" class="isax-money-time5" class2="bg-orange"/>
                <AdminCard value={totalEarnings} title="Total Earnings" class="isax-money-time5" class2="bg-info"/>
                <AdminCard value={profilCount} title="Total profils" class="isax-magic-star5" class2="bg-indigo"/>

                {/*<div className="col-xl-3 col-sm-6 d-flex">
                  <div className="card shadow-none flex-fill">
                    <div className="card-body text-center">
                      <span className="avatar avatar rounded-circle bg-success mb-2">
                        <i className="isax isax-calendar-15 fs-24" />
                      </span>
                      <p className="mb-1">Total Bookings</p>
                      <h5 className="mb-2">{bookingCount}</h5>
                      <p className="d-flex align-items-center justify-content-center fs-14">
                        <i className="isax isax-arrow-up-15 me-1 text-success" />
                        20% From Last Month{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 d-flex">
                  <div className="card shadow-none flex-fill">
                    <div className="card-body text-center">
                      <span className="avatar avatar rounded-circle bg-orange mb-2">
                        <i className="isax isax-money-time5 fs-24" />
                      </span>
                      <p className="mb-1">Total Listings</p>
                      <h5 className="mb-2">23</h5>
                      <Link
                        to={routes.agentListing}
                        className="fs-14 link-primary text-decoration-underline"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 d-flex">
                  <div className="card shadow-none flex-fill">
                    <div className="card-body text-center">
                      <span className="avatar avatar rounded-circle bg-info mb-2">
                        <i className="isax isax-money-send5 fs-24" />
                      </span>
                      <p className="mb-1">Total Earnings</p>
                      <h5 className="mb-2">{totalEarnings}</h5>
                      <p className="d-flex align-items-center justify-content-center fs-14">
                        <i className="isax isax-arrow-down5 me-1 text-danger" />
                        15% From Last Month{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 d-flex">
                  <div className="card shadow-none flex-fill">
                    <div className="card-body text-center">
                      <span className="avatar avatar rounded-circle bg-indigo mb-2">
                        <i className="isax isax-magic-star5 fs-24" />
                      </span>
                      <p className="mb-1">Total profils</p>
                      <h5 className="mb-2">{profilCount}</h5>
                      <Link
                        to={routes.agentReview}
                        className="fs-14 link-primary text-decoration-underline"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                </div>*/}
              </div>
              <div className="row">
                {/* Bookings Statistics */}
                <div className="col-xl-4 d-flex">
                 {/* <div className="card shadow-none flex-fill">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h6>Bookings Statistics</h6>
                        <div className="dropdown ">
                          <Link
                            to="#"
                            className="dropdown-toggle btn bg-light-200 btn-sm text-gray-6 rounded-pill fw-normal fs-14 d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-calendar-2 me-2 fs-14 text-gray-6" />
                            2025
                          </Link>
                          <ul className="dropdown-menu  dropdown-menu-end p-3">
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item rounded-1"
                              >
                                <i className="ti ti-point-filled me-1" />
                                2025
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item rounded-1"
                              >
                                <i className="ti ti-point-filled me-1" />
                                2024
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item rounded-1"
                              >
                                <i className="ti ti-point-filled me-1" />
                                2023
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="text-center mb-3">
                        <div id="booking-chart" >
                          <ReactApexChart
                            options={donutChart.options}
                            series={donutChart.series}
                            type="donut"
                            height={181}
                          />
                        </div>
                      </div>
                      <div>
                      {villeBookings.map((ville) => (
                        <div key={ville.name} className="d-flex align-items-center justify-content-between mb-2">
                          <h6 className={`border-icon  || 'primary'}`}  style={{ color: ville.color }}>{ville.name}</h6>
                          <p className="fs-14">
                            <span className="text-gray-9 fw-medium">{ville.count}</span> Bookings
                          </p>
                        </div>
                      ))}
                    </div>

                      {/*<div className="d-flex align-items-center justify-content-between mb-2">
                        <h6 className="border-icon teal">Hotels</h6>
                        <p className="fs-14">
                          <span className="text-gray-9 fw-medium">16</span> Bookings
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <h6 className="border-icon secondary">Flights</h6>
                        <p className="fs-14">
                          <span className="text-gray-9 fw-medium">12</span> Bookings
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <h6 className="border-icon purple">Cars</h6>
                        <p className="fs-14">
                          <span className="text-gray-9 fw-medium">14</span> Bookings
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <h6 className="border-icon dark">Cruise</h6>
                        <p className="fs-14">
                          <span className="text-gray-9 fw-medium">16</span> Bookings
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-0">
                        <h6 className="border-icon primary">Tour</h6>
                        <p className="fs-14">
                          <span className="text-gray-9 fw-medium">04</span> Bookings
                        </p>
                      </div>
                    </div>
                  </div>*/}
                  <BookingStat/>
                </div>
                {/* /Bookings Statistics */}
                {/* Earnings */}
                <div className="col-xl-8 d-flex">
                  {/*<div className="card shadow-none flex-fill">
                    <div className="card-body pb-0">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h6>Earnings</h6>
                        <div className="dropdown ">
                          <Link
                            to="#"
                            className="dropdown-toggle btn bg-light-200 btn-sm text-gray-6 rounded-pill fw-normal fs-14 d-inline-flex align-items-center"
                            data-bs-toggle="dropdown"
                          >
                            <i className="isax isax-calendar-2 me-2 fs-14 text-gray-6" />
                            2025
                          </Link>
                          <ul className="dropdown-menu  dropdown-menu-end p-3">
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item rounded-1"
                              >
                                <i className="ti ti-point-filled me-1" />
                                2025
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item rounded-1"
                              >
                                <i className="ti ti-point-filled me-1" />
                                2024
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="#"
                                className="dropdown-item rounded-1"
                              >
                                <i className="ti ti-point-filled me-1" />
                                2023
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="row">
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <div className="mb-2">
                            <p className="mb-0">Total Earnings this Year</p>
                            <h3>{totalEarnings}</h3>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <p className="fs-14">
                              <span className="badge badge-soft-success badge-md border border-success rounded-pill me-2">
                                <i className="isax isax-arrow-up-3 " />
                                12%
                              </span>
                              vs last years
                            </p>
                          </div>
                        </div>
                        <div id="earning-chart">
                          <ReactApexChart
                            options={earningChart.options}
                            series={earningChart.series}
                            type="bar"
                            height={280}
                          />
                        </div>
                      </div>
                    </div>
                  </div>*/}
                  <EarningCard/>
                </div>
                {/* /Earnings */}
              </div>
              <div className="row">
                {/* Recently Added */}
                <div className="col-xl-6 col-xxl-5 d-flex">
                  <div className="card shadow-none flex-fill">
                    <div className="card-body">
                      <h6 className="mb-4">Recently Added</h6>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                          <Link
                            to={routes.hotelDetails}
                            className="avatar avatar-lg flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/hotels/hotel-20.jpg"
                              className="img-fluid rounded-circle"
                              alt="Img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-16">
                              <Link to={routes.hotelDetails}>The Grand Horizon</Link>{" "}
                              <span className="badge badge-soft-info badge-xs rounded-pill">
                                <i className="isax isax-signpost me-1" />
                                Hotels
                              </span>
                            </h6>
                            <p className="fs-14">Last Booked : 25 Apr 2025</p>
                          </div>
                        </div>
                        <Link
                          to={routes.agentHotelBooking}
                          className="btn rebook-btn btn-sm"
                        >
                          06 Bookings
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                          <Link
                            to={routes.tourDetails}
                            className="avatar avatar-lg flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/tours/tours-28.jpg"
                              className="img-fluid rounded-circle"
                              alt="Img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-16">
                              <Link to={routes.tourDetails}>Dare DevCon</Link>{" "}
                              <span className="badge badge-soft-pink badge-xs rounded-pill">
                                <i className="isax isax-signpost me-1" />
                                Tour
                              </span>
                            </h6>
                            <p className="fs-14">Last Booked : 16 May 2025</p>
                          </div>
                        </div>
                        <Link
                          to={routes.agentTourBooking}
                          className="btn rebook-btn btn-sm"
                        >
                          12 Bookings
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                          <Link
                            to={routes.flightDetails}
                            className="avatar avatar-lg flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/flight/flight-05.jpg"
                              className="img-fluid rounded-circle"
                              alt="Img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-16">
                              <Link to={routes.flightDetails}>Altair 333</Link>{" "}
                              <span className="badge badge-soft-teal badge-xs rounded-pill">
                                <i className="isax isax-signpost me-1" />
                                Flight
                              </span>
                            </h6>
                            <p className="fs-14">Last Booked : 25 May 2025</p>
                          </div>
                        </div>
                        <Link
                          to={routes.agentFlightBooking}
                          className="btn rebook-btn btn-sm"
                        >
                          14 Bookings
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                          <Link
                            to={routes.cruiseDetails}
                            className="avatar avatar-lg flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/cruise/cruise-28.jpg"
                              className="img-fluid rounded-circle"
                              alt="Img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-16">
                              <Link to={routes.cruiseDetails}>Oceania Cruises</Link>{" "}
                              <span className="badge badge-soft-cyan badge-xs rounded-pill">
                                <i className="isax isax-signpost me-1" />
                                Cruise
                              </span>
                            </h6>
                            <p className="fs-14">Last Booked : 18 Jun 2025</p>
                          </div>
                        </div>
                        <Link
                          to={routes.agentCruiseBooking}
                          className="btn rebook-btn btn-sm"
                        >
                          22 Bookings
                        </Link>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Link
                            to={routes.tourDetails}
                            className="avatar avatar-lg flex-shrink-0 me-2"
                          >
                            <ImageWithBasePath
                              src="assets/img/tours/tours-26.jpg"
                              className="img-fluid rounded-circle"
                              alt="Img"
                            />
                          </Link>
                          <div>
                            <h6 className="fs-16">
                              <Link to={routes.tourDetails}>Fitness Frenzy</Link>{" "}
                              <span className="badge badge-soft-pink badge-xs rounded-pill">
                                <i className="isax isax-signpost me-1" />
                                Tour
                              </span>
                            </h6>
                            <p className="fs-14">Last Booked : 25 May 2025</p>
                          </div>
                        </div>
                        <Link
                          to={routes.agentTourBooking}
                          className="btn rebook-btn btn-sm"
                        >
                          40 Bookings
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Recently Added */}
                {/* Recent Invoices */}
                <div className="col-xxl-7 col-xl-6 d-flex">
                  <div className="card shadow-none flex-fill">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-4 gap-2">
                        <h6>Latest Invoices</h6>
                      </div>
                      <div className="card shadow-none mb-4">
                        <div className="card-body p-2">
                          <div className="d-flex justify-content-between align-items-center flex-fill">
                            <div>
                              <div className="d-flex align-items-center flex-wrap mb-1">
                                <Link
                                  to={routes.invoices}
                                  className="fs-14 link-primary border-end pe-2 me-2 mb-0"
                                >
                                  #INV12565
                                </Link>
                                <p className="fs-14">Date: 15 May 2024</p>
                              </div>
                              <h6 className="fs-16 fw-medium">
                                <Link to={routes.flightDetails}>Cloudrider 789</Link>
                              </h6>
                            </div>
                            <div className="text-end">
                              <p className="fs-14 mb-1">Amount</p>
                              <h6 className="fw-medium">$569</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card shadow-none mb-4">
                        <div className="card-body p-2">
                          <div className="d-flex justify-content-between align-items-center flex-fill">
                            <div>
                              <div className="d-flex align-items-center flex-wrap mb-1">
                                <Link
                                  to={routes.invoices}
                                  className="fs-14 link-primary border-end pe-2 me-2 mb-0"
                                >
                                  #INV12564
                                </Link>
                                <p className="fs-14">Date: 13 May 2024</p>
                              </div>
                              <h6 className="fs-16 fw-medium">
                                <Link to={routes.hotelDetails}>The Luxe Haven</Link>
                              </h6>
                            </div>
                            <div className="text-end">
                              <p className="fs-14 mb-1">Amount</p>
                              <h6 className="fw-medium">$430</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card shadow-none mb-4">
                        <div className="card-body p-2">
                          <div className="d-flex justify-content-between align-items-center flex-fill">
                            <div>
                              <div className="d-flex align-items-center flex-wrap mb-1">
                                <Link
                                  to={routes.invoices}
                                  className="fs-14 link-primary border-end pe-2 me-2 mb-0"
                                >
                                  #INV12563
                                </Link>
                                <p className="fs-14">Date: 10 May 2024</p>
                              </div>
                              <h6 className="fs-16 fw-medium">
                                <Link to={routes.carDetails}>Ford Mustang 4.0 AT</Link>
                              </h6>
                            </div>
                            <div className="text-end">
                              <p className="fs-14 mb-1">Amount</p>
                              <h6 className="fw-medium">$380</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card shadow-none mb-0">
                        <div className="card-body p-2">
                          <div className="d-flex justify-content-between align-items-center flex-fill">
                            <div>
                              <h6 className="fs-16 fw-medium mb-1">
                                <Link to={routes.cruiseDetails}>Super Aquamarine</Link>
                              </h6>
                              <div className="d-flex align-items-center flex-wrap">
                                <Link
                                  to={routes.invoices}
                                  className="fs-14 link-primary border-end pe-2 me-2 mb-0"
                                >
                                  #INV12562
                                </Link>
                                <p className="fs-14">Date: 04 May 2024</p>
                              </div>
                            </div>
                            <div className="text-end">
                              <p className="fs-14 mb-1">Amount</p>
                              <h6 className="fw-medium">$475</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Recent Invoices */}
              </div>
              {/* Add Lists */}
              <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 justify-content-center">
                <AddCard title="Villes" number={`${numberVille} Villes`} class="bg-success-100" lien="routes.addHotel"/>
                <AddCard title="Circuits" number={`${circuitCount} Circuits`}  class="bg-pink-100" lien="routes.addFlight"/>
                <AddCard title="Reserv" number={`${reservationCount} Reservations`} class="bg-danger-100" lien="routes.addTour"/>
                <AddCard title="Car" number="9 Cars" class="bg-purple-100" lien="routes.addCar"/>
                {/*<div className="col">
                  <div className="card bg-success-100 border-0 shadow-none">
                    <div className="card-body">
                      <h6 className="mb-1">4 Hotels</h6>
                      <Link
                        to={routes.addHotel}
                        className="fs-14 fw-medium link-default text-decoration-underline"
                      >
                        Add New Hotels
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card bg-pink-100 border-0 shadow-none">
                    <div className="card-body">
                      <h6 className="mb-1">4 Flights</h6>
                      <Link
                        to={routes.addFlight}
                        className="fs-14 fw-medium link-primary text-decoration-underline"
                      >
                        Add New Flight
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card bg-danger-100 border-0 shadow-none">
                    <div className="card-body">
                      <h6 className="mb-1">5 Tours</h6>
                      <Link
                        to={routes.addTour}
                        className="fs-14 fw-medium link-default text-decoration-underline"
                      >
                        Add New Tour
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card bg-purple-100 border-0 shadow-none">
                    <div className="card-body">
                      <h6 className="mb-1">9 Cars</h6>
                      <Link
                        to={routes.addCar}
                        className="fs-14 fw-medium link-default text-decoration-underline"
                      >
                        Add New Car
                      </Link>
                    </div>
                  </div>
                </div>*/}
                <div className="col">
                  <div className="card bg-cyan-100 border-0 shadow-none">
                    <div className="card-body">
                      <h6 className="mb-1">8 Cruise</h6>
                      <Link
                        to={routes.addCruise}
                        className="fs-14 fw-medium link-default text-decoration-underline"
                      >
                        Add New Cruise
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Add Lists */}
              {/* Hotel-Booking List */}
              <div className="card hotel-list mb-0">
                <div className="card-body p-0">
                  <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                    <h6 className="">Recent Bookings</h6>
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="dropdown me-3">
                        <Link
                          to="#"
                          className="dropdown-toggle text-gray-6 btn  rounded border d-inline-flex align-items-center"
                          data-bs-toggle="dropdown"
                          
                        >
                          Hotels
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item rounded-1"
                            >
                              Single Room
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item rounded-1"
                            >
                              Double Room
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="dropdown-item rounded-1"
                            >
                              Twin Room
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="input-icon-start position-relative">
                        <span className="icon-addon">
                          <i className="isax isax-search-normal-1 fs-14" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Hotel List */}
                  {/*<Table dataSource={data} columns={columns} Selection={false} />*/}
                  <BookingTable numPage="5"/>
                  {/* /Hotel List */}
                </div>
              </div>
              {/* /Hotel-Booking List */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}
      <AgentDhashboardModal />

    </div>
  )
}

export default AgentDashboard
