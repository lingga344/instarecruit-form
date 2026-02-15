import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateInfluencerPitch = async (
  niche: string,
  followers: string,
  name: string
): Promise<string> => {
  try {
    const prompt = `
      You are a professional social media manager helping an influencer apply for a brand collaboration.
      
      Information:
      - Name: ${name || 'Influencer'}
      - Niche: ${niche}
      - Follower Count: ${followers}

      Task: Write a persuasive, professional, yet engaging "Why work with me" pitch (max 100 words) in Indonesian. 
      Focus on value proposition, audience engagement, and creativity. 
      Do not include placeholders like [Nama Brand]. Make it general enough for any brand recruitment form.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text?.trim() || "Maaf, tidak dapat membuat pitch saat ini. Silakan coba tulis manual.";
  } catch (error) {
    console.error("Error generating pitch:", error);
    return "Terjadi kesalahan saat menghubungkan ke AI. Silakan tulis pitch Anda sendiri.";
  }
};