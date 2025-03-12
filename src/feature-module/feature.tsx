import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Header from "../core/common/header/header";
import Cursor from "../core/common/cursor/cursor";
import BackToTop from "../core/common/backtotop/backToTop";
import Footer from "../core/common/footer/footer";

const Feature = () => {
  const [showLoader, setShowLoader] = useState(false);

  const location = useLocation();
 
  const Preloader = () => {
    return (
      <div id="loader-wrapper" >
        <div id="loader">
          <span className="loader-line" />
        </div>
      </div>

    );
  };
  useEffect(() => {
    if(location.pathname.includes('index') ) {
      setShowLoader(true)
      const timeoutId = setTimeout(() => {
        setShowLoader(false);
      }, 2000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    window.scrollTo(0, 0);
  }, [location.pathname])
  
  return (
    <>
 
    <div>
       <>
          {showLoader ? 
          <>
          <Preloader />
          <div
          >
            <Header/>
            <Outlet />
            {location.pathname === '/index-2' || location.pathname === '/index-3' || location.pathname === '/index-4' 
        || location.pathname === '/index-5' || location.pathname === '/index-6' ? <></>:<Footer/>}
            
            <Cursor />
            <BackToTop/>
          </div>
          </> :
          <>
          <div>
            <Header/>
            <Outlet />
            {location.pathname === '/index-2' || location.pathname === '/index-3' || location.pathname === '/index-4' 
        || location.pathname === '/index-5' || location.pathname === '/index-6' ? <></>:<Footer/>}
            <Cursor />
            <BackToTop/>
          </div>
          </>}
          
        </>
      {/* <Loader/> */}

      <div className="sidebar-overlay"></div>
    </div>
    </>
  );
};

export default Feature;
