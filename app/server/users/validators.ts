import {  z } from "zod";

export const newUserSchema = z.object({
  id:z.string().optional(),
  first_name: z.string().min(2, "First name must be at least 2 characters."),
  last_name: z.string().min(2, "First name must be at least 2 characters."),
  email: z.string().email("Enter a vaild email address."),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
   confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const loginSchema = z.object({
  email: z.string().email("Enter a vaild email address."),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});


export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, "Current password is required"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your new password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


  export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(100),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords you entered do not match.",
    path: ["confirmPassword"],
  });
