import { z, ZodType } from 'zod';

export class LoginValidation {
  static readonly CREATE: ZodType = z
    .object({
      username: z.string().min(1).max(200),
      deviceName: z.string().min(1).max(100),
      browserName: z.string().min(1).max(100),
      ipAddress: z.string().min(1).max(100),
    })
    .catchall(z.unknown()); // Menangani semua properti tambahan

  static readonly UPDATE: ZodType = z.object({
    logoutAt: z.date(),
    id: z.string(),
  });
}
