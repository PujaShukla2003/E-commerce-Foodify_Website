import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Place Order (Card + UPI)
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address, email } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Create order in DB
    const order = await orderModel.create({
      userId: req.user.id,
      items,
      amount,
      address,
      status: "Food Processing",
      payment: false, // ✅ fixed spelling
    });

    // Create Stripe session (Card + UPI)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "upi"], // ✅ UPI supported
      line_items: items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: item.price * 100, // paise me
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${order._id}`,
      customer_email: email,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ success: false, message: "Error placing order", error: error.message });
  }
};

// ✅ Verify Payment
export const verifyOrder = async (req, res) => {
  try {
    const { orderId, success } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    if (success === "true") {
      order.payment = true; // ✅ fixed
      order.status = "Order Confirmed";
      await order.save();
      res.json({ success: true, message: "Payment successful" });
    } else {
      order.status = "Payment Failed";
      await order.save();
      res.json({ success: false, message: "Payment failed or cancelled" });
    }
  } catch (error) {
    console.error("Error verifying order:", error.message);
    res.status(500).json({ success: false, message: "Error verifying order", error: error.message });
  }
};

// ✅ Get user orders
export const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.user.id });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// ✅ Admin: List all orders
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    res.json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};
