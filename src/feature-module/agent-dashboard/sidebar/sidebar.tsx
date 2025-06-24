import React, { useEffect, useState } from 'react';
import { all_routes } from '../../../feature-module/router/all_routes';
import { Link, useLocation } from 'react-router-dom';
import ImageWithBasePath from '../../../core/common/imageWithBasePath';
import NotiIcon from '../../Components/Admin/NotiIcon';
import ProfileCard from '../../Components/Admin/ProfileCard';
import { Logout } from './LogoutModel';
import LogoutModal from '../../Components/LogoutModal';


interface Ville {
  _id: string;
  Nom: string;
  Description: string;
  circuits: any[];
  __v: number;
}

const Sidebar = () => {
  const routes = all_routes;
  const location = useLocation();
  const [subdroptoggle, setsubdroptoggle] = useState(false);
  const [villes, setVilles] = useState<Ville[]>([]); // State to store fetched city data

  // Fetch city data from the API
  useEffect(() => {
    const fetchVilles = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/ville/getall');
        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }
        const data = await response.json();
        setVilles(data); // Store fetched city data in state
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchVilles();
  }, []);

  useEffect(() => {
    return () => {
      location.pathname.includes('booking') ? setsubdroptoggle(true) : setsubdroptoggle(false);
    };
  }, [location.pathname]);

  const activeRouterPath = (link: string) => {
    return link === location.pathname;
  };

  return (
    <div>
      {/* Sidebar */}
      <div className="card user-sidebar agent-sidebar mb-4 mb-lg-0 theiaStickySidebar">
        <ProfileCard/>
        <div className="card-body user-sidebar-body">
          <ul>
            <li>
              <Link
                to={routes.agentDashboard}
                className={`d-flex align-items-center  ${location.pathname === routes.agentDashboard && 'active'}`}
              >
                <i className="isax isax-grid-55 me-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to={routes.agentListing} className={`d-flex align-items-center ${location.pathname === routes.agentListing && 'active'}`}>
                <i className="isax isax-menu-14 me-2" />
                Listings
              </Link>
            </li>
            <li className="submenu">
              <Link
                to="#"
                onClick={() => setsubdroptoggle(!subdroptoggle)}
                className={`d-block ${subdroptoggle ? 'subdrop' : ''} ${location.pathname.includes('booking') ? 'active' : ''}`}
              >
                <i className="isax isax-calendar-tick5 me-2" />
                <span>Bookings</span>
                <span className="menu-arrow" />
              </Link>
              <ul className={`${subdroptoggle && 'd-block'}`}>
              <li >
              <Link to={routes.AllBooking} className={`d-flex align-items-center ${location.pathname === routes.agentEarnings && 'active'}`}>
                <i className="isax isax-wallet-add-15 me-2" />
                All Bookings 
              </Link>
                  </li>
                {villes.map((ville) => (
                  <li key={ville._id}>
                    <Link
                      to={`/admin/booking/agent-bookingVille/${ville.Nom}`}
                      className={`fs-14 d-inline-flex align-items-center ${location.pathname.includes(ville.Nom.toLowerCase()) ? 'active' : ''}`}
                    >
                      {ville.Nom}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link to={routes.agentEnquirers} className={`d-flex align-items-center ${location.pathname === routes.agentEnquirers && 'active'}`}>
               <i className="isax isax-people me-2" />
                Users
              </Link>
            </li>
            <li>
              <Link to={routes.agentEarnings} className={`d-flex align-items-center ${location.pathname === routes.agentEarnings && 'active'}`}>
                <i className="isax isax-wallet-add-15 me-2" />
                Earnings
              </Link>
            </li>
            {/*<li>
              <Link to={routes.agentReview} className={`d-flex align-items-center ${location.pathname === routes.agentReview && 'active'}`}>
                <i className="isax isax-magic-star5 me-2" />
                Reviews
              </Link>
            </li>*/}
            <li>
              <Link to={routes.Profile} className={`d-flex align-items-center ${location.pathname.includes('setting') ? 'active' : ''}`}>
                <i className="isax isax-setting-25" /> Settings
              </Link>
            </li>
            <li className="logout-link">
              {/*<Link to={routes.home1} className="d-flex align-items-center pb-0">
                <i className="isax isax-logout-15" /> Logout
              </Link>*/}
              <a
                          href="#"
                          className="dropdown-item text-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#logout_modal"
                        ><i className="isax isax-logout-15" />
                          Logout
                        </a>
            </li>
            
          </ul>
        </div>
      </div>
      <LogoutModal/>

      {/* /Sidebar */}
    </div>
  );
};

export default Sidebar;