import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import API from "../../axios/axios";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { food_list, cartItems, getTotalCartAmount, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) navigate("/cart");
  }, [token, getTotalCartAmount, navigate]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        _id: item._id,
        name: item.name,
        price: Number(item.price) || 0,
        quantity: Number(cartItems[item._id]) || 1,
        image: item.image
      }));

    if (!orderItems.length) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      address: formData,
      email: formData.email
    };

    try {
      const res = await API.post(
        "/api/order/place",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (res.data.success && res.data.session_url) {
        // redirect to Stripe checkout
        window.location.href = res.data.session_url;
      } else {
        alert("Unable to place order. Please check console for details.");
        console.error("Order response:", res.data);
      }
    } catch (error) {
      console.error("Order Error Response:", error.response?.data || error.message);
      alert("Unable to place order. Please check console for details.");
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={formData.firstName} placeholder="First Name" />
          <input required name="lastName" onChange={onChangeHandler} value={formData.lastName} placeholder="Last Name" />
        </div>
        <input required name="email" type="email" onChange={onChangeHandler} value={formData.email} placeholder="Email" />
        <input required name="street" onChange={onChangeHandler} value={formData.street} placeholder="Street" />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={formData.city} placeholder="City" />
          <input required name="state" onChange={onChangeHandler} value={formData.state} placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={formData.zipcode} placeholder="Zip Code" />
          <input required name="country" onChange={onChangeHandler} value={formData.country} placeholder="Country" />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={formData.phone} placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
