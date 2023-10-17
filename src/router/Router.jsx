import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import AdminHome from "../pages/admin/AdminHome";
import Bus from "../pages/admin/Bus/Bus";
import AddBus from "../pages/admin/Bus/AddBus";
import PaymentGateway from "../pages/PaymentGateway";
import Balance from "../pages/Balance";
import TopupAccountCreate from "../pages/TopupAccountCreate";
import TopupAccountList from "../pages/TopupAccountList";
import HomePage from "../pages/HomePage";
import UserProfile from "../pages/UserProfile";
import Schedules from "../pages/Schedules";
import NotFound from "../pages/NotFound";

const Router = () => {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const admin = user?.decodedJWT.role === "Manager";

    if (!admin) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <Routes>
      {/* admin Route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<HomePage />} />
      <Route path="/bus" element={<Bus />} />
      <Route path="/add-bus" element={<AddBus />} />
      {/* App routes*/}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user" element={<UserProfile />} />
      <Route path="/payment/:id" element={<PaymentGateway />} />
      <Route path="/topup-account-create" element={<TopupAccountCreate />} />
      <Route path="/topup-account-list" element={<TopupAccountList />} />
      <Route path="/recharge/:id/:balance" element={<Balance />} />
      <Route path="/schedules" element={<Schedules />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
