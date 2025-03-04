import { z } from "zod";

// BP Reading Schema
export const bpReadingSchema = z.object({
    id: z.number(),
    user_id: z.string().uuid(),
    systolic: z.number().min(50).max(300),
    diastolic: z.number().min(30).max(200),
    device_type: z.enum(["manual", "digital", "smart"]),
    created_at: z.string().datetime(),
});
export type BPReading = z.infer<typeof bpReadingSchema>;

// Glucose Reading Schema
export const glucoseReadingSchema = z.object({
    id: z.number(),
    user_id: z.string().uuid(),
    glucose: z.number().min(20).max(600),
    created_at: z.string().datetime(),
});
export type GlucoseReading = z.infer<typeof glucoseReadingSchema>;

// Preferences Schema
export const preferencesSchema = z.object({
    id: z.number(),
    user_id: z.string().uuid(),
    bp_frequency: z.number().min(1).max(5),
    glucose_frequency: z.number().min(1).max(5),
    bp_device: z.enum(["manual", "digital", "smart"]),
});
export type Preferences = z.infer<typeof preferencesSchema>;