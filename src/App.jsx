import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Section from "./pages/Section/Section";
import Lc from "./pages/Center/Lc";
import Resources from "./components/Resources/Resources";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Profile from "./pages/Auth/Profile/Profile";
import Verifyotp from "./pages/Auth/Verifyotp/Verifyotp";
import CenterDetail from "./pages/Center/CenterDetail";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer";

const Home = () => (
  <div className="">
    <Section />
    <Lc />
  </div>
);

const AppContent = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verifyotp" element={<Verifyotp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/section" element={<Section />} />
          <Route path="/centers" element={<Lc />} />
          <Route path="/center/:id" element={<CenterDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
