import React from "react";
import "./AdminDashboard.css";
import AdminSidebar from "./AdminSideBar.jsx";
import AdminMain from "./AdminMain.jsx";
const AdminDashboard = () => {
  return (
    <div>
      <section className="admin-dashboard">
        <AdminSidebar />
        <AdminMain />
      </section>
    </div>
  );
};

export default AdminDashboard;
