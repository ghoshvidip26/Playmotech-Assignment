import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto'
import User from '../models/User.js'
import { validatePassword, validateEmail, getErrorResponse } from "../helper/helper.js";
import RefreshToken from '../models/RefreshToken.js'

export const register = async (req, res) => {
    try {
        const { fullName, email, password, sport, role, level } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            sport,
            role,
            level,
        });
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(201).json({
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!validatePassword(password)) {
            return res.status(400).json({
                success: false,
                msg: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                msg: "Invalid email address",
            });
        }
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({
                success: false,
                msg: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                msg: "Invalid credentials",
            });
        }

        // Access token (short-lived)
        const accessToken = jwt.sign(
            {
                id: userData._id,
                userId: userData._id,
                email: userData.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
            },
        );
        // // Refresh token (long-lived)
        const refreshToken = crypto.randomBytes(40).toString("hex");

        await RefreshToken.create({
            token: refreshToken,
            userId: userData._id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        });
        return res.status(200).json({
            success: true,
            token: accessToken,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        const { status, msg } = getErrorResponse(error);
        return res.status(status).json({
            success: false,
            msg,
        });
    }
};
