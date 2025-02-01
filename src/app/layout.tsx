import {
  ClerkProvider
} from '@clerk/nextjs';
import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Joker AI",
  description: "The Metalevel's AI playground",
};

// export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className='antialiased'>
          <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
