import React, { useEffect, useState } from 'react'
import { DatePicker, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import dayjs from "dayjs"
import AOS from 'aos'
import 'aos/dist/aos.css'

import axios from 'axios'
import BannerCounter from './BannerCounter'
import ListeDispo from '../curise/cruise-list/ListeDispo'

interface Ville {
    _id: string
    Nom: string
    Description: string
}

interface Circuit {
    _id: string
    Nom: string
    Description: string
    Prix: number
    Disponibilite: boolean
    villeId: string
}
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
  



  interface FormSearchProps {
    initialParams?: {
      ville: Ville | null;
      circuit: Circuit | null;
      date: dayjs.Dayjs;
      travelers: number;
    };
  }
  
  const FormSearch: React.FC<FormSearchProps> = ({ initialParams }) => {
  
    const [villes, setVilles] = useState<Ville[]>([])
    const [circuits, setCircuits] = useState<Circuit[]>([])
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useState(() => ({
        ville: initialParams?.ville || null,
        circuit: initialParams?.circuit || null,
        date: initialParams?.date || dayjs(),
        travelers: initialParams?.travelers || 1,
      }));
      
    const [availableTours, setAvailableTours] = useState<Tour[] | null>(null);
const [searched, setSearched] = useState(false); // 🔥 New
const [isVilleDropdownOpen, setIsVilleDropdownOpen] = useState(false);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.ville-dropdown')) {
      setIsVilleDropdownOpen(false);
    }
  };
  document.addEventListener('click', handleClickOutside);
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);

    useEffect(() => {
        AOS.init({
          once: true, // optional: animations only run once
          duration: 800,
        });
      }, []);
    useEffect(() => {
        axios.get('http://127.0.0.1:3000/ville/new')
            .then(res => setVilles(res.data))
            .catch(err => console.error('Error fetching villes:', err))
    }, [])

    useEffect(() => {
        if (searchParams.ville) {
            setLoading(true)
            axios.get(`http://127.0.0.1:3000/circuit/new/${searchParams.ville._id}`)
                .then(res => setCircuits(res.data))
                .catch(err => console.error('Error fetching circuits:', err))
                .finally(() => setLoading(false))
        } else {
            setCircuits([])
        }
    }, [searchParams.ville])

    const searchVols = () => {
        if (!searchParams.circuit) {
            message.error('Please select a Tour');
            return;
        }
    
        setLoading(true);
        axios.get('http://127.0.0.1:3000/vol/new', {
            params: {
                circuitId: searchParams.circuit._id,
                date: searchParams.date.format('YYYY-MM-DD'),
                places: searchParams.travelers
            }
        })
        .then(res => {
            setAvailableTours(res.data);  // ✅ set tours (can be empty [])
            setSearched(true);             // ✅ mark that user has searched
        })
        .catch(err => {
            message.error('Error searching for available tours');
            console.error(err);
            setAvailableTours([]);          // ✅ treat error as "no results"
            setSearched(true);
        })
        .finally(() => setLoading(false));
    };
    
    const handleTravelersChange = (count: number) => {
        setSearchParams({
            ...searchParams,
            travelers: count
        })
    }
    if (searched) {
        return (
          <ListeDispo 
            searchParams={searchParams}
            availableTours={availableTours || []}
            circuits={circuits}
          />
        );
    }


    return (
        <div className="banner-form card mb-0 aos" data-aos="fade-up">
                                        <div className="card-header">
                                            <ul className="nav">
                                                <li>
                                                    <Link to="#" className="nav-link active" data-bs-toggle="tab" data-bs-target="#Cruise">
                                                        <i className="isax isax-ship5 me-2"></i>Tour
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card-body">
                                            <div>
                                                <div className="tab-content">
                                                    <div className="tab-pane fade active show" id="Cruise">
                                                        <form>
                                                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                                                                <h6 className="fw-medium fs-16 mb-2">
                                                                    Search For tour on a specific day  
                                                                </h6>
                                                            </div>
                                                            <div className="d-lg-flex">
                                                                <div className="d-flex form-info">
                                                                    {/* Ville Dropdown */}
                                                                    <div className="form-item dropdown ville-dropdown">
                                                                        <div
  role="menu"
  onClick={() => setIsVilleDropdownOpen(prev => !prev)}
  style={{ cursor: 'pointer' }}
>

                                                                            <label className="form-label fs-14 text-default mb-1">
                                                                                Destination
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={searchParams.ville?.Nom || ''}
                                                                                placeholder="Select destination"
                                                                                readOnly
                                                                            />
                                                                            {searchParams.ville && (
                                                                                <p className="fs-12 mb-0">Selected destination</p>
                                                                            )}
                                                                        </div>
                                                                       {isVilleDropdownOpen && (
                                                                        <div className="dropdown-menu dropdown-md p-0 show"  style={{
                                                                            display: 'block',
                                                                            position: 'absolute',
                                                                            top: '100%',              // 👈 appear just below the input
                                                                            left: 0,
                                                                            width: '100%',
                                                                            zIndex: 1000,
                                                                            maxHeight: '250px',       // 👈 scrollable after certain height
                                                                            overflowY: 'auto',
                                                                            border: '1px solid #ccc',
                                                                            borderRadius: '0.375rem',
                                                                            backgroundColor: '#fff',
                                                                            boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                                                                            }}>
                                                                            {villes.length === 0 ? (
                                                                                <div className="p-3 text-center">Loading destinations...</div>
                                                                            ) : (
                                                                                <ul>
                                                                                    {villes.map((ville) => (
                                                                                        <li key={ville._id} className="border-bottom">
                                                                                           <button
                                                                                            type="button"
                                                                                            className="dropdown-item"
                                                                                            onClick={() => {
                                                                                                setSearchParams({
                                                                                                ...searchParams,
                                                                                                ville,
                                                                                                circuit: null,
                                                                                                });
                                                                                                setIsVilleDropdownOpen(false); // ✅ Close after selection
                                                                                            }}
                                                                                            >

                                                                                                <h6 className="fs-16 fw-medium">
                                                                                                    {ville.Nom}
                                                                                                </h6>
                                                                                            </button>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            )}
                                                                        </div>
                                                                        )}

                                                                            
                                                                        
                                                                    </div>
        
                                                                    {/* Circuit Dropdown */}
                                                                    <div
                                                                        className={`form-item dropdown ${!searchParams.ville ? 'disabled' : ''}`}
                                                                        style={{ pointerEvents: !searchParams.ville ? 'none' : 'auto', opacity: !searchParams.ville ? 0.5 : 1 }}
                                                                        >

                                                                        <div
                                                                            data-bs-toggle="dropdown"
                                                                            data-bs-auto-close="outside"
                                                                            role="menu"
                                                                            aria-disabled={!searchParams.ville}
                                                                        >
                                                                            <label className="form-label fs-14 text-default mb-1">
                                                                                Tour Package
                                                                            </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                value={searchParams.circuit?.Nom || ''}
                                                                                placeholder={searchParams.ville ? "Select Tour" : "select Tour"}
                                                                                readOnly
                                                                                disabled={!searchParams.ville}
                                                                            />
                                                                            {searchParams.circuit && (
                                                                                <p className="fs-12 mb-0">Selected package</p>
                                                                            )}
                                                                        </div>
                                                                        {searchParams.ville && (
                                                                            <div className="dropdown-menu dropdown-md p-0">
                                                                                {loading ? (
                                                                                    <div className="p-3 text-center">
                                                                                        <span className="spinner-border spinner-border-sm"></span>
                                                                                    </div>
                                                                                ) : circuits.length === 0 ? (
                                                                                    <div className="p-3 text-center">No Tours available</div>
                                                                                ) : (
                                                                                    <ul>
                                                                                        {circuits.map((circuit) => (
                                                                                            <li key={circuit._id} className="border-bottom">
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="dropdown-item"
                                                                                                    onClick={() => setSearchParams({
                                                                                                        ...searchParams,
                                                                                                        circuit
                                                                                                    })}
                                                                                                >
                                                                                                    <h6 className="fs-16 fw-medium">
                                                                                                        {circuit.Nom}
                                                                                                    </h6>
                                                                                                    <p className="text-muted fs-12">{circuit.Description.substring(0, 50)}...</p>
                                                                                                </button>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
        
                                                                    {/* Date Picker */}
                                                                    <div className="form-item">
                                                                        <label className="form-label fs-14 text-default mb-1">
                                                                            Tour Date
                                                                        </label>
                                                                        <DatePicker
                                                                            className="form-control datetimepicker"
                                                                            placeholder="dd/mm/yyyy"
                                                                            value={searchParams.date}
                                                                            onChange={(date) => setSearchParams({
                                                                                ...searchParams,
                                                                                date: date || dayjs()
                                                                            })}
                                                                            format="DD-MM-YYYY"
                                                                            disabled={!searchParams.circuit}
                                                                            disabledDate={(current) => {
                                                                                return current && current < dayjs().startOf('day');
                                                                            }}
                                                                            />

                                                                        <p className="fs-12 mb-0">{searchParams.date.format('dddd')}</p>
                                                                    </div>
        
                                                                    {/* Travelers Dropdown */}
                                                                    <div className="form-item dropdown">
                                                                        <div
                                                                            data-bs-toggle="dropdown"
                                                                            data-bs-auto-close="outside"
                                                                            role="menu"
                                                                        >
                                                                            <label className="form-label fs-14 text-default mb-1">
                                                                                Travellers
                                                                            </label>
                                                                            <h5>
                                                                                {searchParams.travelers}{" "}
                                                                                <span className="fw-normal fs-14">
                                                                                    Person{searchParams.travelers !== 1 ? 's' : ''}
                                                                                </span>
                                                                            </h5>
                                                                            <p className="fs-12 mb-0">{searchParams.travelers} Adult</p>
                                                                        </div>
                                                                        <div className="dropdown-menu dropdown-menu-end dropdown-xl">
                                                                            <h5 className="mb-3">Select Travelers</h5>
                                                                            <div className="mb-3 border br-10 info-item pb-1">
                                                                                <div className="row">
                                                                                    <div className="col-md-12">
                                                                                        <div className="mb-3">
                                                                                            <label className="form-label text-gray-9 mb-2">
                                                                                                Number of Places
                                                                                            </label>
                                                                                            <BannerCounter 
                                                                                            value={searchParams.travelers}
                                                                                            onChange={handleTravelersChange}
                                                                                            min={1}
                                                                                            max={10}
                                                                                            // @ts-ignore
                                                                                        />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex justify-content-end">
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-light btn-sm me-2"
                                                                                >
                                                                                    Cancel
                                                                                </button>
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-primary btn-sm"
                                                                                >
                                                                                    Apply
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
        
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-primary search-btn rounded"
                                                                    onClick={searchVols}
                                                                    disabled={loading || !searchParams.circuit}
                                                                >
                                                                    {loading ? 'Searching...' : 'Search'}
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    )
}

export default FormSearch