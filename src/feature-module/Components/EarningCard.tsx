import axios from "axios";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom"


const EarningCard = () => {
    const [earningChart, setEarningChart] = useState<any>({
      series: [
        {
          name: 'Income',
          data: [], // Initially empty, will be populated dynamically
        },
        {
          name: 'Expenses',
          data: [], // Initially empty, will be populated dynamically
        },
      ],
      options: {
        chart: {
          height: 280,
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
          enabled: false,
        },
        fill: {
          opacity: 1,
        },
      },
    });
  
    // Fetch data from the backend
    useEffect(() => {
      const fetchEarningsData = async () => {
        try {
          // Step 1: Fetch paiements by month
          const response = await axios.get('http://127.0.0.1:3000/paiements/getPaiementsByMonth');
          const paiementsByMonth = response.data;
  
          // Step 2: Transform the data for the chart
          const incomeData = Array(12).fill(0); // Initialize an array for 12 months
          const expensesData = Array(12).fill(0); // Initialize an array for 12 months
  
          paiementsByMonth.forEach((paiement: any) => {
            const monthIndex = paiement.month - 1; // Convert month (1-12) to array index (0-11)
            incomeData[monthIndex] = paiement.totalMontant; // Assign the totalMontant to the corresponding month
          });
  
          // Step 3: Update the earningChart state
          setEarningChart((prevState: any) => ({
            ...prevState,
            series: [
              { ...prevState.series[0], data: incomeData }, // Update Income data
              { ...prevState.series[1], data: expensesData }, // Update Expenses data (if available)
            ],
          }));
        } catch (error) {
          console.error('Error fetching earnings data:', error);
        }
      };
  
      fetchEarningsData();
    }, []);
  
    return (
      <div className="card shadow-none flex-fill">
        <div className="card-body pb-0">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6>Earnings</h6>
            <div className="dropdown">
              <Link
                to="#"
                className="dropdown-toggle btn bg-light-200 btn-sm text-gray-6 rounded-pill fw-normal fs-14 d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i className="isax isax-calendar-2 me-2 fs-14 text-gray-6" />
                2025
              </Link>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <Link to="#" className="dropdown-item rounded-1">
                    <i className="ti ti-point-filled me-1" />
                    2025
                  </Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item rounded-1">
                    <i className="ti ti-point-filled me-1" />
                    2024
                  </Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item rounded-1">
                    <i className="ti ti-point-filled me-1" />
                    2023
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="mb-2">
                <p className="mb-0">Total Earnings this Year</p>
                <h3>
                  {earningChart.series[0].data.reduce((acc: number, curr: number) => acc + curr, 0).toLocaleString()} {/* Calculate total earnings */}
                </h3>
              </div>
              <div className="d-flex align-items-center mb-2">
                <p className="fs-14">
                  <span className="badge badge-soft-success badge-md border border-success rounded-pill me-2">
                    <i className="isax isax-arrow-up-3" />
                    12%
                  </span>
                  vs last years
                </p>
              </div>
            </div>
            <div id="earning-chart">
              <ReactApexChart
                options={earningChart.options}
                series={earningChart.series}
                type="bar"
                height={280}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default EarningCard;

