import { z } from "zod"

export const signUpSchema = z.object({
    userName: z.string().min(3, 'Username must be atleast 2 characters').max(20, 'Username be no more than 20 characters')
        .regex(/^[a-zA-Z0-9_]{3,20}$/, 'Username must note contain specail characters'),
    email: z.string().email('Invalid email adderss'),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' })
        .regex(/^.{6}$/),
});