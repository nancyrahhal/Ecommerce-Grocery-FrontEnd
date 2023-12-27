import React from "react";
import "./adminview.css";
import offerpic from "./offerpic.png"
const ViewOffer = ({ offer }) => {
  console.log(offer);
  return (
    <div className="view-container">
      <h1 className="view-title">{offer._id}</h1>
      <form className="view-form">
        <label htmlFor="Image" className="view-image">
          Image
        </label>
        <img className="view-image" src={{ offerpic }} alt="offerpicture" />
        <label htmlFor="Name">Product ID</label>
        <input
          value={offer.description}
          type="text"
          id="Name"
          name="Name"
          readOnly
        />

        <label htmlFor="Number">Grocery Name</label>
        <input
          value="grocery name value"
          type="text"
          id="Number"
          name="Number"
          readOnly
        />

        <label htmlFor="Location">Old price</label>
        <input value="10$" type="text" id="Location" name="Location" readOnly />

        <label htmlFor="City">New price</label>
        <input
          value="8$"
          type="text"
          id="City"
          name="City"
          readOnly
        />
      </form>
    </div>
  );
};

export default ViewOffer;
