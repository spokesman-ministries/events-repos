import { z } from "zod";

export const categories = [
  { id: "null", name: "--- Select Category ---", price: null },
  { id: "student", name: "Students Category", price: 1500 },
  { id: "working-class", name: "Working Class Category", price: 15000 },
  { id: "executive", name: "Executive Category", price: 25000 },
];

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s0-9])+$/;
export const childSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone number format")
    .min(7)
    .max(15)
    .optional()
    .or(z.literal("")),
  categoryId: z.string().refine((val) => val !== "null", { message: "Please select a category",}),

});

export const registrationSchema = z.object({
  name: z.string().min(2, "Your full name is required"),
  email: z.string().email("A valid email is required"),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone number format")
    .min(7)
    .max(15)
    .optional()
    .or(z.literal("")),
  categoryId: z.string().refine((val) => val !== "null", { message: "Please select a category",}),
  children: z.array(childSchema),
  
  paymentMethod: z.enum(["online", "bank"]).optional(),
});

export type RegistrationForm = z.infer<typeof registrationSchema>;