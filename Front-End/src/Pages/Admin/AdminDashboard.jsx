import {useState} from "react";
import "./AdminDashboard.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import AdminMain from "./AdminMain.jsx";
import AdminGrocery from "./AdminGrocery.jsx";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const [selectedTab, setSelectedTab] = useState("Main");

  const handleClick = () => {
    logout();
  };
  return (
      <section className="admin-dashboard">
      <div className="admin-sidebar">
      {user && (
        <div>
          <span>{user.username}</span>
          <button onClick={handleClick}>Log out</button>
        </div>
      )}


      <div className="home-tab d-flex flex-row p-5 align-items-center justify-content-center w-100">
        <Link
          className="d-flex align-items-center text-decoration-none"
          onClick={() => setSelectedTab("Main")}
        >
          <i className="home-icon bi bi-house "></i>
          <h4 className="mt-3 mx-3">Dashboard</h4>
        </Link>
      </div>


      <div className="home-tab d-flex flex-row p-5 align-items-center justify-content-center w-100">
        <Link
          className="d-flex align-items-center text-decoration-none"
          onClick={() => setSelectedTab("Grocery")}
        >
          <i className="home-icon bi bi-house "></i>
          <h4 className="mt-3 mx-3">Grocery</h4>
        </Link>
      </div>

      
    </div>
    {selectedTab === "Main" && <AdminMain/>}
    {selectedTab === "Grocery" && <AdminGrocery/>}

      </section>
  );
};

export default AdminDashboard;
