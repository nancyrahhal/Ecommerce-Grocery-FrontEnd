import React from "react";
import "./adminview.css";

const ViewGrocery = ({ grocery }) => {
  console.log("vie",grocery)
  return (
    <div className="view-container">
      <h1 className="view-title">{grocery?.storeName}</h1>
      <form className="view-form">
        <img
          className="view-image"
          src={`http://localhost:4000/uploads/${grocery.storeImage}`}
          alt={grocery?.storeName}
        />

        <label htmlFor="Name">Owner Name</label>
        <input
          value={grocery?.admin.username}
          type="text"
          id="Name"
          name="Name"
          readOnly
        />

        <label htmlFor="Number">Number</label>
        <input
          value={grocery?.phoneNumber}
          type="text"
          id="Number"
          name="Number"
          readOnly
        />

        <label htmlFor="City">City</label>
        <input
          value={grocery?.city}
          type="text"
          id="City"
          name="City"
          readOnly
        />

        <label htmlFor="Area">Area</label>
        <input
          value={grocery?.area}
          type="text"
          id="Area"
          name="Area"
          readOnly
        />
      </form>
    </div>
  );
};

export default ViewGrocery;
