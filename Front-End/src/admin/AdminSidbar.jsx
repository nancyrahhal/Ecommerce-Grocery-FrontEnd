import React from 'react'
import {Link} from "react-router-dom"

const AdminSidbar = () => {
  return (
   <div className="admin-sidebar">
    <Link to="/admin-dashbord" className='admin-sidebar-title'>
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

    </ul>
   </div>
  )
}

export default AdminSidbar
