import React from "react";
import { Link } from "react-router-dom";
import AddCategoryForm from "./Forms/AddCategoryForm";
import AddGrocery from "./Forms/AddGrocery";
import AddProducts from "./Forms/AddProducts";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminMain = () => {
  const [groceries, setGroceries] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [refresh, setRefresh] = useState([]);

  const [groceryCount, setGroceryCount] = useState();
  const [productCount, setProductCount] = useState();
  const [offerCount, setOfferCount] = useState();
  const [categoryCount, setCategoryCount] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/products`)
      .then((response) => {
        setProducts(response.data);
        setProductCount(response.data.length);

        setOfferCount(
          response.data?.filter((product) => product.itsOffer).length
        );
      })
      .catch((error) => {
        console.error("There was an error in get products ", error);
      });

    axios
      .get("http://localhost:4000/api/groceries")
      .then((response) => {
        setGroceries(response.data);
        setGroceryCount(response.data.length);
      })
      .catch((error) => {
        console.error("There was an error in view", error);
      });
    axios
      .get("http://localhost:4000/api/categories")
      .then((response) => {
        setCategories(response.data);
        setCategoryCount(response.data.length);
      })
      .catch((error) => {
        console.error("There was an error in get offer", error);
      });
  }, [refresh]);

  const refreshPage = () => {
    setRefresh(refresh + "1");
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/api/offers")
  //     .then((response) => {
  //       setOffers(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error in get offer", error);
  //     });
  // }, []);
  console.log(products);

  return (
    <div className="admin-main">
      <div className="admin-main-header">
        <div className="admin-main-card">
          <h5 className="admin-card-title">Offers</h5>
          <div className="admin-card-count">{offerCount}</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin/offer-table" className="admin-card-link">
              See all offers
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-emoji-smile"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Groceries</h5>
          <div className="admin-card-count">{groceryCount}</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin/grocery-table" className="admin-card-link">
              See all Groceries
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-shop"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Categories</h5>
          <div className="admin-card-count">{categoryCount}</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin/category-table" className="admin-card-link">
              See all categories
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-tag-fill"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Products</h5>
          <div className="admin-card-count">{productCount}</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin/product-table" className="admin-card-link">
              See all products
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-cart-check"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="add-new-grocery-category">
        <AddCategoryForm setRefresh={setRefresh} />
        <AddGrocery setRefresh={setRefresh} />
        <AddProducts setRefresh={setRefresh} />
      </div>
    </div>
  );
};

export default AdminMain;
