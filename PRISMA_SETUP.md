# Prisma + NeonDB Setup Guide

## 1. Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# AI APIs
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key

# UploadThing
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

## 2. NeonDB Setup

1. Go to [NeonDB](https://neon.tech) and create an account
2. Create a new project
3. Copy the connection string from your project dashboard
4. Replace the `DATABASE_URL` in your `.env` file with the NeonDB connection string

## 3. Database Migration

Run the following commands to set up your database:

```bash
# Generate Prisma client
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name init

# (Optional) View your database in Prisma Studio
npx prisma studio
```

## 4. Database Schema

The schema includes:

- **User**: Stores user information from Clerk authentication
- **PdfUpload**: Stores PDF uploads with their summaries and status

