import { z } from "zod";
import { phoneNumberSchema } from "./common.validation";

export const orderInfoSchema = z.object({
    phone: phoneNumberSchema,
    address: z.string().min(5, 'Please enter detailed address'),
    district: z.string().min(5, 'Please enter district'),
    thana: z.string().min(5, 'Please enter thana'),
})

export type OrderInfoSchema = z.infer<typeof orderInfoSchema>