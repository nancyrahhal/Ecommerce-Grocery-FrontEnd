import { useEffect, useState } from "react";
import "./Home.css";
import GroceryCards from "../../Components/GroceryCards/GroceryCards.jsx";
import Carousel from "../../Components/Carousel/Carousel.jsx";

const Home = () => {
  const [groceries, setGroceries] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredGroceries, setFilteredGroceries] = useState([]);

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/groceries");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGroceries(data);
        setFilteredGroceries(data); // Set filtered groceries initially to all groceries
      } catch (error) {
        console.error("Error fetching groceries:", error);
        setGroceries([])
      }
    };
    fetchGroceries();
  }, []);

  const handleSearch = () => {
    // Filter the groceries based on the search value
    const filtered = groceries.filter(
      (item) =>
        item.storeName &&
        item.storeName.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredGroceries(filtered);
  };

  return (
    <div className="home">
      <Carousel className="carousel-component"/>

      <p className="findgrocery">Find Your Grocery</p>

      <div className="search">
      <input placeholder='find your store'
        className="searchInput"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className="searchButton" onClick={handleSearch}>Search</button>
    </div>

      <div className="Groceries">
        {filteredGroceries &&
          filteredGroceries
          
          .map((grocery) => (
            <GroceryCards grocery={grocery} key={grocery.id} />
          ))}
      </div>
    </div>
  );
};

export default Home;
