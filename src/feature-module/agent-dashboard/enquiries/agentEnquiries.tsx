import React from 'react'
import { all_routes } from '../../router/all_routes';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import Sidebar from '../sidebar/sidebar';
import PredefinedDateRanges from '../../../core/common/range-picker/datePicker';
import { TableData } from '../../../core/common/data/interface';
import Table from "../../../core/common/dataTable/index";
import { Link } from 'react-router-dom';
import { AgentEnquiringData } from '../../../core/common/data/json/agentEnquringData';
import UsersTable from '../../Components/userTable';

const AgentEnquiries = () => {

    const routes = all_routes;
    
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Users',
            active: false,
            link: routes.home1
        },
        {
            label: 'Users',
            active: true,
        },
    ];

   
    return (
        <div>
            <Breadcrumb title="Users" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />
            {/* Page Wrapper */}
            <div className="content">
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-xl-3 col-lg-4 ">
                            <Sidebar />
                        </div>
                        {/* /Sidebar */}
                        <div className="col-xl-9 col-lg-8">
                            {/* Booking Header */}
                            <UsersTable numPage={10}/>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}

        </div>
    )
}

export default AgentEnquiries
