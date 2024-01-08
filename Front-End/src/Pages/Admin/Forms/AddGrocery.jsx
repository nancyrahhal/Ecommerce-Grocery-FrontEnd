import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";

const AddGrocery = ({ setRefresh }) => {
  const [groceryName, setGroceryName] = useState("alicopter");
  const [phoneNumber, setPhoneNumber] = useState("711111");
  const [city, setCity] = useState("cityA");
  const [area, setArea] = useState("AREA");
  const [storeImage, setStoreImage] = useState(null);
  const [longitude, setLongitude] = useState("33.3");
  const [latitude, setLatitude] = useState("35.1");
  const [admins, setAdmins] = useState("");
  const [adminId, setAdminId] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/admins") // Update the endpoint as needed
      .then((response) => response.json())
      .then((data) => {
        setAdmins(data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch Admins");
      });
  }, []);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (groceryName.trim() === "")
      return toast.error("Grocery Name is required");
    if (phoneNumber.trim() === "")
      return toast.error("Phone Number is required");
    if (city.trim() === "") return toast.error("City is required");
if(!adminId) return toast.error("please select store Owner");
if (!storeImage) return toast.error("please select Image");

    // Send the form data to the server
    const formData = new FormData();
    formData.append("storeName", groceryName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("city", city);
    formData.append("area", area);
    formData.append("storeImage", storeImage);
    formData.append("adminId", adminId);
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);

    fetch("http://localhost:4000/api/groceries", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.storeName === groceryName) {
          // Reset the form
          setGroceryName("");
          setPhoneNumber("");
          setCity("");
          setArea("");
          setStoreImage(null);
          toast.success("Grocery added successfully", { autoClose: 1500 });
          setRefresh();
        } else {
          toast.error("Failed to add grocery: GroceryName Exists " + data.error);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to add grocery");
      });
  };

  return (
    <div className="add-category">
      <h6 className="add-category-title">Add New Grocery</h6>
      <form onSubmit={formSubmitHandler} className="add-category-form">
        <div className="add-category-form-group">
          <label htmlFor="groceryName">Grocery Name</label>
          <input
            value={groceryName}
            onChange={(e) => setGroceryName(e.target.value)}
            type="text"
            id="groceryName"
            placeholder="Enter Grocery Name"
          />
          <label htmlFor="adminId">Store Owner</label>

          <select
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            id="adminId"
          >
            <option value="">Select Grocery Admin</option>
            {admins &&
              admins
                .filter((admin) => admin.role === "admin")
                .map((admin) => (
                  <option key={admin.id} value={admin.id}>
                    {admin.username}
                  </option>
                ))}
          </select>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="number"
            id="phoneNumber"
            placeholder="Enter Phone Number"
          />

          <label htmlFor="city">City</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            id="city"
            placeholder="Enter City"
          />
          <label htmlFor="area">Area</label>
          <input
            value={area}
            onChange={(e) => setArea(e.target.value)}
            type="text"
            id="area"
            placeholder="Enter Area"
          />
          <label htmlFor="longitude">longitude</label>
          <input
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            type="text"
            id="longitude"
            placeholder="Enter Location Longitude"
          />
          <label htmlFor="latitude">longitude</label>
          <input
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            type="text"
            id="latitude"
            placeholder="Enter Location Longitude"
          />
          <label htmlFor="groceryImage">Grocery Image</label>
          <input
            onChange={(e) => setStoreImage(e.target.files[0])}
            type="file"
            id="groceryImage"
            name="groceryImage"
          />
        </div>
        <button type="submit" className="add-category-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddGrocery;
