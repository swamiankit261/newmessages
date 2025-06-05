import { z } from 'zod';

export const signInSchema = z.object({
    identifier: z.string(),
    password: z.string().regex(/^.{6}$/, { message: 'Passwoed must be at least 6 characters' }),
})
