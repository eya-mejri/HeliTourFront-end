import React, { useState, useEffect } from "react";
import ImageWithBasePath from '../imageWithBasePath'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setDataTheme } from "../../redux/themeSettingSlice";
import { all_routes } from "../../../feature-module/router/all_routes";
import LoginModal from "../modal/loginModal";
import RegisterModal from "../modal/registerModal";
import ForgotPasswordModal from "../modal/forgotPassword";
import ChangePasswordModal from "../modal/changePassword";
import axios from "axios";
import GoogleTranslate from "../../../feature-module/Components/GoogleTranslate";

import LogoutModal from "../../../feature-module/Components/LogoutModal";
interface MenuItem {
  menuValue: string;
  route: string;
  hasSubRoute: boolean;
  showSubRoute: boolean;
  base: string;
  page: string;
  last: string;
  subMenus: any[];
  icon: string;
}

interface SideBarItem {
  tittle: string;
  base: string;
  showAsTab: boolean;
  separateRoute: boolean;
  subTitle?: string;
  twoTitle?: boolean;
  img?: string;
  menu?: MenuItem[];
  subTitle2?: string; // Add if needed
}
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);
  const [isOffcanva, setIsOffcanva] = useState(false);
  const [isMegaMenu, setIsMegaMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const [villes, setVilles] = useState<any[]>([]);
  const [circuits, setCircuits] = useState<any[]>([]);
  const isAuthenticated = !!localStorage.getItem("token"); // Simplified auth check
  let role: string | null = null;
  const userData = localStorage.getItem("userData");
  
  if (userData !== null) {
    try {
      const parsedData = JSON.parse(userData);
      role = parsedData?.Role || null;
    } catch (error) {
      console.error("Error parsing userData from localStorage:", error);
    }
  }
  useEffect(() => {
  if (isAuthenticated && typeof window !== 'undefined') {
    // Delay execution to ensure DOM is ready
    setTimeout(() => {
      const dropdownToggleEls = document.querySelectorAll('.dropdown-toggle');
      dropdownToggleEls.forEach((el: any) => {
        try {
          if (!el.classList.contains('dropdown-initialized')) {
            /*new (window as any).bootstrap.Dropdown(el);*/
            el.classList.add('dropdown-initialized');
          }
        } catch (err) {
          console.warn("Dropdown init failed", err);
        }
      });
    }, 0);
  }
}, [isAuthenticated, location.pathname]); // Add location.pathname to re-trigger on route change

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const dropdown = document.querySelector('.profile-dropdown');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  document.addEventListener('click', handleClickOutside);
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);



  const dataTheme = useSelector((state: any) => state.themeSetting.dataTheme);
  const handleDataThemeChange = (theme: string) => {
    dispatch(setDataTheme(theme));
  };
  const openSubMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setOpenDropdownIndex(null);
  };
  const routes = all_routes
  const toggleSubMenu = (index: any) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    setIsDropdownOpen(false);
  };
  useEffect(() => {
    const fetchVilles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/ville/getall');
        setVilles(response.data); // Mise à jour de l'état ici
      } catch (error) {
        console.error('Error fetching villes:', error);
        setVilles([]); // Valeur par défaut en cas d'erreur
      }
    };
  
    fetchVilles(); // On appelle bien la fonction définie
  }, []);

  useEffect(() => {
    const fetchCircuits = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/circuit/getall');
        setCircuits(response.data); // Mise à jour de l'état ici
      } catch (error) {
        console.error('Error fetching circuits:', error);
        setCircuits([]); // Valeur par défaut en cas d'erreur
      }
    };
  
    fetchCircuits(); // On appelle bien la fonction définie
  }, []);
  
  const sideBar : SideBarItem[] = [
    {
      tittle: 'Home',
      base: 'home',
      showAsTab: false,
      separateRoute: true,

    },
    {
      tittle: 'Destination',
      base: 'Destination',
      subTitle: 'Destination List',
      showAsTab: false,
      separateRoute: false,
      twoTitle: false,
      img: 'https://www.smartbox.com/fr/blog/wp-content/uploads/2018/05/plage-du-sillon-saint-malo.jpg',
      menu: [
        {
          menuValue: 'Destination List',  // Add this menu item
          route: routes.flightList,      // Link to the ville list route
          hasSubRoute: false,
          showSubRoute: false,
          base: 'Destination',
          page: '',
          last: '',
          subMenus: [],
          icon: ''
        },... villes.map(ville => ({
        menuValue: ville.Nom,
        route: `/ville/${ville._id}`, // Assuming your ville has an _id field
        hasSubRoute: false,
        showSubRoute: false,
        base: 'ville',
        page: '',
        last: '',
        subMenus: [],
        icon: ''
      }))]
    },
    {
      tittle: 'Tour',
      base: 'Tour',
      subTitle: 'Tour List',
      showAsTab: false,
      separateRoute: false,
      twoTitle: false,
      img: 'https://www.smartbox.com/fr/blog/wp-content/uploads/2018/05/plage-du-sillon-saint-malo.jpg',
      menu: [
        {
          menuValue: 'Tour List',  // Add this menu item
          route: routes.cruiseList,      // Link to the ville list route
          hasSubRoute: false,
          showSubRoute: false,
          base: 'Tour',
          page: '',
          last: '',
          subMenus: [],
          icon: ''
        },... circuits.map(circuit => ({
        menuValue: circuit.Nom,
        route: `/circuit/${circuit._id}`, // Assuming your ville has an _id field
        hasSubRoute: false,
        showSubRoute: false,
        base: 'Tour',
        page: '',
        last: '',
        subMenus: [],
        icon: ''
      }))]
    },
    {
      tittle: 'Pages',
      base: 'pages',
      subTitle: 'Pages',
      showAsTab: false,
      separateRoute: false,
      twoTitle: true,
      img: 'assets/img/menu/flight.jpg',
      menu: [
        {
          menuValue: 'About',
          route: routes.about_us,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'about',
          page: '',
          last: '',
          subMenus: [],
          icon: ''
        },
        {
          menuValue: 'Contact Us',
          route: routes.contactUs,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'contact-us',
          page: '',
          last: '',
          subMenus: [],
          icon: ''
        },
        {
          menuValue: 'Terms & Conditions',
          route: routes.termsConditions,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'Terms-Conditions',
          page: '',
          last: '',
          subMenus: [],
          icon: ''
        },
        {
          menuValue: 'Privacy Policy',
          route: routes.privacyPolicy,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'privacy-policy',
          page: '',
          last: '',
          subMenus: [],
          icon: ''
        },
      ],
    },  /*
    {
      tittle: 'Dashboard',
      base: 'dashboard',
      subTitle: 'Agent Dashboard',
      showAsTab: false,
      separateRoute: false,
      twoTitle: true,
      img: 'assets/img/menu/flight.jpg',
      menu: [
        {
          menuValue: 'Dashboard',
          route: routes.agentDashboard,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'admin-dashboard',
          page: '',
          last: '',
          subMenus: [],
          icon: ''
        },
        {
          menuValue: 'Listings',
          route: routes.agentListing,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'listings',
          page: '',
          last: '',
          subMenus: [],
          icon: ''
        },
        {
          menuValue: 'Bookings',
          route: routes.agentHotelBooking,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'bookings',
          page: '',
          last: '',
          subMenus: [],
          icon: ''
        },
        {
          menuValue: 'Enquiries',
          route: routes.agentEnquirers,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'enquiries',
          page: '',
          last: '',
          subMenus: [],
          icon: ''
        },
        {
          menuValue: 'Earnings',
          route: routes.agentEarnings,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'earnings',
          page: '',
          last: '',
          subMenus: [],
          icon: ''
        },
        {
          menuValue: 'Reviews',
          route: routes.agentReview,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'reviews',
          page: '',
          last: '',
          subMenus: [],
          icon: ''
        },
        {
          menuValue: 'Settings',
          route: routes.agentSettings,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'settings',
          page: '',
          last: '',
          subMenus: [],
          icon: ''
        },
      ],
    },*/


  ];
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setIsResponsive(true);
      } else {
        setIsResponsive(false);
        setIsOffcanva(false)
      }
    };

    // Call the function on mount
    handleResize();

    // Attach resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("class", dataTheme);
  }, [dataTheme])
  
  const DarkButton = () => {
    return (
      <div className="me-3">
        <Link
          to="#"
          id="dark-mode-toggle"
          className={`theme-toggle ${dataTheme === 'light' && 'activate'}`}
          onClick={() => handleDataThemeChange("dark-mode")}
        >
          <i className="isax isax-moon" />
        </Link>
        <Link
          to="#"
          id="light-mode-toggle"
          className={`theme-toggle ${dataTheme === 'dark-mode' && 'activate'}`}
          onClick={() => handleDataThemeChange("light")}
        >
          <i className="isax isax-sun-1" />
        </Link>
      </div>
    )
  }
  return (
    <>
      <div className={`main-header ${location.pathname === '/index-5'  ? 'main-header-five' : ''} `}>
        {/* Header Topbar*/}
        { location.pathname === '/index-5'  ?
          <></> :
          <div className="header-topbar text-center bg-transparent">
            <div className="container">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <p className="d-flex align-items-center fw-medium fs-14 mb-2">
                  <i className="isax isax-call5 me-2" />
                  Toll Free : +1 56565 56594
                </p>
                <div className="d-flex align-items-center">
                  <p className="mb-2 me-3 d-flex align-items-center fw-medium fs-14">
                    <i className="isax isax-message-text-15 me-2" />
                    Email : HelitourTunisia@gmail.com
                  </p>
                 {/*} <GoogleTranslate/>*/}
                  <div className="dropdown mb-2 me-3">
                    <Link
                      to="#"
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      
                    >
                      USD
                    </Link>
                    <ul className="dropdown-menu p-2 mt-2">
                      <li>
                        <Link className="dropdown-item rounded" to="#">
                          USD
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded" to="#">
                          YEN
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded" to="#">
                          EURO
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/*<div className="fav-dropdown mb-2">
                    <Link to={routes.wishlist} className="position-relative">
                      <i className="isax isax-heart" />
                      <span className="count-icon bg-secondary text-gray-9">0</span>
                    </Link>
                  </div>*/}
                </div>
              </div>
            </div>
          </div>
        }
        
        
        {/* /Header Topbar*/}
        {/* Header */}
        <header className={`${scrolled ? "fixed" : ""}  ${location.pathname === '/index-5' && 'header-five'} ${location.pathname === '/index-6' && 'header-six'}`}>
          <div className="container">
            <div className={`offcanvas-info ${isOffcanva ? 'show' : ''}`}>
              <div className="offcanvas-wrap">
                <div className="offcanvas-detail">
                  <div className="offcanvas-head">
                    <div className="d-flex justify-content-between align-items-center mb-3">

                      <Link to={routes.home5} className="black-logo-responsive">
                      <ImageWithBasePath 
                      src="http://localhost:3000/assets/img/logo1.png" 
                      alt="logo-img"
                       
                        style={{ height: '50px', width: '100px'}}
                        />
                        <ImageWithBasePath 
                      src="http://localhost:3000/assets/img/logo1.png" 
                      alt="logo-img"
                       
                        style={{ height: '50px', width: '100px'}}
                        />
                      </Link>
                      <Link to={routes.home5} className="white-logo-responsive">
                      <ImageWithBasePath 
                      src="http://localhost:3000/assets/img/logo1.png" 
                      alt="logo-img"
                       
                        style={{ height: '50px', width: '100px'}}
                        />
                      </Link>
                      <div className="offcanvas-close" onClick={() => setIsOffcanva(false)}>
                        <i className="ti ti-x" />
                      </div>
                    </div>
                    {/*<div className="wishlist-info d-flex justify-content-between align-items-center">
                      <h6 className="fs-16 fw-medium">Wishlist</h6>
                      <div className="d-flex align-items-center">
                        <div className="fav-dropdown">
                          <Link to={routes.wishlist} className="position-relative">
                            <i className="isax isax-heart" />
                            <span className="count-icon bg-secondary text-gray-9">
                              0
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>*/}
                  </div>
              
                <div className={`mobile-menu fix mb-3 ${isResponsive ? 'mean-container' : ''}`}>
                  <div className="mean-bar">
                    <nav className="mean-nav">
                      <ul className="main-nav">
                        {sideBar.map((mainMenus, i) => (
                          <li 
                            key={i}
                            className={`has-submenu ${openDropdownIndex === i ? 'dropdown-opened' : ''}`}
                          >
                            <Link to={mainMenus.separateRoute ? routes.home5 : "#"}>
                              {mainMenus.tittle}
                              <i className="fa-solid fa-plus"></i>
                            </Link>
                            
                            {!mainMenus.separateRoute && mainMenus.menu && (
                  <>
                    <Link
                      className={`mean-expand ${openDropdownIndex === i ? 'mean-clicked' : ''}`}
                      to="#"
                      style={{ fontSize: '18px' }}
                      onClick={() => toggleSubMenu(i)}
                    >
                      <i className="ti ti-plus"></i>
                    </Link>
                    
                    <ul
                      className="submenu"
                      style={{
                        display: openDropdownIndex === i ? 'block' : 'none',
                      }}
                    >
                      {mainMenus.menu.map((menu, idx) => (
                        <li key={idx}>
                          <Link to={menu.route}>{menu.menuValue}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
                  <div className="offcanvas__contact">
                    <div className="mt-4">
                      <div className="header-dropdown d-flex flex-fill">
                        <div className="w-100">
                        {/*<GoogleTranslate/>*/}
                        <div className="dropdown">
                            <Link
                              to="#"
                              className="dropdown-toggle bg-white border d-block"
                              data-bs-toggle="dropdown"
                              
                            >
                              USD
                            </Link>
                            <ul className="dropdown-menu p-2">
                              <li>
                                <Link
                                  className="dropdown-item rounded"
                                  to="#"
                                >
                                  USD
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="dropdown-item rounded"
                                  to="#"
                                >
                                  YEN
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="dropdown-item rounded"
                                  to="#"
                                >
                                  EURO
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Link
                          to={routes.login}
                          className="text-white btn btn-dark w-100 mb-3"
                          
                        >
                          Sign In
                        </Link>
                      </div>
                      <Link
                        to={routes.becomeAnExpert}
                        className="btn btn-primary w-100"
                      >
                        Become Expert
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`offcanvas-overlay ${isOffcanva ? 'overlay-open' : ''}`} onClick={() => setIsOffcanva(false)} />
            <div className="header-nav">
              <div className="main-menu-wrapper">
                <div className="navbar-logo">
                  <Link className="logo-white header-logo" to={routes.home5}>
                    {location.pathname === '/index-2' || location.pathname === '/index-3' || location.pathname === '/index-4'
                      || location.pathname === '/index-5' ?
                      <ImageWithBasePath 
                      src="http://localhost:3000/assets/img/logo1.png" 
                      alt="logo-img"
                       
                        style={{ height: '50px', width: '100px'}}
                        /> :
                        <ImageWithBasePath 
                        src="http://localhost:3000/assets/img/logo1.png" 
                        alt="logo-img"
                         
                          style={{ height: '50px', width: '100px'}}
                          />
                    }
                  </Link>
                  {location.pathname !== routes.home6 &&
                    <Link className="logo-dark header-logo" to={routes.home5}>
                      {location.pathname === '/index-2' || location.pathname === '/index-3' || location.pathname === '/index-4'
                        || location.pathname === '/index-5' ?
                        <ImageWithBasePath 
                        src="http://localhost:3000/assets/img/logo1.png" 
                        alt="logo-img"
                         
                          style={{height: '50px', width: '100px'}}
                          />:
                          <ImageWithBasePath 
                          src="http://localhost:3000/assets/img/logo1.png" 
                          alt="logo-img"
                           
                            style={{ height: '50px', width: '130px'}}
                            />
                      }
                    </Link>
                  }
                </div>
                <nav id="mobile-menu">
                  <ul className={`main-nav ${isMegaMenu ? 'active' : ''}`}>
                    {sideBar.map((mainMenus: any, index) => (
                      <React.Fragment key={index}>
                        {mainMenus.separateRoute ? (
                          <li className={`has-submenu megamenu ${mainMenus?.menu?.some((item: any) => item?.route?.includes(location.pathname)) ? "active" : ""}`} onMouseOver={() => setIsMegaMenu(true)} onMouseLeave={() => setIsMegaMenu(false)}>
                            <Link to={routes.home5} >
                              {mainMenus.tittle}
                              <i className={`${location.pathname === '/index' ? 'fa-solid fa-plus' : 'fa-solid fa-angle-down'} `}></i>
                            </Link>
                           
                          </li>
                        ) : (
                          <>
                            {mainMenus.twoTitle ? (
                              <li className={`has-submenu mega-innermenu ${mainMenus?.menu?.some((item: any) => item?.route?.includes(location.pathname)) ? "active" : ""}`}>
                                <Link to="#">
                                  {mainMenus.tittle}
                                  <i className={`${location.pathname === '/index' ? 'fa-solid fa-plus' : 'fa-solid fa-angle-down'} `}></i>
                                </Link>
                                <ul className="submenu mega-submenu">
                                  <li>
                                    <div className="megamenu-wrapper">
                                      <div className="row g-lg-4">
                                        <div className="col-lg-6">
                                          <h6>{mainMenus.subTitle}</h6>
                                          <ul>
                                            {mainMenus.menu.map((menu: { menuValue: any, route: string; }, idx: React.Key | null | undefined) => (
                                              menu.menuValue &&
                                              <li key={idx} className={location.pathname === menu.route ? 'active' : ''}>
                                                <Link to={menu.route}>{menu.menuValue}</Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                        <div className="col-lg-6">
                                          <h6>{mainMenus.subTitle2}</h6>
                                          <ul>
                                            {mainMenus.menu.map((menu: { menuValue2: any, route: string; }, idx: React.Key | null | undefined) => (
                                              menu.menuValue2 &&
                                              <li key={idx} className={location.pathname === menu.route ? 'active' : ''}>
                                                <Link to={menu.route}>{menu.menuValue2}</Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </li>
                            ) : (
                              <li className={`has-submenu mega-innermenu ${mainMenus?.menu?.some((item: any) => item?.route?.includes(location.pathname)) ? "active" : ""}`}>
                                <Link to="#">
                                  {mainMenus.tittle}
                                  <i className={`${location.pathname === '/index' ? 'fa-solid fa-plus' : 'fa-solid fa-angle-down'} `}></i>
                                </Link>
                                <ul className="submenu mega-submenu">
                                  <li>
                                    <div className="megamenu-wrapper">
                                      <div className="row">
                                        <div className="col-lg-6">
                                          <h6>{mainMenus.subTitle}</h6>
                                          <ul>
                                            {mainMenus.menu.map((menu: { menuValue: string, route: string; }, idx: React.Key | null | undefined) => (
                                              <li key={idx} className={location.pathname === menu.route ? 'active' : ''}>
                                                <Link to={menu.route}>{menu.menuValue}</Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                        <div className="col-lg-6">
                                          <div className="menu-img">
                                            <ImageWithBasePath
                                              src={mainMenus.img}
                                              className="img-fluid"
                                              alt="img"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </li>
                            )}
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                </nav>
                <div className="header-btn d-flex align-items-center">
                <DarkButton />

                {isAuthenticated ? (
                  <>
                    <div className="dropdown profile-dropdown">
                      <div
                        className="d-flex align-items-center cursor-pointer"
                        onClick={() => setIsDropdownOpen(prev => !prev)}
                      >
                        <span className="avatar avatar-md">
                          <ImageWithBasePath src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740" alt="User Profile" className="img-fluid rounded-circle border border-white border-4" />
                        </span>
                      </div>
                      {isDropdownOpen && (
                        <ul className="dropdown-menu dropdown-menu-end p-3 show" style={{ display: 'block' }}>
                          {role === 'Admin' && (
                          <>
                            <li className="dropdown-header">Admin Dashboard</li>
                            <li><Link className="dropdown-item" to={routes.agentDashboard}><i className="me-2 fas fa-tachometer-alt"></i> Dashboard</Link></li>
                            <li><Link className="dropdown-item" to={routes.agentListing}><i className="me-2 fas fa-list"></i> Listings</Link></li>
                            <li><Link className="dropdown-item" to={routes.agentHotelBooking}><i className="me-2 fas fa-calendar-check"></i> Bookings</Link></li>
                            <li><Link className="dropdown-item" to={routes.agentEnquirers}><i className="isax isax-people me-2" /> Users</Link></li>
                            <li><Link className="dropdown-item" to={routes.agentEarnings}><i className="me-2 fas fa-money-bill-wave"></i> Earnings</Link></li>
                            <li><hr className="dropdown-divider my-2" /></li>
                          </>  
                        )}
                        <li><Link className="dropdown-item" to={routes.customerHotelBooking}><i className="isax isax-calendar me-2" />My Booking</Link></li>
                        <li><Link className="dropdown-item" to={routes.userMyProfile}> <i className="isax isax-profile-tick5 me-2" />My Profile</Link></li>
                        <li><hr className="dropdown-divider my-2" /></li>
                        <li><Link className="dropdown-item" to={routes.userProfileSettings}> <i className="isax isax-setting-25" /> Settings</Link></li>
                       <li>
                        <a
                          href="#"
                          className="dropdown-item text-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#logout_modal"
                        ><i className="isax isax-logout-15" /> Logout
                        </a>
                      </li>
                        </ul>
                      )}
                        {/*<li><Link className="dropdown-item" to={routes.userDashboard}>Dashboard</Link></li>*/}
                       
                    </div>
                    {/*<Link to={routes.Profile} className="btn btn-primary me-0">Add Listing</Link>*/}
                  </>
                ) : (
                  <>
                    <Link to={routes.login} className="btn btn-white me-3" >Sign In</Link>
                    <Link to={routes.register} className="btn btn-primary me-0">Sign Up</Link>
                  </>
                )}

                {/* Hamburger for mobile */}
                <div className="header__hamburger d-xl-none my-auto">
                  <div className="sidebar-menu" onClick={() => setIsOffcanva(true)}>
                    <i className="isax isax-menu5" />
                  </div>
                </div>
              <div/>
              </div>
              </div>
            </div>
          </div>
        </header>
        {/* /Header */}
      </div>
      <LoginModal />
      <RegisterModal />
      <ForgotPasswordModal />
      <ChangePasswordModal />
      <LogoutModal/>
    </>


  )
}

export default Header


