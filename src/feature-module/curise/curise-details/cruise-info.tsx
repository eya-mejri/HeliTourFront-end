import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DatePicker, Select, message } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { all_routes } from '../../router/all_routes';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import BannerCounter from '../../home-five/BannerCounter';

// Extend dayjs
dayjs.extend(utc);

interface Props {
  circuitId: string;
  circuitName: string;
  circuitPrice: number;
}

interface AvailableVol {
  place_disponible: number;
  _id: string;
  Date_depart: string;
}

interface Circuit {
  _id: string;
  Nom: string;
  Description: string;
  Prix: number;
  Disponibilite: boolean;}

const CruiseInfo: React.FC<Props> = ({ circuitId, circuitName, circuitPrice }) => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [availableTimes, setAvailableTimes] = useState<AvailableVol[]>([]);
  const [selectedTimeId, setSelectedTimeId] = useState<string>('');
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [numPlaces, setNumPlaces] = useState<number>(1);
  const [showTravelerDropdown, setShowTravelerDropdown] = useState<boolean>(false);
  const [circuitDetails, setCircuitDetails] = useState<Circuit | null>(null);


  useEffect(() => {
    if (!circuitId || !selectedDate) return;
    fetchAvailableTimes();
  }, [selectedDate, circuitId]);

  const fetchAvailableTimes = async () => {
    if (!circuitId || !selectedDate || !numPlaces) return;
    setLoadingTimes(true);
    try {
      const response = await fetch(`http://127.0.0.1:3000/vol/available/${circuitId}/${selectedDate.format('YYYY-MM-DD')}/${numPlaces}`);
      const data = await response.json();
      setAvailableTimes(data);
    } catch (error) {
      console.error('Error fetching available times:', error);
      setAvailableTimes([]);
    } finally {
      setLoadingTimes(false);
    }
  };
  useEffect(() => {
    const fetchCircuitDetails = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:3000/circuit/getbyid/${circuitId}`);
        const data = await res.json();
        setCircuitDetails(data);
      } catch (error) {
        console.error("Failed to fetch circuit details", error);
      }
    };
  
    if (circuitId) fetchCircuitDetails();
  }, [circuitId]);

  const handleBookNow = () => {
    if (!selectedTimeId) {
      message.error('Please select a time.');
      return;
    }

    localStorage.setItem('bookingDetails', JSON.stringify({
      volId: selectedTimeId,
      selectedDate: selectedDate.format('YYYY-MM-DD'),
      travelers: numPlaces, 
    }));

    navigate(all_routes.cruiseBooking);
  };

  return (
    <div className="">
      {/* --- Cruise Details Card --- */}
      <div className="card bg-light-200">
        <div className="card-body">
          <h5 className="d-flex align-items-center fs-18 mb-3">
            <span className="avatar avatar-md rounded-circle bg-primary me-2">
              <i className="isax isax-ship5"></i>
            </span>
            Cruise Information
          </h5>
          <div className="d-flex align-items-center justify-content-between details-info">
              <h6 className="fw-medium">Name</h6>
              <p className="flex-fill">{circuitDetails?.Nom || "N/A"}</p>
            </div>
            <div className="d-flex align-items-center justify-content-between details-info">
              <h6 className="fw-medium">Price</h6>
              <p className="flex-fill">{circuitDetails?.Prix || "N/A"} TND</p>
            </div>
            <div className="d-flex align-items-center justify-content-between details-info">
              <h6 className="fw-medium">Disponibility</h6>
              <p className="flex-fill">{circuitDetails?.Disponibilite || "N/A"}</p>
            </div>
          </div>
      </div>

      {/* --- Booking Form Card --- */}
      <div className="card shadow-none">
        <div className="card-body">
          <h5 className="fs-18 mb-3">Check Availability for {circuitName}</h5>

          <div className="form-item border rounded p-3 mb-3 w-100">
            <label className="form-label fs-14 text-default mb-1">Select Date</label>
            <DatePicker
              className="form-control datetimepicker"
              value={selectedDate}
              onChange={(date) => date && setSelectedDate(date)}
              disabledDate={(current) => current && current < dayjs().startOf('day')}
              format="DD-MM-YYYY"
            />
          </div>
            {/* Number of Travelers Selector - always visible */}
<div className="form-item border rounded p-3 mb-3 w-100">
  <label className="form-label fs-14 text-default mb-1">Travellers</label>

  <div className="d-flex align-items-center justify-content-between">
    <h5 className="mb-0">
      {numPlaces}{" "}
      <span className="fw-normal fs-14">
        Person{numPlaces !== 1 ? 's' : ''}
      </span>
    </h5>
    <BannerCounter
      value={numPlaces}
      onChange={(value: number) => setNumPlaces(value)}
      min={1}
      max={3}
    />
  </div>
</div>



          <div className="form-item border rounded p-3 mb-3 w-100">
            <label className="form-label fs-14 text-default mb-1">Select Time</label>
            <Select
                className="form-control"
                placeholder={loadingTimes ? 'Loading times...' : 'Select Time'}
                value={selectedTimeId || undefined}
                onChange={(value) => setSelectedTimeId(value)}
                disabled={loadingTimes || availableTimes.length === 0}
                >
                {availableTimes
                    .filter(vol => vol.place_disponible >= numPlaces) // 👈 Only show vols with enough places
                    .map(vol => (
                    <Select.Option key={vol._id} value={vol._id}>
                        {dayjs(vol.Date_depart).utc().format('HH:mm')}
                    </Select.Option>
                    ))}
                </Select>
                {/* 👇 Add this directly below the Select */}
                    {availableTimes.filter(vol => vol.place_disponible >= numPlaces).length === 0 && (
                        <p className="text-danger mt-2">
                        No available flights for {numPlaces} travelers on this date.
                        </p>
                    )}

          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h5 className="text-primary">{circuitPrice} TND</h5>
            <button className="btn btn-primary" onClick={handleBookNow} disabled={!selectedTimeId}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* --- Enquiry Form --- 
      <div className="card shadow-none">
        <div className="card-body">
          <form action={all_routes.cruiseDetails}>
            <h5 className="mb-3 fs-18">Enquire Us</h5>
            <div className="py-1">
              <div className="mb-3"><label className="form-label">Name</label><input type="text" className="form-control" /></div>
              <div className="mb-3"><label className="form-label">Email</label><input type="email" className="form-control" /></div>
              <div className="mb-3"><label className="form-label">Phone</label><input type="text" className="form-control" /></div>
              <div className="mb-3"><label className="form-label">Message</label><textarea className="form-control" rows={3}></textarea></div>
            </div>
            <button type="submit" className="btn btn-primary w-100 btn-lg d-flex align-items-center justify-content-center">Submit Enquiry</button>
          </form>
        </div>
      </div>

       --- Why Book With Us --- */}
      <div className="card shadow-none">
        <div className="card-body">
          <h5 className="fs-18 mb-3">Why Book With Us</h5>
          <div>
            <p className="d-flex align-items-center mb-3"><span className="avatar avatar-md bg-light rounded-circle text-dark me-2"><i className="isax isax-medal-star"></i></span>Expertise and Experience</p>
            <p className="d-flex align-items-center mb-3"><span className="avatar avatar-md bg-light rounded-circle text-dark me-2"><i className="isax isax-menu"></i></span>Tailored Services</p>
            <p className="d-flex align-items-center mb-3"><span className="avatar avatar-md bg-light rounded-circle text-dark me-2"><i className="isax isax-message-minus"></i></span>Comprehensive Planning</p>
            <p className="d-flex align-items-center mb-3"><span className="avatar avatar-md bg-light rounded-circle text-dark me-2"><i className="isax isax-user-add"></i></span>Client Satisfaction</p>
            <p className="d-flex align-items-center"><span className="avatar avatar-md bg-light rounded-circle text-dark me-2"><i className="isax isax-grammerly"></i></span>24/7 Support</p>
          </div>
        </div>
      </div>

      {/* --- Provider Details --- */}
      <div className="card shadow-none mb-0">
        <div className="card-body">
          <h5 className="fs-18 mb-3">Provider Details</h5>
          <div className="py-1">
            {/*<div className="bg-light-500 br-10 mb-3 d-flex align-items-center p-3">
              <Link to="#" className="avatar avatar-lg flex-shrink-0">
                <ImageWithBasePath src="assets/img/users/user-05.jpg" alt="img" className="rounded-circle" />
              </Link>
              <div className="ms-2 overflow-hidden">
                <h6 className="fw-medium text-truncate"><Link to="#">Adrian Hendriques</Link></h6>
                <p className="fs-14">Member Since : 14 May 2024</p>
              </div>
            </div>*/}
            <div className="border br-10 mb-3 p-3">
              <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary"><i className="isax isax-call-outgoing5"></i></span>
                <p>+216</p>
              </div>
              <div className="d-flex align-items-center border-bottom pb-3 mb-3">
                <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary"><i className="isax isax-message-search5"></i></span>
                <p>helitour.tunisia@gmail.com</p>
              </div>
              <div className="d-flex align-items-center">
                <span className="avatar avatar-sm me-2 rounded-circle flex-shrink-0 bg-primary"><i className="isax isax-location-tick5"></i></span>
                <p>49 Avenue Habib Bourguiba, Tozeur</p>
              </div>
            </div>
          </div>
          {/*<div className="row g-2">
            <div className="col-sm-6">
              <Link to="#" className="btn btn-light d-flex align-items-center justify-content-center"><i className="isax isax-messages5 me-2"></i>Whatsapp Us</Link>
            </div>
            <div className="col-sm-6">
              <Link to={all_routes.userChat} className="btn btn-primary d-flex align-items-center justify-content-center"><i className="isax isax-message-notif5 me-2"></i>Chat Now</Link>
            </div>
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export default CruiseInfo;
