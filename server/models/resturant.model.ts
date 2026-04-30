import mongoose, { mongo } from "mongoose";

export interface IResturant {
    user:mongoose.Schema.Types.ObjectId;
    resturantName : string;
    address:string;
    pincode:number,
    category:string,
    imageUrl:string;
    phone:string;
    menus:mongoose.Schema.Types.ObjectId[]
}
export interface IResturantDocument extends IResturant,Document{
    createdAt:Date;
    updatedAt:Date;
}

export const resturantSchema = new mongoose.Schema<IResturantDocument>({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    resturantName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },   
    category:{
        type:String,
        required:true
    },
    menus:[{
        type:mongoose.Schema.Types.ObjectId,ref:"Menu"
    }],
    phone:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Resturant = mongoose.model("Resturant",resturantSchema)