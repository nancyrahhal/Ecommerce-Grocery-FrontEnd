import React, { useEffect, useState } from "react";
import "./NearbyGroceries.css";
import axios from "axios";
import GroceryCards from "../../Components/GroceryCards/GroceryCards.jsx"


const Home = () => {
  const [location, setLocation] = useState(null);
    const [nearest, setNearest] = useState({});
      const [showNearest, setShowNearest] = useState(false);

  const [groceries, setGroceries] = useState([
    { storeName: "Beirut-A-1", latitude: 33.8938, longitude: 35.5018 },
    // Approximately 0 km away
    { storeName: "Palestine-B-5", latitude: 31.9466, longitude: 35.3027 },
    // Approximately 217 km away
    { storeName: "Naqoura-C-4", latitude: 33.0919, longitude: 35.1131 },
    // Approximately 96 km away
    { storeName: "Sour-D-3", latitude: 33.2739, longitude: 35.1939 },
    // Approximately 74 km away
    { storeName: "Saida-E-2", latitude: 33.5632, longitude: 35.3688 },
    // Approximately 38 km away
  ]);

  useEffect(() => {
    // Get longitude and latitude
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    const fetchAllGroceries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/groceries/"
        );
        setGroceries(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchAllGroceries();
  }, []);

  // Function to calculate the distance between two points using the Haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  // Helper function to convert degrees to radians
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  //--- Function to find the nearest grocery store----------------------------------------------------------------------------------------
  function findNearestGrocery(latitude, longitude) {
    let nearestGrocery = null;
    let minDistance = Infinity;

    groceries?.forEach((grocery) => {
      const distance = calculateDistance(
        location?.latitude, location?.longitude,
        grocery.latitude,
        grocery.longitude
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestGrocery = grocery;
      }
    });

    setNearest(nearestGrocery);
    setShowNearest(true)
  }

  //--- Function to find the nearest grocery store----------------------------------------------------------------------------------------

  // ****Function to sort groceries by nearest distance***********************************************************************************
  function sortGroceriesByNearest() {
    const sortedGroceries = [...groceries]; // Create a copy of the groceries array
    sortedGroceries.sort((a, b) => {
      const distanceA = calculateDistance(
        location.latitude,
        location.longitude,
        a.latitude,
        a.longitude
      );
      const distanceB = calculateDistance(
        location.latitude,
        location.longitude,
        b.latitude,
        b.longitude
      );
      return distanceA - distanceB; // Sort in ascending order
    });
    setGroceries(sortedGroceries);
        setShowNearest(false);

  }
  // ****Function to sort groceries by nearest distance***********************************************************************************

  return (
    <div className="Home">
      <div>
        {location ? (
          <div>
            <div className="myLongitudeLatitude">
              <button onClick={sortGroceriesByNearest}>Sort by Nearest</button>

              <h3>
                Latitude: {location.latitude}
                <br />
                Longitude: {location.longitude}
              </h3>
              <button onClick={findNearestGrocery}>Find Nearest</button>
            </div>
            <div className="nearGroceries">
              {!showNearest &&
                groceries.map((grocery) => {
                  const distanceInKm = calculateDistance(
                    location.latitude,
                    location.longitude,
                    grocery.latitude,
                    grocery.longitude
                  );

                  return (
                    <div key={grocery.storeName}>
                      <div>
                        <GroceryCards grocery={grocery} />
                        <p>Distance: {distanceInKm.toFixed(2)} km</p>
                      </div>
                    </div>
                  );
                })}

              {showNearest &&
                [nearest].map((grocery) => {
                  const distanceInKm = calculateDistance(
                    location.latitude,
                    location.longitude,
                    grocery.latitude,
                    grocery.longitude
                  );

                  return (
                    <div key={grocery.storeName}>
                      <div>
                        <GroceryCards grocery={grocery} />
                        <p>Distance: {distanceInKm.toFixed(2)} km</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div>Loading location...</div>
        )}
      </div>
    </div>
  );
};

export default Home;
