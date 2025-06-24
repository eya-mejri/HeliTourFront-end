import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import { all_routes } from '../../router/all_routes';
import moment from 'moment';

const CruiseBookingConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState<any>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const [deadline, setDeadline] = useState<Date | null>(null);

  // Fetch reservation data
  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:3000/reservation/reservationDetails/${id}`);
        setReservation(res.data);
      } catch (error) {
        console.error('Error fetching reservation data:', error);
      }
    };

    fetchReservationDetails();
  }, [id]);

  // Compute deadline from reservation time
  useEffect(() => {
    if (reservation?.Date_Reservation) {
      const reservationDate = new Date(reservation.Date_Reservation);
      const deadlineDate = new Date(reservationDate.getTime() + 72 * 60 * 60 * 1000);
      setDeadline(deadlineDate);
    }
  }, [reservation]);



  

  // Print handler
  const handlePrint = () => {
    const printContent = printRef.current;
    const win = window.open('', '', 'width=800,height=600');

    if (win && printContent) {
      win.document.write(`
        <html>
          <head>
            <title>Print Confirmation</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
                background: white;
                color: black;
              }
              .bg-light {
                background-color: #f8f9fa;
                padding: 1rem;
                margin-bottom: 1rem;
                border-radius: 0.25rem;
              }
              h6 {
                margin-bottom: 0.5rem;
                font-size: 16px;
                color: #333;
              }
              p {
                margin: 0.25rem 0;
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      win.document.close();
      win.focus();
      win.print();
      win.close();
    }
  };

  const getHoursLeft = (): number => {
    if (!deadline) return 0;
    const now = new Date();
    const diffMs = deadline.getTime() - now.getTime();
    if (diffMs <= 0) return 0;
    return Math.ceil(diffMs / (1000 * 60 * 60)); // Round up to next hour
  };

  const breadcrumbs = [{ label: 'Cruise Booking Confirmation', active: true }];

  return (
    <>
      <Breadcrumb
        title="Cruise Booking Confirmation"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-06"
        backgroundImage="http://localhost:3000/assets/img/bgTourList.webp"
      />
      <div ref={printRef}>
        <div className="content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="card booking-confirmation mb-0">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5>Booking Confirmation</h5>
                      <button className="btn btn-outline-primary" onClick={handlePrint}>
                        <i className="isax isax-printer me-2" />
                        Print Confirmation
                      </button>
                    </div>

                    {!reservation && (
                      <div className="text-center my-5">
                        <p>Loading reservation details...</p>
                      </div>
                    )}

                    {reservation && (
                      <>
                        <div className="bg-light p-3 rounded mb-4">
                          <h6 className="mb-2">Reservation Summary</h6>
                          <p><strong>Reservation Number:</strong> {reservation.Num_Reservation}</p>
                          <p><strong>Status:</strong> <span className="text-warning">{reservation.Status}</span></p>
                          <p><strong>Date:</strong> {new Date(reservation.Date_Reservation).toLocaleString()}</p>
                          <p><strong>Number of Travelers:</strong> {reservation.nbr_place}</p>
                          <p><strong>Total Price:</strong> {reservation.totalPrice} TND </p>
                        </div>

                        <div className="bg-light p-3 rounded mb-4">
                          <h6 className="mb-2">Voyageurs</h6>
                          {reservation.voyageurs?.length > 0 ? (
                            reservation.voyageurs.map((v: any, index: number) => (
                              <div key={index} className="mb-2">
                                <p><strong>Name:</strong> {v.prenom} {v.Nom}</p>
                                <p><strong>Email:</strong> {v.email}</p>
                                <p><strong>Weight:</strong> {v.poids} kg</p>
                              </div>
                            ))
                          ) : (
                            <p>No voyageur data available.</p>
                          )}
                        </div>

                        <div className="bg-light p-3 rounded mb-4">
                          <h6 className="mb-2">Circuit & Vol Info</h6>
                          <p><strong>Circuit:</strong> {reservation.circuit?.Nom}</p>
                          <p><strong>Vol Date:</strong>{moment.utc(reservation.vol?.Date_depart).format("MM/DD/YYYY, h:mm A")}</p>
                        </div>

                        <div className="bg-light p-3 rounded mb-4">
                          <h6 className="mb-2">Payment Info</h6>
                          <p><strong>Method:</strong> {reservation.paiement?.method || 'Guichet'}</p>
                          <p><strong>Status:</strong> {reservation.paiement?.statut || 'en attente'}</p>
                          <p><strong>Paid Amount:</strong> {reservation.paiement?.montant || 0}</p>
                        </div>

                        {reservation.Status === 'en attente' && (
                          <div className="bg-warning-subtle p-3 rounded">
                            <h6 className="text-warning">Important</h6>
                            <p>
                              You have <strong>{getHoursLeft()}</strong> hour{getHoursLeft() !== 1 ? 's' : ''} to pay at the nearest guichet.
                              Otherwise, your reservation will be automatically canceled.
                            </p>
                            {deadline && (
                              <p className="text-muted">
                                Deadline: {deadline.toLocaleString()}
                              </p>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CruiseBookingConfirmation;
