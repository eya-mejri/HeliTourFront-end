import React, { useEffect, useState } from 'react';
import { all_routes } from '../../../router/all_routes';
import Breadcrumb from '../../../../core/common/Breadcrumb/breadcrumb';
import Sidebar from '../../../../core/common/sidebar/sidebar';
import Table from "../../../../core/common/dataTable/index";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { ColumnsType } from 'antd/es/table';

interface SimplifiedReservation {
  key: string;
  numReservation: string;
  circuitName: string;
  nbr_place: string;
  voyageurEmails: string;
  reservationDate: string;
  volDate: string;
  status: string;
  totalPrice: string;
  paymentStatus: string;
}

const UserFlightBooking = () => {
  const routes = all_routes;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<SimplifiedReservation[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<SimplifiedReservation[]>([]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        setLoading(true);
        // Parse user data from localStorage
      const storedUser = localStorage.getItem("userData");
      if (!storedUser) {
        console.error("No user data found in localStorage.");
        return;
      }

      const user = JSON.parse(storedUser);
      const userEmail = user.Email;
        const response = await axios.get(
          `http://127.0.0.1:3000/reservation/getReservationsWithDetailsByVoyageurEmail/${userEmail}`
        );
        const transformedData = transformBookingData(response.data);
        setBookings(transformedData);
        setFilteredBookings(transformedData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, []);

  const transformBookingData = (data: any[]): SimplifiedReservation[] => {
    return data.map((booking) => ({
      key: booking.reservationId,
      numReservation: booking.Num_Reservation,
      circuitName: booking.circuitName,
      nbr_place: `${booking.nbr_place} place${booking.nbr_place > 1 ? 's' : ''}`,
      voyageurEmails: booking.voyageurEmails?.join(', ') ?? '',
      reservationDate: new Date(booking.Date_Reservation).toLocaleDateString(),
      volDate: new Date(booking.volDate).toLocaleDateString(),
      status: booking.Status,
      totalPrice: `${booking.totalPrice} TND`,
      paymentStatus: booking.paiementStatus || "N/A"
    }));
  };


  const columns: ColumnsType<SimplifiedReservation> = [
    {
      title: "Reservation ID",
      dataIndex: "numReservation",
      key: "numReservation",
      render: (text: string, record: SimplifiedReservation) => (
        <Link 
          to={`/cruise/cruise-booking-confirmation/${record.key}`}
          className="link-primary fw-medium"
        >
          {text}
        </Link>
      )
    },
    {
      title: "Tour Name",
      dataIndex: "circuitName",
      key: "circuitName",
    },
    {
      title: "Places",
      dataIndex: "nbr_place",
      key: "nbr_place",
    },
    /*{
      title: "Voyageurs",
      dataIndex: "voyageurEmails",
      key: "voyageurEmails",
      render: (emails: string) => (
        <span className="text-truncate" style={{ maxWidth: '150px' }} title={emails}>
          {emails}
        </span>
      ),
    },*/
    {
      title: "Reservation Date",
      dataIndex: "reservationDate",
      key: "reservationDate",
    },
    {
      title: "Flight Date",
      dataIndex: "volDate",
      key: "volDate",
    },
   {
  title: "Status",
  dataIndex: "status",
  key: "status",
  render: (text: string) => {
    // Normalize the text to match the mapping
    const normalizedText = text.replace(/\s/g, "_").toLowerCase();

    const statusMap: Record<string, string> = {
      confirmé: "Confirmed",
      annulé: "Cancelled",
      en_attente: "Pending",
    };

    const statusClass =
      normalizedText === "confirmé"
        ? "bg-success"
        : normalizedText === "annulé"
        ? "bg-danger"
        : "bg-warning";

    return (
      <span className={`badge rounded-pill ${statusClass}`}>
        {statusMap[normalizedText] || text}
      </span>
    );
  },
}
,
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    }
  ];

  return (
    <div>
      <Breadcrumb
        title="My Bookings"
        breadcrumbs={[
          { label: 'My Bookings', link: routes.home1, active: false },
          { label: 'My Bookings', active: true },
          { label: 'Flights', active: true }
        ]}
        backgroundClass="breadcrumb-bg-04"
        backgroundImage="http://localhost:3000/assets/img/bgTourList.webp"
      />
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3">
              <Sidebar />
            </div>
            <div className="col-xl-9 col-lg-9 theiaStickySidebar">
              <div className="card booking-header">
                <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap">
                  <div>
                    <h6>Flights</h6>
                    <p className="fs-14 text-gray-6 fw-normal">No of Bookings: {bookings.length}</p>
                  </div>
                </div>
              </div>
              <div className="card hotel-list">
                <div className="card-body p-0">
                  {loading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : filteredBookings.length > 0 ? (
                    <Table
                      dataSource={filteredBookings}
                      columns={columns}
                      Selection={false}
                    />
                  ) : (
                    <div className="text-center py-5">
                      <p>No flight bookings found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFlightBooking;