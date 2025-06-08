import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import TourListingsPage from "./pages/Listing";
import GuideDetailPage from "./pages/GuideDetailPage";
import UserBookings from "./pages/UserBookings";
import GuideBookingRequests from "./pages/GuideBookingRequests";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/listing/:listingId" element={<TourListingsPage />} />
          <Route path="/guide/:guideId" element={<GuideDetailPage />} />
          <Route path="/user-bookings" element={<UserBookings />} />
          <Route path="/guide-bookings" element={<GuideBookingRequests />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
