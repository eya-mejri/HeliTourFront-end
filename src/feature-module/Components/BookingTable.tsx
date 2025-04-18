import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';

import axios from 'axios';
import { all_routes } from '../router/all_routes';
import PredefinedDateRanges from './PredefinedDateRanges';
import PredefinedDateRangesBefore from './PredefinedDateRangesBefore';

interface Reservation {
    _id: string;
    Num_Reservation: string;
    Date_Reservation: string;
    volDate: string;
    nbr_place: number;
    Status: string;
    circuitName: string;
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

const BookingTable = (props: { numPage: any }) => {
    const routes = all_routes;
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

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                setLoading(true);
                let url = 'http://127.0.0.1:3000/reservation/getReservationsWithDetails';
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
                
                const response = await axios.get(url, { params });
                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [selectedRange, statusFilter, searchEmail]);

    const handleDateChange = (start: moment.Moment, end: moment.Moment) => {
        setSelectedRange({ startDate: start, endDate: end });
    };

    const handleStatusChange = (status: string | null) => {
        setStatusFilter(status);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchEmail(e.target.value);
    };

    const transformedData: TableData[] = reservations.map((reservation) => ({
        key: reservation._id,
        numReservation: reservation.Num_Reservation,
        circuitName: reservation.circuitName,
        nbr_place: `${reservation.nbr_place} place${reservation.nbr_place > 1 ? 's' : ''}`,
        voyageurEmails: reservation.voyageurEmails.join(', '),
        reservationDate: new Date(reservation.Date_Reservation).toLocaleDateString(),
        volDate: new Date(reservation.volDate).toLocaleDateString(),
        status: reservation.Status,
        totalPrice: `${reservation.totalPrice} TND`,
        paymentStatus: reservation.paiementStatus || "N/A"
    }));

    const columns: ColumnsType<TableData> = [
        {
            title: "Reservation ID",
            dataIndex: "numReservation",
            key: "numReservation",
            render: (text: string) => (
                <Link to="#" className="link-primary fw-medium">
                    {text}
                </Link>
            ),
        },
        {
            title: "Circuit",
            dataIndex: "circuitName",
            key: "circuitName",
        },
        {
            title: "Places",
            dataIndex: "nbr_place",
            key: "nbr_place",
        },
        {
            title: "Voyageurs",
            dataIndex: "voyageurEmails",
            key: "voyageurEmails",
            render: (emails: string) => (
                <span className="text-truncate" style={{ maxWidth: '150px' }} title={emails}>
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
                <span className={`badge rounded-pill ${
                    text === "confirmé" ? "bg-success" :
                    text === "annulé" ? "bg-danger" : "bg-warning"
                }`}>
                    {text}
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
        <div className="col">
            {/* Booking Header */}
            <div className="card booking-header border-0">
                <div className="card-body header-content d-flex align-items-center justify-content-between flex-wrap">
                    <div>
                        <h6 className="mb-1">All Bookings</h6>
                        <p className="fs-14 text-gray-6 fw-normal">
                            All Booking: {reservations.length}
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
            
            {/* Hotel-Booking List */}
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
                                              tending
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
                    
                    {/* Hotel List */}
                    <Table
                        columns={columns}
                        dataSource={transformedData}
                        loading={loading}
                        pagination={{
                            pageSize: props.numPage,
                            showSizeChanger: false,
                            pageSizeOptions: ["5", "10", "20", "30"],
                        }}
                        scroll={{ x: true }}
                        
                        
                    />
                </div>
            </div>
        </div>
    );
};

export default BookingTable;