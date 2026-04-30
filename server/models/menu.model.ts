import mongoose from "mongoose";

export interface IMenu{
    _id:mongoose.Schema.Types.ObjectId;
    name:String;
    desc:string;
    price:number;
    image:string;
    quantity:number;
    categories:Array<string>;
    resturantId:mongoose.Schema.Types.ObjectId;

}

export interface IMenuDocument extends IMenu,Document{
    createdAt:Date;
    updatedAt:Date;
}

const menuSchema = new mongoose.Schema<IMenuDocument>({
    name:{ 
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    categories:{
        type:[String],
        required:true
    },
    resturantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Resturant",
        required:true
    },
    
},{timestamps:true})

export const Menu = mongoose.model("Menu" , menuSchema);