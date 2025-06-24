import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PDF summary Chat",
  description: "This app is a tool that allows you to upload a PDF file and get a summary of the content. and Chat with the pdf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
