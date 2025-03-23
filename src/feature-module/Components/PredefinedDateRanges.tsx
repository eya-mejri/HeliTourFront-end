import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import 'bootstrap-daterangepicker/daterangepicker.css';
import axios from 'axios'; // Assuming you're using axios for API calls

interface PredefinedDateRangesProps {
    onDateChange: (start: moment.Moment, end: moment.Moment) => void;
}

const PredefinedDateRanges: React.FC<PredefinedDateRangesProps> = ({ onDateChange }) => {
    const [state, setState] = useState({
        start: moment().subtract(29, 'days'),
        end: moment(),
    });
    const [firstVolDate, setFirstVolDate] = useState<moment.Moment | null>(null);

    useEffect(() => {
        const fetchFirstVolDate = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/vol/getfirst'); // Adjust API endpoint
                if (response.data && response.data.Date_depart) {
                    setFirstVolDate(moment(response.data.Date_depart)); // Set the first vol date
                }
            } catch (error) {
                console.error('Error fetching first vol date:', error);
            }
        };

        fetchFirstVolDate();
    }, []);

    const { start, end } = state;

    const handleCallback = (start: moment.Moment, end: moment.Moment) => {
        setState({ start, end });
        onDateChange(start, end); // Pass both start and end dates
    };

    // Define the ranges object
    const ranges: { [key: string]: [Date, Date] } = {
        Today: [moment().toDate(), moment().toDate()],
        Yesterday: [moment().subtract(1, 'days').toDate(), moment().subtract(1, 'days').toDate()],
        'Last 7 Days': [moment().subtract(6, 'days').toDate(), moment().toDate()],
        'Last 30 Days': [moment().subtract(29, 'days').toDate(), moment().toDate()],
        'This Month': [moment().startOf('month').toDate(), moment().endOf('month').toDate()],
        'Last Month': [
            moment().subtract(1, 'month').startOf('month').toDate(),
            moment().subtract(1, 'month').endOf('month').toDate(),
        ],
    };

    // Add "All Time" option if firstVolDate is available
    if (firstVolDate) {
        ranges['All Time'] = [firstVolDate.toDate(), moment().toDate()];
    }

    console.log(ranges); // Debug the ranges object

    const label = `${start.format('MM/DD/YYYY')} - ${end.format('MM/DD/YYYY')}`;

    return (
        <DateRangePicker
            key={firstVolDate ? 'with-all-time' : 'without-all-time'} // Force re-render when firstVolDate changes
            initialSettings={{
                startDate: start.toDate(),
                endDate: end.toDate(),
                ranges,
            }}
            onCallback={handleCallback}
        >
            <div
                id="reportrange"
                className="col-4"
                style={{
                    background: '#fff',
                    cursor: 'pointer',
                    padding: '0.5rem 0.625rem',
                    border: '1px solid #E9EDF4',
                    width: '100%',
                    borderRadius: '5px',
                    fontSize: '14px',
                    color: '#202C4B',
                    height: '38px',
                }}
            >
                <span>{label}</span>
            </div>
        </DateRangePicker>
    );
};

export default PredefinedDateRanges;