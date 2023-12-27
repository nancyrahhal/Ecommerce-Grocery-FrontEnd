import React from "react";
import AdminSidbar from "./AdminSidbar";
import AdminMain from "./AdminMain";
import "./admin.css";

const AdminDashBoard = () => {
  return (
    <div>
      <section className="admin-dashboard">
        <AdminSidbar />
        <AdminMain />
      </section>
    </div>
  );
};

export default AdminDashBoard;
