import { z } from 'zod';
// Define the form schema with Zod to match the Address table
export const addressFormSchema = z.object({
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  phone: z.string().min(1, 'Phone number is required'),
  isDefault: z.boolean().default(false),
  addressName: z.enum(['home', 'work', 'other']).default('home'),
  // Replace firstName and lastName with fullName
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  orderNote: z.string().optional(),
});

// Infer the type from the schema
export type AddressFormValues = z.infer<typeof addressFormSchema>;
