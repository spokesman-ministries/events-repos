import { z } from "zod";

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s0-9])+$/;

export const guestSchema = z.object({
  name: z.string().min(2, "Guest name is required"),
});

export const registrationSchema = z.object({
  name: z.string().min(2, "Your full name is required"),
  email: z.string().email("A valid email is required"),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone number format")
    .min(7, "Phone number is too short")
    .max(15, "Phone number is too long"),
  bringingGuests: z.boolean(),
  guests: z.array(guestSchema),
});

export type GuestEntry = z.infer<typeof guestSchema>;
export type RegistrationForm = z.infer<typeof registrationSchema>;
