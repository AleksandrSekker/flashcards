import { createTRPCRouter } from '~/server/api/trpc';
import { flashcardsRouter } from '~/server/api/routers/flashcards';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  flashcards: flashcardsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
