import Session from '../models/Session.js';
import { analyzeCricketStance } from "../services/geminiService.js";

export const createSession = async (req, res) => {
    try {
        const imagePath = req.file.path;
        console.log("Image Path: ", imagePath)
        const aiResult = await analyzeCricketStance(imagePath);
        console.log("AI Result: ", aiResult)

        const cleaned = aiResult
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsedResult = JSON.parse(cleaned);
        console.log("Parsed Result: ", parsedResult)
        const session = await Session.create({
            user: req.user.id,
            imageUrl: imagePath,
            ...parsedResult
        })
        return res.status(201).json(session);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getSession = async (req, res) => {
    try {
        const sessions = await Session.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
        return res.status(200).json(sessions);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}