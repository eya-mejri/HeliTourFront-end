import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import 'bootstrap-daterangepicker/daterangepicker.css';
import axios from 'axios';

interface PredefinedDateRangesProps {
    onDateChange: (start: moment.Moment, end: moment.Moment) => void;
}

const PredefinedDateRangesBefore: React.FC<PredefinedDateRangesProps> = ({ onDateChange }) => {
    const [state, setState] = useState({
        start: moment().subtract(29, 'days'), // Default to past 29 days
        end: moment(),
    });
    const [firstVolDate, setFirstVolDate] = useState<moment.Moment | null>(null);
    const [lastVolDate, setLastVolDate] = useState<moment.Moment | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchVolDates = async () => {
            try {
                setLoading(true);
                const [firstResponse, lastResponse] = await Promise.all([
                    axios.get('http://127.0.0.1:3000/vol/getfirst'),
                    axios.get('http://127.0.0.1:3000/vol/getlast')
                ]);

                if (firstResponse.data?.Date_depart) {
                    const apiFirstDate = moment(firstResponse.data.Date_depart);
                    setFirstVolDate(apiFirstDate);
                    // Update the default start date to the first flight date if it's earlier than today
                    setState(prev => ({
                        ...prev,
                        start: apiFirstDate.isBefore(prev.start) ? apiFirstDate : prev.start
                    }));
                }

                if (lastResponse.data?.Date_depart) {
                    setLastVolDate(moment(lastResponse.data.Date_depart));
                }
            } catch (error) {
                console.error('Error fetching vol dates:', error);
            }finally {
                setLoading(false);
            }
        };

        fetchVolDates();
    }, []);

    const { start, end } = state;

    const handleCallback = (start: moment.Moment, end: moment.Moment) => {
        setState({ start, end });
        onDateChange(start, end);
    };

    // Define ranges for PAST dates
    const ranges: { [key: string]: [moment.Moment, moment.Moment] } = {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'Last 90 Days': [moment().subtract(89, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [
            moment().subtract(1, 'month').startOf('month'),
            moment().subtract(1, 'month').endOf('month')
        ],
        'Last Year': [moment().subtract(1, 'year'), moment()]
    };

     // Add "All Time" range using the API first date or default to 1 year ago
        if (firstVolDate) {
            ranges['All Time'] = [
                firstVolDate,
                lastVolDate || moment().add(1, 'year')
            ];
        } else {
            // Fallback if API hasn't responded yet
            ranges['All Time'] = [
                moment().subtract(1, 'year'),
                moment().add(1, 'year')
            ];
        }
    
        // Add "Until Last Flight" if we have last flight date
        if (lastVolDate) {
            ranges['Until Last Flight'] = [moment(), lastVolDate];
        }
    
        // Convert all ranges to Date objects
        const convertedRanges = Object.fromEntries(
            Object.entries(ranges).map(([key, [start, end]]) => [
                key, 
                [start.toDate(), end.toDate()]
            ])
        );
    
        const label = `${start.format('MM/DD/YYYY')} - ${end.format('MM/DD/YYYY')}`;
    
        if (loading) {
            return <div>Loading date ranges...</div>;
        }
    
    return (
        <DateRangePicker
            key={`daterange-${firstVolDate?.valueOf()}-${lastVolDate?.valueOf()}`}
            initialSettings={{
                startDate: start.toDate(),
                endDate: end.toDate(),
                ranges: convertedRanges,
                maxDate: moment().toDate(), // Prevent selecting dates in the future
                opens: 'right',
                alwaysShowCalendars: false,
                showDropdowns: false,
                locale: {
                    applyLabel: 'Apply',
                    cancelLabel: 'Cancel',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: 'Custom Range',
                    daysOfWeek: moment.weekdaysMin(),
                    monthNames: moment.months(),
                    firstDay: moment.localeData().firstDayOfWeek()
                }
            }}
            onCallback={handleCallback}
        >
            <div
                id="reportrange"
                style={{
                    background: '#fff',
                    cursor: 'pointer',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minWidth: '250px'
                }}
            >
                <div>
                    
                    <span>{label}</span>
                </div>
                <i className="fa fa-caret-down" style={{ marginLeft: '8px' }} />
            </div>
        </DateRangePicker>
    );
};

export default PredefinedDateRangesBefore;