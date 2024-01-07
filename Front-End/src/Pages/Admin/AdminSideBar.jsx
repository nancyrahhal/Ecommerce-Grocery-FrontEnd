import React from 'react'
import {Link} from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const AdminSidebar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
   <div className="admin-sidebar">
    <Link to="/admin" className='admin-sidebar-title'>
    <i className="bi bi-columns"></i>
    Dashboard
    </Link>
    <ul className="admin-dashboard-list">
      <Link className='admin-sidebar-link' to="/admin-dashbord/offer-table">
        <i className="bi bi-emoji-smile"></i>
        Offers
      </Link>
      <Link className='admin-sidebar-link' to="/admin-dashboard/grocery-table">
        <i className="bi bi-shop"></i>
        Groceries
      </Link>
      <Link className='admin-sidebar-link' to="/admin-dashboard/category-table">
        <i className="bi bi-tag-fill"></i>
        Categories
      </Link>
      <Link className='admin-sidebar-link' to="/admin-dashboard/product-table">
        <i className="bi bi-cart-check"></i>
        Products
      </Link>
      {/* <Link className='admin-sidebar-link' to="admin-dashboard/comment-table">
        <i className="bi bi-chat-left-text"></i>
        Comments
      </Link> */}
      {user && (
            <div>
              <span>{user.username}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}

    </ul>
   </div>
  )
}

export default AdminSidebar