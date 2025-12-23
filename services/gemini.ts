
// import { GoogleGenAI, Type } from "@google/genai";
// import { IdeaResponse } from "../types";

// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

// export const generateSaaSIdea = async (prompt: string): Promise<IdeaResponse> => {
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: `Generate a detailed AI micro-SaaS blueprint based on this company profile: ${prompt}. Provide a creative name, a solid concept, a list of specific features, a modern tech stack, and a market fit analysis.`,
//     config: {
//       responseMimeType: "application/json",
//       responseSchema: {
//         type: Type.OBJECT,
//         properties: {
//           name: { type: Type.STRING },
//           concept: { type: Type.STRING },
//           features: {
//             type: Type.ARRAY,
//             items: { type: Type.STRING }
//           },
//           techStack: {
//             type: Type.ARRAY,
//             items: { type: Type.STRING }
//           },
//           marketFit: { type: Type.STRING }
//         },
//         required: ["name", "concept", "features", "techStack", "marketFit"]
//       }
//     }
//   });

//   return JSON.parse(response.text || "{}");
// };

// export const chatWithAssistant = async (history: { role: string; content: string }[]) => {
//   const chat = ai.chats.create({
//     model: 'gemini-3-flash-preview',
//     config: {
//       systemInstruction: 'You are the official AI assistant of ValueCode.in. ValueCode is an AI Micro SaaS studio that builds high-performance software products for entrepreneurs. We specialize in rapid prototyping, AI agents, and niche SaaS solutions. Be professional, creative, and encouraging.',
//     },
//   });

//   const lastMessage = history[history.length - 1].content;
//   const response = await chat.sendMessage({ message: lastMessage });
//   return response.text;
// };
import { IdeaResponse, ChatMessage } from "../types";

const N8N_BASE_WEBHOOK = "https://n8n.srv1173904.hstgr.cloud/webhook/website-Summary";

export const generateSaaSIdea = async (prompt: string): Promise<IdeaResponse> => {
  const res = await fetch(`${N8N_BASE_WEBHOOK}/generate-saas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) throw new Error("Failed to generate SaaS idea via n8n");

  return res.json();
};

export const chatWithAssistant = async (history: ChatMessage[]): Promise<string> => {
  const res = await fetch(`${N8N_BASE_WEBHOOK}/chat-assistant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ history }),
  });

  if (!res.ok) throw new Error("Failed to chat via n8n");

  const data = await res.json();
  return data.text; // Expect n8n returns { text: "assistant reply" }
};
