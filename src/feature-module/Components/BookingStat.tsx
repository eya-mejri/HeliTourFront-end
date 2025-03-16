import axios from "axios";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";

const BookingStat =()=>{
    const [villeBookings, setVilleBookings] = useState<{ name: string; count: number ; color: string}[]>([]);
    const [numberVille, setNumberVille] = useState<number>(0);
    const [donutChart, setDonutChart] = useState<any>({
        series: [],
        options: {
          chart: {
            height: 181,
            type: 'donut',
            toolbar: {
              show: false,
            },
          },
          legend: {
            show: false,
          },
          colors: [],
          labels: [],
          plotOptions: {
            pie: {
              donut: {
                size: '65%', // Adjust the inner radius of the donut
              },
            },
          },
          stroke: {
            width: 3, // Adds space between segments
            colors: ['#fff'], // Color of the gap (white in this case)
          },
          dataLabels: {
            enabled: false, // Hides the data labels
          },
        },
      });
      const colorList = [
        '#212E47', // Teal
        '#3538CD', // Blue
        '#0E9384', // Green
        '#CF3425', // Red
        '#98AA30', // Yellow
        '#6C757D', // Gray
        '#FFC107', // Amber
        '#17A2B8', // Cyan
        '#6610F2', // Purple
        '#E83E8C', // Pink
      ];
      //douraaaa
      useEffect(() => {
        const fetchData = async () => {
          try {
            // Step 1: Fetch the list of villes
            const villesResponse = await axios.get('http://127.0.0.1:3000/ville/getall');
            const villes = villesResponse.data;
            setNumberVille(villes.length);
            
      
            // Step 2: Fetch the count of reservations for each ville
            const series: number[] = []; // Create a new array for series
            const labels: string[] = []; // Create a new array for labels
            const colors: string[] = []; // Create a new array for colors
            const bookings = [];
      
            for (let i = 0; i < villes.length; i++) {
              const ville = villes[i];
              
              const reservationsResponse = await axios.get(
                `http://127.0.0.1:3000/reservation/getByVilleName/${ville.Nom}`
              );
              const count = reservationsResponse.data !== null ? reservationsResponse.data.length : 0;
              bookings.push({ name: ville.Nom, count, color: colorList[i] }); // Assign color from colorList
              setVilleBookings(bookings);
              
      
              // Check if reservationsResponse.data is not null
              if (reservationsResponse.data !== null) {
                series.push(reservationsResponse.data.length); // Add count to the series array
                labels.push(ville.Nom); // Add ville name to the labels array
                colors.push(colorList[i]); // Add color to the colors array
              }
            }
      
            // Step 3: Update the donutChart state immutably
            setDonutChart((prevState: any) => ({
              ...prevState,
              series, // Use the new series array
              options: {
                ...prevState.options,
                labels, // Use ville names as labels
                colors, // Use the colors array
              },
            }));
      
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);
    return(
        <div className="card shadow-none flex-fill">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h6>Bookings Statistics</h6>
            <div className="dropdown ">
              <Link
                to="#"
                className="dropdown-toggle btn bg-light-200 btn-sm text-gray-6 rounded-pill fw-normal fs-14 d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i className="isax isax-calendar-2 me-2 fs-14 text-gray-6" />
                2025
              </Link>
              <ul className="dropdown-menu  dropdown-menu-end p-3">
                <li>
                  <Link
                    to="#"
                    className="dropdown-item rounded-1"
                  >
                    <i className="ti ti-point-filled me-1" />
                    2025
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="dropdown-item rounded-1"
                  >
                    <i className="ti ti-point-filled me-1" />
                    2024
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="dropdown-item rounded-1"
                  >
                    <i className="ti ti-point-filled me-1" />
                    2023
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center mb-3">
            <div id="booking-chart" >
              <ReactApexChart
                options={donutChart.options}
                series={donutChart.series}
                type="donut"
                height={181}
              />
            </div>
          </div>
          <div>
          {villeBookings.map((ville) => (
            <div key={ville.name} className="d-flex align-items-center justify-content-between mb-2">
              <h6 className={`border-icon  || 'primary'}`}  style={{ color: ville.color }}>{ville.name}</h6>
              <p className="fs-14">
                <span className="text-gray-9 fw-medium">{ville.count}</span> Bookings
              </p>
            </div>
          ))}
        </div>

          {/*<div className="d-flex align-items-center justify-content-between mb-2">
            <h6 className="border-icon teal">Hotels</h6>
            <p className="fs-14">
              <span className="text-gray-9 fw-medium">16</span> Bookings
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h6 className="border-icon secondary">Flights</h6>
            <p className="fs-14">
              <span className="text-gray-9 fw-medium">12</span> Bookings
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h6 className="border-icon purple">Cars</h6>
            <p className="fs-14">
              <span className="text-gray-9 fw-medium">14</span> Bookings
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h6 className="border-icon dark">Cruise</h6>
            <p className="fs-14">
              <span className="text-gray-9 fw-medium">16</span> Bookings
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-0">
            <h6 className="border-icon primary">Tour</h6>
            <p className="fs-14">
              <span className="text-gray-9 fw-medium">04</span> Bookings
            </p>
          </div>*/}
        </div>
      </div>
    )
}

export default BookingStat;

