import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AgentHotelBookingModal from "../agent-dashboard/Booking/hotel-booking/agentHotelBookingModal";
import Sidebar from "../agent-dashboard/sidebar/sidebar";
import { all_routes } from "../router/all_routes";
import Breadcrumb from '../../core/common/Breadcrumb/breadcrumb';

import axios from 'axios';
import moment from 'moment';
import PredefinedDateRangesBefore from "./PredefinedDateRangesBefore";
import { Modal, Select } from "antd";

interface AgentBookingPageProps {}

interface Reservation {
  reservationId: string;
  Num_Reservation: string;
  Date_Reservation: string;
  volDate: string;
  nbr_place: number;
  Status: string;
  circuitName: string;
  villeName: string;
  voyageurEmails: string[];
  totalPrice: number;
  paiementStatus?: string;
}

interface TableData {
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

const BookingTableByVille: React.FC<AgentBookingPageProps> = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRange, setSelectedRange] = useState<{ 
    startDate: moment.Moment | null, 
    endDate: moment.Moment | null 
  }>({ 
    startDate: null, 
    endDate: null 
  });
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchEmail, setSearchEmail] = useState<string>("");
  const { cityName } = useParams();
  const [selectedReservation, setSelectedReservation] = useState<TableData | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const routes = all_routes;
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

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        let url = `http://127.0.0.1:3000/reservation/getReservationsByVille/${cityName}`;
        const params: any = {};
        
        if (selectedRange.startDate && selectedRange.endDate) {
          params.startDate = selectedRange.startDate.toISOString();
          params.endDate = selectedRange.endDate.toISOString();
        }
        
        if (statusFilter) {
          params.status = statusFilter;
        }
        
        if (searchEmail) {
          params.searchEmail = searchEmail;
        }
        console.log(searchEmail)
        
        const response = await axios.get(url, { params });
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [cityName, selectedRange, statusFilter, searchEmail]);

  const handleDateChange = (start: moment.Moment, end: moment.Moment) => {
    setSelectedRange({ startDate: start, endDate: end });
  };

  const handleStatusChange = (status: string | null) => {
    setStatusFilter(status);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEmail(e.target.value);
  };

  const transformedData: TableData[] = reservations.map((reservation) => {
    // Handle null/undefined values safely
    const totalPrice = reservation.totalPrice ?? 0; // Default to 0 if null/undefined
    const voyageurEmails = reservation.voyageurEmails ?? []; // Default to empty array
    const status = reservation.Status ?? 'N/A'; // Default status
    const nbr_place = reservation.nbr_place ?? 0; // Default to 0 if null/undefined
  
    return {
      key: reservation.reservationId,
      numReservation: reservation.Num_Reservation,
      circuitName: reservation.circuitName,
      nbr_place: `${nbr_place} place${nbr_place !== 1 ? 's' : ''}`,
      voyageurEmails: voyageurEmails.join(', '),
      reservationDate: new Date(reservation.Date_Reservation).toLocaleDateString(),
      volDate: new Date(reservation.volDate).toLocaleDateString(),
      status: status,
      totalPrice: `${totalPrice.toFixed(2)} TND`, // Now safe to call toFixed()
      paymentStatus: reservation.paiementStatus || "N/A"
    };
  });

  const columns: ColumnsType<TableData> = [
    {
      title: "Reservation ID",
      dataIndex: "numReservation",
      key: "numReservation",
      render: (text: string, record: TableData) => (
        <Link
          to="#"
          className="link-primary fw-medium"
          onClick={() => {
            setSelectedReservation(record);
            setNewStatus(record.status);
            setModalVisible(true);
          }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Tour Name",
      dataIndex: "circuitName",
      key: "circuitName",
    },
    {
      title: "Number of Places",
      dataIndex: "nbr_place",
      key: "nbr_place",
    },
    {
      title: "Passengers",
      dataIndex: "voyageurEmails",
      key: "voyageurEmails",
      render: (emails: string) => (
        <span className="text-truncate d-inline-block" style={{ maxWidth: '200px' }} title={emails}>
          {emails}
        </span>
      ),
    },
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
      render: (text: string) => (
       <span
  className={`badge rounded-pill d-inline-flex align-items-center fs-10 ${
    text === "confirmé"
      ? "badge-success"
      : text === "annulé"
      ? "badge-danger"
      : "badge-warning"
  }`}
>
  <i className="fa-solid fa-circle fs-5 me-1" />
  {text === "confirmé"
    ? "Confirmed"
    : text === "annulé"
    ? "Cancelled"
    : "Pending"}
</span>

      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
  ];

  return (
    <>
      <div>
        <Breadcrumb title="Bookings" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />

        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-4">
                <Sidebar />
              </div>
              <div className="col-xl-9 col-lg-8">
                <div className="card booking-header border-0">
                  <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap">
                    <div>
                      <h6 className="mb-1">City Bookings - {cityName}</h6>
                      <p className="fs-14 text-gray-6 fw-normal">
                        No of Booking: {reservations.length}
                      </p>
                    </div>
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="input-icon-start position-relative">
                        <span className="icon-addon">
                          <i className="isax isax-calendar-edit fs-14" />
                        </span>
                        <PredefinedDateRangesBefore onDateChange={handleDateChange} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card hotel-list">
                  <div className="card-body p-0">
                    <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                      <h6>Booking List</h6>
                      <div className="d-flex align-items-center flex-wrap">
                        <div className="input-icon-start me-2 position-relative">
                          <span className="icon-addon">
                            <i className="isax isax-search-normal-1 fs-14" />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search by email"
                            value={searchEmail}
                            onChange={handleSearch}
                          />
                        </div>
                        
                        <div className="dropdown me-3" style={{ position: 'relative' }}>
                          <button
                              className="btn btn-secondary dropdown-toggle"
                              type="button"
                              onClick={() => setDropdownOpen(!dropdownOpen)}
                          >
                              {statusFilter ? 
                                  (statusFilter === "confirmé" ? "Confirmed" : 
                                  statusFilter === "annulé" ? "Cancelled" : "Status") 
                                  : "Status"}
                          </button>
                          {dropdownOpen && (
                              <ul 
                                  className="dropdown-menu show"
                                  style={{
                                      position: 'absolute',
                                      inset: '0px auto auto 0px',
                                      margin: '0px',
                                      transform: 'translate(0px, 40px)'
                                  }}
                              >
                                  <li>
                                      <button 
                                          className="dropdown-item" 
                                          onClick={() => {
                                              handleStatusChange("confirmé");
                                              setDropdownOpen(false);
                                          }}
                                      >
                                          Confirmed
                                      </button>
                                  </li>
                                  <li>
                                      <button 
                                          className="dropdown-item" 
                                          onClick={() => {
                                              handleStatusChange("annulé");
                                              setDropdownOpen(false);
                                          }}
                                      >
                                          Cancelled
                                      </button>
                                  </li>
                                  <li>
                                      <button 
                                          className="dropdown-item" 
                                          onClick={() => {
                                              handleStatusChange("en attente");
                                              setDropdownOpen(false);
                                          }}
                                      >
                                          Pending
                                      </button>
                                  </li>
                                  <li>
                                      <button 
                                          className="dropdown-item" 
                                          onClick={() => {
                                              handleStatusChange(null);
                                              setDropdownOpen(false);
                                          }}
                                      >
                                          All Statuses
                                      </button>
                                  </li>
                              </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    <Table
                      columns={columns}
                      dataSource={transformedData}
                      loading={loading}
                      pagination={{
                        pageSize: 10,
                        showSizeChanger: false,
                        pageSizeOptions: ["5", "10", "20", "30"],
                      }}
                      scroll={{ x: true }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AgentHotelBookingModal />
        <Modal
  title={`Update Status - ${selectedReservation?.numReservation}`}
  open={modalVisible}
  onCancel={() => setModalVisible(false)}
  onOk={async () => {
    if (!newStatus || !selectedReservation?.numReservation) return;

    try {
      await axios.patch(
        `http://127.0.0.1:3000/reservation/updateReservationStatus/${selectedReservation.numReservation}`,
        { status: newStatus }
      );
      setModalVisible(false);
      setSelectedReservation(null);
    } catch (error) {
      console.error("Failed to update reservation status:", error);
    }
  }}
  okText="Update"
  cancelText="Cancel"
>
  <p>Choisir un nouveau statut :</p>
  <Select
    style={{ width: '100%' }}
    value={newStatus}
    onChange={(value) => setNewStatus(value)}
  >
    <Select.Option value="confirmé">Confirmed</Select.Option>
    <Select.Option value="annulé">Cancelled</Select.Option>
    <Select.Option value="en attente">Pending</Select.Option>
  </Select>
</Modal>

      </div>
    </>
  );
};

export default BookingTableByVille;