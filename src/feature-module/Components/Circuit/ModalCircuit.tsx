import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface ModalCircuitProps {
  selectedCircuitId: string | null;
  onDeleteSuccess: () => void; // callback to refresh list
}

const ModalCircuit: React.FC<ModalCircuitProps> = ({
  selectedCircuitId,
  onDeleteSuccess
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedCircuitId) return;

    setIsDeleting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:3000/circuit/delete/${selectedCircuitId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDeleteSuccess();
    } catch (error) {
      console.error('Error deleting circuit:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Delete Modal */}
      <div className="modal fade" id="delete-circuit" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center">
                <h5 className="mb-3">Delete Tour</h5>
                <p className="mb-3">
                  Are you sure you want to delete this Tour?
                </p>
                <div className="d-flex align-items-center justify-content-center">
                  <Link
                    to="#"
                    data-bs-dismiss="modal"
                    className="btn btn-light me-2"
                  >
                    No
                  </Link>
                  <Link
                    to="#"
                    data-bs-dismiss="modal"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCircuit;
