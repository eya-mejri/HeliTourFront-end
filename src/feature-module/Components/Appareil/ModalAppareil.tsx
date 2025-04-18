import React from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

interface AgentListingModalProps {
  selectedAppareilId: string | null;
  onStatusChange: () => void; // Callback to refresh the list after update
  onDeleteSuccess: () => void; // Callback to refresh the list after delete
}

const AgentListingModal: React.FC<AgentListingModalProps> = ({
  selectedAppareilId,
  onStatusChange,
  onDeleteSuccess
}) => {
 

  const handleStatusUpdate = async (newStatus: string) => {
    if (!selectedAppareilId) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://127.0.0.1:3000/appareil/updateStatus/${selectedAppareilId}`,
        { Status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      onStatusChange();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedAppareilId) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://127.0.0.1:3000/appareil/delete/${selectedAppareilId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      onDeleteSuccess();
    } catch (error) {
      console.error('Error deleting appareil:', error);
    }
  };

  return (
    <>
      {/* Inactive Modal */}
      <div
        className="modal fade"
        id="inactive_list"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center">
                <h5 className="mb-3">Inactive Listing</h5>
                <p className="mb-3">
                  Are you sure you want to mark this listing as inactive and keep it
                  unavailable
                </p>
                <div className="d-flex align-items-center justify-content-center">
                  <Link to="#" data-bs-dismiss="modal" className="btn btn-light me-2">
                    No
                  </Link>
                  <Link 
                    to="#" 
                    data-bs-dismiss="modal" 
                    className="btn btn-primary"
                    onClick={() => handleStatusUpdate('inactive')}
                  >
                    Yes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Modal */}
      <div className="modal fade" id="active_list" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center">
                <h5 className="mb-3">Active Listing</h5>
                <p className="mb-3">
                  Are you sure you want to mark this listing as active and keep it
                  available?
                </p>
                <div className="d-flex align-items-center justify-content-center">
                  <Link to="#" data-bs-dismiss="modal" className="btn btn-light me-2">
                    No
                  </Link>
                  <Link 
                    to="#" 
                    data-bs-dismiss="modal" 
                    className="btn btn-primary"
                    onClick={() => handleStatusUpdate('active')}
                  >
                    Yes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div className="modal fade" id="delete-list" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-body">
              <div className="text-center">
                <h5 className="mb-3">Delete Listing</h5>
                <p className="mb-3">
                  Are you sure you want to delete this listing?
                </p>
                <div className="d-flex align-items-center justify-content-center">
                  <Link to="#" data-bs-dismiss="modal" className="btn btn-light me-2">
                    No
                  </Link>
                  <Link 
                    to="#" 
                    data-bs-dismiss="modal" 
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Yes, Delete
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

export default AgentListingModal;