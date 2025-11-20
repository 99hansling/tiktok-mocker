import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// Note: In a real production app, ensure the key is valid. 
// We handle the missing key gracefully in the UI.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateWittyComment = async (videoContext: string): Promise<string> => {
  if (!apiKey) {
    return "Wow! This is amazing! 🔥 (AI Unavailable)";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `You are a Gen Z social media user watching a short video. 
    The video description is: "${videoContext}".
    Write a short, funny, or hype comment (under 15 words) that would get a lot of likes. 
    Use emojis. Do not include quotes.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating comment:", error);
    return "This is viral material! 🚀";
  }
};
