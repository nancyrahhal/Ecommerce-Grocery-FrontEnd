import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./GroceryDetails.css";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import fruits from "../../assets/strawberry.png";
import vegetables from "../../assets/vegetable.png";
import snack from "../../assets/snack.png";
import canned from "../../assets/canned-food.png";
import dairy from "../../assets/dairy-products.png";
import riceandpasta from "../../assets/rice.png";
import drinks from "../../assets/drink.png";
import bread from "../../assets/white-bread.png";
import Loader from "react-js-loader";

const GroceryDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const [storeDetails, setStoreDetails] = useState(null);
  const [categoriesArray, setCategoriesArray] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAll, setShowAll] = useState(true);

  const [storeAllProducts, setStoreAllProducts] = useState(null);
  const [storeCategoryProducts, setStoreCategoryProducts] = useState(null);

  const [startIndex, setStartIndex] = useState(0);
  const categoriesToShow = 4;

  const params = useParams();

  useEffect(() => {
    const fetchStoreDetailsById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/groceries/${params.id}`
        );
        setStoreDetails(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchStoreDetailsById();

    const fetchStoreCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/categories/ofGrocery/${params.id}`
        );
        setCategoriesArray(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchStoreCategories();

    const fetchStoreAllProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/ofGrocery/${params.id}`
        );
        setStoreAllProducts(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchStoreAllProducts();
  }, []);
  useEffect(() => {
    fetchStoreProductsByCategory();
  }, [selectedCategory]);

  const fetchStoreProductsByCategory = async () => {
    try {
      if (selectedCategory) {
        const response = await axios.get(
          `http://localhost:4000/api/products/ofGrocery/${params.id}/byCategory/${selectedCategory?.id}`
        );
        setStoreCategoryProducts(response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleCategory = (category) => {
    setSelectedCategory(category);
    setShowAll(false);
  };

  // const getCategoryImage = (categoryName) => {
  //   switch (categoryName.toLowerCase()) {
  //     case "fruits":
  //       return fruits;
  //     case "vegetables":
  //       return vegetables;
  //     case "snack":
  //       return snack;
  //     case "canned":
  //       return canned;
  //     case "dairy":
  //       return dairy;
  //     case "riceandpasta":
  //       return riceandpasta;
  //     case "drinks":
  //       return drinks;
  //     case "bread":
  //       return bread;
  //     default:
  //       return null;
  //   }
  // };

  const handleNext = () => {
    if (
      categoriesArray?.length &&
      startIndex + categoriesToShow < categoriesArray.length
    ) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const showAllLoader = () => {
    setIsLoading2(true);
    setShowAll(true);
    setTimeout(() => {
      setIsLoading2(false);
    }, 200);
  };

  return (
    <div>
      {storeDetails && (
        <div className="storedetails">
          <div className="detailsimage">
            <img
              src={`http://localhost:4000/uploads/${storeDetails.storeImage}`}
              className="storeimg2"
              alt="Store"
            />
          </div>
          <div className="details">
            <p>
              <span className="detailsspan">Store Name:</span>
              {storeDetails.storeName}
            </p>
            <p>
              <span className="detailsspan">Owner Name:</span>
              {storeDetails.admin.username}
            </p>
            <p>
              <span className="detailsspan">Phone Number:</span>
              {storeDetails.phoneNumber}
            </p>
            <p>
              <span className="detailsspan">City:</span>
              {storeDetails.city}
            </p>
            <p>
              <span className="detailsspan">Area:</span>
              {storeDetails.area}
            </p>
          </div>
        </div>
      )}

      <div className="showAllButton">
        <button
          Style={"color:#7cb334"}
          onClick={() => {
            showAllLoader();
          }}
        >
          Show All Products
        </button>
      </div>
      <div className="categoriesdiv">
        <div className="arrow-container" onClick={handlePrevious}>
          <FaArrowAltCircleLeft className="arrow" />
        </div>

        {categoriesArray &&
          categoriesArray.map((category) => (
            <div key={category.id} className="category">
              <img
                className="catimg"
                src={`http://localhost:4000/${category.image}`}
                alt={category.categoryName}
                onClick={() => toggleCategory(category)}
              />
              <h5>{category.categoryName}</h5>
            </div>
          ))}

        <div className="arrow-container" onClick={handleNext}>
          <FaArrowAltCircleRight className="arrow" />
        </div>
      </div>

      {!isLoading2 ? (
        <div>
          <div className="products">
            {!showAll &&
              storeCategoryProducts &&
              storeCategoryProducts?.map((product) => (
                <div key={product.id} className="product">
                  <div className="productcard">
                    <img
                      src={`http://localhost:4000/${product.image}`}
                      className="productimage"
                      alt={product.productName}
                    />
                    <div>
                      <h1>{product.productName}</h1>
                      <h4>price: {product.price}</h4>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="products">
            {showAll &&
              storeAllProducts &&
              storeAllProducts?.map((product) => (
                <div key={product.id} className="product">
                  <div className="productcard">
                    <img
                      src={`http://localhost:4000/${product.image}`}
                      className="productimage"
                      alt={product.productName}
                    />
                    <div>
                      <h1>{product.productName}</h1>
                      <h4>price: {product.price}</h4>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="loaderSingleDetail">
          <Loader
            type="spinner-circle"
            bgColor={"#7cb334"}
            color={"#7cb334"}
            size={100}
          />
        </div>
      )}
    </div>
  );
};

export default GroceryDetails;
