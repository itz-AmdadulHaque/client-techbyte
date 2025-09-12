import { z } from "zod";
import { phoneNumberSchema } from "./common.validation";

export const productRequestSchema = z.object({
    productName: z.string().min(3, "Product name is required"),
    quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
    mobileNumber: phoneNumberSchema,
    address: z.string().min(5, "Delivery address is required"),
    details: z.string().optional(),
    file: z
        .any()
        .refine(
            (file) => !file || (file instanceof FileList && file.length <= 1),
            "You can upload only 1 file"
        )
        .refine(
            (file) =>
                !file ||
                (file instanceof FileList &&
                    file.length === 1 &&
                    ["application/pdf", "image/png", "image/jpeg"].includes(file[0].type)),
            "Only PDF or image (PNG/JPEG) files are allowed"
        )
        .optional(),
});

export type ProductRequestType = z.infer<typeof productRequestSchema>;
