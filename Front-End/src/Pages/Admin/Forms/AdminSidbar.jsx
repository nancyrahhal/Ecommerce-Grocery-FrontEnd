import React from "react";
import { Link } from "react-router-dom";

const AdminSidbar = () => {
  return (
    <div className="admin-sidebar">
      <Link to="/admin" className="admin-sidebar-title">
        <i className="bi bi-columns"></i>
        Dashboard
      </Link>
      <ul className="admin-dashboard-list">
        <Link className="admin-sidebar-link" to="/admin/offer-table">
          <i className="bi bi-emoji-smile"></i>
          Offers
        </Link>
        <Link
          className="admin-sidebar-link"
          to="/admin/grocery-table"
        >
          <i className="bi bi-shop"></i>
          Groceries
        </Link>
        <Link
          className="admin-sidebar-link"
          to="/admin/category-table"
        >
          <i className="bi bi-tag-fill"></i>
          Categories
        </Link>
        <Link
          className="admin-sidebar-link"
          to="/admin/product-table"
        >
          <i className="bi bi-cart-check"></i>
          Products
        </Link>
        {/* <Link className='admin-sidebar-link' to="admin-dashboard/comment-table">
        <i className="bi bi-chat-left-text"></i>
        Comments
      </Link> */}
      </ul>
    </div>
  );
};

export default AdminSidbar;
