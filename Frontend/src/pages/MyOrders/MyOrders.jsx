import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // loader state

  const fetchOrders = async () => {
    try {
      setLoading(true); // fetch start
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Orders response:", response.data);

      // ✅ Safe handling of all possible API formats
      let ordersArray = [];

      if (Array.isArray(response.data)) {
        ordersArray = response.data;
      } else if (Array.isArray(response.data.data)) {
        ordersArray = response.data.data;
      } else if (Array.isArray(response.data.orders)) {
        ordersArray = response.data.orders;
      } else {
        ordersArray = []; // fallback if no valid array found
      }

      setData(ordersArray);
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
    } finally {
      setLoading(false); // fetch end
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>

      <div className="container">
        {loading ? (
          <div className="loader">Loading orders...</div>
        ) : data.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          data.map((order, index) => (
            <div key={index} className='my-orders-order'>
              <img src={assets.parcel_icon} alt="parcel icon" />

              <p>
                {order.items?.map((item, i) =>
                  i === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>

              <p>₹{order.amount}.00</p>
              <p>Items: {order.items?.length || 0}</p>
              <p>
                <span>&#x25cf; </span>
                <b>{order.status || "Pending"}</b>
              </p>

              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
