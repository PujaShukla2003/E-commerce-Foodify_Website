import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;   // <-- JWT se user id le raha hai
    const itemId = req.body.itemId;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    return res.json({ success: true, message: "Added To Cart" });

  } catch (error) {
    console.log("Add to Cart Error:", error);
    return res.json({ success: false, message: "Error in Add To Cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;  // <-- JWT se user id le raha hai
    const itemId = req.body.itemId;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    return res.json({ success: true, message: "Removed From Cart" });

  } catch (error) {
    console.log("Remove From Cart Error:", error);
    return res.json({ success: false, message: "Error in Remove From Cart" });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;  // <-- JWT se user id le raha hai

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, cartData: userData.cartData || {} });

  } catch (error) {
    console.log("Get Cart Error:", error);
    return res.json({ success: false, message: "Error in Get Cart" });
  }
};

export { addToCart, removeFromCart, getCart };
