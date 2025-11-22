import { GoogleGenAI, Type } from "@google/genai";
import { EconomicInsight } from '../types';

const API_KEY = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

// Mock data generator for users without an API Key
const getMockData = (countryName: string, gdp: number): EconomicInsight => {
  return {
    summary: `(Demo Mode) ${countryName} demonstrates a resilient economy with a GDP of $${gdp}B. Note: Add a valid API Key to see real-time AI analysis.`,
    keyDrivers: ["Industrial Manufacturing", "Digital Transformation", "Export Growth"],
    challenges: ["Supply Chain Resilience", "Energy Transition"]
  };
};

export const fetchEconomicInsight = async (countryName: string, gdp: number): Promise<EconomicInsight> => {
  // 1. Check if AI is initialized
  if (!ai) {
    console.warn("Gemini API Key is missing. Switching to Demo Mode.");
    // Simulate network delay for realism
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getMockData(countryName, gdp));
      }, 800);
    });
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      Analyze the economy of ${countryName} (Approx GDP: $${gdp} Billion).
      Provide a brief JSON response with:
      1. A short 'summary' (max 30 words) of their current economic status.
      2. Three 'keyDrivers' (short phrases) of their economy.
      3. Two current 'challenges' (short phrases).
      Do not include markdown formatting in the JSON string.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            keyDrivers: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            challenges: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as EconomicInsight;

  } catch (error) {
    console.error("Error fetching economic insight:", error);
    // Fallback to mock data if the API call fails (e.g. quota exceeded)
    return getMockData(countryName, gdp);
  }
};