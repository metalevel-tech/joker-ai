"use client";
import { UserButton } from '@clerk/nextjs';
import { useChat } from 'ai/react';

import Image from "next/image";

// export const dynamic = "force-dynamic";

export default function Home() {


  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <>
      <div className='flex flex-row justify-between w-full max-w-md'>

        <Image
          className='dark:invert'
          src='/next.svg'
          alt='Next.js logo'
          width={180}
          height={38}
          priority
        />

        <UserButton />
      </div>


      <div className="flex flex-col w-full py-24 mx-auto stretch">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        ))}

        <form onSubmit={handleSubmit} className='w-full overflow-hidden'>
          <input
            className="fixed dark:bg-zinc-900 bottom-0 w-full p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl max-w-md"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </>
  );
}
