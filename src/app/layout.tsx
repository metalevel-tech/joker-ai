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
    <ClerkProvider
      appearance={{
        elements: {
          userButtonTrigger: "focus:shadow-none h-10 w-10 rounded-lg focus:outline focus:outline-2 focus-visible:outline-offset-2 focus:outline-primary",
          avatarBox:
            "h-9 w-9 rounded-lg p-0 m-0 outline-0 outline-offset-2 outline-primary antialiased focus:shadow-none",
        }
      }}>
      <html lang='en'>
        <body className='p-0 m-0'>
          <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
