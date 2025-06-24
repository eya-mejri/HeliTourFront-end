import axios from "axios";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";

const BookingStat = () => {
  const [villeBookings, setVilleBookings] = useState<{ name: string; count: number; color: string }[]>([]);
  const [circuitBookings, setCircuitBookings] = useState<{ name: string; count: number; color: string }[]>([]);
  const [selectedVille, setSelectedVille] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Add this state



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
            size: '65%',
          },
        },
      },
      stroke: {
        width: 3,
        colors: ['#fff'],
      },
      dataLabels: {
        enabled: false,
      },
    },
  });

  const colorList = [
    '#CF3425', '#3538CD', '#0E9384', '#212E47', '#98AA30', '#6C757D', '#FFC107', '#17A2B8', '#6610F2', '#E83E8C',
  ];

  // Fetch ville data and initialize donut chart
  useEffect(() => {
    const fetchData = async () => {
      try {
        const villesResponse = await axios.get('http://127.0.0.1:3000/ville/getall');
        const villes = villesResponse.data;

        const bookings = [];
        const series: number[] = [];
        const labels: string[] = [];
        const colors: string[] = [];

        for (let i = 0; i < villes.length; i++) {
          const ville = villes[i];
          const reservationsResponse = await axios.get(
            `http://127.0.0.1:3000/reservation/getByVilleName/${ville.Nom}`
          );
          const count = reservationsResponse.data !== null ? reservationsResponse.data.length : 0;
          bookings.push({ name: ville.Nom, count, color: colorList[i] });

          if (reservationsResponse.data !== null) {
            series.push(reservationsResponse.data.length);
            labels.push(ville.Nom);
            colors.push(colorList[i]);
          }
        }

        setVilleBookings(bookings);
        setDonutChart((prevState: any) => ({
          ...prevState,
          series,
          options: {
            ...prevState.options,
            labels,
            colors,
          },
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle click on a ville
  const handleVilleClick = async (villeName: string) => {
    console.log("clicked");
    try {
      const response = await axios.get(`http://127.0.0.1:3000/reservation/getReservationsByVille/${villeName}`,{params: {
        status: "confirmé"
      }});
      const reservations = response.data;

      // Group reservations by circuit
      const circuitCounts: { [key: string]: number } = {};
      reservations.forEach((reservation: any) => {
        const circuitName = reservation.circuitName;
        if (circuitCounts[circuitName]) {
          circuitCounts[circuitName]++;
        } else {
          circuitCounts[circuitName] = 1;
        }
      });

      // Transform data for the donut chart
      const circuitBookings = Object.keys(circuitCounts).map((circuitName, index) => ({
        name: circuitName,
        count: circuitCounts[circuitName],
        color: colorList[index % colorList.length], // Reuse colors
      }));

      setCircuitBookings(circuitBookings);
      setSelectedVille(villeName);

      // Update donut chart
      setDonutChart((prevState: any) => ({
        ...prevState,
        series: circuitBookings.map((circuit) => circuit.count),
        options: {
          ...prevState.options,
          labels: circuitBookings.map((circuit) => circuit.name),
          colors: circuitBookings.map((circuit) => circuit.color),
        },
      }));
    } catch (error) {
      console.error('Error fetching circuit bookings:', error);
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    setSelectedVille(null); // Reset selected ville
    setCircuitBookings([]); // Clear circuit bookings

    // Restore the original donut chart (bookings by ville)
    setDonutChart((prevState: any) => ({
      ...prevState,
      series: villeBookings.map((ville) => ville.count),
      options: {
        ...prevState.options,
        labels: villeBookings.map((ville) => ville.name),
        colors: villeBookings.map((ville) => ville.color),
      },
    }));
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className="card shadow-none flex-fill">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6>{selectedVille ? `Bookings for ${selectedVille}` : 'Bookings Statistics'}</h6>
          {/*<div className="dropdown">
            <button
              className="dropdown-toggle btn bg-light-200 btn-sm text-gray-6 rounded-pill fw-normal fs-14 d-inline-flex align-items-center"
              onClick={toggleDropdown}
            >
              <i className="isax isax-calendar-2 me-2 fs-14 text-gray-6" />
              2025
            </button>
            <ul className={`dropdown-menu dropdown-menu-end p-3 ${isDropdownOpen ? 'show' : ''}`}>
              <li>
                <Link to="#" className="dropdown-item rounded-1" onClick={() => setIsDropdownOpen(false)}>
                  <i className="ti ti-point-filled me-1" />
                  2025
                </Link>
              </li>
              <li>
                <Link to="#" className="dropdown-item rounded-1" onClick={() => setIsDropdownOpen(false)}>
                  <i className="ti ti-point-filled me-1" />
                  2024
                </Link>
              </li>
              <li>
                <Link to="#" className="dropdown-item rounded-1" onClick={() => setIsDropdownOpen(false)}>
                  <i className="ti ti-point-filled me-1" />
                  2023
                </Link>
              </li>
            </ul>
          </div>*/}
          This year 
        </div>
        <div className="text-center mb-3">
          <div id="booking-chart">
            <ReactApexChart
              options={donutChart.options}
              series={donutChart.series}
              type="donut"
              height={181}
            />
          </div>
        </div>
        <div>
          {/* Back button (conditionally rendered) */}
          {selectedVille && (
            <button
              className="btn rebook-btn btn-md mb-5"
              onClick={handleBackClick}
            >
              Back to destinations
            </button>
          )}
          {/* List of bookings (villes or circuits) */}
          {(selectedVille ? circuitBookings : villeBookings).map((item) => (
            <div
              key={item.name}
              className="d-flex align-items-center justify-content-between mb-2"
              onClick={() => !selectedVille && handleVilleClick(item.name)} // Only handle click if no ville is selected
              style={{ cursor: !selectedVille ? 'pointer' : 'default' }}
            >
              <h6 style={{ color: item.color }}>{item.name}</h6>
              <p className="fs-14">
                <span className="text-gray-9 fw-medium">{item.count}</span> Bookings
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingStat;

