import axios from 'axios';
import {create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = 'http://localhost:3000/api/v1/order'

const useOrderStore = create()(persist((set)=>({
    loading:false,
    orders:null,
    addOrder: async(formData:FormData)=>{
        try{
            set({loading:true})
            console.log("data to be sent")
            console.dir(formData.forEach((value,key)=>{
                console.log(key,value)
            })) 
            
            const response = await axios.post(`${API_END_POINT}/add`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            if(response.data.success){
                set({loading:false})
            }
        }catch(error){
            console.error("Error while adding order",error)
            set({loading:false})
        }
    },
}),

{
    name:"order-storage",
    storage:createJSONStorage(()=>localStorage)
}
))

export default useOrderStore;