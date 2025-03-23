import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment'; // Import moment for date handling

const EditVol = (props: { vol_id: any }) => {
    // State for form fields
    const [duree, setDuree] = useState<number>(0);
    const [dateDepart, setDateDepart] = useState<string>('');
    const [placeDisponible, setPlaceDisponible] = useState<number>(0);
    const [status, setStatus] = useState<string>('confirmé');
    const [circuits, setCircuits] = useState<any[]>([]); // To store the list of circuits
    const [selectedCircuitId, setSelectedCircuitId] = useState<string>(''); // To store the selected circuit ID

    const { vol_id } = props; // Get the vol ID from props

    // Fetch existing vol data
    useEffect(() => {
        const fetchVol = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/vol/getbyid/${vol_id}`);
                const data = response.data;
                setDuree(data.Duree);
                setDateDepart(data.Date_depart);
                setPlaceDisponible(data.place_disponible);
                setStatus(data.status);
                setSelectedCircuitId(data.circuitId);
            } catch (error) {
                console.error('Error fetching vol data:', error);
            }
        };

        if (vol_id) {
            fetchVol(); // Only fetch data if `vol_id` is valid
        }
    }, [vol_id]); // Only run when `vol_id` changes

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
    }, []); // Run only once on component mount

    // Handle form field changes
    const handleDureeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuree(Number(e.target.value));
    };

    const handleDateDepartChange = (date: moment.Moment | null, dateString: string | string[]) => {
        if (date) {
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
        setSelectedCircuitId(e.target.value); // Update the selected circuit ID
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const volData = {
            _id:vol_id,
            Duree: duree,
            Date_depart: dateDepart, // Use the ISO-formatted date
            place_disponible: placeDisponible,
            status: status,
            circuitId: selectedCircuitId,
        };
        console.log(selectedCircuitId);

        try {
            const response = await axios.put(`http://127.0.0.1:3000/vol/putVol`, volData);
            console.log('Vol updated successfully:', response.data);
            alert('Vol updated successfully!');
        } catch (error) {
            console.error('Error updating vol:', error);
            alert('Failed to update vol. Please try again.');
        }
    };

    // Reset form to fetched data
    const resetForm = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3000/vol/getbyid/${vol_id}`);
            const data = response.data;
            setDuree(data.Duree);
            setDateDepart(data.Date_depart);
            setPlaceDisponible(data.place_disponible);
            setStatus(data.status);
            setSelectedCircuitId(data.circuitId);
        } catch (error) {
            console.error('Error resetting form:', error);
        }
    };

    return (
       <form onSubmit={handleSubmit} data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true">
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
                                       <label className="form-label">Date de départ</label>
                                       <div className="input-icon-end position-relative">
                                           <DatePicker
                                               className="form-control datetimepicker"
                                               placeholder={dateDepart}
                                               onChange={handleDateDepartChange}
                                               showTime={{ format: 'HH:mm' }} // Add time picker
                                               required
                                           />
                                           <span className="input-icon-addon">
                                               <i className="isax isax-calendar" />
                                           </span>
                                       </div>
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
       
            {/* Submit Button */}
            <div className="d-flex align-items-center justify-content-center">
                <button type="button" className="btn btn-light me-2" onClick={resetForm}>
                    Reset
                </button>
                <button type="submit" className="btn btn-primary">
                    Update Vol
                </button>
            </div>
        </form>
    );
};

export default EditVol;