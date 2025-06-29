'use client';

import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";

interface uploadFormInputProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    loading?: boolean;
}

export default function UploadFormInput({ onSubmit, loading = false }: uploadFormInputProps) {
    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
            <div className="flex justify-end items-center gap-1.5">
                <Input 
                    id="file" 
                    type="file" 
                    name="file" 
                    accept="application/pdf" 
                    required 
                    className="" 
                    disabled={loading}
                />
                <Button disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Upload Your PDF'
                    )}
                </Button>
            </div>
        </form>
    )
}