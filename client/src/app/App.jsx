// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import classes from "./app.module.css";

// Import components
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import ContactUs from "../pages/contact/ContactUs";
import VerifyAndReset from "../pages/verifyAndReset/VerifyAndReset";
import Auth from "../pages/auth/Auth";
import Camping from "../pages/camping/Camping";
import ProfilePage from "../pages/profile/ProfilePage";
import Attraction from "../pages/attraction/Attraction";
import Home from "../pages/Home/Home";

// Simple home component for after login
// function Home() {
//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>Welcome to DoOlanyaTrips!</h1>
//       <p>Discover amazing attractions and plan your next adventure.</p>
//     </div>
//   );
// }

export default function App() {
  return (
    <div className={classes.appContainer}>
      <Header />
      <main className={classes.mainContent}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Auth isLogin={true} />} />
          <Route path="/register" element={<Auth isLogin={false} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify" element={<VerifyAndReset />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/camping" element={<Camping />} />
          <Route path="/attraction" element={<Attraction />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
