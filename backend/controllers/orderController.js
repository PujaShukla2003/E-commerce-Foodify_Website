import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  try {
    // Validate incoming body early
    const { items, amount, address, email } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Defensive normalisation of items (avoid NaN issues)
    const safeItems = items.map((item) => ({
      _id: item._id,
      name: item.name || "Food Item",
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      image: item.image || "",
    }));

    // Create order in DB (payment false initially)
    const order = await orderModel.create({
      userId: req.user?.id || null,
      items: safeItems,
      amount: Number(amount) || safeItems.reduce((s, it) => s + it.price * it.quantity, 0),
      address,
      status: "Food Processing",
      payment: false,
    });

    // Build stripe line_items (unit_amount must be integer)
    const line_items = safeItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Math.round(Number(item.price) * 100), // integer paisa
      },
      quantity: Number(item.quantity) || 1,
    }));

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      // NOTE: do NOT pass payment_method_types here for latest Stripe API
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${order._id}`,
      customer_email: email || undefined,
    });

    return res.json({ success: true, session_url: session.url });
  } catch (error) {
    // Log full error (helps debugging with Stripe)
    console.error("Error placing order:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error placing order", error: error.message || String(error) });
  }
};

export const verifyOrder = async (req, res) => {
  try {
    const { orderId, success } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    if (String(success) === "true") {
      order.payment = true;
      order.status = "Order Confirmed";
      await order.save();
      res.json({ success: true, message: "Payment successful" });
    } else {
      order.status = "Payment Failed";
      await order.save();
      res.json({ success: false, message: "Payment failed or cancelled" });
    }
  } catch (error) {
    console.error("Error verifying order:", error);
    res.status(500).json({ success: false, message: "Error verifying order", error: error.message || String(error) });
  }
};

export const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.user?.id });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    res.json({ success: true, data: order });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};
