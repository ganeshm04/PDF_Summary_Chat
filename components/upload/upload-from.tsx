/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useUploadThing } from "@/utils/uploadthings";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import React from "react";
import { generatePdfSummary } from "@/action/upload-actions";
import { savePDFSummary } from "@/action/summary-actions";
import { useRouter } from "next/navigation";

const schema = z.object({
    file: z
        .instanceof(File, { message: "Invalid File" })
        .refine(
            (file) => file.size <= 20 * 1024 * 1024,
            'File size must be less than 20MB'
        )
        .refine((file) => file.type.startsWith('application/pdf'), 'File must be PDF')
})

export default function UploadForm() {
    const router = useRouter();

    const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
        onClientUploadComplete: () => {
            toast.success('🎉 File uploaded successfully!');
        },
        onUploadError: (err) => {
            toast.error('🚫 Error occurred during upload. Please try again.');
        },
        onUploadBegin: ({ }) => {
            console.log("upload has begun");
            toast.info(`📤 File Upload Processing`);
        },
    });

    const [loading, setLoading] = React.useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        console.log('submitted');
        const formData = new FormData(e.currentTarget);
        const file = formData.get('file') as File;

        // validating the fields
        const validatedFields = schema.safeParse({ file });
        if (!validatedFields.success) {
            //schema validation using zod
            console.log(validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid File');
            toast.error(
                `⚠️ ${validatedFields.error.format().file?._errors?.[0] || 'Invalid file'}`,
            );
            setLoading(false);

            return;
        }
        console.log(validatedFields);

        // upload the file to uploadthing
        try {
            const resp = await startUpload([file]);
            console.log("resp", resp);

            if (!resp) {
                toast.error('❌ Upload failed. Please try again.');
                setLoading(false);
                return;
            }

            toast.info(
                '🧠 Generating summary from your PDF... This might take a few seconds.',
                {
                    duration: 2000,
                },
            );

            // parse the pdf using langchain
            const transformUploadResponse = (uploadResp: unknown) => {
                if (!Array.isArray(uploadResp) || uploadResp.length === 0) {
                    throw new Error('Invalid upload response');
                }
                
                const item = uploadResp[0] as Record<string, unknown>;
                
                // Try to extract data from different possible structures
                let userId: string;
                let fileData: Record<string, unknown>;
                
                if (item.serverData && typeof item.serverData === 'object') {
                    const serverData = item.serverData as Record<string, unknown>;
                    userId = serverData.userId as string;
                    fileData = serverData.file as Record<string, unknown>;
                } else if (item.userId && item.file && typeof item.file === 'object') {
                    userId = item.userId as string;
                    fileData = item.file as Record<string, unknown>;
                } else {
                    throw new Error('Unknown upload response structure');
                }
                
                return [{
                    userId,
                    file: {
                        ufsUrl: fileData.ufsUrl as string || fileData.url as string,
                        name: fileData.name as string,
                        url: fileData.url as string
                    }
                }];
            };
            
            const transformedResp = transformUploadResponse(resp);
            const result = await generatePdfSummary(transformedResp);
            console.log("summary", { result });

            const { data = null, message = null, success } = result || {};

            if (!success || !data?.summary) {
                toast.error('🛑 Failed to generate summary. Please try again.');
                setLoading(false);
                return;
            }

            toast.info('💾 Saving your summary to the database...');

            // save the summary to the database
            const saveResult = await savePDFSummary({
                userId: data?.userId as string,
                originalFileUrl: data?.fileUrl as string,
                fileName: data?.fileName as string,
                title: data?.title as string,
                summaryText: data?.summary as string,
            });

            if (!saveResult.success) {
                toast.error('❌ Failed to save summary. Please try again.');
                setLoading(false);
                return;
            }

            toast.success('✅ Summary generated and saved successfully!');
            
            // Redirect to the specific summary page
            if (saveResult.summaryId) {
                router.push(`/summary/${saveResult.summaryId}`);
            } else {
                // Fallback to dashboard if no ID
                router.push('/dashboard');
            }
            
        } catch (error) {
            setLoading(false);
            console.error("Error occurred", error);
            toast.error('❌ An unexpected error occurred. Please try again.');
        }
    }
    
    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <UploadFormInput onSubmit={handleSubmit} loading={loading} />
        </div>
    )
} 