import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./DishDetail.css";

const DishDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { food_list, cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const dish = food_list.find(f => f._id === id);
  if (!dish) return <h2>Dish not found!</h2>;

  return (
    <div className="dish-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="dish-detail-img">
        <img src={`${url}/images/${dish.image}`} alt={dish.name} />
      </div>
      <div className="dish-detail-info">
        <h2>{dish.name}</h2>
        <p>{dish.description}</p>
        <h3>₹{dish.price}</h3>
        <div className="dish-actions">
          {cartItems[dish._id] ? (
            <div className="dish-counter">
              <button onClick={() => removeFromCart(dish._id)}>-</button>
              <span>{cartItems[dish._id]}</span>
              <button onClick={() => addToCart(dish._id)}>+</button>
            </div>
          ) : (
            <button onClick={() => addToCart(dish._id)}>Add to Cart</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
