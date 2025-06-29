import { SUMMARY_CHAT_PROMPT } from '@/utils/prompts';
import { GoogleGenAI } from '@google/genai';



const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const generatePDFSummaryFromGemini = async (pdfText: string) => {
  if (!pdfText) {
    throw new Error('PDF text is require for gemini');
  }

  const prompt = `${SUMMARY_CHAT_PROMPT}\n\nHere is the extracted PDF content:\n\n${pdfText}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        temperature: 0.6,
        maxOutputTokens: 1000,
      },
    });
    console.log(response.text);

    if(!response.text)
{
    throw new Error('Empty responses from Gemini API');
}
    return response.text;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('Gemini Api error : ', error);
    if (error?.status === 429) {
      throw new Error('Gemini Api rate limit exceeded',error);
    }
    throw error;
  }
};
