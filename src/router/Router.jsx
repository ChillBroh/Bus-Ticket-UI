import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import AdminHome from "../pages/admin/AdminHome";
import Bus from "../pages/admin/Bus/Bus";

const Router = () => {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const admin = user?.isAdmin === true;

    if (!admin) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <Routes>
      {/* admin Route */}
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/bus" element={<Bus />} />
      {/* App routes*/}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Router;
