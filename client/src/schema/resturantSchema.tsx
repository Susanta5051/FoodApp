import {z} from 'zod'

export const resturantUpdateSchema = z.object({
    resturantName:z.string().min(3,"Enter minimum three letters"),
    address: z.string().min(3,"Enter minimum three letters"),
    pincode:z.string().length(6,"Enter a valid Pincode"),
    category:z.string(),
    phone:z.string().length(10,"Enter a valid phone no")
})