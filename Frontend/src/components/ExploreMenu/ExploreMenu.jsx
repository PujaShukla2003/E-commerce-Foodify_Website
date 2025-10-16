import React, { useContext } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
  const { food_list } = useContext(StoreContext);

  const categories = ["All", ...new Set(food_list.map(item => item.category))];

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Menu</h1>
      <p className='explore-menu-text'>
        Browse our menu and order your favorite dishes for a delightful dining experience.
      </p>

      <div className="explore-menu-list">
        {categories.map((cat, index) => {
          // Find image only for specific categories
          const foodImage =
            cat !== "All"
              ? food_list.find(f => f.category?.toLowerCase() === cat.toLowerCase())?.image ||
                "https://cdn.pixabay.com/photo/2017/01/22/19/20/pizza-2000616_1280.jpg"
              : null;

          return (
            <div
              key={index}
              className={`explore-menu-list-items ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {/* 👇 Show image only if it exists */}
              {foodImage && (
                <img
                  src={foodImage}
                  alt={cat}
                  className={`menu-image ${category === cat ? 'active' : ''}`}
                />
              )}
              <p>{cat}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
