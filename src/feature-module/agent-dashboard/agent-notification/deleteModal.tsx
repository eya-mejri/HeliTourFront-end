import React from 'react';
import { Link } from 'react-router-dom';

interface DeleteModalProps {
  onDelete: () => void;
  onDeleteAll?: () => void;
  isDeleteAll?: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ 
  onDelete, 
  onDeleteAll, 
  isDeleteAll = false 
}) => {
  const handleConfirm = () => {
    if (isDeleteAll && onDeleteAll) {
      onDeleteAll();
    } else {
      onDelete();
    }
  };

  return (
    <div className="modal fade" id="delete_modal">
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center">
              <h5 className="mb-3">
                {isDeleteAll ? 'Delete All Notifications' : 'Delete Notification'}
              </h5>
              <p className="mb-3">
                {isDeleteAll 
                  ? 'Are you sure you want to delete all notifications?'
                  : 'Are you sure you want to delete this notification?'}
              </p>
              <div className="d-flex align-items-center justify-content-center">
                <button
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
                <button 
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleConfirm}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;