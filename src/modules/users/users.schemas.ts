import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

// Create user
const createUserBodySchema = z.object({
  username: z.string(),
  password: z.string().min(6),
});
export type CreateUserBody = z.infer<typeof createUserBodySchema>;
export const createUserJsonSchema = { body: zodToJsonSchema(createUserBodySchema, 'createUserBodySchema'), };



// Login User
const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
});
export type LoginBody = z.infer<typeof loginSchema>;
export const loginJsonSchema = { body: zodToJsonSchema(loginSchema, 'loginSchema'),};

