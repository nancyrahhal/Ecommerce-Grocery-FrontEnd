import React, { useEffect, useState } from "react";
import "./admin-table.css";
import AdminSidebar from "./AdminSidbar";
import { Link } from "react-router-dom";
import offerpic from "../admin/offerpic.png";
import axios from "axios";
import ViewOffer from "./ViewOffer";

const OffersTables = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL+"/product")
      .then((response) => {
        // Filter products to display only those with itsnew set to true
        const newProducts = response.data.filter((product) => product.itsnew);
        setProducts(newProducts);
      })
      .catch((error) => {
        console.error("There was an error in fetching products", error);
      });
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/product/${id}`)
      .then((response) => {
        console.log(response.data);
        // Update the product's itsnew property to false
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === id ? { ...product, itsnew: false } : product
          )
        );
      })
      .catch((error) => {
        console.error("There was an error in deleting product", error);
      });
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Products with Offers</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Product </th>
              <th>Product Name</th>
              <th>Grocery Name</th>
              <th>Old price</th>
              <th>New Price</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index + 1}>
                <td>{product._id}</td>
                <td>
                  <div className="table-image">
                    <img className="table-offer-image" src={offerpic} alt="" />
                    <span className="table-username">{product.productName}</span>
                  </div>
                </td>
                <td>{product.storeID}</td>
                <td>{product.price}</td>
                <td>{product.newprice}</td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => setSelectedProduct(product)}>
                      View Offer
                    </button>
                    <button onClick={() => deleteProduct(product._id)}>
                      Delete Offer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedProduct && <ViewOffer product={selectedProduct} />}
    </section>
  );
};

export default OffersTables;
