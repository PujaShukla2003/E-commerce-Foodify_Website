import React, { useState, useContext } from "react";
import ExploreMenu from "../ExploreMenu/ExploreMenu";
import FoodDisplay from "../FoodDisplay/FoodDisplay";
import { StoreContext } from "../../context/StoreContext";

const MenuPage = () => {
  const { food_list } = useContext(StoreContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="menu-page">
      {/* Explore Menu */}
      <ExploreMenu category={selectedCategory} setCategory={setSelectedCategory} />

      {/* Food Display */}
      <FoodDisplay category={selectedCategory} />
    </div>
  );
};

export default MenuPage;
