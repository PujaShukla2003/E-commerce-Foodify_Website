import React, { createContext, useEffect, useState } from "react";
import API from "../axios/axios";

export const StoreContext = createContext({});

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFoodList = async () => {
    try {
      const res = await API.get("/api/food/list");
      setFoodList(res.data.data || []);
    } catch (err) {
      console.error("Error fetching food list:", err);
    }
  };

  const loadCartData = async (token) => {
    try {
      const res = await API.post("/api/cart/get", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data.cartData || {});
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  const addToCart = async (itemId) => {
    setCartItems(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (token) {
      try {
        await API.post("/api/cart/add", { itemId });
      } catch (err) {
        console.error("Error adding to cart:", err);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems(prev => {
      const updated = { ...prev };
      if (!updated[itemId]) return prev;
      updated[itemId] -= 1;
      if (updated[itemId] <= 0) delete updated[itemId];
      return updated;
    });
    if (token) {
      try {
        await API.post("/api/cart/remove", { itemId });
      } catch (err) {
        console.error("Error removing from cart:", err);
      }
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const item = food_list.find(f => f._id === itemId);
      if (item) total += item.price * cartItems[itemId];
    }
    return total;
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      loadCartData(savedToken);
    }
    fetchFoodList();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        searchTerm,
        setSearchTerm
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
