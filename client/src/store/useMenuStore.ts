import {create} from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = 'http://localhost:3000/api/v1/menu'

type UseMenuStoreType = {
    loading:boolean,
    menu:MenuType | null,
    searchedMenu : GetMenuType[] | null,
    addMenu: (formData:FormData)=>Promise<void>,
    updateMenu: (formData:FormData)=>Promise<void>,
    addEditMenu: (menu:MenuType)=>Promise<void>,
    deleteMenu: (menuId:string)=>Promise<void>
    searchAllMenu: (searchQuery:string,location:string)=>Promise<void>,
    addToCart: (menuId:string,userId:string)=>Promise<void>
}

type ResturantType = {
    _id:string;
    user:string;
    resturantName : string;
    address:string;
    pincode:number,
    category:string,
    imageUrl:string;
    menus:MenuType[];
    phone:string;
}
type MenuType= {
    resturantId : string;
    _id:string;
    name:string;
    desc:string;
    // imageUrl:string;
    price:number;
    quantity:number;
    categories:Array<string>
}
type GetMenuType= {
    resturantId : string;
    _id:string;
    name:string;
    desc:string;
    image:string;
    price:number;
    quantity:number;
    categories:Array<string>
    resturant:ResturantType
}

const useMenuStore  = create<UseMenuStoreType>()(persist((set)=>({
    loading:false,
    menu:null,
    searchedMenu :null,
    addMenu: async(formData:FormData)=>{
        try{
            set({loading:true})
            console.log("data to be sent")
            console.dir(formData.forEach((value,key)=>{
                console.log(key,value)
            }))
            console.log("image", formData.get("image"))
            const response = await axios.post(`${API_END_POINT}/create`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })

            if(response.data.success){
                toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }
        }catch(error:any){
            toast.error(error.response?.data?.message || "An error occurred while creating the menu.")
        }finally{
            set({loading:false})
        }
    },
    updateMenu: async(formData:FormData)=>{
        try{
            set({loading:true})
            
            const response = await axios.put(`${API_END_POINT}/update`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            if(response.data.success){
                set({menu:response.data.menu})
                toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }
        }catch(error:any){
            toast.error(error.response?.data?.message || "An error occurred while updating the menu.")
        }finally{
            set({loading:false})
        }
    },
    addEditMenu: async(menu:MenuType)=>{
        set({menu})
    },
    deleteMenu: async(menuId:string)=>{
        try{
            set({loading:true})
            const response = await axios.delete(`${API_END_POINT}/delete/${menuId}`)
            if(response.data.success){
                toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }
        }catch(error:any){
            toast.error(error.response?.data?.message || "An error occurred while deleting the menu.")
        }finally{
            set({loading:false})
        }

    },
    searchAllMenu: async(searchQuery:string,location:string)=>{
         try{
            set({loading:true})
            const response = await axios.get(`${API_END_POINT}/search/?searchQuery=${searchQuery}&location=${location}`)
            if(response.data.success){
                set({loading:false , searchedMenu:response.data.data})
            }
            // console.log(response.data.data)
        }catch(error:any){
            set({loading:false ,searchedMenu:null})
            console.log(error.response.data.message)
        }
    },
    addToCart: async(menuId:string,userId:string)=>{
        try{
            set({loading:true})
            console.log("Adding to cart", {menuId,userId})
            const response = await axios.post(`${API_END_POINT}/add-to-cart`,{menuId,userId},{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            console.log("Add to cart response:")
            console.dir(response)
            if(response.data.success){
                toast.success(response.data.message)
                
            }else{
                toast.error(response.data.message)
            }
        }catch(error:any){
            toast.error(error.response?.data?.message || "An error occurred while adding the menu to cart.")
        }
        finally{
            set({loading:false})
        }
    }

})
,{
    name:"menu-storage",
    storage:createJSONStorage(()=>localStorage)
}))

export default useMenuStore;