import { Link } from "react-router-dom";

const Details =()=>{
    return(
        <div className="card border-0 bg-light">
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5>Payout Details</h5>
                    <p className="fs-14">Expected payout on : 25 Jan 2025</p>
                </div>
                <div className="row align-items-center g-4">
                    <div className="col-md-4">
                        <div>
                            <p className="mb-1">Amount to be paid</p>
                            <h5>$2,565.60</h5>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div>
                            <p className="mb-1">Last With Drawn Payment</p>
                            <h5>$1,565.60</h5>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-end">
                            <Link
                                to="#withdraw_payment"
                                data-bs-toggle="modal"
                                className="btn btn-primary btn-sm"
                            >
                                Withdraw Payment
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;