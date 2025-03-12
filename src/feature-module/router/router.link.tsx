import { Navigate, Route } from "react-router";
import { all_routes } from "./all_routes";
import Login from "../auth/login/login";
import HomeOne from "../home-one/homeOne";
import AddFlight from "../flight/addFlight";
import Payment from "../userDashboard/payment/payment";
import Register from "../auth/register/register";
import ForgotPassword from "../auth/forgot-password/forgotPassword";
import ChangePassword from "../auth/change-password/changePassword";
import HomeTwo from "../home-Two/homeTwo";
import HomeThree from "../home-three/homeThree";
import HomeFour from "../home-four/homeFour";
import HomeFive from "../home-five/homeFive";
import HomeSix from "../home-six/homeSix";
import TourGrid from "../tour/tour-grid/tourGrid";
import HotelMap from "../hotel/hotel-map/hotelMap";
import HotelDetails from "../hotel/hotel-details/hotelDetails";
import TourList from "../tour/tour-list/tourList";
import TourMap from "../tour/tour-map/tourMap";
import TourBooking from "../tour/tour-booking/tourBooking";
import TourBookingConfirmation from "../tour/tour-bookingConfirmation/tourBookingConfirmation";
import CuriseGrid from "../curise/curise-grid/curiseGrid";
import BlogList from "../blog/blog-list/blogList";
import BlogGrid from "../blog/blog-grid/blogGrid";
import BlogDetails from "../blog/blog-details/blogDetails";
import Destination from "../pages/Destination/destination";
import AboutUs from "../pages/about-us/about_us";
import Teams from "../pages/teams/teams";
import CarList from "../car/car-list/carList";
import FlightList from "../flight/flight-list/flightList";
import CruiseList from "../curise/cruise-list/cruiseList";
import HotelList from "../hotel/hotel-list/hotelList";
import HotelGrid from "../hotel/hotel-grid/hotelGrid";
import FlightGrid from "../flight/flight-grid/flightGrid";
import Invoices from "../pages/invoices/invoices";
import Notification from "../userDashboard/notification/notification";
import UserFlightBooking from "../userDashboard/myBooking/flight/userFlightBooking";
import UserCarBooking from "../userDashboard/myBooking/car/userCarBooking";
import UserHotelsBooking from "../userDashboard/myBooking/hotels/userHotelsBooking";
import UserChat from "../userDashboard/message/userChat";
import UserWishlist from "../userDashboard/wishlist/userWishlist";
import UserWallet from "../userDashboard/wallet/userWallet";
import MyProfile from "../userDashboard/myProfile/myProfile";
import ProfileSettings from "../userDashboard/settings/profileSettings";
import UserCruiseBooking from "../userDashboard/myBooking/cruise/userCruiseBooking";
import HotelBooking from "../hotel/hotel-booking/hotelBooking";
import PrivacyPolicy from "../pages/privacy-policy/privacyPolicy";
import ContactUs from "../pages/contact/contactUs";
import AddHotel from "../hotel/add-hotel/addHotel";
import CarGrid from "../car/car-grid/carGrid";
import Error404 from "../pages/error/Error404";
import Error500 from "../pages/error/Error500";
import FAQ from "../pages/Faq/FAQ";
import Gallery from "../pages/Gallery/Gallery";
import PricingPlan from "../pages/pricing-plan/PricingPlan";
import Testimonials from "../pages/Testimonials/Testimonials";
import UnderMaintenance from "../pages/under-maintenance/UnderMaintenance";
import EditHotel from "../agent-dashboard/listing/edit-hotel/editHotel";
import CarMap from "../car/car-map/carMap";
import TourDetails from "../tour/tour-details/tourDetails";
import AddTour from "../tour/add-tour/addTour";
import EditTour from "../agent-dashboard/listing/edit-tour/editTour";
import CarDetails from "../car/car-details/carDetails";
import CruiseBooking from "../curise/cruise-booking/cruiseBooking";
import CruiseDetails from "../curise/curise-details/curiseDetails";
import CruiseBookingConfirmation from "../curise/cruise-booking-confirmation/cruiseBookingConfirmation";
import AddCar from "../car/add-car/addCar";
import EditCar from "../agent-dashboard/listing/edit-car/editCar";
import CruiseMap from "../curise/cruise-map/cruiseMap";
import FlightDetails from "../flight/flight-details/flightDetails";
import FlightBooking from "../flight/flight-booking/flightBooking";
import FlightBookingConfirmation from "../flight/flight-booking-confirmation/flightBookingConfirmation";
import EditFlight from "../agent-dashboard/listing/edit-flight/editFlight";
import AddCruise from "../curise/add-cruise/addCruise";
import EditCruise from "../agent-dashboard/listing/edit-cruise/editCruise";
import CarBooking from "../car/car-booking/carBooking";
import CarBookingConfirmation from "../car/car-booking-confirmation/carBookingConfirmation";
import Dashboard from "../userDashboard/dashboard/dashboard";
import UserTourBooking from "../userDashboard/myBooking/tour/userTourBooking";
import UserReviews from "../userDashboard/myReviews/userReviews";
import NotificationSettings from "../userDashboard/settings/notificationSettings";
import IntegrationSettings from "../userDashboard/settings/integrationSettings";
import SecuritySettings from "../userDashboard/settings/securitySettings";
import AgentDashboard from "../agent-dashboard/dashboard/agentDashboard";
import AgentListings from "../agent-dashboard/listing/agentListings";
import AgentHotelBooking from "../agent-dashboard/Booking/hotel-booking/agentHotelBooking";
import AgentCarBooking from "../agent-dashboard/Booking/car-booking/agentCarBooking";
import AgentCruiseBooking from "../agent-dashboard/Booking/cruise-booking/agentCruiseBooking";
import AgentTourBooking from "../agent-dashboard/Booking/tour-booking/agentTourBooking";
import AgentFlightBooking from "../agent-dashboard/Booking/flight-booking/agentFlightBooking";
import AgentEnquiries from "../agent-dashboard/enquiries/agentEnquiries";
import AgentEnquiriesDetails from "../agent-dashboard/enquiries/agentEnquiriesDetails";
import AgentEarning from "../agent-dashboard/earnings/agentEarning";
import AgentReviews from "../agent-dashboard/reviews/agentReviews";
import AgentSettings from "../agent-dashboard/settings/agentSettings";
import AgentAccountSettings from "../agent-dashboard/settings/agent-account-settings/agentAccountSettings";
import AgentSecuritySettings from "../agent-dashboard/settings/agent-security-settings/agentSecuritySettings";
import AgentPlanSettings from "../agent-dashboard/settings/agent-plan-settings/agentPlanSettings";
import AgentPlan from "../agent-dashboard/agent-plan/agentPlan";
import AgentChat from "../agent-dashboard/agent-message/agentChat";
import AgentNotification from "../agent-dashboard/agent-notification/agentNotification";
import HomeOneRTL from "../pages/rtl/home-one/homeOne";
import ComingSoon from "../pages/coming-soon/comingSoon";
import TermsConditions from "../pages/terms-conditions/termsConditions";
const routes = all_routes;

export const publicRoutes = [
  {
    path: "/",
    name: "Root",
    element: <Navigate to="/index" />,
    route: Route,
  },
  {
    path: routes.home1,
    element: <HomeOne />,
    route: Route,
  },
  {
    path: routes.home2,
    element: <HomeTwo />,
    route: Route,
  },
  {
    path: routes.home3,
    element: <HomeThree />,
    route: Route,
  },
  {
    path: routes.home4,
    element: <HomeFour />,
    route: Route,
  },
  {
    path: routes.home5,
    element: <HomeFive />,
    route: Route,
  },
  {
    path: routes.home6,
    element: <HomeSix />,
    route: Route,
  },
  {
    path: routes.addFlight,
    element: <AddFlight />,
    route: Route,
  },
  {
    path: routes.payment,
    element: <Payment />,
    route: Route,
  },
  {
    path: routes.tourGrid,
    element: <TourGrid />,
    route: Route,
  },
  {
    path: routes.tourList,
    element: <TourList />,
    route: Route,
  },
  {
    path: routes.hotelList,
    element: <HotelList />,
    route: Route,
  },
  {
    path: routes.hotelGrid,
    element: <HotelGrid />,
    route: Route,
  },
  {
    path: routes.carGrid,
    element: <CarGrid />,
    route: Route,
  },
  {
    path: routes.carList,
    element: <CarList />,
    route: Route,
  },
  {
    path: routes.flightList,
    element: <FlightList />,
    route: Route,
  },
  {
    path: routes.flightGrid,
    element: <FlightGrid />,
    route: Route,
  },
  {
    path: routes.cruiseList,
    element: <CruiseList />,
    route: Route,
  },
  {
    path: routes.tourMap,
    element: <TourMap />,
    route: Route,
  },
  {
    path: routes.tourBooking,
    element: <TourBooking />,
    route: Route,
  },
  {
    path: routes.tourBookingConfirmation,
    element: <TourBookingConfirmation />,
    route: Route,
  },
  {
    path: routes.hotelMap,
    element: <HotelMap />,
    route: Route,
  },
  {
    path: routes.hotelDetails,
    element: <HotelDetails />,
    route: Route,
  },
  {
    path: routes.cruiseGrid,
    element: <CuriseGrid />,
    route: Route,
  },
  {
    path: routes.blogList,
    element: <BlogList />,
    route: Route,
  },
  {
    path: routes.blogGrid,
    element: <BlogGrid />,
    route: Route,
  },
  {
    path: routes.blogDetails,
    element: <BlogDetails />,
    route: Route,
  },
  {
    path: routes.destination,
    element: <Destination />,
    route: Route,
  },
  {
    path: routes.about_us,
    element: <AboutUs />,
    route: Route,
  },
  {
    path: routes.teams,
    element: <Teams />,
    route: Route,
  },
  {
    path: routes.invoices,
    element: <Invoices />,
    route: Route,
  },
  {
    path: routes.notification,
    element: <Notification />,
    route: Route,
  },
  {
    path: routes.userFlightBooking,
    element: <UserFlightBooking />,
    route: Route,
  },
  {
    path: routes.userCarBooking,
    element: <UserCarBooking />,
    route: Route,
  },
  {
    path: routes.userCruiseBooking,
    element: <UserCruiseBooking />,
    route: Route,
  },
  {
    path: routes.userHotlesBooking,
    element: <UserHotelsBooking />,
    route: Route,
  },
  {
    path: routes.userChat,
    element: <UserChat />,
    route: Route,
  },
  {
    path: routes.userWishlist,
    element: <UserWishlist />,
    route: Route,
  },
  {
    path: routes.userWallet,
    element: <UserWallet />,
    route: Route,
  },
  {
    path: routes.myProfile,
    element: <MyProfile />,
    route: Route,
  },
  {
    path: routes.profileSettings,
    element: <ProfileSettings />,
    route: Route,
  },
  {
    path: routes.hotelBooking,
    element: <HotelBooking />,
    route: Route,
  },
  {
    path: routes.privacyPolicy,
    element: <PrivacyPolicy />,
    route: Route,
  },
  {
    path: routes.contactUs,
    element: <ContactUs />,
    route: Route,
  },
  {
    path: routes.addHotel,
    element: <AddHotel />,
    route: Route,
  },
  {
    path: routes.FAQ,
    element: <FAQ />,
    route: Route,
  },
  {
    path: routes.Gallery,
    element: <Gallery />,
    route: Route,
  },
  {
    path: routes.pricingPlan,
    element: <PricingPlan />,
    route: Route,
  },
  {
    path: routes.Testimonials,
    element: <Testimonials />,
    route: Route,
  },
  {
    path: routes.underMaintenance,
    element: <UnderMaintenance />,
    route: Route,
  },
  {
    path: routes.editHotel,
    element: <EditHotel />,
    route: Route,
  },
  {
    path: routes.carMap,
    element: <CarMap />,
    route: Route,
  },
  {
    path: routes.tourDetails,
    element: <TourDetails />,
    route: Route,
  },
  {
    path: routes.addTour,
    element: <AddTour />,
    route: Route,
  },
  {
    path: routes.editTour,
    element: <EditTour />,
    route: Route,
  },
  {
    path: routes.addCar,
    element: <AddCar />,
    route: Route,
  },
  {
    path: routes.editCar,
    element: <EditCar />,
    route: Route,
  },
  {
    path: routes.cruiseMap,
    element: <CruiseMap />,
    route: Route,
  },
  {
    path: routes.flightDetails,
    element: <FlightDetails />,
    route: Route,
  },
  {
    path: routes.flightBooking,
    element: <FlightBooking />,
    route: Route,
  },
  {
    path: routes.flightBookingConfirmation,
    element: <FlightBookingConfirmation />,
    route: Route,
  },
  {
    path: routes.editFlight,
    element: <EditFlight />,
    route: Route,
  },
  {
    path: routes.carDetails,
    element: <CarDetails />,
    route: Route,
  },
  {
    path: routes.cruiseBooking,
    element: <CruiseBooking />,
    route: Route,
  },
  {
    path: routes.cruiseDetails,
    element: <CruiseDetails />,
    route: Route,
  },
  {
    path: routes.cruiseBookingConfirmation,
    element: <CruiseBookingConfirmation />,
    route: Route,
  },
  {
    path: routes.addCruise,
    element: <AddCruise />,
    route: Route,
  },
  {
    path: routes.editCruise,
    element: <EditCruise />,
    route: Route,
  },
  {
    path: routes.carBooking,
    element: <CarBooking />,
    route: Route,
  },
  {
    path: routes.carBookingConfirmation,
    element: <CarBookingConfirmation />,
    route: Route,
  },
  {
    path: routes.userDashboard,
    element: <Dashboard />,
    route: Route,
  },
  {
    path: routes.userFlightBooking,
    element: <UserFlightBooking />,
    route: Route,
  },
  {
    path: routes.userTourBooking,
    element: <UserTourBooking />,
    route: Route,
  },
  {
    path: routes.userReviews,
    element: <UserReviews />,
    route: Route,
  },
  {
    path: routes.userChat,
    element: <UserChat />,
    route: Route,
  },
  {
    path: routes.userWishlist,
    element: <UserWishlist />,
    route: Route,
  },
  {
    path: routes.userWallet,
    element: <UserWallet />,
    route: Route,
  },
  {
    path: routes.myProfile,
    element: <MyProfile />,
    route: Route,
  },
  {
    path: routes.profileSettings,
    element: <ProfileSettings />,
    route: Route,
  },
  {
    path: routes.securitySettings,
    element: <SecuritySettings />,
    route: Route,
  },
  {
    path: routes.notificationSettings,
    element: <NotificationSettings />,
    route: Route,
  },
  {
    path: routes.integrationSettings,
    element: <IntegrationSettings />,
    route: Route,
  },
  {
    path: routes.agentDashboard,
    element: <AgentDashboard />,
    route: Route,
  },
  {
    path: routes.agentListing,
    element: <AgentListings />,
    route: Route,
  },
  {
    path: routes.agentHotelBooking,
    element: <AgentHotelBooking />,
    route: Route,
  },
  {
    path: routes.agentCarBooking,
    element: <AgentCarBooking />,
    route: Route,
  },
  {
    path: routes.agentCruiseBooking,
    element: <AgentCruiseBooking />,
    route: Route,
  },
  {
    path: routes.agentTourBooking,
    element: <AgentTourBooking />,
    route: Route,
  },
  {
    path: routes.agentFlightBooking,
    element: <AgentFlightBooking />,
    route: Route,
  },
  {
    path: routes.agentEnquirers,
    element: <AgentEnquiries />,
    route: Route,
  },
  {
    path: routes.agentEnquiriesDetails,
    element: <AgentEnquiriesDetails />,
    route: Route,
  },
  {
    path: routes.agentEarnings,
    element: <AgentEarning />,
    route: Route,
  },
  {
    path: routes.agentReview,
    element: <AgentReviews />,
    route: Route,
  },
  {
    path: routes.agentSettings,
    element: <AgentSettings />,
    route: Route,
  },
  {
    path: routes.agentAccountSettings,
    element: <AgentAccountSettings />,
    route: Route,
  },
  {
    path: routes.agentSecuritySettings,
    element: <AgentSecuritySettings />,
    route: Route,
  },
  {
    path: routes.agentPlanSettings,
    element: <AgentPlanSettings />,
    route: Route,
  },
  {
    path: routes.agentPlan,
    element: <AgentPlan />,
    route: Route,
  },
  {
    path: routes.agentChat,
    element: <AgentChat />,
    route: Route,
  },
  {
    path: routes.agentNotification,
    element: <AgentNotification />,
    route: Route,
  },
  {
    path: routes.homeOneRtl,
    element: <HomeOneRTL />,
    route: Route,
  },
  {
    path: routes.termsConditions,
    element: <TermsConditions />,
    route: Route,
  },

];

export const authRoutes = [

  {
    path: routes.login,
    element: <Login />,
    route: Route,
  },
  {
    path: routes.register,
    element: <Register />,
    route: Route,
  },
  {
    path: routes.forgotPassword,
    element: <ForgotPassword />,
    route: Route,
  },
  {
    path: routes.changepassword,
    element: <ChangePassword />,
    route: Route,
  },

  {
    path: routes.Error404,
    element: <Error404 />,
    route: Route,
  },
  {
    path: routes.Error500,
    element: <Error500 />,
    route: Route,
  },
  {
    path: routes.underMaintenance,
    element: <UnderMaintenance />,
    route: Route,
  },
  {
    path: routes.comingSoon,
    element: <ComingSoon />,
    route: Route,
  },

];
