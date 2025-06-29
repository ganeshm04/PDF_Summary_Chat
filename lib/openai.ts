import { SUMMARY_CHAT_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";
const client = new OpenAI(
    {
        apiKey: process.env.OPENAI_API_KEY,
    }
);



export async function generateSummaryPDFfromOpenAi(pdfText: string) {
    if(!pdfText){
        console.log("PDF didn't came to ai");
        
    }
    try {
        const completion = await client.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                    role: "system",
                    content: 'you are a helpful assistant',
                },
                {
                    role: 'user',
                    content: ` ${SUMMARY_CHAT_PROMPT}\n\nHere is the extracted PDF content:\n\n${pdfText}`,
                }
            ],
            temperature: 0.7,
            max_tokens:1000
        });

        return completion.choices[0].message.content;
    } catch (error:unknown) {
        if ((error as { status: number }).status === 429) {
            throw new Error("Rate Limit Exceeded");
        }
        throw error;
    }
}
