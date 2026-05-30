import ollama from 'ollama';
import Session from '../models/Session.js';
import User from '../models/User.js';

export const askCoach = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { userMessage } = req.body;
        const user = await User.findById(req.user.id);
        const session = await Session.findById(sessionId);
        const systemPrompt = `
You are Ghost Coach.

Player Profile

Name: ${user.fullName}
Role: ${user.role}
Level: ${user.level}

Previous Analysis

Overall Score:
${session.overallScore}

Strengths:
${session.strengths.join(", ")}

Areas To Improve:
${session.areasToImprove.join(", ")}

Priority Fix:
${session.priorityFix}

Drill Suggestion:
${session.drillSuggestion}

Instructions:

- Answer as a cricket coach.
- Be concise.
- Give actionable advice.
- Reference the player's previous analysis.
- Tailor advice to the player's experience level.
`;

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }
        const aiResponse = await ollama.chat({
            model: 'llama3.1',
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: userMessage,
                },
            ],
        });
        return res.status(200).json({ response: aiResponse.message.content });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}