import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        } else {
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({success: true, message: `Added to cart`})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;

        // Check if the item exists in the cart
        if (cartData[req.body.itemId]) {
            cartData[req.body.itemId] -= 1;  // Decrement the item quantity

            // If the item count is 0 or less, delete it from the cart
            if (cartData[req.body.itemId] <= 0) {
                delete cartData[req.body.itemId];
            }
        }

        // Update the user's cart data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: `Item removed from cart` });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// Fetch user cart
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        res.json({success: true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

export {addToCart, removeFromCart, getCart};