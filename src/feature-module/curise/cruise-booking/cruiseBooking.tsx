import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { all_routes } from '../../router/all_routes';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import axios from 'axios';
import moment from 'moment';
import FlouciPayment from './FlouciPayment';

const CruiseBooking = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    weight: '',
    notes: '',
    location: '',
    promoCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'guichet' | ''>('');
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(710);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [reservationId, setReservationId] = useState<string>('');
  const now = moment().format(); // Local time in ISO format

  useEffect(() => {
    const details = localStorage.getItem('bookingDetails');
    if (details) {
      setBookingDetails(JSON.parse(details));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchPrice = async () => {
      if (!bookingDetails?.volId) return;
  
      try {
        const response = await axios.get(`http://localhost:3000/vol/price/${bookingDetails.volId}`);
        const pricePerPerson = response.data.prix || 0;
        const total = pricePerPerson * bookingDetails.travelers;
  
        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching circuit price:', error);
      }
    };
  
    fetchPrice();
  }, [bookingDetails]);

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value as 'card' | 'guichet');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues.firstName || !formValues.lastName || !formValues.email || !formValues.phone || !formValues.weight) {
      message.error('Please fill all required fields.');
      return;
    }

    if (!paymentMethod) {
      message.error('Please select a payment method.');
      return;
    }

    if (parseFloat(formValues.weight) > 140) {
      message.error('Weight exceeds limit of 140KG. Please contact support.');
      return;
    }

    try {
      setLoading(true);

      const status = paymentMethod === 'guichet' ? 'en attente' : 'en attente';

      const reservationRes = await axios.post('http://127.0.0.1:3000/reservation/addReservation2', {
        Num_Reservation: `R-${Date.now()}`,
        nbr_place: bookingDetails.travelers,
        disponibilite: "disponible",
        Date_Reservation: moment().toISOString(),
        volId: bookingDetails.volId,
        Status: status,
        voyageurs: [],
      });

      const newReservationId = reservationRes.data._id;
      setReservationId(newReservationId);

      await axios.post('http://127.0.0.1:3000/voy/addVoyageur', {
        reservationId: newReservationId,
        Nom: formValues.lastName,
        prenom: formValues.firstName,
        poids: formValues.weight,
        email: formValues.email,
        phone: formValues.phone,
      });

      message.success('Reservation created successfully!');

      if (paymentMethod === 'card') {
        setShowPaymentModal(true);
        console.log("hiiiii")
      } else {
        navigate(`/cruise/cruise-booking-confirmation/${newReservationId}`, { state: { reservationId: newReservationId } });
      }

      await axios.post('http://127.0.0.1:3000/reservation/send-confirmation-email', {
        email: formValues.email,
        reservation: {
          Num_Reservation: `R-${Date.now()}`,
          Date_Reservation: now,
          totalPrice,
          Status: status,
        },
        phone: formValues.phone,
      });

    } catch (error: any) {
      console.error(error);
      message.error(error.response?.data?.error || 'Booking failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Breadcrumb
        title="Tour Booking"
        breadcrumbs={[
          { label: 'Tour Booking', active: true },
        ]}
        backgroundClass="breadcrumb-bg-06"
        backgroundImage="http://localhost:3000/assets/img/bgTourList.webp"
      />

      <div className="content content-two">
        <div className="container">
          <div className="row">
            {/* Form Side */}
            <div className="col-lg-8">
              <div className="card p-4 shadow">
                <h4 className="mb-4">Enter Guest Details</h4>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Guest Details */}
                    <div className="col-md-6 mb-3">
                      <label>Guest First Name *</label>
                      <input type="text" className="form-control" name="firstName" value={formValues.firstName} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Guest Last Name *</label>
                      <input type="text" className="form-control" name="lastName" value={formValues.lastName} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Guest Email Address *</label>
                      <input type="email" className="form-control" name="email" value={formValues.email} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Guest Phone Number *</label>
                      <input type="text" className="form-control" name="phone" value={formValues.phone} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Guest Weight (kg) *</label>
                      <input type="number" className="form-control" name="weight" value={formValues.weight} onChange={handleChange} required />
                      <small className="text-muted">* 140 KG max per person.</small>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label>Additional Notes</label>
                      <textarea className="form-control" rows={3} name="notes" value={formValues.notes} onChange={handleChange}></textarea>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label>Transfer Location Details (Optional)</label>
                      <input type="text" className="form-control" name="location" value={formValues.location} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Promo Code (Optional)</label>
                      <input type="text" className="form-control" name="promoCode" value={formValues.promoCode} onChange={handleChange} />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mt-4 mb-4">
                    <h5>Payment Method</h5>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={handlePaymentChange}
                        id="cardPayment"
                      />
                      <label className="form-check-label" htmlFor="cardPayment">
                        Pay by Credit Card
                      </label>
                    </div>
                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        value="guichet"
                        checked={paymentMethod === 'guichet'}
                        onChange={handlePaymentChange}
                        id="guichetPayment"
                      />
                      <label className="form-check-label" htmlFor="guichetPayment">
                        Payment at Guichet
                      </label>
                    </div>
                    {paymentMethod === 'guichet' && (
                      <small className="text-muted d-block mt-2">
                        Once your order has been placed, you will have 72 hours to make your payment at the nearest counter, otherwise your order will be automatically cancelled.
                      </small>
                    )}
                  </div>

                  {/* Final Submit */}
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <h5>Total Price:{totalPrice.toFixed(2)} TND</h5>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Booking...' : 'Book Now'}
                    </button>
                  </div>

                  <small className="d-block mt-2">
                    By clicking "Book Now" you agree with our terms and conditions.
                  </small>
                </form>
              </div>
            </div>

            {/* Summary */}
            <div className="col-lg-4">
              <div className="card order-details theiaStickySidebar p-3">
                <div className="card-header">
                  <div className="d-flex align-items-center justify-content-between header-content">
                    <h5>Review Order Details</h5>
                  </div>
                </div>
                <div className="card-body">
                  {bookingDetails && (
                    <>
                      <div className="pb-3 border-bottom">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h6 className="mb-2">Selected Tour</h6>
                          </div>
                          <h6 className="fs-14 fw-normal text-gray-9">{totalPrice}TND</h6>
                        </div>
                      </div>

                      <div className="mt-3 pb-3 border-bottom">
                        <h6 className="text-primary mb-3">Order Info</h6>
                        <div className="d-flex align-items-center details-info">
                          <h6 className="fs-16">Selected Time</h6>
                          <p className="fs-16">{bookingDetails.selectedTime}</p>
                        </div>
                        <div className="d-flex align-items-center details-info">
                          <h6 className="fs-16">Travelers</h6>
                          <p className="fs-16">{bookingDetails.travelers}</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <h6 className="text-primary mb-3">Payment Info</h6>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h6 className="fs-16">Sub Total</h6>
                          <p className="fs-16">{totalPrice} TND</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-3">
                          <h6>Amount to Pay</h6>
                          <h6 className="text-primary">{totalPrice}TND</h6>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPaymentModal && reservationId && (
        <FlouciPayment
          amount={totalPrice}
          reservationId={reservationId}
          email={formValues.email}
          phone={formValues.phone}
          onSuccess={() => {
            axios.patch(`http://127.0.0.1:3000/reservation/updateStatus/${reservationId}`, {
              status: 'confirmé'
            }).then(() => {
              setPaymentSuccess(true);
              navigate(`/cruise/cruise-booking-confirmation/${reservationId}`, { 
                state: { reservationId } 
              });
            });
          }}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
};

export default CruiseBooking;