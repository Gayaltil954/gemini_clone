import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCgntrQUKV_0ho-KLja2EIC9w5MwtojwZI");

const runChat = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const result = await model.generateContent([prompt]);
    const response = await result.response;

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    return text;
  } catch (err) {
    console.error("Gemini error:", err);
    return "Failed to generate content.";
  }
};

export default runChat;
