import { z } from "zod";

export const deviceConditionSchema = z.enum(["EXCELLENT", "GOOD", "FAIR", "DAMAGED"]);
export const leadStatusSchema = z.enum(["NEW", "SENT", "RECEIVED", "VERIFIED", "PAID", "REJECTED"]);

const cleanString = (min = 1, max = 200) =>
  z
    .string()
    .trim()
    .min(min)
    .max(max)
    .transform((value) => value.replace(/[\u0000-\u001F\u007F]/g, "").replace(/\s+/g, " "));

export const valuationSchema = z.object({
  model: cleanString(2, 80),
  capacity: cleanString(2, 20),
  visualCondition: deviceConditionSchema,
  technicalCondition: deviceConditionSchema,
  batteryHealth: z.coerce.number().int().min(0).max(100),
  accessories: z.array(z.string().max(40)).max(5).default([]),
  contactName: cleanString(2, 120),
  email: z.string().trim().email().max(160).transform((value) => value.toLowerCase()),
  phone: cleanString(6, 30),
  city: z.string().trim().max(80).optional().default(""),
  notes: z.string().trim().max(700).optional().default(""),
  consent: z.literal(true),
  consentMarketing: z.boolean().optional().default(false)
});

export const loginSchema = z.object({
  email: z.string().trim().email().max(160).transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(200),
  totp: z.string().trim().max(12).optional()
});

export const priceItemSchema = z.object({
  model: cleanString(2, 80),
  slug: cleanString(2, 100),
  capacity: cleanString(2, 20),
  condition: deviceConditionSchema,
  price: z.coerce.number().int().min(0).max(20000),
  isActive: z.boolean().optional().default(true)
});

export const leadPatchSchema = z.object({
  status: leadStatusSchema.optional(),
  finalPrice: z.coerce.number().int().min(0).max(20000).nullable().optional(),
  note: z.string().trim().max(500).optional()
});

export const contentPatchSchema = z.object({
  key: cleanString(2, 80),
  title: cleanString(2, 120),
  value: z.string().trim().min(1).max(2000),
  type: z.enum(["TEXT", "MARKDOWN", "IMAGE", "JSON"]).optional().default("TEXT")
});
