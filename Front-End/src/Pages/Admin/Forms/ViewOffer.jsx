import React from "react";
import "./adminview.css";
import offerpic from "../../../assets/offerpic.png";
const ViewOffer = ({ offer }) => {
  console.log(offer);
  return (
    <div className="view-container">
      {/* <h1 className="view-title">{offer.id}</h1> */}
      <form className="view-form">
        <img
          className="view-image"
          src={`http://localhost:4000/${offer.image}`}
          alt="offerpicture"
        />
        <label htmlFor="Name">Product ID</label>
        <input
          // value={offer.description}
          value={offer.id}
          type="text"
          id="Name"
          name="Name"
          readOnly
        />

        <label htmlFor="Number">Grocery Name</label>
        <input
          value={offer.grocery[0].storeName}
          type="text"
          id="Number"
          name="Number"
          readOnly
        />

        <label htmlFor="Location">Old price</label>
        <input value={offer.price} type="text" id="Location" name="Location" readOnly />

        <label htmlFor="City">New price</label>
        <input value={offer.newPrice} type="text" id="City" name="City" readOnly />
      </form>
    </div>
  );
};

export default ViewOffer;
