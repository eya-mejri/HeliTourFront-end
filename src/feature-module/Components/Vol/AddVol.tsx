import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment'; // Import moment for date handling

const AddVol = () => {
    // State for form fields
    const [duree, setDuree] = useState<number>(0);
    const [dateDepart, setDateDepart] = useState<string>('');
    const [placeDisponible, setPlaceDisponible] = useState<number>(0);
    const [status, setStatus] = useState<string>('confirmé');
    const [circuits, setCircuits] = useState<any[]>([]); // To store the list of circuits
    const [selectedCircuitId, setSelectedCircuitId] = useState<string>(''); // To store the selected circuit ID
    const [bookedTimes, setBookedTimes] = useState<string[]>([]);
    const [loadingTimes, setLoadingTimes] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');

    // Fetch the list of circuits from the backend
    useEffect(() => {
        const fetchCircuits = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/circuit/getall'); // Adjust the endpoint as needed
                setCircuits(response.data);
            } catch (error) {
                console.error('Error fetching circuits:', error);
            }
        };

        fetchCircuits();
    }, []);


// Fetch booked times when both circuit and date are selected
useEffect(() => {
    if (selectedCircuitId && selectedDate) {
        const fetchBookedTimes = async () => {
            setLoadingTimes(true);
            try {
                const response = await axios.get(
                    `http://127.0.0.1:3000/vol/circuit-date/${selectedCircuitId}/${selectedDate}`
                );
                
                const times = response.data.map((vol: any) => {
                    // Parse the date from backend in UTC
                    const utcDate = moment.utc(vol.Date_depart);
                    // Convert to local time but keep the same hours/minutes
                    return utcDate.format('HH:mm'); // Use utcDate instead of local()
                });
                
                setBookedTimes(times);
            } catch (error) {
                console.error('Error fetching booked times:', error);
                setBookedTimes([]);
            } finally {
                setLoadingTimes(false);
            }
        };
        fetchBookedTimes();
    } else {
        setBookedTimes([]);
    }
}, [selectedCircuitId, selectedDate]);

    const handleDateChange = (date: moment.Moment | null) => {
        if (date) {
            const dateString = date.format('YYYY-MM-DD');
            setSelectedDate(dateString);
            setSelectedTime(''); // Reset time when date changes
        } else {
            setSelectedDate('');
            setSelectedTime('');
        }
    };

    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const isBooked = bookedTimes.includes(time);
                slots.push(
                    <option 
                        key={time} 
                        value={time}
                        disabled={isBooked}
                        style={isBooked ? { color: '#ccc' } : {}}
                    >
                        {time}{isBooked ? ' (Indisponible)' : ''}
                    </option>
                );
            }
        }
        return slots;
    };

    // Handle form field changes
    const handleDureeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuree(Number(e.target.value));
    };

    const handleDateDepartChange = (date: moment.Moment | null, dateString: string | string[]) => {
        if (date) {
            // If dateString is an array, use the first element
            const formattedDate = Array.isArray(dateString) ? dateString[0] : dateString;
            setDateDepart(date.toISOString()); // Store the date in ISO format
        }
    };

    const handlePlaceDisponibleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPlaceDisponible(Number(e.target.value));
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };

    const handleCircuitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCircuitId(e.target.value);
        // Reset date and time when circuit changes
        setSelectedDate('');
        setSelectedTime('');
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const dateDepart = moment.utc(`${selectedDate} ${selectedTime}`).toISOString();
        const volData = {
            Duree: duree,
            Date_depart: dateDepart, // Use the ISO-formatted date
            place_disponible: placeDisponible,
            status: status,
            circuitId: selectedCircuitId,
        };

        try {
            const response = await axios.post('http://127.0.0.1:3000/vol/addVol', volData);
            console.log('Vol added successfully:', response.data);
            alert('Vol added successfully!');
            // Optionally reset the form
            setDuree(0);
            setDateDepart('');
            setPlaceDisponible(0);
            setStatus('confirmé');
            setSelectedCircuitId('');
        } catch (error) {
            console.error('Error adding vol:', error);
            alert('Failed to add vol. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true">
            
        {/* circuitId */}
      <div className="card shadow-none" id="Circuit">
                        <div className="card-header">
                            <div className="d-flex align-items-center justify-content-between">
                                <h6 className="fs-18">Circuit</h6>
                            </div>
                        </div>
                        <div className="card-body pb-1">
                            <div className="row">
                            <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Circuit</label>
                                <select
                                    className="form-control"
                                    value={selectedCircuitId}
                                    onChange={handleCircuitChange}
                                    required
                                >
                                    <option value="">Select a circuit</option>
                                    {circuits.map((circuit) => (
                                        <option key={circuit._id} value={circuit._id}>
                                            {circuit.Nom} {/* Replace `Nom` with the actual field for the circuit name */}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                                
                            </div>  
                        </div>   
        </div>

        {/*date depart  */}
        <div className="card shadow-none" id="date_depart">
                <div className="card-header">
                    <div className="d-flex align-items-center justify-content-between">
                        <h6 className="fs-18">Date de départ</h6>
                    </div>
                </div>
                <div className="card-body pb-1">
                    <div className="row">
                        {/* Duree */}
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Date</label>
                                <DatePicker
                                    className="form-control"
                                    format="DD/MM/YYYY"
                                    onChange={handleDateChange}
                                    value={selectedDate ? moment(selectedDate) : null}
                                    disabledDate={(current) => {
                                        // Disable all dates before today
                                        return current && current < moment().startOf('day');
                                      }}
                                />
                            </div>
                        </div>
                        {selectedDate && (<div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Heure</label>
                                <select
                                    className="form-control"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    disabled={!selectedDate || loadingTimes}
                                >
                                    <option value="">Sélectionnez une heure</option>
                                    {selectedDate && generateTimeSlots()}
                                </select>
                                {loadingTimes && <small>Chargement des horaires...</small>}
                            </div>
                        </div>)}

                        {/* Date_depart */}
                    </div>  
                </div>   
         </div>
                            {/* Basic Info Card */}
            <div className="card shadow-none" id="Duree">
                <div className="card-header">
                    <div className="d-flex align-items-center justify-content-between">
                        <h6 className="fs-18">Duree</h6>
                    </div>
                </div>
                <div className="card-body pb-1">
                    <div className="row">
                        {/* Duree */}
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Durée (en minutes)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={duree}
                                    onChange={handleDureeChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Date_depart */}
                    </div>  
                </div>   
            </div>

          {/* place_disponible */}
        <div className="card shadow-none" id="Places_disponibles">
                <div className="card-header">
                    <div className="d-flex align-items-center justify-content-between">
                        <h6 className="fs-18">Places disponibles</h6>
                    </div>
                </div>
                <div className="card-body pb-1">
                    <div className="row">
                        {/* Duree */}
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Places disponibles</label>
                                <select
                                    className="form-control"
                                    value={placeDisponible}
                                    onChange={handlePlaceDisponibleChange}
                                    required
                                >
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                </select>
                            </div>
                        </div>

                        
                    </div>  
                </div>   
         </div>


          {/* status */}
        <div className="card shadow-none" id="Statut">
                        <div className="card-header">
                            <div className="d-flex align-items-center justify-content-between">
                                <h6 className="fs-18">Statut</h6>
                            </div>
                        </div>
                        <div className="card-body pb-1">
                            <div className="row">
                                {/* Duree */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Statut</label>
                                        <select
                                            className="form-control"
                                            value={status}
                                            onChange={handleStatusChange}
                                            required
                                        >
                                            <option value="confirmé">Confirmé</option>
                                            <option value="annulé">Annulé</option>
                                        </select>
                                    </div>
                                </div>

                                
                            </div>  
                        </div>   
        </div>


     
                       
                   

            {/* Submit Button */}
            <div className="d-flex align-items-center justify-content-center">
                <button type="button" className="btn btn-light me-2" onClick={() => {
                    setDuree(0);
                    setDateDepart('');
                    setPlaceDisponible(0);
                    setStatus('confirmé');
                    setSelectedCircuitId('');
                }}>
                    Reset
                </button>
                <button type="submit" className="btn btn-primary">
                    Add Vol
                </button>
            </div>
        </form>
    );
};

export default AddVol;