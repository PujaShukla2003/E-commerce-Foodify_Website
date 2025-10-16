import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list, searchTerm } = useContext(StoreContext);

  const filteredFoods = food_list.filter(
    (item) =>
      (category === "All" || item.category?.toLowerCase() === category.toLowerCase()) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())  // 🔹 search filter
  );

  if (filteredFoods.length === 0) {
    return <p>No dishes found.</p>;
  }

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredFoods.map((item) => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;

