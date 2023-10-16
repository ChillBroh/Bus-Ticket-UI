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
      <Route path="/bus" element={<Bus />} />
      <Route path="/add-bus" element={<AddBus />} />
      {/* App routes*/}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/payment" element={<PaymentGateway />} />
      <Route path="/balance" element={<Balance />} />
    </Routes>
  );
};

export default Router;
