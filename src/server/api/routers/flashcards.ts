import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const flashcardsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.flashcards.findMany({
        select: {
          word: true,
          meaning: true,
          examples: true,
          translation: true,
          image: true,
          updatedAt: true,
          createdAt: true,
          id: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  }),
  postCard: publicProcedure
    .input(
      z.object({
        word: z.string(),
        meaning: z.string(),
        examples: z.string(),
        translation: z.string(),
        image: z.string(),
        // id: z.string(),
        // updatedAt: z.date(),
        // createdAt: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.flashcards.create({
          data: {
            word: input.word,
            meaning: input.meaning,
            examples: input.examples,
            translation: input.translation,
            image: input.image,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
