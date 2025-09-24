import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./FoodCard.css";

const FoodCard = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleClick = () => navigate(`/dish/${id}`);

  return (
    <div className="food-card" onClick={handleClick}>
      <div className="food-card-img">
        <img src={`${url}/images/${image}`} alt={name} />
      </div>
      <div className="food-card-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="food-card-footer">
          <span className="price">₹{price}</span>
          <div className="cart-actions" onClick={e => e.stopPropagation()}>
            {cartItems[id] ? (
              <div className="cart-counter">
                <button onClick={() => removeFromCart(id)}>-</button>
                <span>{cartItems[id]}</span>
                <button onClick={() => addToCart(id)}>+</button>
              </div>
            ) : (
              <button onClick={() => addToCart(id)}>Add</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

