import { clerkMiddleware } from "@clerk/nextjs/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export default clerkMiddleware({
	secretKey: (await getCloudflareContext()).env.CLERK_SECRET_KEY,
	publishableKey: (await getCloudflareContext()).env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
};
