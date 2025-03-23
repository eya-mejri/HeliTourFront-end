import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Payment {
  _id: string;
  reservation_id: string;
  montant: number;
  devise: string;
  statut: string;
  date_paiement: string;
  __v: number;
}

interface TableData {
  key: string;
  reservationId: string;
  montant: number;
  devise: string;
  statut: string;
  date_paiement: string;
}

const PaiementTable = (props: { numPage: any }) => {
  const [payments, setPayments] = useState<Payment[]>([]); // State to store fetched payments
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading state

  // Fetch payment data from the API
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/paiements/getAllPaiements");
        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }
        const data = await response.json();
        setPayments(data); // Store fetched payment data in state
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPayments();
  }, []);

  // Transform the fetched payment data to match the table's expected structure
  const transformedData: TableData[] = payments.map((payment) => ({
    key: payment._id,
    reservationId: payment.reservation_id, // Use reservation_id directly
    montant: payment.montant,
    devise: payment.devise,
    statut: payment.statut,
    date_paiement: new Date(payment.date_paiement).toLocaleDateString(), // Format date
  }));

  // Define the columns for the table
  const columns: ColumnsType<TableData> = [
    {
      title: "Reservation ID",
      dataIndex: "reservationId",
      key: "reservationId",
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
      title: "Amount",
      dataIndex: "montant",
      key: "montant",
      render: (montant: number, record: TableData) => `${montant} ${record.devise}`,
    },
    {
      title: "Status",
      dataIndex: "statut",
      key: "statut",
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
      title: "Payment Date",
      dataIndex: "date_paiement",
      key: "date_paiement",
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={transformedData}
        loading={loading}
        pagination={{
          pageSize: props.numPage, // Show items per page
          showSizeChanger: false, // Allow changing page size
          pageSizeOptions: ["5", "10", "20", "30"], // Options for page size
        }}
      />
    </>
  );
};

export default PaiementTable;