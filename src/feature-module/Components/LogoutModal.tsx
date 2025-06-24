import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutModal: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear relevant localStorage items
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
   
    // Redirect to home
    navigate('/');
  };

  return (
    <div className="modal fade" id="logout_modal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center">
              <h5 className="mb-3">Logout Confirmation</h5>
              <p className="mb-3">Are you sure you want to logout?</p>
              <div className="d-flex align-items-center justify-content-center">
                <a
                  href="#"
                  data-bs-dismiss="modal"
                  className="btn btn-light me-2"
                >
                  No
                </a>
                <a
                  href="#"
                  data-bs-dismiss="modal"
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Yes, Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
