import { z} from 'zod';

export const userSignupSchema = z.object({
    fullName: z.string().min(1,"Enter a valid name"),
    email: z.email("Invalid Email"),
    password: z.string().min(8,"Password munt be of 8 characters").max(15,"Password should not exeed 15 characters."),
    phone: z.string().length(10,"Enter a valid mobile number"),
    address : z.string()
})

export type SignupInputState = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({
    email: z.email("Invalid Email"),
    password: z.string().min(8,"Password munt be of 8 characters").max(15,"Password should not exeed 15 characters."),
})

export type LoginInputState = z.infer<typeof userLoginSchema>;

export const ChangePasswordSchema = z.object({
    email:z.email("Invalid Email"),
    oldPassword:z.string().min(8,"Password must contain atleast 8 characters").max(15,"Password should not exeed 15 characters"),
    newPassword1:z.string().min(8,"Password must contain atleast 8 characters").max(15,"Password should not exeed 15 characters"),
    newPassword2:z.string().min(8,"Password must contain atleast 8 characters").max(15,"Password should not exeed 15 characters"),
})

export type ChangePassword = z.infer<typeof ChangePasswordSchema>;

export const userEditSchema = z.object({
    fullName: z.string().min(1,"Enter a valid name"),
    phone: z.string().length(10,"Enter a valid mobile number"),
    address:z.string().min(8,"enter a valid address"),
    email:z.string(),
    image:z.string()
})

export type EditInputState = z.infer<typeof userEditSchema>;
