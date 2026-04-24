import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IUser {
    fullName:string;
    email:string;
    password:string;
    phone:Number;
    address:string;
    profilePicture:string;
    admin:boolean;
    lastLogin?:Date;
    isVerified:boolean;
    resetPasswordToken?:string;
    resetPasswordTokenExpireAt?:Date;
    verificationToken?:string;
    verificationTokenExpireAt?:Date;
    cart?: { menu: mongoose.Schema.Types.ObjectId; quantity: number }[];
}

export interface IUserDocument extends IUser , Document {
    createdAt : Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>({
    
    fullName : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    },
    phone : {
        type:Number,
        required:true
    },
    address : {
        type:String,
        default:"Update Your Address"
    },
    admin:{
        type:Boolean,
        default:false
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    cart:[{
        menu:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Menu"  
        },
        quantity:{
            type:Number,
            default:1
        }
    }],
    profilePicture:{
        type:String,
        required:true
    },
    isVerified:Boolean,
    resetPasswordToken:String,
    resetPasswordTokenExpireAt:Date,
    verificationToken:String,
    verificationTokenExpireAt:Date,
},
{timestamps : true});

export const User = mongoose.model("User" , userSchema);