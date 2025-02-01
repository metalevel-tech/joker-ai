"use client";

import { Chat } from '@/components/Chat';
import { TopBar } from '@/components/TopBar';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-lg overflow-hidden'>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <TopBar />

        <Chat />
      </SignedIn>
    </main>
  );
}
