"use client";

import { cn } from '@/lib/cn-utils';
import { processMarkdown } from '@/lib/md/process-markdown';
import { useUser } from '@clerk/nextjs';
import { useChat } from 'ai/react';
import { Fragment, useEffect, useRef } from 'react';

export function Chat() {
	const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
		// Throttle the messages and data updates to 50ms:
		// experimental_throttle: 50
	});
	const endOfMessagesRef = useRef<HTMLDivElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);


	useEffect(() => {
		endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
		endOfMessagesRef.current?.scrollIntoView();
	}, [messages]);

	const { user } = useUser();
	const username = user?.username || user?.fullName || 'User';


	const handleResetTheChat = () => {
		setMessages([]);
	};

	return (
		<div className="flex flex-col w-full py-12 mx-auto stretch prose post-body">
			{messages.map((m, index, array) => {
				const isPreviousUser = array[index - 1]?.role === "user";
				const isCurrentUser = m.role === "user";
				const isPrevAssistant = array[index - 1]?.role !== "user";
				const isCurrentAssistant = m.role !== "user";
				const isNextSection = ((isCurrentAssistant && isPreviousUser) || (isCurrentUser && isPrevAssistant));

				return (
					<Fragment key={m.id}>
						<div key={`${m.id}_role`} className={cn("flex items-start", isCurrentUser ? "flex-row-reverse" : "flex-row", isCurrentUser && isPreviousUser && "hidden", isNextSection && "mt-4")}>
							<div className={cn("py-2 px-4 rounded-3xl bg-primary text-primary-foreground font-semibold", isCurrentUser && "rounded-br-lg", isCurrentAssistant && "rounded-bl-lg")}>
								{m.role === 'user' ? username : 'JAI'}
							</div>
						</div>

						<div key={`${m.id}_msg`} className={cn("flex items-start mt-1", isCurrentUser ? "flex-row-reverse" : "flex-row")}>
							<div className={cn("py-2 px-4 rounded-3xl bg-secondary overflow-hidden", isCurrentUser && isNextSection && "rounded-tr-lg", isCurrentAssistant && isNextSection && "rounded-tl-lg")} dangerouslySetInnerHTML={{ __html: processMarkdown({ markdown: m.content }) }} />
						</div>
					</Fragment>
				);
			})}

			<div ref={endOfMessagesRef} />

			<form onSubmit={(e) => e.preventDefault()} className='fixed bottom-0 w-full left-0 max-xs:p-3'>
				<div className="w-full mb-0 xs:mb-8 max-w-lg mx-auto relative h-fit p-0 box-border border rounded-xl m-0 pl-3 shadow-sm focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary bg-background">
					<textarea
						ref={textareaRef}
						className="resize-none w-full whitespace-pre-wrap mt-[0.6rem] pr-20 h-fit"
						value={input}
						placeholder="Say something..."
						onChange={handleInputChange}
						// rows={Math.min(3, input.split('\n').length)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								if (!e.shiftKey) {
									e.preventDefault();
									handleSubmit(e);
								}
							}

							if (e.key === 'Tab') {
								e.preventDefault();
								buttonRef.current?.focus();
							}

						}}
					/>

					<div className='absolute right-2 bottom-0 h-full flex flex-col-reverse gap-1 items-center justify-center'>
						<button className='bg-zinc-400 text-primary-foreground py-0 px-3 rounded-md cursor-pointer hover:brightness-125 focus:brightness-125 w-16 text-center'
							tabIndex={0}
							ref={buttonRef}
							onClick={handleResetTheChat}
						>
							<code className='text-primary-foreground '>Reset</code>
						</button>

						<button className='bg-primary text-primary-foreground py-0.5 px-3 rounded-md cursor-pointer hover:brightness-125 focus:brightness-125 w-16 text-center'
							tabIndex={0}
							ref={buttonRef}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									handleSubmit();
									textareaRef.current?.focus();
								}
							}}
							onClick={() => {
								if (isLoading) {
									stop();
								} else {
									handleSubmit();
									textareaRef.current?.focus();
								}
							}}
						>
							<code className='text-primary-foreground '>{isLoading ? 'Stop' : 'Enter'}</code>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
