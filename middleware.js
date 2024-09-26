import { authMiddleware } from "@clerk/nextjs/server";

const middleware = authMiddleware({
  publicRoutes: ['/'], // Specify public routes that do not require authentication
  // Specify any additional options if needed
});

// Export the middleware
export default middleware;

export const config = {
  matcher: [
    // Match the dashboard route that requires authentication
    '/dashboard/:path*',
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
