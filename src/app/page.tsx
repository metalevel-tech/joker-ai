"use client";
import { cn } from '@/lib/cn-utils';
import { processMarkdown } from '@/lib/md/process-markdown';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { useChat } from 'ai/react';

import Image from "next/image";
import { Fragment } from 'react';


export default function Home() {


  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-lg overflow-hidden'>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <div className='flex flex-row justify-between w-full max-w-lg'>

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


        <div className="flex flex-col w-full py-24 mx-auto stretch prose post-body">
          {messages.map((m, index, array) => (
            <Fragment key={m.id}>
              <div className={cn(((m.role !== "user" && array[index - 1]?.role === "user") || (m.role === "user" && array[index - 1]?.role !== "user")) && "mt-4")}>
                <div className={cn("flex items-start", m.role === "user" ? "flex-row-reverse" : "flex-row", m.role === "user" && array[index - 1]?.role === "user" && "hidden")}>
                  <div className="py-2 px-4 rounded-3xl bg-primary text-primary-foreground ">
                    {m.role === 'user' ? 'User: ' : 'AI: '}
                  </div>
                </div>

                <div className={cn("flex items-start mt-1", m.role === "user" ? "flex-row-reverse" : "flex-row")}>
                  <div className="py-2 px-4 rounded-3xl bg-secondary overflow-hidden" dangerouslySetInnerHTML={{ __html: processMarkdown({ markdown: m.content }) }} />
                </div>
              </div>
            </Fragment>
          ))}

          <form onSubmit={handleSubmit} className='w-full overflow-hidden'>
            <input
              className="fixed dark:bg-zinc-900 bottom-0 w-full p-2 mb-8 border-2 border-zinc-300 dark:border-zinc-800 rounded-2xl shadow-xl max-w-lg"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
          </form>
        </div>
      </SignedIn>
    </main>
  );
}
