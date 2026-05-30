const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        overallScore: {
            type: Number
        },
        strengths: [
            {
                type: String,
            }
        ],
        areasToImprove: [
            {
                type: String,
            }
        ],
        priorityFix: {
            type: String,
        },
        drillSuggestion: {
            type: String,
        },
        confidenceLevel: {
            type: String,
            enum: ["Low", "Medium", "High"]
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Session", sessionSchema);