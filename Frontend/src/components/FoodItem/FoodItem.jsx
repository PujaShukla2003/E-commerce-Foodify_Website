import React, { useContext } from 'react';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems = {}, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={image || '/images/default.jpg'} alt={name} loading="lazy" />

        {!cartItems?.[id] ? (
          <button className='add-btn' onClick={() => addToCart(id)}>Add to Cart</button>
        ) : (
          <div className='food-item-counter'>
            <button onClick={() => removeFromCart(id)}>-</button>
            <p>{cartItems[id]}</p>
            <button onClick={() => addToCart(id)}>+</button>
          </div>
        )}
      </div>

      <div className="food-item-info">
        <p className="food-item-name">{name}</p>
        <p className="food-item-descr">{description}</p>
        <p className="food-item-price">${Number(price).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default FoodItem;
