"use client";

import { SelectModel } from '@/components/SelectModel';
import { cn } from '@/lib/cn-utils';
import { processMarkdown } from '@/lib/md/process-markdown';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { useChat } from 'ai/react';
import { Fragment, useEffect, useRef } from 'react';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const user = useUser();

  return (
    <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-lg overflow-hidden'>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <div className='fixed top-0 left-0 w-full px-3'>
          <div className='flex flex-row justify-between py-2 px-2 drop-shadow-sm bg-background/75 backdrop-blur-sm z-50 max-w-xl mx-auto rounded-xl border-2 border-zinc-400/20 mt-4'>
            <SelectModel />
            <div className='scale-110 flex items-center'>
              <UserButton />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full py-12 mx-auto stretch prose post-body">
          {messages.map((m, index, array) => (
            <Fragment key={m.id}>
              <div className={cn(((m.role !== "user" && array[index - 1]?.role === "user") || (m.role === "user" && array[index - 1]?.role !== "user")) && "mt-4")}>
                <div className={cn("flex items-start", m.role === "user" ? "flex-row-reverse" : "flex-row", m.role === "user" && array[index - 1]?.role === "user" && "hidden")}>
                  <div className="py-2 px-4 rounded-3xl bg-primary text-primary-foreground font-semibold">
                    {m.role === 'user' ? user.user?.fullName || 'User' : 'JAI'}
                  </div>
                </div>

                <div className={cn("flex items-start mt-1", m.role === "user" ? "flex-row-reverse" : "flex-row")}>
                  <div className="py-2 px-4 rounded-3xl bg-secondary overflow-hidden" dangerouslySetInnerHTML={{ __html: processMarkdown({ markdown: m.content }) }} />
                </div>
              </div>
            </Fragment>
          ))}

          <div ref={endOfMessagesRef} />

          <form onSubmit={(e) => e.preventDefault()} className='fixed bottom-0 w-full left-0 max-xs:p-3'>
            <textarea
              className="w-full px-3 py-3 mb-0 xs:mb-8 border-2 rounded-xl shadow-xl max-w-lg resize-none whitespace-pre-wrap mx-auto block focus:outline focus:outline-2 focus-visible:outline-offset-2 focus:outline-primary"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
              rows={Math.min(3, input.split('\n').length)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    handleSubmit(e);

                    console.log(e.currentTarget);
                    e.currentTarget.blur();
                  }
                }
              }}
            />
          </form>
        </div>
      </SignedIn>
    </main>
  );
}
