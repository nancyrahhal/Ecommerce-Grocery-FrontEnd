import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";

const AddProducts = ({ setRefresh }) => {
  const [productName, setProductName] = useState("pro");
  const [price, setPrice] = useState(100);
  const [productImage, setProductImage] = useState(null);
  const [categoryId, setCategoryID] = useState("");
  const [groceryId, setGroceryId] = useState("");
  const [newPrice, setNewPrice] = useState(50);
  const [itsOffer, setItsOffer] = useState();
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // Fetch stores when the component mounts
    fetchStores();
  }, []);

  const fetchStores = () => {
    // Fetch stores from the server
    fetch("http://localhost:4000/api/groceries")
      .then((response) => response.json())
      .then((data) => {
        setStores(data);
      })
      .catch((error) => console.error("Error fetching stores:", error));
  };

  const fetchCategories = (selectedStoreID) => {
    // Fetch categories based on the selected store
    fetch(`http://localhost:4000/api/categories/?groceryId=${selectedStoreID}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched categories:", data);

        // Update state with the new data structure
        setCategories(data);

        // ... (rest of your code)
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const handleStoreChange = (selectedStoreID) => {
    setGroceryId(selectedStoreID);
    // Fetch categories for the selected store
    fetchCategories(selectedStoreID);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (productName.trim() === "")
      return toast.error("Product Name is required");
    if (price <= 0) return toast.error("Price must be greater than 0");
    if (!groceryId) return toast.error("Grocery Store Name is required");
    if (!categoryId) return toast.error("Category is required");

    if (!productImage) return toast.error("Image is required");
    // Send the form data to the server
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("image", productImage);
    formData.append("categoryId", categoryId);
    formData.append("groceryId", groceryId);
    formData.append("newPrice", newPrice);
    if (itsOffer) {
      formData.append("itsOffer", 1);
    }
    formData.append("itsOffer", 0);

    fetch("http://localhost:4000/api/products", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.productName === productName) {
          // Reset the form
          setProductName("");
          setPrice(0);
          setProductImage(null);
          setCategoryID("");
          setGroceryId("");
          setNewPrice(0);
          setItsOffer(0);
          toast.success("Product added successfully");
          setRefresh();
        } else {
          toast.error("Failed to add product: " + data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to add product");
      });
  };

  return (
    <div className="add-category">
      <h6 className="add-category-title">Add New Product</h6>
      <form onSubmit={formSubmitHandler} className="add-category-form">
        <div className="add-category-form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            id="productName"
            placeholder="Enter Product Name"
          />
          <label htmlFor="price">Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
            type="number"
            id="price"
            placeholder="Enter Price"
          />
          <label htmlFor="groceryId">Store</label>
          <select
            value={groceryId}
            onChange={(e) => handleStoreChange(e.target.value)}
            id="groceryId"
          >
            <option value="">Select Store</option>
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.storeName}
              </option>
            ))}
          </select>
          <label htmlFor="categoryId">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryID(e.target.value)}
            id="categoryId"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <label htmlFor="productImage">Product Image</label>
          <input
            onChange={(e) => setProductImage(e.target.files[0])}
            type="file"
            id="productImage"
            name="productImage"
          />
          <label htmlFor="newPrice">New Price</label>
          <input
            value={newPrice}
            onChange={(e) => setNewPrice(parseFloat(e.target.value) || 0)}
            type="number"
            id="newPrice"
            placeholder="Enter New Price"
          />
          <label htmlFor="itsOffer">Want to add an offer?</label>
          <input
            type="checkbox"
            checked={itsOffer == 1}
            onChange={(e) => setItsOffer(e.target.checked)}
            id="itsOffer"
          />
        </div>
        <button type="submit" className="add-category-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
