import { z } from 'zod';

export const schema = z.object({
  word: z.string().nonempty(),
  meaning: z.string().nonempty().min(10),
  examples: z.string().nonempty().min(10),
  translation: z.string().nonempty(),
  image: z.string().url(),
});
