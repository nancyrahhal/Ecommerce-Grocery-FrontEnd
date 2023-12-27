import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [storeID, setStoreID] = useState("");
  const [groceryStores, setGroceryStores] = useState([]);

  // Fetch the list of grocery stores when the component mounts
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL+"/groceries") // Update the endpoint as needed
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
    if (categoryName.trim() === "") return toast.error("Category Name is required");
    if (!storeID) return toast.error("Please select a grocery store");

    // Send the form data to the server
    fetch(process.env.REACT_APP_API_URL+"/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryName,
        storeID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          // Reset the form
          setCategoryName("");
          setStoreID("");
          toast.success("Category added successfully");
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
          <label htmlFor="storeID">Grocery Store</label>
          <select
            value={storeID}
            onChange={(e) => setStoreID(e.target.value)}
            id="storeID"
          >
            <option value="">Select Grocery Store</option>
            {groceryStores.map((store) => (
              <option key={store._id} value={store._id}>
                {store.StoreName}
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
