import { Inbox, IndianRupee,  MapPin, Store } from "lucide-react";
import {  useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useMenuStore from "../store/useMenuStore";


type ContainerType = {
  _id:string;
  image:string;
  name:string;
  desc:string;
  price:number;
  quantity?:string;
  address?:string;
  store?:string 
}




const ProductBox = ({_id,image,name,desc,price,address="",store="",quantity}:ContainerType) => {
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const navigate = useNavigate();
  const { addToCart } = useMenuStore();
  const {user , findUserById } = useUserStore();
  

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    // Keep your logic for rotating taller images
    if (img.naturalHeight > (img.naturalWidth )) {
      setIsPortrait(true);
    }
  };

  const handleAddToCart = async () => {
    if(!user){
      toast.error("Please login to add items to cart");
      navigate('/login')
      return;
    }
    await addToCart(_id,user._id);
    await findUserById(user._id);
  }
 
  return (
    // Main Card Container
    <div 
        className="flex flex-col p-5 m-5  bg-white border-4 border-orange-950 rounded-2xl shadow-lg overflow-hidden min-w-[200] sm:max-w-64 hover:scale-110 hover:transition  hover:ease-in-out">
      
      {/* 1. Upper Half: Image Container */}
      <div className="h-48 w-full mt-2 p-1 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          onLoad={handleLoad}
          alt="food product"
          // object-contain ensures "showing all" without cropping
          className={`transition-transform duration-300  pt-1.5 object-cover ${
            isPortrait ? " " : ""
          }`}
        />
      </div>

      {/* 2. Lower Half: Content Area */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-lg text-orange-950">{name}</h3>
        <p className="text-sm text-gray-600">{desc}</p>
        {
          store && 
          <div className="flex">
            <Store size={18} className=""/>
            <p className="text-sm pl-1 inline text-gray-600"> {store}</p>
          </div>
        }
        {
          address && 
          <div className="flex">
            <MapPin size={18} className="shrink-0"/>
            <p className="text-sm pl-1 inline text-gray-600"> {address}</p>
          </div>
        }
        {
          quantity && 
          <div className="flex">
            <Inbox size={18} className="shrink-0"/>
            <p className="text-sm inline pl-1 text-gray-600"> {JSON.parse(quantity)}</p>
          </div>
        }
        <div className="flex">
          <IndianRupee size={15} className="mt-1"/>
          <span>{price}</span>
        </div>
        <button type="button" onClick={handleAddToCart} className="mt-auto bg-orange-950 text-white py-2 rounded-lg font-medium hover:bg-orange-800 transition">
          Add To Cart
        </button>
        
      </div>
      
    </div>
  );
};

export default ProductBox;
