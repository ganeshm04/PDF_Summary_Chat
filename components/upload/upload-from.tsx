'use client';

import UploadFormInput from "./upload-form-input";
import { z } from "zod";

const schema=z.object({
    file:z
    .instanceof(File,{message:"Invalid File"})
    .refine(
        (file)=>file.size <= 20 * 1024 * 1024,
        'File size must be less than 20MB'
    )
    .refine((file)=>file.type.startsWith('application/pdf'),'File must be PDF')
})

export default function UploadForm(){
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log('submitted');
        const formData=new FormData(e.currentTarget);
        const file=formData.get('file') as File;
        
        // validating the fields
        const validatedFields=schema.safeParse({file});
        if(!validatedFields.success){
            //schema validation using zod
            console.log(validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invlaid File');
            return;
        }
        // console.log(validatedFields);
        

        // upload the file to uploadthing
        // parse the pdf using langchain
        // summarize pdf using ai
        //save the summary to the database
        // redirect to the [id] summary page
    }
    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
           <UploadFormInput onSubmit={handleSubmit}/>
        </div>
    )
} 