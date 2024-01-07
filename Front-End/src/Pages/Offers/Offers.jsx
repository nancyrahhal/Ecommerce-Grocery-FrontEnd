import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Offers.css";
const Offers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL + "/product"
        ); // Replace with the correct API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);

  return (
    <div>
      <img
        src="https://t4.ftcdn.net/jpg/02/61/01/87/360_F_261018762_f15Hmze7A0oL58Uwe7SrDKNS4fZIjLiF.jpg"
        className="offersimg"
      />
      <div className="offers-container">
        <div className="offers-list">
          {products
            .filter((product) => product.itsOffer)
            .map((product, index) => (
              <div key={index} className="offer-item">
                <img src={product.image} alt={product.productName} />
                <div className="offer-details">
                  <h3>{product.productName}</h3>
                  <p>
                    <span className="old-price">{product.price}</span>{" "}
                    <span className="new-price">{product.newprice}</span>
                  </p>
                  <p>Store : {product.storeData.StoreName}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;

