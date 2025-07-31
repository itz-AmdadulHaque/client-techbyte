import { z } from "zod";
import { phoneNumberSchema } from "./common.validation";

export const customerSchema = z
    .object({
        firstName: z.string().min(1, 'Please, enter your first name'),
        lastName: z.string().min(1, 'Please, enter your last name'),
        email: z.string().email("Email is invalid!"),
        password: z
            .string()
            .trim()
            .min(6, "Password must be at least 6 characters long")
            .refine((val) => {
                return /^(?=.*[A-Z])/.test(val);
            }, "Password must contain at least one uppercase letter")
            .refine((val) => {
                return /^(?=.*[a-z])/.test(val);
            }, "Password must contain at least one lowercase letter")
            .refine((val) => {
                return /^(?=.*[0-9])/.test(val);
            }, "Password must contain at least one number"),

        confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
        phone: phoneNumberSchema,
        // address: z.string().optional(),
        // district: z.string().optional(),
        // thana: z.string().optional(),
        
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export type CustomerSchema = z.infer<typeof customerSchema>;