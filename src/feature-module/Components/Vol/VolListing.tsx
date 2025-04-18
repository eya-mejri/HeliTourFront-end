import React, { useEffect, useState } from 'react';
import { all_routes } from '../../router/all_routes';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import moment from 'moment';
import PredefinedDateRanges from '../PredefinedDateRanges';

// Define the Vol interface
interface Vol {
    _id: string;
    Duree: number;
    Date_depart: string;
    place_disponible: number;
    status: string;
    reservations: string[];
    circuitId: string;
    __v: number;
}

// Define the Circuit interface
interface Circuit {
    _id: string;
    Nom: string; // Circuit name
    villeId: string; // Ville ID associated with the circuit
}

// Define the Ville interface
interface Ville {
    _id: string;
    Nom: string; // Ville name
}

// Define the TableData interface
interface TableData {
    key: string;
    volId: string;
    duree: string;
    dateDepart: string;
    placeDisponible: string;
    status: string;
    circuitName: string; // Circuit name
    villeName: string; // Ville name
}

const VolListing = () => {
    const routes = all_routes;
    const [vols, setVols] = useState<Vol[]>([]); // State to store fetched vols
    const [circuits, setCircuits] = useState<Circuit[]>([]); // State to store fetched circuits
    const [villes, setVilles] = useState<Ville[]>([]); // State to store fetched villes
    const [loading, setLoading] = useState<boolean>(true); // State to handle loading state
    const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);

    const [selectedRange, setSelectedRange] = useState<{ startDate: moment.Moment; endDate: moment.Moment } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
    
                const circuitsResponse = await axios.get<Circuit[]>('http://127.0.0.1:3000/circuit/getall');
                setCircuits(circuitsResponse.data);
    
                const villesResponse = await axios.get<Ville[]>('http://127.0.0.1:3000/ville/getall');
                setVilles(villesResponse.data);
    
                if (selectedRange) {
                    await fetchVolsByDateRange(selectedRange.startDate, selectedRange.endDate);
                } else {
                    const volsResponse = await axios.get<Vol[]>('http://127.0.0.1:3000/vol/getall');
                    setVols(volsResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [selectedRange]);
    
    // Fetch vols filtered by date range
    const fetchVolsByDateRange = async (startDate: moment.Moment, endDate: moment.Moment) => {
        try {
            const response = await axios.get<Vol[]>('http://127.0.0.1:3000/vol/getall2', {
                params: {
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                },
            });
            setVols(response.data);
        } catch (error) {
            console.error('Error fetching vols:', error);
        }
    };
    
    // Handle date range change
    const handleDateChange = (start: moment.Moment, end: moment.Moment) => {
        setSelectedRange({ startDate: start, endDate: end });
    };
    

    // Transform the fetched data to match the table's expected structure
    const transformedData: TableData[] = vols.map((vol) => {
        const dateDepart = new Date(vol.Date_depart); // Convert the ISO string to a Date object
        const formattedDate = dateDepart.toLocaleDateString('fr-FR', { // Format the date
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const formattedTime = dateDepart.toLocaleTimeString('fr-FR', { // Format the time
            hour: '2-digit',
            minute: '2-digit',
        });

        // Find the circuit using the circuitId
        const circuit = circuits.find((c) => c._id === vol.circuitId);
        const circuitName = circuit ? circuit.Nom : 'Unknown Circuit'; // Fallback if circuit is not found

        // Find the ville using the villeId from the circuit
        const ville = circuit ? villes.find((v) => v._id === circuit.villeId) : null;
        const villeName = ville ? ville.Nom : 'Unknown Ville'; // Fallback if ville is not found

        return {
            key: vol._id, // Use _id as the key
            volId: vol._id, // Use _id as volId
            duree: `${vol.Duree} minutes`, // Format Duree
            dateDepart: `${formattedDate} ${formattedTime}`, // Combine date and time
            placeDisponible: `${vol.place_disponible} places`, // Format place_disponible
            status: vol.status, // Include status
            circuitName, // Include circuit name
            villeName, // Include ville name
        };
    });

    // Define the columns for the table
    const columns: ColumnsType<TableData> = [
        {
            title: 'Vol ID',
            dataIndex: 'volId',
            key: 'volId',
            render: (text: string) => (
                <Link
                    to={`/vol/edit-vol/${text}`} // Link to edit page with volId
                    className="link-primary fw-medium"
                >
                    {text}
                </Link>
            ),
        },
        {
            title: 'Durée',
            dataIndex: 'duree',
            key: 'duree',
        },
        {
            title: 'Date de départ',
            dataIndex: 'dateDepart',
            key: 'dateDepart',
        },
        {
            title: 'Places disponibles',
            dataIndex: 'placeDisponible',
            key: 'placeDisponible',
        },
        {
            title: 'Statut',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => (
                <span
                    className={`badge rounded-pill d-inline-flex align-items-center fs-10 ${
                        text === 'confirmé'
                            ? 'badge-success'
                            : text === 'annulé'
                            ? 'badge-danger'
                            : ''
                    }`}
                >
                    <i className="fa-solid fa-circle fs-5 me-1" />
                    {text}
                </span>
            ),
        },
        {
            title: 'Circuit', // Updated column title
            dataIndex: 'circuitName', // Updated dataIndex
            key: 'circuitName',
        },
        {
            title: 'Ville', // New column for ville name
            dataIndex: 'villeName', // New dataIndex
            key: 'villeName',
        },
    ];

    return (
        <div className="tab-pane fade" id="Tour-list">
            <div className="card border-0">
                <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                    <div>
                        <h5 className="mb-1">Vols</h5>
                        <p>No of Listings : {vols.length}</p>
                    </div>
                    <div>
                        <Link
                            to={routes.Addvol}
                            className="btn btn-primary d-inline-flex align-items-center me-0"
                        >
                            <i className="isax isax-add me-1 fs-16" />
                            Add Vol
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="d-flex align-items-center flex-wrap justify-content-end">
                        <div className="input-icon-start position-relative">
                            <span className="icon-addon">
                                <i className="isax isax-calendar-edit fs-14" />
                            </span>
                            <PredefinedDateRanges onDateChange={handleDateChange} />
                        </div>
                    </div>
                </div>

                {/* Render the table */}
                <div className="col-md-12 mt-5">
                    <Table
                        columns={columns}
                        dataSource={transformedData}
                        loading={loading}
                        pagination={{
                            pageSize: 10, // Show 10 items per page
                            showSizeChanger: false, // Allow changing page size
                            pageSizeOptions: ['5', '10', '20', '30'], // Options for page size
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default VolListing;