import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface ModalVilleProps {
  selectedVilleId: string | null;
  onDeleteSuccess: () => void; // Callback to refresh the list after delete
}

const ModalVille: React.FC<ModalVilleProps> = ({
  selectedVilleId,
  onDeleteSuccess
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedVilleId) return;

    setIsDeleting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:3000/ville/delete/${selectedVilleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDeleteSuccess();
    } catch (error) {
      console.error('Error deleting ville:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Delete Ville Modal */}
      <div className="modal fade" id="delete-ville-modal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center">
                <h5 className="mb-3">Delete Destination</h5>
                <p className="mb-3">Are you sure you want to delete this Destination?</p>
                <div className="d-flex justify-content-center">
                  <button type="button" className="btn btn-light me-2" data-bs-dismiss="modal">
                    No
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalVille;
