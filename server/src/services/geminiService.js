import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import dotenv from "dotenv"
dotenv.config()
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

export const analyzeCricketStance = async (imagePath) => {
    const imageBuffer = fs.readFileSync(imagePath);
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: [
            {
                text: `
                Analyze this cricket batting stance.
                Return ONLY valid JSON.
                {
                "overallScore": 0,
                "strengths": [],
                "areasToImprove": [],
                "priorityFix": "",
                "drillSuggestion": "",
                "confidenceLevel": ""
                }

                Focus on:
                - Balance
                - Foot placement
                - Head position
                - Front elbow
                - Bat angle
                - Body alignment

                Keep feedback concise and practical.`
            },
            {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: imageBuffer.toString('base64')
                }
            }
        ]
    })
    return response.text;
}