# PDF Summary Chat

A web application that allows users to upload PDF documents, generate summaries, and interact with the content using a chat interface powered by AI.


## Features

- Upload PDF files for processing
- Generate concise summaries of uploaded PDFs
- Chat with the AI to ask questions about the PDF content
- User-friendly interface

## Technologies Used

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Prisma ORM, RESTful API routes
- **Database:** (Configured via Prisma, PostgreSQL(NeonDB))
- **Authentication:** Clerk
- **Payments:** Razorpay
- **File Uploads:** UploadThing
- **AI/LLM:** OpenAI, Gemini, LangChain integrations

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/pdf_sum_chat.git
    cd pdf_sum_chat
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Setup the database:
    ```bash
    npx prisma migrate dev
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```


## Usage

1. Upload a PDF file using the interface.
2. Wait for the summary to be generated.
3. Use the chat to ask questions about the document.

## Folder Structure

```

  app/                # Next.js app directory (pages, layouts, routes)
  components/         # Reusable UI and feature components
  action/             # Server actions (auth, summary, upload)
  lib/                # Utility libraries (AI, DB, payment, etc.)
  prisma/             # Prisma schema and migrations
  public/             # Static assets
  utils/              # Helper functions
  middleware.ts       # Middleware for auth, etc.
  next.config.ts      # Next.js configuration
  ...
server/               # Backend worker/server scripts
```

- **Note:** Chat feature is not integrated because it requires OpenAI API credits. The code related to chat feature is in "./server" folder which runs in local computer with docker.

- **Note:** The razor payment is integrated but code is commented, To use, uncomment 



