import React, { useEffect, useContext, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import API from "../../axios/axios";
import "./Verify.css";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const successParam = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/cart");
      return;
    }

    const verifyPayment = async () => {
      try {
        // FIXED LINE (100% error solve)
        const res = await API.post("/api/order/verify", {
          orderId,
          success: successParam,
        });

        if (res.data.success) {
          alert("Payment successful (Demo). Order placed.");
          navigate("/myorders");
        } else {
          alert("Payment failed/cancelled (Demo).");
          navigate("/");
        }
      } catch (err) {
        console.error("Verify Error:", err.response?.data || err.message);
        alert("Error verifying order. See console.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [token]);

  return (
    <div className="verify">
      {loading ? <p>Verifying (Demo)...</p> : <p>Done</p>}
    </div>
  );
};

export default Verify;
