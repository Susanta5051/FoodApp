import type {Response , Request} from 'express'
import uploadImageOnCloudinary from '../utils/imageUpload.ts'
import {Menu} from '../models/menu.model.ts'
import { User } from '../models/user.model.ts';
import { Resturant } from '../models/resturant.model.ts';
import mongoose from 'mongoose';
// import { truncate } from 'node:fs';

export const addMenu = async (req:Request ,res:Response)=>{
    try{

        const {name ,resturantId, desc,price,quantity,categories} = req.body;
        const file = req.file;
        if(!file){
            return res.status(400).json({
                success :false,
                message:"Image is required"
            })
        }
        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File)
        const menu = await Menu.create({
            name,
            desc,
            price,
            image:imageUrl,
            quantity,
            categories:categories,
            resturantId
        })

         const resturant = await Resturant.findById(resturantId);
         if(resturant){
            (resturant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
            await resturant.save();
         }

         return res.status(201).json({
            success:true,
            message:"Menu added successfully",
            menu
         })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const editMenu = async (req:Request , res:Response)=>{
    try{
        
        const{id ,name , desc , price,quantity,categories,resturantId,}  = req.body;
        const file = req.file ;
        let imgUrl;
         if(file){
             imgUrl = await uploadImageOnCloudinary(file as Express.Multer.File)
         }
         const category:Array<String> = JSON.parse(categories);
        const menu = await Menu.findByIdAndUpdate(id , {name , desc ,price ,quantity,...{categories:category}, ...(imgUrl && {image:imgUrl}) },{returnDocument:"after"});
        if(!menu){
            return res.status(404).json({
                success:false,
                message:"Menu not found"
            })
        }
        return res.status(200).json({
            success : true,
            message:"Menu updated successfully",
            menu
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}


export const deleteMenu = async(req:Request , res:Response)=>{
    try{
        const {id} = req.params;
        const menu = await Menu.findByIdAndDelete(id);
        if(!menu){
            return res.status(404).json({
                success:false,
                message:"Menu not found"
            })
        }

        await Resturant.findByIdAndUpdate(menu.resturantId , {$pull:{menus:menu._id}})

        return res.status(200).json({
            success:true,
            message:"Menu deleted successfully"
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}


export const searchMenu = async(req:Request , res:Response)=>{
    try{
        const {searchQuery ,location} = req.query;
        // console.log("Search query:", searchQuery);
        // console.log("Location:", location);
        const menus = await Menu.aggregate([
            {
                $match:{
                    name:{$regex:searchQuery as string , $options:"i"}
                }
            },
            {
                $lookup:{
                    from:"resturants",
                    localField:"resturantId",
                    foreignField:"_id",
                    as:"resturant"
                }
            },
            {
                $unwind:"$resturant"
            },
            {
                $match:{
                    
                    "resturant.address":{
                        $regex:location as string ,
                        $options:"i"
                    },
                     
                }
            },
            
        ])
        // console.dir(menus)
        if(menus.length === 0){
            return res.status(404).json({
                success:false,
                message:"No menu found matching the search criteria"
            })
        }
        return res.status(200).json({
            success:true,
            data:menus
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}


export const addToCart = async(req:Request , res:Response)=>{
    try{
        const {menuId , userId} = req.body;
        const menu = await Menu.findById(menuId);
        if(!menu){
            return res.status(404).json({
                success:false,
                message:"Menu not found"
            })
        }
        if(menu.quantity <= 0){
            return res.status(400).json({
                success:false,
                message:"Menu is out of stock"
            })
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        const exists = (user.cart as { menu: mongoose.Schema.Types.ObjectId; quantity: number }[])
            .some(item => item.menu.toString() === menuId);

        if (exists) {
            return res.status(200).json({
                success: true,
                message: "Menu already exists in cart"
            });
        }
    
        (user.cart as { menu: mongoose.Schema.Types.ObjectId; quantity: number }[]).push({ menu: menu._id, quantity: 1 });
        await user.save();
        await menu.save();
        return res.status(200).json({
            success:true,
            message:"Menu added to cart successfully"
         })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}