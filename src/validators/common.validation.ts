import { z } from "zod";

export const phoneNumberSchema = z
  .string()
  .trim()
  .nonempty("Phone number is required")
  .min(11, "Phone number must be at least 11 characters long")
  .max(11, "Phone number must be at most 11 characters long")
  .refine((val) => {
    return /^\d{11}$/.test(val);
  }, "Invalid phone number");