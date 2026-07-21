"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure you have GEMINI_API_KEY in your .env.local
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateYouTubeTitles(topic: string, description: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are an expert YouTube strategist and copywriter.
    I am making a video about: "${topic}".
    Here is the description of the video: "${description}".
    
    Generate exactly 5 highly-clickable, viral YouTube titles for this video.
    The titles must trigger curiosity, use emotional language, and be optimized for a high Click-Through Rate (CTR).
    Do not use quotes around the titles. Do not include numbers like "1." or bullet points. Just output the 5 titles separated by newlines.
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Split by newlines and filter out empty strings
    const titles = text.split('\n').map(t => t.trim().replace(/^[-*•\d.\s]+/, '')).filter(t => t.length > 0);
    return titles.slice(0, 5); // Ensure exactly 5
  } catch (error) {
    console.error("Error generating titles:", error);
    throw new Error("Failed to generate titles. Please try again.");
  }
}

export async function generateScriptOutline(title: string, duration: number, points: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `
    You are an expert YouTube scriptwriter who specializes in high-retention videos.
    Create a detailed script outline for a video titled: "${title}".
    The target duration is ${duration} minutes.
    Make sure to cover these key points:
    ${points}

    Format the output in clean Markdown with the following sections:
    1. The Hook (0:00 - 0:30) - How to grab attention immediately.
    2. The Intro & Stakes (0:30 - 1:30) - Why the viewer must keep watching.
    3. Main Content Sections (Include estimated timestamps) - Detail the key points.
    4. Mid-Video Re-Hook - A pattern interrupt to regain attention.
    5. Call to Action & Outro - How to transition to the end screen seamlessly.

    Be specific, engaging, and professional.
  `;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating script:", error);
    throw new Error("Failed to generate script outline. Please try again.");
  }
}
