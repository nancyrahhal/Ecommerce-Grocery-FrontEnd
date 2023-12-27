import AdminSidbar from "./AdminSidbar";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories with store names from the server
    fetch(process.env.REACT_APP_API_URL+"/category")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Categories:", data);
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleDelete = (categoryId) => {
    // Make a DELETE request to your server
    fetch(process.env.REACT_APP_API_URL+`/category/${categoryId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // If deletion is successful, update the state to reflect the change
        setCategories((prevCategories) => prevCategories.filter(category => category._id !== categoryId));
      })
      .catch((error) => console.error("Error deleting category:", error));
  };

  return (
    <section className="table-container">
      <AdminSidbar />
      <div className="table-wrapper">
        <h1 className="table-title">Category</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Category Name</th>
              <th>Store Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.categoryName}</td>
                <td>{category.storeName}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${category.storeID}`}>View Grocery</Link>
                    </button>
                    <button onClick={() => handleDelete(category._id)}>Delete Grocery</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CategoryTable;
