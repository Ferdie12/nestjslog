import { z, ZodType } from 'zod';

export class ExportValidation {
  static readonly CREATE: ZodType = z.object({
    userId: z.string().regex(/^[a-fA-F0-9]{24}$/, 'Invalid ObjectId format'),
    hospitalId: z
      .string()
      .regex(/^[a-fA-F0-9]{24}$/, 'Invalid ObjectId format'),
    ipAddress: z.string().min(1).max(100),
    deviceName: z.string().min(1).max(100),
    browserName: z.string().min(1).max(100),
    successful: z.boolean(),
    export: z.record(z.unknown()), // Allow any properties in the export object
    filter: z.record(z.unknown()), // Allow any properties in the filter object
  });
}
