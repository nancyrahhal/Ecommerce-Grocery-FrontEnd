import React from "react";
import "./adminview.css";

const ViewGrocery = ({ grocery }) => {
  return (
    <div className="view-container">
      <h1 className="view-title">{grocery.StoreName}</h1>
      <form className="view-form">
        <label htmlFor="Image" className="view-image">Image</label>
        <img className="view-image" src={grocery.StoreImage} alt={grocery.StoreName} />

        <label htmlFor="Name">Owner Name</label>
        <input value={grocery.OwnerName} type="text" id="Name" name="Name" readOnly />

        <label htmlFor="Number">Number</label>
        <input value={grocery.PhoneNumber} type="text" id="Number" name="Number" readOnly />

        <label htmlFor="Location">Location</label>
        <input value={grocery.Location} type="text" id="Location" name="Location" readOnly />

        <label htmlFor="City">City</label>
        <input value={grocery.City} type="text" id="City" name="City" readOnly />

        <label htmlFor="Area">Area</label>
        <input value={grocery.Area} type="text" id="Area" name="Area" readOnly />
      </form>
    </div>
  );
};

export default ViewGrocery;
