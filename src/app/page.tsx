"use client";

import { askAI } from "@/server/ai/chat";
import Image from "next/image";
import { useEffect, useState } from "react";

// export const dynamic = "force-dynamic";

export default function Home() {
  const [hello, setHello] = useState<string | null>(null);

  const handleRequestChat = async () => {
    const hello = await askAI({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: "Hello, how are you?",
        },
      ]
    });

    setHello(hello);
  };
  const handleRequestSimple = async () => {
    const hello = await askAI({
      prompt: "Hello, how are you? And who are you?"
    });

    setHello(hello);
  };

  useEffect(() => {
    void handleRequestChat();
  }, []);

  const buttonClassName = 'rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 cursor-pointer';

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <Image
          className='dark:invert'
          src='/next.svg'
          alt='Next.js logo'
          width={180}
          height={38}
          priority
        />
        <div className="my-4 w-[360px]">
          {hello ?? "Loading..."}
        </div>


        <div className='flex gap-4 items-center flex-col sm:flex-row'>
          <div className={buttonClassName} onClick={handleRequestChat}>
            Chat
          </div>
          <div className={buttonClassName} onClick={handleRequestSimple}>
            Simple
          </div>
        </div>
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        ---
      </footer>
    </div>
  );
}
