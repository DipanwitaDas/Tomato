// controllers/orderController.js
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Place order function
const placeOrder = async (req, res) => {
    try {
        console.log("Incoming order payload:", req.body); // 🔍 DEBUG LOG

        const { userId, items, amount, address } = req.body;

        if (!userId || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid or empty items field"
            });
        }

        const newOrder = new orderModel({
            userId,
            items,             
            amount,
            address
        });

        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            orderId: newOrder._id
        });
    } catch (error) {
        console.log("Order placement error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to place order",
            error: error.message
        });
    }
};

// Get all orders for admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().sort({ date: -1 }); // latest orders first
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.log("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Failed to fetch orders", error: error.message });
    }
};



export { placeOrder, getAllOrders, };



