import {  z} from 'zod';


export const ResturantRegisterSchema = z.object({
  resturantName: z.string().min(1, "Enter a valid name"),
    user:z.string().min(1,"pleanlogin"),
  phone: z.string().length(10, "Enter a valid mobile number"),
  address: z.string(),
  category: z.string(),
  banner: z.instanceof(File).optional(), 
  pincode:z.string().length(6,"Enter a valid PinCode")
});
export type ResturantRegisterState = z.infer<typeof ResturantRegisterSchema>;

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


export const ProductSchema = z.object({
    name:z.string().min(3,"Please Enter a valid name"),
    price:z.string().min(1,"Please make price atleast one"),
    quantity:z.string().min(1,"Please enter at least one"),
    desc:z.string(),
    category:z.array(z.string()).min(1,"Please select at least one category"),})

export type ProductType = z.infer<typeof ProductSchema>
