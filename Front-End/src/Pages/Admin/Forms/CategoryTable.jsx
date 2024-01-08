import AdminSidbar from "./AdminSidbar";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories with store names from the server
    fetch("http://localhost:4000/api/categories")
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
const confirm =window.confirm("Are you sure you want to delete");
if (confirm) {
  // Make a DELETE request to your server
  fetch(`http://localhost:4000/api/categories/${categoryId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // If deletion is successful, update the state to reflect the change
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
    })
    .catch((error) => console.error("Error deleting category:", error));
}
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
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.categoryName}</td>
                <td>{category.grocery[0].storeName}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${category.grocery[0].id}`}>  
                        View Grocery
                      </Link>
                    </button>
                    <button onClick={() => handleDelete(category.id)}>
                      Delete Grocery
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CategoryTable;
