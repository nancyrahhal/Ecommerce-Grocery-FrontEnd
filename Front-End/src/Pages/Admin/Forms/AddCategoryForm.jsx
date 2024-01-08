import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";

const AddCategoryForm = ({ setRefresh }) => {
  const [categoryName, setCategoryName] = useState("");
  const [groceryId, setStoreID] = useState("");
  const [groceryStores, setGroceryStores] = useState([]);
  const [categoryImage, setCategoryImage] = useState(null);

  // Fetch the list of grocery stores when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/api/groceries") // Update the endpoint as needed
      .then((response) => response.json())
      .then((data) => {
        setGroceryStores(data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch grocery stores");
      });
  }, []);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (categoryName.trim() === "")
      return toast.error("Category Name is required");
    if (!groceryId) return toast.error("Please select a grocery store");
    if (!categoryImage) return toast.error("Please select Image");

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("groceryId", groceryId);
    formData.append("image", categoryImage);

    // Send the form data to the server
    fetch("http://localhost:4000/api/categories", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("dd", data);
        if (data.categoryName === categoryName) {
          // Reset the form
          setCategoryName("");
          setStoreID("");
          setCategoryImage(null);
          setRefresh()
          toast.success("Category added successfully", {
          autoClose: 1500,
        });
        } else {
          toast.error("Failed to add category: " + data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to add category");
      });
  };

  return (
    <div className="add-category">
      <h6 className="add-category-title">Add New Category</h6>
      <form onSubmit={formSubmitHandler} className="add-category-form">
        <div className="add-category-form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            type="text"
            id="categoryName"
            placeholder="Enter Category Name"
          />

          <label htmlFor="categoryImage">Category Image</label>
          <input
            onChange={(e) => setCategoryImage(e.target.files[0])}
            type="file"
            id="categoryImage"
            name="categoryImage"
          />
          <label htmlFor="groceryId">Grocery Store</label>

          <select
            value={groceryId}
            onChange={(e) => setStoreID(e.target.value)}
            id="groceryId"
          >
            <option value="">Select Grocery Store</option>
            {groceryStores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.storeName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="add-category-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;