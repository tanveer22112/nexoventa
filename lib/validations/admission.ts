import { z } from "zod";

export const admissionSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  fatherName: z.string().trim().min(2, "Enter a parent or guardian name."),
  phone: z.string().trim().min(7, "Enter a valid phone number."),
  whatsapp: z.string().trim().min(7, "Enter a valid WhatsApp number."),
  email: z.string().trim().email("Enter a valid email address.").transform((value) => value.toLowerCase()),
  education: z.string().trim().min(2, "Enter your education."),
  batchId: z.string().cuid("Choose a valid training slot."),
  cnic: z.string().trim().optional(),
  occupation: z.string().trim().optional(),
  experience: z.string().trim().optional(),
  address: z.string().trim().optional(),
  notes: z.string().trim().max(1000, "Keep your message under 1,000 characters.").optional(),
});

export type AdmissionInput = z.infer<typeof admissionSchema>;
