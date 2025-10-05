const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart"); // Import the Cart model

// ✅ Fetch all items for a user
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(200).json({ message: "Cart empty" });
        }

        res.json({ cart });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// ✅ Add an item to the cart
router.post("/add", async (req, res) => {
    try {
        const { userId, testName, price } = req.body;

        if (!userId || !testName || price === undefined) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, labTests: [] });
        }

        cart.labTests.push({ testName, price });

        await cart.save();
        res.json({ message: "Item added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// ✅ Remove an item from the cart
router.post("/remove", async (req, res) => {
    try {
        const { userId, testName } = req.body;

        if (!userId || !testName) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        cart.labTests = cart.labTests.filter(test => test.testName !== testName);

        await cart.save();
        res.json({ message: "Item removed successfully", cart });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

module.exports = router;
