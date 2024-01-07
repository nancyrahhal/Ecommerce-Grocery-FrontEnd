import "./GroceryCards.css";
import { Link } from "react-router-dom";

const GroceryCards = ({ grocery }) => {
  
  return (
    <div>
      <div className="GroceryCard">
        <img src={`http://localhost:4000/uploads/${grocery.storeImage}`} alt={grocery.storeName} className="GroceryImages" />
        <div className="CardSecond">
          <div className="GroceryInformation">
            <h1>{grocery.storeName}</h1>
            <h3>
              <strong>{grocery.city} - {grocery.area}</strong>
              </h3>
          </div>

          <div>
            <Link
              to={{
                pathname: `/StoreDetails/${grocery.id}`,
              }}
              className=" button"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryCards;