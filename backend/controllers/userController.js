import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from "validator";

// Login User
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success: false, message: 'User does not exist'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({success: false, message: 'Wrong Password'});
        }

        const token = createToken(user._id);
        res.json({success: true, token: token});
    } catch (error) {
        console.log(error);
        return res.json({success: false, message: "Something went wrong"});
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Register User
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        // Checking user account
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success: false, error: "User already exists"})
        }

        // Validate email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false, error: "Please enter a valid email"})
        }

        if (password.length < 8) {
            return res.json({success: false, error: "Password must be at least 8 characters"})
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name : name,
            email : email,
            password: hashedPassword,
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success: true, token})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Could not create user"})
    }
}

export {loginUser, registerUser};