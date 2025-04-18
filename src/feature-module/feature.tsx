import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Header from "../core/common/header/header";
import Cursor from "../core/common/cursor/cursor";
import BackToTop from "../core/common/backtotop/backToTop";
import Footer from "../core/common/footer/footer";
import io from "socket.io-client";

const socket = io('http://localhost:3002', { autoConnect: true });
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
  useEffect(() => {
    const handleNewReservation = (data: any) => {
      const newNotification = {
        id: Date.now(),
        type: "New Reservation",
        message: `New reservation: ${data.reservation?.Num_Reservation || "Unknown"}`,
        time: new Date().toLocaleTimeString(),
      };
  
      const existing = JSON.parse(localStorage.getItem("notifications") || "[]");
      const updated = [newNotification, ...existing];
      localStorage.setItem("notifications", JSON.stringify(updated));
  
      const unread = JSON.parse(localStorage.getItem("unreadNotificationIds") || "[]");
      const updatedUnread = [newNotification.id, ...unread];
      localStorage.setItem("unreadNotificationIds", JSON.stringify(updatedUnread));
  
      console.log("📥 New reservation received via socket");
    };
  
    if (!socket.connected) socket.connect();
    socket.on("new_reservation", handleNewReservation);
  
    return () => {
      socket.off("new_reservation", handleNewReservation);
    };
  }, []);
  
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
