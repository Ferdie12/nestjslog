import { z, ZodType } from 'zod';

export class ExternalValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    private_key: z.string().min(1).max(300),
  });
}
