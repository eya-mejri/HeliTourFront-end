import React, { useState } from 'react'
import { all_routes } from '../../router/all_routes';
import Breadcrumb from '../../../core/common/Breadcrumb/breadcrumb';
import Sidebar from '../sidebar/sidebar';
import { Link } from 'react-router-dom';
import PredefinedDateRanges from '../../../core/common/range-picker/datePicker';
import AgentEarningModal from './agentEarningModal';
import ReactApexChart from 'react-apexcharts';
import TotaleCard from '../../Components/Paiements/TolaleCard';
import Details from '../../Components/Paiements/Deatils';
import EarningCard from '../../Components/EarningCard';
import PaiementTable from '../../Components/Paiements/PaiementTable';

const AgentEarning = () => {

    const routes = all_routes;
    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Earnings',
            active: false,
            link: routes.home1
        },
        {
            label: 'Earnings',
            active: true,
        },
    ];

    const [earningChart] = useState<any>({
        series: [
            {
                name: 'Income',
                data: [5000, 16000, 8000, 5000, 4000, 5000, 12000, 5000, 8000, 5000, 5000, 8000],
            },
            {
                name: 'Expenses',
                data: [5000, 4000, 4000, 5000, 8000, 5000, 4000, 5000, 4000, 5000, 5000, 4000],
            },
        ],
        options: {
            chart: {
                height: 295,
                type: 'bar',
                stacked: true,
                toolbar: {
                    show: false,
                },
            },
            colors: ['#0E9384', '#E4EBF1'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0,
                        },
                    },
                },
            ],
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    borderRadiusWhenStacked: 'all',
                    horizontal: false,
                    endingShape: 'rounded',
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    style: {
                        colors: '#4E5561',
                        fontSize: '12px',
                    },
                },
            },
            yaxis: {
                labels: {
                    formatter: (val: number) => {
                        return val / 1000 + 'K';
                    },
                    offsetX: -15,
                    style: {
                        colors: '#4E5561',
                        fontSize: '13px',
                    },
                },
            },
            grid: {
                show: false,
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false, // Disable data labels
            },
            fill: {
                opacity: 1,
            },
        },
    });


    return (
        <div>
            <Breadcrumb title="Earnings" breadcrumbs={breadcrumbs} backgroundClass="breadcrumb-bg-04" />


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
                            <div className="row">
                                <div className="col-xl-12">
                                    <TotaleCard/>
                                </div>
                            </div>
                            {/*<Details/>*/}
                            <EarningCard/>
                            <div className="place-nav listing-nav">
                                <ul className="nav mb-2">
                                    <li className="me-2">
                                        <Link
                                            to="#"
                                            className="nav-link active"
                                            data-bs-toggle="tab"
                                            data-bs-target="#earning-list"
                                        >
                                            Earnings
                                        </Link>
                                    </li>
                                    
                                </ul>
                            </div>
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="earning-list">
                                    {/* Earning List */}
                                    <div className="card hotel-list">
                                        <div className="card-body p-0">
                                            <div className="list-header d-flex align-items-center justify-content-between flex-wrap">
                                                <h6 className="">Invoices</h6>
                                              
                                            </div>
                                            <div className="custom-datatable-filter table-responsive">
                                                <PaiementTable  numPage={5}/>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Earning List */}
                                    
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Wrapper */}

            <AgentEarningModal />
        </div>
    )
}

export default AgentEarning
