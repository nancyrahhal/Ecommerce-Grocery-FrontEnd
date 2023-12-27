import React, { useState } from 'react';
import "./SearchBar.css"

const Search = ({ groceries, setFilteredGroceries }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (groceries) {
      const filteredGroceries = groceries.filter(grocery => {
        return grocery.StoreName && grocery.StoreName.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredGroceries(filteredGroceries);
    }
  };
  

  return (
    <div className="search">
      <input placeholder='find your store'
        className="searchInput"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className="searchButton" onClick={handleSearch}>Search</button>
    </div>
  )
}

export default Search;
