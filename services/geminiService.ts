import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ProjectInput, DoomScenario } from "../types";

// Define the schema for the structured output
const doomSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    headline: {
      type: Type.STRING,
      description: "A sensational, tabloid-style news headline announcing the project's failure (in Japanese).",
    },
    date: {
      type: Type.STRING,
      description: "A specific date in 2027 (e.g., 2027年X月Y日).",
    },
    articleBody: {
      type: Type.STRING,
      description: "A 300-word dystopian news article describing the collapse in Japanese. Use cynical, dramatic tone. Mention debt, lawsuits, or public embarrassment.",
    },
    failureAnalysis: {
      type: Type.ARRAY,
      description: "Detailed analysis of why it failed, categorized (in Japanese).",
      items: {
        type: Type.OBJECT,
        properties: {
          categoryName: { type: Type.STRING, description: "e.g., 市場要因, 財務要因, 法的トラブル, 組織崩壊" },
          reasons: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Specific, biting reasons for failure based on user input (in Japanese)."
          }
        },
        required: ["categoryName", "reasons"]
      }
    },
    survivalTips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Actionable, serious advice to prevent this specific future (in Japanese). Constructive feedback."
    }
  },
  required: ["headline", "date", "articleBody", "failureAnalysis", "survivalTips"]
};

export const generateDoomScenario = async (input: ProjectInput): Promise<DoomScenario> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Conduct a "Pre-Mortem" for the following startup project.
    Imagine it is the year 2027, and this project has failed catastrophically.
    
    Project Name: ${input.name}
    Description: ${input.description}
    Target Audience: ${input.target}
    Monetization: ${input.monetization}
    Current Challenges: ${input.challenges}
    Tech Stack: ${input.techStack}

    Your persona is a cynical, dark-humored business analyst and historian.
    Be creative, slightly mean, but logically grounded in the weaknesses of the input provided.
    
    OUTPUT LANGUAGE: JAPANESE
    
    1. Create a shocking news article about the failure (in Japanese).
    2. List specific reasons for death (Market, Financial, Legal, Org) (in Japanese).
    3. Provide a time-leap survival guide to fix it now (in Japanese).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview', // High reasoning capability
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: doomSchema,
      systemInstruction: "You are an AI simulating a future where the user's business has failed. You are witty, dark, and brutally honest. You must output strictly valid JSON in Japanese.",
    },
  });

  if (!response.text) {
    throw new Error("Failed to generate scenario.");
  }

  return JSON.parse(response.text) as DoomScenario;
};

export const generateDoomImage = async (scenario: DoomScenario, projectName: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      A hyper-realistic, dramatic, cinematic wide shot or a high-quality 3D conceptual infographic representing the collapse of a company named "${projectName}".
      
      Context of the image: ${scenario.headline}.
      
      The mood should be ominous, corporate dystopian, or chaotic. 
      Lighting: Low key, dramatic shadows, neon glitches or cold office lighting.
      No text overlays unless it's environmental (like a broken sign).
      Style: Editorial photography for a business magazine covering a scandal.
    `;

    // Using gemini-3-pro-image-preview for high quality (Nano Banana Pro equivalent)
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: prompt,
      config: {
        imageConfig: {
            aspectRatio: "16:9",
            imageSize: "2K"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null; // Fail gracefully without image
  }
};