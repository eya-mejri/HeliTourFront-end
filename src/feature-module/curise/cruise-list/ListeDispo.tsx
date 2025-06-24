import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import { Select } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import FormSearch from '../../home-five/FormSearch';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { all_routes } from '../../router/all_routes';

interface Tour {
  _id: string;
  Date_depart: string;
  Duree: number;
  circuitId: string;
  place_disponible: number;
  reservations: any[];
  status: string;
  __v: number;
}

interface Circuit {
  _id: string;
  Nom: string;
  Description: string;
  Prix: number;
  Disponibilite: boolean;
  villeId: string;
  photos?: string[];
}

interface Props {
  searchParams: any;
  availableTours: Tour[];
  circuits: Circuit[];
}

interface TimeSlot {
  time: string;           // "HH:mm"
  available: boolean;     // true = can book, false = grayed
}

const ListeDispo: React.FC<Props> = ({ searchParams, availableTours, circuits }) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const navigate = useNavigate(); // import { useNavigate } from 'react-router-dom';

const handleBookNow = (volId: string) => {
  if (!selectedTime) {
    alert('Please select a time first.');
    return;
  }
  
  // Save booking details to localStorage (simple for now)
  localStorage.setItem('bookingDetails', JSON.stringify({
    volId,
    selectedTime,
    travelers: searchParams.travelers
  }));

  navigate(all_routes.cruiseBooking);
};


  const getCircuit = (id: string) => circuits.find(c => c._id === id);

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (!searchParams.circuit || !searchParams.date) return;
      setLoadingTimes(true);
      try {
        const response = await axios.get(`http://127.0.0.1:3000/vol/available/${searchParams.circuit._id}/${searchParams.date.format('YYYY-MM-DD')}/${searchParams.travelers}`);
        
        // Extract available times
        const availableTimes = response.data.map((vol: any) =>
          moment.utc(vol.Date_depart).format('HH:mm')
        );

        // Generate all times of day by 30 minutes
        const allTimes: TimeSlot[] = [];
        for (let hour = 0; hour < 24; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            allTimes.push({
              time,
              available: availableTimes.includes(time) // ✅ Mark available if exists in backend
            });
          }
        }

        setTimeSlots(allTimes);
      } catch (error) {
        console.error('Error fetching available times:', error);
        setTimeSlots([]);
      } finally {
        setLoadingTimes(false);
      }
    };

    fetchAvailableTimes();
  }, [searchParams.circuit, searchParams.date, searchParams.travelers]);

  const groupedTours = availableTours.reduce((acc: Record<string, Tour[]>, tour) => {
    if (!acc[tour.circuitId]) {
      acc[tour.circuitId] = [];
    }
    acc[tour.circuitId].push(tour);
    return acc;
  }, {});
  

  return (
    <div className="liste-dispo-page">
      {/* Always show FormSearch */}
      <FormSearch initialParams={searchParams} />

      <div className="available-tours mt-5">
  {availableTours.length === 0 ? (
    <div className="text-center p-5">
      <h3>No results found for your search.</h3>
      <p>Please try again with different parameters.</p>
    </div>
  ) : (
    // 👇 YOUR NEW CODE HERE 👇
    Object.entries(groupedTours).map(([circuitId, tours]) => {
      const circuit = getCircuit(circuitId);
      if (!circuit) return null;

      return (
<div className="place-item mb-4 d-flex flex-wrap flex-md-nowrap" style={{
  width: '100%',
  borderRadius: '8px',
  overflow: 'hidden',
  background: 'white',
  border: '1px solid #ddd',
}}>
          {/* Left part: Image */}
<div style={{ flex: '1 1 100%', maxHeight: '300px' }} className="place-img">
            <Slider dots arrows infinite speed={500} slidesToShow={1} slidesToScroll={1} autoplay={false}>
              {(circuit.photos?.length ? circuit.photos : ['default.jpg']).map((photo, index) => (
                <div className="slide-images" key={index}>
                  <ImageWithBasePath 
                    src={`http://localhost:3000/assets/img/circuits/${photo}`}
                    className="img-fluid"
                    alt={`${circuit.Nom} ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Right part: Content */}
            <div className="place-content p-3 w-100 w-md-60">
            <h5>{circuit.Nom}</h5>
            <p>{circuit.Description || 'No description available'}</p>

            {/* Times Dropdown */}
            <div className="mt-3">
              <label>Select a time:</label>
              <Select
                style={{ width: '100%' }}
                placeholder="Select a time"
                value={selectedTime}
                onChange={(value) => setSelectedTime(value)}
              >
                {tours.map((tour) => (
                  <Select.Option key={tour._id} value={moment.utc(tour.Date_depart).format('HH:mm')}>
                    {moment.utc(tour.Date_depart).format('HH:mm')}
                  </Select.Option>
                  
                ))}
              </Select>
            </div>

            <div className="price mt-3">
              <h5 className="text-primary">{circuit.Prix} TND <span className="fs-14 fw-normal">/Person</span></h5>
            </div>
            <button 
              className="btn btn-primary btn-lg search-btn ms-0 w-20 mb-3 fs-14 justify-content-center mb-5 mt-2" 
              onClick={() => {
                const selectedTour = tours.find(t => moment.utc(t.Date_depart).format('HH:mm') === selectedTime);
                if (selectedTour) {
                  handleBookNow(selectedTour._id);
                } else {
                  alert('Please select a valid time.');
                }
              }}
              
            >
              Book Now
            </button>
          </div>
        </div>
      );
    })
    // 👆 END OF YOUR NEW CODE 👆
  )}
</div>

    </div>
  );
};

export default ListeDispo;
