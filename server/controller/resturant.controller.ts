
import type {Request  , Response} from 'express'
import {Resturant} from '../models/resturant.model.ts'
import multer from 'multer'
import uploadImageOnCloudinary from '../utils/imageUpload.ts';
import mongoose from 'mongoose';
import {Order} from '../models/order.model.ts'
import {User} from '../models/user.model.ts'

export const createResturant = async(req:Request , res:Response) =>{
    try{
        const {resturantName ,user, address ,phone, pincode,category,menus } = req.body;
        const file = req.file;
        const resturant  =  await Resturant.findOne({user: req.id});
        if(resturant){
            return res.status(400).json({
                success:true,
                message:"Resturant already exists for this user"
            })
        }
        
        if(!file){
            console.log("file is empty")
            return res.status(400).json({
                success:true,
                message:"Image is required"
            })
        }

        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        await Resturant.create({
            user:req.id,
            resturantName,
            address,
            pincode,
            imageUrl,
            category,
            phone
        })
        await User.findByIdAndUpdate(req.id,{admin:true});

        return  res.status(201).json({
            message:"Resturant created",
            success:true
        })
    }catch(error) { 
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"})
    }
}

export const getResturant =async (req : Request , res :Response)=>{
    try{
        const resturant = await Resturant.findOne({user : req.id}).populate("menus");
        if(!resturant){
            return res.status(404).json({
                success:false,
                message:"Resturant not found"
            })
        }
        return res.status(200).json({
            success:true,
            resturant
        })
    }catch(error) { 
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"})
    }
}

export const updateResturant =async (req : Request , res :Response)=>{
    try{
        console.log("req received")
        const resturant = await Resturant.findOne({user : req.id});
        const {resturantName , address,pincode , category,user , phone} = req.body;
        const file = req.file;
        if(!resturant){
            return res.status(404).json({
                success:false,
                message:"Resturant not found"
            })
        }
        let imageUrl = resturant.imageUrl;
        if(file){
            imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            console.log(imageUrl)
        }

        const updated = await Resturant.findByIdAndUpdate(
        resturant.id,
        { resturantName, address, pincode, category, phone, user, imageUrl },
        { new: true }
        );

        return res.status(200).json({
        success: true,
        message: "resturant updated",
        resturant: updated
        });

        
    }catch(error) { 
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"})
    }
}

export const getResturantOrder = async( req:Request , res :Response)=>{
    try{
        const resturant  = await Resturant.findOne({user:req.id});
        if(!resturant){
             return res.status(404).json({
                success:false,
                message:"Resturant not found"
            })
        }

        const orders = await Order.findById({resturant : resturant._id}).populate('resturant').populate('user');
        
        if(!orders){
             return res.status(404).json({
                success:false,
                message:"No Orders found"
            })
        }
        return res.status(200).json({
            success:true,
            orders
        })

    }catch(error) { 
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"})
    }
}


export const updateOrders = async (req:Request , res :Response)=>{
    try{
        const {orderId} = req.params;
        const {status} = req.body;
        const order = await Order.findOne({orderId});
        if(!order){
             return res.status(404).json({
                success:false,
                message:"Orders not found"
            })
        }
        
        order.status = status;
        await order.save();
        return res.status(200).json({
            success:true,
            order
        })
    }catch(error) { 
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"})
    }
}


export const updateStatus = async (req :Request , res:Response) =>{
    try{
        const {orderId} = req.params;
        const {status} = req.body;
        const order = await Order.findOneAndUpdate(
            { orderId },
            { status },
            { new: true }
        );
        if(!order){
            return res.status(404).json({
                success:false,
                message:"Order  not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Status Updated"
        })
    }catch(error) { 
        console.log(error);
        return res.status(500).json({message : "Internal Server Error"})
    }
}

export const searchResturant = async (req: Request, res: Response) => {
    try {
        const searchQuery = (req.query.searchQuery as string) || "";

        const query: any = {};

        if (searchQuery) {
            query.$or = [
                {
                    resturantName: {
                        $regex: searchQuery,
                        $options: "i",
                    },
                },
            ];
        }

        const resturants = await Resturant.find(query).limit(20); 

        return res.status(200).json({
            success: true,
            count: resturants.length,
            data: resturants,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


export const getSingleResturant = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;

    const resturant = await Resturant.findById(storeId).populate({
      path: "menus",
      options: { sort: { createdAt: -1 } },
    });

    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: resturant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

}