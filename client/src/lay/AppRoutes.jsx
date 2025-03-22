import { BrowserRouter, Routes, Route } from "react-router";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Navbar from "../components/Navbar";
import SalesReportForm from "../pages/salesForm";
import AppContent from "../components/AppContent";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/invoice" element={<AppContent />} />
        <Route path="/sales" element={<SalesReportForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
