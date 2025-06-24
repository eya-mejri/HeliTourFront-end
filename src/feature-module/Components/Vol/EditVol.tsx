import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

const EditVol = (props: { vol_id: any }) => {
    const [duree, setDuree] = useState<number>(0);
    const [placeDisponible, setPlaceDisponible] = useState<number>(0);
    const [status, setStatus] = useState<string>('confirmé');
    const [circuits, setCircuits] = useState<any[]>([]);
    const [selectedCircuitId, setSelectedCircuitId] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [bookedTimes, setBookedTimes] = useState<string[]>([]);
    const [loadingTimes, setLoadingTimes] = useState<boolean>(false);
    const { vol_id } = props;
    
    // Fetch vol info
    useEffect(() => {
        const fetchVol = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/vol/getbyid/${vol_id}`);
                const data = response.data;
                setDuree(data.Duree);
                setPlaceDisponible(data.place_disponible);
                setStatus(data.status);
                setSelectedCircuitId(data.circuitId);

               const dateTime = moment.utc(data.Date_depart);

                setSelectedDate(dateTime.format('YYYY-MM-DD'));
                setSelectedTime(dateTime.format('HH:mm'));
            } catch (error) {
                console.error('Error fetching vol:', error);
            }
        };

        if (vol_id) fetchVol();
    }, [vol_id]);

    // Fetch circuits
    useEffect(() => {
        axios.get('http://127.0.0.1:3000/circuit/getall')
            .then(res => setCircuits(res.data))
            .catch(err => console.error('Error fetching circuits:', err));
    }, []);

    // Fetch booked times for selected circuit and date
    useEffect(() => {
        if (selectedCircuitId && selectedDate) {
            setLoadingTimes(true);
            axios.get(`http://127.0.0.1:3000/vol/circuit-date/${selectedCircuitId}/${selectedDate}`)
                .then(res => {
                    const filtered = res.data
                        .filter((v: any) => v._id !== vol_id)
                        .map((v: any) => moment.utc(v.Date_depart).format('HH:mm'));
                    setBookedTimes(filtered);
                })
                .catch(err => {
                    console.error('Error fetching times:', err);
                    setBookedTimes([]);
                })
                .finally(() => setLoadingTimes(false));
        }
    }, [selectedCircuitId, selectedDate, vol_id]);

    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let min = 0; min < 60; min += 30) {
                const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
                const isBooked = bookedTimes.includes(time) && time !== selectedTime;
                slots.push(
                    <option key={time} value={time} disabled={isBooked}>
                        {time}{isBooked ? ' (Indisponible)' : ''}
                    </option>
                );
            }
        }
        return slots;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const Date_depart = moment(`${selectedDate} ${selectedTime}`, "YYYY-MM-DD HH:mm").toISOString();

        const payload = {
            _id: vol_id,
            Duree: duree,
            Date_depart,
            place_disponible: placeDisponible,
            status,
            circuitId: selectedCircuitId
        };

        try {
            await axios.put('http://127.0.0.1:3000/vol/putVol', payload);
            alert('Vol updated successfully!');
        } catch (err) {
            console.error('Update error:', err);
            alert('Update failed.');
        }
    };

    const resetForm = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:3000/vol/getbyid/${vol_id}`);
            const data = res.data;
            setDuree(data.Duree);
            setPlaceDisponible(data.place_disponible);
            setStatus(data.status);
            setSelectedCircuitId(data.circuitId);
            const dateTime = moment(data.Date_depart);
            setSelectedDate(dateTime.format('YYYY-MM-DD'));
            setSelectedTime(dateTime.format('HH:mm'));
        } catch (err) {
            console.error('Reset error:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Circuit */}
            <div className="card shadow-none" id="Circuit">
                <div className="card-header"><h6 className="fs-18">Tour</h6></div>
                <div className="card-body">
                    <select className="form-control" value={selectedCircuitId} onChange={e => setSelectedCircuitId(e.target.value)} required>
                        <option value="">Select a tour</option>
                        {circuits.map(c => <option key={c._id} value={c._id}>{c.Nom}</option>)}
                    </select>
                </div>
            </div>

            {/* Date + Time */}
            <div className="card shadow-none" id="date_depart">
                <div className="card-header"><h6 className="fs-18">Date</h6></div>
                <div className="card-body row">
                    <div className="col-md-6 mb-3">
                        <DatePicker
                            className="form-control"
                            format="DD/MM/YYYY"
                            value={selectedDate ? moment(selectedDate) : null}
                            onChange={date => setSelectedDate(date ? date.format('YYYY-MM-DD') : '')}
                            disabledDate={d => d && d < moment().startOf('day')}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <select className="form-control" value={selectedTime} onChange={e => setSelectedTime(e.target.value)} disabled={!selectedDate || loadingTimes}>
                            <option value="">Sélectionnez une heure</option>
                            {generateTimeSlots()}
                        </select>
                        {loadingTimes && <small>loading...</small>}
                    </div>
                </div>
            </div>

            {/* Durée */}
            <div className="card shadow-none" id="Duree">
                <div className="card-header"><h6 className="fs-18">duration</h6></div>
                <div className="card-body">
                    <input type="number" className="form-control" value={duree} onChange={e => setDuree(Number(e.target.value))} required />
                </div>
            </div>

            {/* Places disponibles */}
            <div className="card shadow-none" id="Places_disponibles">
                <div className="card-header"><h6 className="fs-18">Places disponibles</h6></div>
                <div className="card-body">
                    <select className="form-control" value={placeDisponible} onChange={e => setPlaceDisponible(Number(e.target.value))} required>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                </div>
            </div>

            {/* Status */}
            <div className="card shadow-none" id="Statut">
                <div className="card-header"><h6 className="fs-18">Statut</h6></div>
                <div className="card-body">
                    <select className="form-control" value={status} onChange={e => setStatus(e.target.value)} required>
                        <option value="confirmé">Confirmé</option>
                        <option value="annulé">Annulé</option>
                    </select>
                </div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-center mt-3">
                <button type="button" className="btn btn-light me-3" onClick={resetForm}>Reset</button>
                <button type="submit" className="btn btn-primary">Update Vol</button>
            </div>
        </form>
    );
};

export default EditVol;
