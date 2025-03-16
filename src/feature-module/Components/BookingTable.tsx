import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Reservation {
    _id: string; // reservationId is mapped from _id
    Num_Reservation: string;
    reservationDate: string;
    circuitName: string;
    numberOfVoyageurs: number;
    reservationStatus: string;
    paiement: Array<Array<{
      _id: string;
      reservation_id: string;
      montant: number;
      devise: string;
      statut: string;
      date_paiement: string;
      __v: number;
    }>>;
  }
  
  interface TableData {
    key: string;
    reservationId: string;
    numReservation: string;
    circuitName: string;
    numberOfVoyageurs: string;
    reservationDate: string;
    reservationStatus: string;
    pricing: string;
    paymentStatus: string;
  }
const BookingTable =(props: { numPage: any; })=>{
    const [reservations, setReservations] = useState<Reservation[]>([]); // State to store fetched data
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading state

  // Fetch data from the API
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/reservation/getReservationsWithDetails");
        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }
        const data = await response.json();
        setReservations(data); // Store fetched data in state
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchReservations();
  }, []);

  // Transform the fetched data to match the table's expected structure
  const transformedData: TableData[] = reservations.map((reservation) => {
    // Extract payment details (if available)
    const payment = reservation.paiement?.[0]?.[0]; // Get the first payment record
    const paymentAmount = payment?.montant || 0; // Default to 0 if no payment
    const paymentCurrency = payment?.devise || "N/A"; // Default to "N/A" if no payment
    const paymentStatus = payment?.statut || "N/A"; // Default to "N/A" if no payment
  
    return {
      key: reservation._id, // Use _id as the key
      numReservation: reservation.Num_Reservation,
      reservationId: reservation._id, // Use _id as reservationId
      circuitName: reservation.circuitName,
      numberOfVoyageurs: `${reservation.numberOfVoyageurs} Voyageurs`, // Format numberOfVoyageurs
      reservationDate: new Date(reservation.reservationDate).toLocaleDateString(), // Format reservationDate
      reservationStatus: reservation.reservationStatus,
      pricing: `${paymentAmount} ${paymentCurrency}`, // Format pricing
      paymentStatus: paymentStatus, // Include payment status
    };
  });

  // Define the columns for the table
  const columns: ColumnsType<TableData> = [
    {
      title: "ID",
      dataIndex: "numReservation",
      key: "numReservation",
      render: (text: string) => (
        <Link
          to="#"
          className="link-primary fw-medium"
          data-bs-toggle="modal"
          data-bs-target={`#${text}`}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Circuit Name",
      dataIndex: "circuitName",
      key: "circuitName",
    },
    {
      title: "Number of Voyageurs",
      dataIndex: "numberOfVoyageurs",
      key: "numberOfVoyageurs",
    },
    {
      title: "Reservation Date",
      dataIndex: "reservationDate",
      key: "reservationDate",
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (text: string) => (
        <span
          className={`badge rounded-pill d-inline-flex align-items-center fs-10 ${
            text === "réussi"
              ? "badge-success"
              : text === "en_attente"
              ? "badge-warning"
              : text === "échoué"
              ? "badge-danger"
              : ""
          }`}
        >
          <i className="fa-solid fa-circle fs-5 me-1" />
          {text}
        </span>
      ),
    },
    {
      title: "Pricing",
      dataIndex: "pricing",
      key: "pricing",
    },
  ];
  
    return(
        <>
        <Table
                    columns={columns}
                    dataSource={transformedData}
                    loading={loading}
                    pagination={{
                      pageSize:props.numPage , // Show 5 items per page
                      showSizeChanger: true, // Allow changing page size
                      pageSizeOptions: ["5", "10", "20", "30"], // Options for page size
                    }}
                  />
        </>
    )
}
export default BookingTable;