import { z } from 'zod';

export const authDTOSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
});

export const connectDropboxDTOSchema = z.object({
  userId: z.number(),
  dropboxId: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type AuthDTO = z.infer<typeof authDTOSchema>;
export type ConnectDropboxDTO = z.infer<typeof connectDropboxDTOSchema>;
