import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import AgentHotelBookingModal from "../agent-dashboard/Booking/hotel-booking/agentHotelBookingModal";
import Sidebar from "../agent-dashboard/sidebar/sidebar";
import { all_routes } from "../router/all_routes";
import Breadcrumb from '../../core/common/Breadcrumb/breadcrumb';
import PredefinedDateRanges from "../../core/common/range-picker/datePicker";
interface AgentBookingPageProps {
   
  }
  
interface Reservation {
    _id: string; // reservationId is mapped from _id
    Num_Reservation: string;
    reservationDate: string;
    circuitName: string;
    numberOfVoyageurs: number;
    reservationStatus: string;
    paiement: Array<Array<{
      _id: string;
      reservation_id: string;
      montant: number;
      devise: string;
      statut: string;
      date_paiement: string;
      __v: number;
    }>>;
  }
  
  interface TableData {
    key: string;
    reservationId: string;
    numReservation: string;
    circuitName: string;
    numberOfVoyageurs: string;
    reservationDate: string;
    reservationStatus: string;
    pricing: string;
    paymentStatus: string;
  }
const BookingTableByVille: React.FC<AgentBookingPageProps> = ()=>{
    const [reservations, setReservations] = useState<Reservation[]>([]); // State to store fetched data
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading state
  const { cityName } = useParams();


  const routes = all_routes;
      //Breadcrumb Data
      const breadcrumbs = [
          {
              label: 'Hotel Bookings',
              active: false,
              link: routes.home1
          },
          {
              label: 'Hotel Bookings',
              active: true,
          },
      ];
  // Fetch data from the API
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3000/reservation/getReservationsByVille/${cityName}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }
        const data = await response.json(); // Log the API response
        setReservations(data);
        
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchReservations();
  }, [cityName]);
  

  // Transform the fetched data to match the table's expected structure
  const transformedData: TableData[] = reservations.map((reservation) => {
    // Extract payment details (if available)
    const payment = reservation.paiement?.[0]?.[0]; // Get the first payment record
    const paymentAmount = payment?.montant || 0; // Default to 0 if no payment
    const paymentCurrency = payment?.devise || "N/A"; // Default to "N/A" if no payment
    const paymentStatus = payment?.statut || "N/A"; // Default to "N/A" if no payment
  
    return {
      key: reservation._id, // Use _id as the key
      numReservation: reservation.Num_Reservation,
      reservationId: reservation._id, // Use _id as reservationId
      circuitName: reservation.circuitName,
      numberOfVoyageurs: `${reservation.numberOfVoyageurs} Voyageurs`, // Format numberOfVoyageurs
      reservationDate: new Date(reservation.reservationDate).toLocaleDateString(), // Format reservationDate
      reservationStatus: reservation.reservationStatus,
      pricing: `${paymentAmount} ${paymentCurrency}`, // Format pricing
      paymentStatus: paymentStatus, // Include payment status
    };
  });

  // Define the columns for the table
  const columns: ColumnsType<TableData> = [
    {
      title: "ID",
      dataIndex: "numReservation",
      key: "numReservation",
      render: (text: string) => (
        <Link
          to="#"
          className="link-primary fw-medium"
          data-bs-toggle="modal"
          data-bs-target={`#${text}`}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Circuit Name",
      dataIndex: "circuitName",
      key: "circuitName",
    },
    {
      title: "Number of Voyageurs",
      dataIndex: "numberOfVoyageurs",
      key: "numberOfVoyageurs",
    },
    {
      title: "Reservation Date",
      dataIndex: "reservationDate",
      key: "reservationDate",
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (text: string) => (
        <span
          className={`badge rounded-pill d-inline-flex align-items-center fs-10 ${
            text === "réussi"
              ? "badge-success"
              : text === "en_attente"
              ? "badge-warning"
              : text === "échoué"
              ? "badge-danger"
              : ""
          }`}
        >
          <i className="fa-solid fa-circle fs-5 me-1" />
          {text}
        </span>
      ),
    },
    {
      title: "Pricing",
      dataIndex: "pricing",
      key: "pricing",
    },
  ];
  
    return(
        <>
        <div>
            <Breadcrumb title="Hotel Bookings" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />

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
                            {/* Booking Header */}
                            <div className="card booking-header border-0">
                                <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap ">
                                    <div>
                                        <h6 className="mb-1">Hotel Bookings</h6>
                                        <p className="fs-14 text-gray-6 fw-normal ">
                                            No of Booking : 150
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap">
                                        <div className="input-icon-start position-relative">
                                            <span className="icon-addon">
                                                <i className="isax isax-calendar-edit fs-14" />
                                            </span>
                                            <PredefinedDateRanges />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* /Booking Header */}
                            {/* Hotel-Booking List */}
                            <div className="card hotel-list">
                                <div className="card-body p-0">
                                    <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                                        <h6 className="">Booking List</h6>
                                        <div className="d-flex align-items-center flex-wrap">
                                            <div className="input-icon-start  me-2 position-relative">
                                                <span className="icon-addon">
                                                    <i className="isax isax-search-normal-1 fs-14" />
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search"
                                                />
                                            </div>
                                            <div className="dropdown me-3">
                                                <Link
                                                    to="#"
                                                    className="dropdown-toggle text-gray-6 btn  rounded border d-inline-flex align-items-center"
                                                    data-bs-toggle="dropdown"
                                                    
                                                >
                                                    Room Type
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
                                            <div className="dropdown me-3">
                                                <Link
                                                    to="#"
                                                    className="dropdown-toggle text-gray-6 btn  rounded border d-inline-flex align-items-center"
                                                    data-bs-toggle="dropdown"
                                                    
                                                >
                                                    Status
                                                </Link>
                                                <ul className="dropdown-menu dropdown-menu-end p-3">
                                                    <li>
                                                        <Link
                                                            to="#"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            Upcoming
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            to="#"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            Cancelled
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            to="#"
                                                            className="dropdown-item rounded-1"
                                                        >
                                                            Completed
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="d-flex align-items-center sort-by">
                                                <span className="fs-14 text-gray-9 fw-medium">
                                                    Sort By :
                                                </span>
                                                <div className="dropdown">
                                                    <Link
                                                        to="#"
                                                        className="dropdown-toggle text-gray-6 btn rounded d-inline-flex align-items-center"
                                                        data-bs-toggle="dropdown"
                                                        
                                                    >
                                                        Recommended
                                                    </Link>
                                                    <ul className="dropdown-menu dropdown-menu-end p-3">
                                                        <li>
                                                            <Link
                                                                to="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                Recently Added
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                to="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                Ascending
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                to="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                Desending
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                to="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                Last Month
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link
                                                                to="#"
                                                                className="dropdown-item rounded-1"
                                                            >
                                                                Last 7 Days
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Hotel List */}
                                    <Table
                    columns={columns}
                    dataSource={transformedData}
                    loading={loading}
                    pagination={{
                      pageSize:10 , // Show 5 items per page
                      showSizeChanger: true, // Allow changing page size
                      pageSizeOptions: ["5", "10", "20", "30"], // Options for page size
                    }}
                  />
        
                                    {/* /Hotel List */}
                                </div>
                            </div>
                            {/* /Hotel-Booking List */}
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}

            <AgentHotelBookingModal />

        </div>
       </>
    )
}
export default BookingTableByVille;