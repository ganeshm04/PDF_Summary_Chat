'use server';

import { generatePDFSummaryFromGemini } from "@/lib/gemini";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryPDFfromOpenAi } from "@/lib/openai";
import { formatFileNameAsFileTitle } from "@/utils/format-title";

export async function generatePdfSummary(
    uploadResponse: {
        userId: string;
        file: {
            ufsUrl: string;
            name: string;
            url?: string; // For backward compatibility
        };
    }[]
) {
    console.log('Upload response received:', JSON.stringify(uploadResponse, null, 2));
    
    if (!uploadResponse || !Array.isArray(uploadResponse) || uploadResponse.length === 0) {
        console.error('Invalid upload response structure:', uploadResponse);
        return {
            success: false,
            message: 'File upload failed - invalid response structure',
            data: null,
        };
    }

    const firstResponse = uploadResponse[0];
    console.log('First response item:', JSON.stringify(firstResponse, null, 2));

    // Extract userId and file information
    const { userId, file } = firstResponse;

    console.log('Extracted userId:', userId);
    console.log('File object:', JSON.stringify(file, null, 2));

    if (!file) {
        console.error('No file object found in response');
        return {
            success: false,
            message: 'File upload failed - no file data',
            data: null,
        };
    }

    // Handle both ufsUrl and url for backward compatibility
    const pdfUrl = file.ufsUrl || file.url;
    const fileName = file.name;

    console.log('Extracted URL:', pdfUrl);
    console.log('Extracted filename:', fileName);

    if (!pdfUrl) {
        console.error('No URL found in file object');
        return {
            success: false,
            message: 'File upload failed - no URL found',
            data: null,
        };
    }

    if (!fileName) {
        console.error('No filename found in file object');
        return {
            success: false,
            message: 'File upload failed - no filename found',
            data: null,
        };
    }

    try {
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log("pdf text", { pdfText });
        let summary;
        try {
            summary = await generatePDFSummaryFromGemini(pdfText);

            console.log("Gemini summary", { summary });

            const formatedFileName = formatFileNameAsFileTitle(fileName);

            return {
                success: true,
                message: 'File upload is successful',
                data: {
                    userId,
                    fileName: fileName,
                    fileUrl: pdfUrl,
                    summary,
                    title: formatedFileName,
                },
            };

        } catch (error) {
            console.log(error);
            // call gemini
            if (error instanceof Error && error.message == "RATE_LIMIT_Exceeded") {
                try {
                    summary = await generateSummaryPDFfromOpenAi(pdfText);

                } catch (geminiError) {
                    console.error('Gemini API failed after OpenAI quote exceeded', geminiError);

                };
                throw new Error(
                    "Failed to generate summary with available AI"
                )
            }

        }

        if (!summary) {
            return {
                success: false,
                message: 'Failed to generate summary',
                data: null,
            }
        }

        return {
            success: true,
            message: 'summary generated successfully',
            data: {
                summary
            }
        }


    } catch (err) {
        return {
            success: false,
            message: 'File upload failed', err,
            data: null,
        };
    }



}