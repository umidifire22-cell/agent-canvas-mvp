import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.OPENAI_API_KEY || ""; // We discovered this holds the AIzaSy... Google key
const genAI = new GoogleGenerativeAI(apiKey);

export const generatePostContentGemini = async (topic: string) => {
    console.log(`🧠 Generating Gemini AI content for topic: ${topic}`);

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are a creative social media director. 
Given the topic: "${topic}", generate:
1. A punchy headline (title) max 5 words.
2. A supporting subtitle max 10 words.

Return ONLY a valid JSON object in this exact format, with no markdown formatting or extra text:
{ "title": "...", "subtitle": "..." }`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Clean markdown backticks if Gemini includes them
        const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const content = JSON.parse(cleanedText);

        return content;
    } catch (error) {
        console.error("Gemini AI Error:", error);
        return {
            title: "Exploring the Future",
            subtitle: "AgentCanvas makes it possible today."
        };
    }
};
