import React, {useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./GroceryDetails.css";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

import { useQuery } from "react-query";

import fruits from "../../assets/strawberry.png";
import vegetables from "../../assets/vegetable.png";
import snack from "../../assets/snack.png";
import canned from "../../assets/canned-food.png";
import dairy from "../../assets/dairy-products.png";
import riceandpasta from "../../assets/rice.png";
import drinks from "../../assets/drink.png";
import bread from "../../assets/white-bread.png";

const GroceryDetails = () => {
  const [categoriesArray, setCategoriesArray] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const categoriesToShow = 4;

  const params = useParams();


  const {
    isLoading,
    data: storeDetails,
  } = useQuery({
    queryFn: () => {
      return axios
        .get(`localhost:4000/api/groceries/${params.id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => {
          setCategoriesArray(res?.data?.categories);

          // set first category as selected to show the products list
          if (res?.data?.categories?.length) {
            setSelectedCategory(res?.data?.categories[0]);
          }

          return res.data;
        })
        .then((res) => res)
        .catch((err) => console.log(err));
    },
    refetchOnWindowFocus: false,
  });

  const toggleCategory = (category) => {
    console.log(category);
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const getCategoryImage = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case "fruits":
        return fruits;
      case "vegetables":
        return vegetables;
      case "snack":
        return snack;
      case "canned":
        return canned;
      case "dairy":
        return dairy;
      case "riceandpasta":
        return riceandpasta;
      case "drinks":
        return drinks;
      case "bread":
        return bread;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (
      categoriesArray.length &&
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

  return (
    <div>
      <div className="storedetails">
        <div className="detailsimage">
          <img
            src={storeDetails.StoreImage}
            className="storeimg2"
            alt="Store"
          />
        </div>
        <div className="details">
          <p>
            <span className="detailsspan">Store Name:</span>
            {storeDetails.StoreName}
          </p>
          <p>
            <span className="detailsspan">Owner Name:</span>
            {storeDetails.OwnerName}
          </p>
          <p>
            <span className="detailsspan">Phone Number:</span>
            {storeDetails.PhoneNumber}
          </p>
          <p>
            <span className="detailsspan">Location:</span>
            {storeDetails.Location}
          </p>
          <p>
            <span className="detailsspan">City:</span>
            {storeDetails.City}
          </p>
          <p>
            <span className="detailsspan">Area:</span>
            {storeDetails.Area}
          </p>
        </div>
      </div>

      <div className="categoriesdiv">
        <div className="arrow-container" onClick={handlePrevious}>
          <FaArrowAltCircleLeft className="arrow" />
        </div>

        {categoriesArray &&
          categoriesArray.map((category) => (
            <div key={category._id} className="category">
              <img
                className="catimg"
                src={getCategoryImage(category.categoryName)}
                alt={category.categoryName}
                onClick={() => toggleCategory(category)}
              />
            </div>
          ))}

        <div className="arrow-container" onClick={handleNext}>
          <FaArrowAltCircleRight className="arrow" />
        </div>
      </div>

      <div className="products">
        {selectedCategory &&
          selectedCategory.products?.map((product) => (
            <div key={product._id} className="product">
              <div className="productcard">
                <img
                  src={product.image}
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
  );
};

export default GroceryDetails;