import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TotaleCard =()=>{
    const [amount,setAmount]=useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch payments for the current month
                const amountResponse = await axios.get('http://127.0.0.1:3000/paiements/getPaiementsOfThisMonth');
    
                // Check if the response contains data and has the totalMontant field
                if (amountResponse.data && amountResponse.data.length > 0) {
                    // Assuming the response is an array and the first element contains the totalMontant
                    setAmount(amountResponse.data[0].totalMontant); // Set the total amount for the current month
                } else {
                    setAmount(0); // If no payments, set amount to 0
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setAmount(0); // Set amount to 0 in case of an error
            }
        };
    
        fetchData();
    }, []);
    
    return(
        <div className="card earning-box bg-primary">
            <div className="card-body">
                <div className="text-center">
                    <span className="avatar avatar-md rounded-circle mb-2">
                        <i className="isax isax-graph5 fs-24" />
                    </span>
                    <p className="text-white mb-1">Total Earning This Month</p>
                    <h3 className="text-white mb-1">$ {amount}</h3>
                   
                </div>
            </div>
        </div>
    )
}
export default TotaleCard;