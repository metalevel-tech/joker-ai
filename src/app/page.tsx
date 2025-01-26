"use client";
import { useChat } from 'ai/react';

import Image from "next/image";

// export const dynamic = "force-dynamic";

export default function Home() {


  const { messages, input, handleInputChange, handleSubmit } = useChat();

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
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
          {messages.map(m => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === 'user' ? 'User: ' : 'AI: '}
              {m.content}
            </div>
          ))}

          <form onSubmit={handleSubmit}>
            <input
              className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
}
