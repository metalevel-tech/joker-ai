"use client";

import { SignInButton } from "@clerk/nextjs";


export function LoginBtn() {
	return (
		<div
			style={{
				inset: '0px',
				margin: 'auto',
				position: 'absolute',
				width: 'fit-content',
				height: '60px',
				zIndex: 10
			}}
		>
			<SignInButton>
				<button
					className='fancy-border border border-zinc-100 rounded-lg py-2 px-6 text-xl flex flex-row relative bg-background cursor-pointer hover:bg-zinc-50 transition-colors duration-150 ease-in-out'
				>
					Sign in to Joker AI
				</button>
			</SignInButton>
		</div>
	);
}
