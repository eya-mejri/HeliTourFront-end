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
import { AnalyticsConversionRates } from '../../Components/Curve/analyst';
import { Grid } from '@mui/material';
  


const AgentDashboard = () => {

  const routes = all_routes;
  //def of the variables
  const [confirmedBookingCount, setConfirmedBookingCount] = useState<number>(0);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [profilCount, setProfilCount] = useState<number>(0);
  const [villeBookings, setVilleBookings] = useState<{ name: string; count: number ; color: string}[]>([]);
  const [numberVille, setNumberVille] = useState<number>(0);
  const [circuitCount, setCircuitCount] = useState<number>(0);
  const [reservationCount, setReservationCount] = useState<number>(0);
  const [dataReserv, setDataReserv] = useState<any>([]);
  const [appareilCount, setAppareilCount] = useState<number>(0);
  const [volCount, setVolCount] = useState<number>(0);
  const [per, setPer] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [pendingBookingCount, setPendingBookingCount] = useState<number>(0);
  const [perPending, setPerPending] = useState<number>(0);
  const [statusPending, setStatusPending] = useState<string>("");
  const [annuleBookingCount, setAnnuleBookingCount] = useState<number>(0);
  const [perAnnule, setPerAnnule] = useState<number>(0);
  const [statusAnnule, setStatusAnnule] = useState<string>("stable");
  // Current month's total amount
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  
  // Percentage change from last month
  const [percentageChange, setPercentageChange] = useState<string>('0');




  
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
   /*useEffect(() => {
    const fetchConfirmedBookingCount = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/reservation/getRecent/confirmé');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setConfirmedBookingCount(data.length); // Set the count of bookings
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchConfirmedBookingCount();
  }, []); 
  //get the percentage 
  useEffect(() => {
    const fetchPerCount = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/reservation/bookingTrend30Days/confirmé`);
        if (!response.ok) {
          throw new Error('Failed to fetch percentage');
        }
        const data = await response.json();
        setPer(data.percentageChange);
        setStatus(data.trend);
      } catch (error) {
        console.error('Error fetching per:', error);
      }
    };

    fetchPerCount();
  }, []); 

    // Fetch the number of bookings from the backend
    useEffect(() => {
      const fetchPendingBookingCount = async () => {
        try {
          const response = await fetch('http://127.0.0.1:3000/reservation/getRecent/en attente');
          if (!response.ok) {
            throw new Error('Failed to fetch bookings');
          }
          const data = await response.json();
          setPendingBookingCount(data.length); // Set the count of bookings
        } catch (error) {
          console.error('Error fetching bookings:', error);
        }
      };
  
      fetchPendingBookingCount();
    }, []); 


    //get the percentage 
  useEffect(() => {
    const fetchPercentagePendingCount = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/reservation/bookingTrend30Days/${"en attente"}`);
        if (!response.ok) {
          throw new Error('Failed to fetch percentage');
        }
        const data = await response.json();
        setPerPending(data.percentageChange);
        setStatusPending(data.trend);
      } catch (error) {
        console.error('Error fetching per:', error);
      }
    };

    fetchPercentagePendingCount();
  }, []); 
 // Fetch the number of bookings from the backend
 useEffect(() => {
  const fetchAnnuleBookingCount = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/reservation/getRecent/annulé');
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setAnnuleBookingCount(data.length); // Set the count of bookings
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  fetchAnnuleBookingCount();
}, []); */

useEffect(() => {
  const fetchBookingAnalytics = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/reservation/bookingAnalytics30Days');
      if (!response.ok) {
        throw new Error('Failed to fetch booking analytics');
      }
      const data = await response.json();

      // Set all states from single response
      setConfirmedBookingCount(data.analytics.confirmé?.currentPeriodCount || 0);
      setPer(data.analytics.confirmé?.percentageChange || "0.00");
      setStatus(data.analytics.confirmé?.trend || "stable");

      setPendingBookingCount(data.analytics["en attente"]?.currentPeriodCount || 0);
      setPerPending(data.analytics["en attente"]?.percentageChange || "0.00");
      setStatusPending(data.analytics["en attente"]?.trend || "stable");

      setAnnuleBookingCount(data.analytics.annulé?.currentPeriodCount || 0);
      setPerAnnule(data.analytics.annulé?.percentageChange || "0.00");
      setStatusAnnule(data.analytics.annulé?.trend || "stable");

 
    } catch (error) {
      console.error('Error fetching booking analytics:', error);
    }
  };

  fetchBookingAnalytics();
}, []);


  //get vol 
  useEffect(() => {
    const fetchVolCount = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/vol/getall');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setVolCount(data.length); // Set the count of bookings
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchVolCount();
  }, []); 


  //appareil num 
  useEffect(() => {
    const fetchAppareilCount = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/appareil/getall');
        if (!response.ok) {
          throw new Error('Failed to fetch appareils');
        }
        const data = await response.json();
        setAppareilCount(data.length); // Set the count of bookings
      } catch (error) {
        console.error('Error fetching appareils:', error);
      }
    };

    fetchAppareilCount();
  }, []); 


  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/paiements/getPaymentSummary');
        
        if (!response.ok) throw new Error('Failed to fetch payment data');
        
        const data = await response.json();
        
        setCurrentAmount(data.currentMonthAmount);
        setPercentageChange(data.percentageChange);

      } catch (error) {
        console.error('Payment fetch error:', error);
      } 
    };

    fetchPaymentData();
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
                <AdminCard value={confirmedBookingCount} title="Total Confirmed Bookings" class="isax-calendar-15" class2="bg-success" per={per} status={status}/>
                <AdminCard value={pendingBookingCount} title="Total Pending Bookings" class="isax-money-time5" class2="bg-orange" per={perPending} status={statusPending}/>
                <AdminCard value={annuleBookingCount} title="Total cancelled Bookings" class="isax-magic-star5" class2="bg-indigo" per={perAnnule} status={statusAnnule}/>
                <AdminCard value={currentAmount} title="Total Earnings" class="isax-money-time5" class2="bg-info" per={percentageChange} status=""/>
              </div>
              <div className="row">
                {/* Bookings Statistics */}
                <div className="col-xl-4 d-flex">
                  <BookingStat/>
                </div>
                {/* /Bookings Statistics */}
                {/* Earnings */}
                <div className="col-xl-8 d-flex">
                  <EarningCard/>
                </div>
                {/* /Earnings */}
              </div>
              <div className="row">
                {/* Recently Added */}
                <div className='col-xl-12 col-xxl-12 d-flex'>
                  <div className=" card shadow-none flex-fill">
                    <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                      <AnalyticsConversionRates
                        title="Conversion rates"
                        subheader="(+43%) than last year"
                        chart={{
                          categories: ['Italy', 'Japan', 'China', 'Canada', 'France'],
                          series: [
                            { name: '2022', data: [44, 55, 41, 64, 22] },
                            { name: '2023', data: [53, 32, 33, 52, 13] },
                          ],
                        }}
                      />
                    </Grid>

                  </div>
                </div>
                {/* /Recently Added */}
                {/* Recent Invoices */}
                {/* /Recent Invoices */}
              </div>
              {/* Add Lists */}
              <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 justify-content-center">
                <AddCard title="Villes" number={`${numberVille} Villes`} class="bg-success-100" lien="routes.addHotel"/>
                <AddCard title="Circuits" number={`${circuitCount} Circuits`}  class="bg-pink-100" lien="routes.addFlight"/>
                <AddCard title="Reserv" number={`${reservationCount} Reservations`} class="bg-danger-100" lien="routes.addTour"/>
                <AddCard title="Appareil" number={`${appareilCount} Appareils`} class="bg-purple-100" lien ="/appareil/AddAppareil"/>
                <AddCard title="Vol" number={`${volCount} Vols `} class="bg-cyan-100" lien="/vol/AddVol"/>
                
              </div>
              {/* /Add Lists */}
              {/* Hotel-Booking List */}
              <div className="card hotel-list mb-0">
                <div className="card-body p-0">
                  <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                    <h6 className="">Bookings</h6>
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
