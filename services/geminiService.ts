import { GoogleGenAI, Type } from "@google/genai";
import { DEEP_SHIFT_KNOWLEDGE_BASE } from '../constants/knowledgeBase';

/**
 * Service to interact with the Google Gemini API for the Deep Shift Assistant.
 */
export const getDeepShiftAssistantResponse = async (userMessage: string) => {
  // Use window.process safely
  const apiKey = (window as any).process?.env?.API_KEY;

  if (!apiKey) {
    console.warn("Gemini API Key is missing. Check your environment variables.");
    return "The Deep Shift Assistant is currently being configured. Please contact us at info@deepshiftai.com for immediate assistance.";
  }

  // Create a new GoogleGenAI instance right before making an API call
  // We use a fallback string 'MISSING_KEY' only to prevent the constructor from throwing
  const ai = new GoogleGenAI({ apiKey: apiKey || 'MISSING_KEY' });

  try {
    const systemInstruction = `
      You are the Deep Shift AI Lab Assistant, a professional and innovative digital representative of Deep Shift AI.
      Deep Shift AI is East Africa's leading provider of enterprise AI, automation, and local language NLP technology.
      
      CORE IDENTITY:
      - Mission: ${DEEP_SHIFT_KNOWLEDGE_BASE.company.mission}
      - Location: ${DEEP_SHIFT_KNOWLEDGE_BASE.company.location}
      - Contact: ${DEEP_SHIFT_KNOWLEDGE_BASE.company.contact.email} | ${DEEP_SHIFT_KNOWLEDGE_BASE.company.contact.phone}
      
      KNOWLEDGE BASE (FAQs):
      ${DEEP_SHIFT_KNOWLEDGE_BASE.faqs.map(faq => `Q: ${faq.q}\nA: ${faq.a}`).join('\n\n')}
      
      FORMATTING RULE:
      - NEVER use markdown formatting symbols. 
      - DO NOT use double asterisks (**) for bolding.
      - DO NOT use hashes (#) for headers.
      - Use ONLY plain text. 
      - If you need to emphasize a word, use UPPERCASE or simple quotes.
      
      GUIDELINES:
      1. Provide accurate answers based ONLY on the knowledge base provided above.
      2. If information is missing, politely suggest they contact us directly at info@deepshiftai.com.
      3. Maintain a helpful, forward-thinking, and regional (East African) tone.
      4. Be concise and professional.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a helpful response. Please contact our support team at info@deepshiftai.com.";
  } catch (error) {
    console.error("Deep Shift Assistant API Error:", error);
    return "The Deep Shift Assistant is currently undergoing maintenance. Please reach out to us at info@deepshiftai.com for immediate assistance.";
  }
};

/**
 * Intelligent site search using Gemini to map user queries to knowledge base and site sections.
 */
export const performSiteSearch = async (query: string) => {
  const apiKey = (window as any).process?.env?.API_KEY;
  if (!apiKey) return [];

  const ai = new GoogleGenAI({ apiKey: apiKey || 'MISSING_KEY' });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Search query: "${query}"`,
      config: {
        systemInstruction: `
          You are a search engine for Deep Shift AI. Based on the user query, search this knowledge base:
          ${JSON.stringify(DEEP_SHIFT_KNOWLEDGE_BASE)}
          
          Return a JSON array of search results. Each result should have:
          - title: A short title for the result.
          - snippet: A 1-sentence summary or answer.
          - type: Either 'page', 'service', 'project', or 'faq'.
          - path: The URL path on the site (e.g., /services, /projects, /about, /contact).
          
          Only return results directly relevant to the query. If no results found, return an empty array.
        `,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              snippet: { type: Type.STRING },
              type: { type: Type.STRING },
              path: { type: Type.STRING }
            },
            required: ['title', 'snippet', 'type', 'path']
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Search API Error:", error);
    return [];
  }
};