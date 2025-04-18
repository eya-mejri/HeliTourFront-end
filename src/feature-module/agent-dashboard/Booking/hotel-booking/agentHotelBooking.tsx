import React, { useEffect, useState } from 'react'
import { all_routes } from '../../../router/all_routes';
import Breadcrumb from '../../../../core/common/Breadcrumb/breadcrumb';
import Sidebar from '../../sidebar/sidebar';
import PredefinedDateRanges from '../../../../core/common/range-picker/datePicker';
import { Link } from 'react-router-dom';
/*import { TableData } from '../../../../core/common/data/interface';
import Table from "../../../../core/common/dataTable/index";
import { AgentHotelBookingData } from '../../../../core/common/data/json/agentHotelBookingData';*/
import AgentHotelBookingModal from './agentHotelBookingModal';
import BookingTable from '../../../Components/BookingTable';

const AgentHotelBooking = () => {
    const [reservationCount,setReservationCount]=useState<number>(0);
    const routes = all_routes;
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'All Bookings',
            active: false,
            link: routes.home1
        },
        {
            label: 'All Bookings',
            active: true,
        },
    ];
useEffect (()=>{
    const fetchReservations =async ()=>{
        try{
            const res = await fetch ("http://127.0.0.1:3000/reservation/getall");
            if (!res.ok){
                throw new Error("failed to fetch reservations");
            }const data=await res.json();
            setReservationCount(data.length);
        }catch(err){
            console.log("error fetching ",err);
        }
    }
    
    fetchReservations();
},[])


    /*const data = AgentHotelBookingData;
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (text: any, render: any) => (
                <Link
                    to="#"
                    className="link-primary fw-medium"
                    data-bs-toggle="modal"
                    data-bs-target={`#${render.action}`}
                >
                    {render.id}
                </Link>

            ),
            sorter: (a: TableData, b: TableData) => a.id.length - b.id.length,
        },
        {
            title: "Hotel",
            dataIndex: "hotel",
            key: "hotel",
            render: (text: any, render: any) => (
                <div>
                    <p className="text-dark mb-0 fw-medium fs-14">
                        <Link to={routes.hotelDetails}>{render.hotelName}</Link>
                    </p>
                    <span className="fs-14 fw-normal text-gray-6">{render.location}</span>
                </div>
            ),
            sorter: (a: TableData, b: TableData) =>
                a.hotel.length - b.hotel.length,
        },
        {
            title: "Booked By",
            dataIndex: "bookedBy",
            key: "bookedBy",
            render: (text: any, render: any) => (
                <>
                    <h6 className="fs-14 mb-1">{render.bookedBy}</h6>
                    <span className="fs-14 fw-normal text-gray-6">{render.bookedLocation}</span>
                </>
            ),
            sorter: (a: TableData, b: TableData) => a.bookedby.length - b.bookedby.length,
        },
        {
            title: "Room & Guest",
            dataIndex: "room",
            key: "room",
            render: (text: any, render: any) => (
                <>
                    <h6 className="fs-14 mb-1">{render.room}</h6>
                    <span className="fs-14 fw-normal text-gray-6">{render.guest}</span>
                </>
            ),
            sorter: (a: TableData, b: TableData) => a.room.length - b.room.length,
        },
        {
            title: "Days",
            dataIndex: "days",
            key: "days",
            sorter: (a: TableData, b: TableData) => a.days.length - b.days.length,
        },
        {
            title: "Pricing",
            dataIndex: "pricing",
            key: "pricing",
            sorter: (a: TableData, b: TableData) => a.pricing.length - b.pricing.length,
        },
        {
            title: "Booked on",
            dataIndex: "bookedOn",
            key: "bookedOn",
            sorter: (a: TableData, b: TableData) => a.date.length - b.date.length,
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text: any, render: any) => (
                <span className={`badge rounded-pill d-inline-flex align-items-center fs-10 ${text === 'Upcoming' ? 'badge-info' : text === 'Pending' ? 'badge-secondary' : text === 'Cancelled' ? 'badge-danger' : text === 'Completed' ? 'badge-success' : ''}`}>
                    <i className="fa-solid fa-circle fs-5 me-1" />
                    {render.status}
                </span>

            ),
            sorter: (a: TableData, b: TableData) => a.status.length - b.status.length,
        },
        {
            title: "",
            dataIndex: "action",
            render: (text: any, render: any) => (
                <div className="d-flex align-items-center">
                    <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target={`#${render.action}`}
                    >
                        <i className="isax isax-eye" />
                    </Link>
                </div>
            ),
            sorter: (a: TableData, b: TableData) => a.action.length - b.action.length,
        },
    ];*/

    return (
        <div>
            <Breadcrumb title="All Bookings" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />

            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-4">
                            <Sidebar />
                        </div>
                        {/* /Sidebar */}
                        <BookingTable numPage={10} />
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}

            <AgentHotelBookingModal />

        </div>
    )
}

export default AgentHotelBooking
