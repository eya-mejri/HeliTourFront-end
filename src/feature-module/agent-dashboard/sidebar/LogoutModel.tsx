import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
 // Verify correct path

const LogoutModal = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="modal fade" id="logout_modal"  aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center">
              <h5 className="mb-3">Logout Confirmation</h5>
              <p>Are you sure you want to logout?</p>
              <div className="d-flex justify-content-center gap-2">
                <button 
                  className="btn btn-light" 
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Logout = () => {
  // Initialize modal only once
  useEffect(() => {
    const initModal = async () => {
      const { Modal } = await import('bootstrap');
      const modalEl = document.getElementById('logout_modal');
      if (modalEl) new Modal(modalEl);
    };
    initModal();
  }, []);

  return <LogoutModal />;
};