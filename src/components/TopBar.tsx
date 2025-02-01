"use client";

import { UserButton } from "@clerk/nextjs";
import { SelectModel } from "./SelectModel";

export function TopBar() {
	return (
		<div className='fixed top-0 left-0 w-full px-3'>
			<div className='flex flex-row justify-between py-2 px-2 drop-shadow-sm bg-background/75 backdrop-blur-sm z-50 max-w-xl mx-auto rounded-xl border border-zinc-400/20 mt-4 gap-2'>
				<SelectModel />
				<UserButton />
			</div>
		</div>
	);
}
