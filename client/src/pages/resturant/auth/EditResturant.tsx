import { ArrowLeft, Loader } from "lucide-react";
import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   userEditSchema,
//   // type EditInputState,
// } from "../../../schema/UserSchema";
import { BrowserContext } from "../../../context/UserContext";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useResturantStore } from "../../../store/useResturantstore";
// import type mongoose from "mongoose";
import checkNumber from "../../../lib/checkNumber";
import { resturantUpdateSchema } from "../../../schema/resturantSchema";

type ResturantType = {
  resturantName: string;
  address: string;
  pincode: string;
  category: string;
  phone:string;
  
};

// type MenuType = {
//   _id: mongoose.Types.ObjectId;
//   name: string;
//   desc: string;
//   image: string;
//   price: number;
//   quantity: number;
//   categories: Array<string>;
// };

const EditProfile = () => {
  const context = useContext(BrowserContext);
  if (context == undefined) return;
  const { modeDay } = context;
  const { updateResturant, loading, resturant } = useResturantStore();
  if(!resturant)return
  console.dir(resturant)
  const [formData, setFormData] = useState<ResturantType>({
    resturantName: resturant.resturantName,
    address: resturant.address,
    category: resturant.category,
    pincode: JSON.stringify(resturant.pincode),
    phone:resturant.phone
  });
  const [image, setImage] = useState<File>();
  const [errors, setErrors] = useState<Partial<ResturantType>>({});
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();
    const result = resturantUpdateSchema.safeParse(formData);
    if (!result.success) {
      result.error._zod.def.forEach((e: any) => {
        setErrors((errors) => ({
          ...errors,
          [e.path[0]]: e.message,
        }));
      });
      console.log(errors);
      return;
    }
    try {
      let newFormData = new FormData();
      newFormData.append("address", formData.address);
      newFormData.append("category", formData.category);
      newFormData.append("pincode", formData.pincode);
      newFormData.append("resturantName", formData.resturantName);
      newFormData.append("phone",formData.phone)
      if (image) {
        newFormData.append("file", image);
      }
      await updateResturant(newFormData);
      navigate(-1)
    } catch (error) {
      console.log("error",error);
    }
    
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "file") {
      if (e.target.files) setImage(e.target.files[0]);
      return;
    }

    const { name, value } = e.target;
    if(name == "pincode"){
      if(value.length > 0 && !checkNumber(value)){
        setErrors({...errors ,["pincode"]:"Enter Only Numbers"})
        return
      }else{
        setErrors({...errors,["pincode"]:""});
      }
    }

    if(name == "phone"){
      if(value.length > 0 && !checkNumber(value)){
        setErrors({...errors ,["phone"]:"Enter Only Numbers"})
        return
      }else{
        setErrors({...errors,["phone"]:""});
      }
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // useEffect(()=>{
    
  //   setFormData({
  //     resturantName: "",
  //     address: "",
  //     category: "",
  //     pincode: "",
  //     phone:""
  //   })
  // },[])

  return (
    <div
      className={`flex flex-col justify-center ${
        modeDay ? " bg-white text-black" : "bg-gray-700 text-white"
      }`}
    >
      <div>{/* <Navbar/> */}</div>
      <div className=" p-2  bg-radial from-blue-300 to-red-300">
        <div className="absolute" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </div>
        <div className="flex justify-center items-center  h-screen ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-around pt-10 gap-1 p-5 rounded-2xl sm:min-w-150 sm:min-h-100"
          >
            <label htmlFor="name">FullName</label>
            <Input
            id="name"
              type="text"
              onChange={handleChange}
              className="bg-gray-400  rounded"
              name="resturantName"
              value={formData.resturantName}
            ></Input>
            {errors.resturantName && (
              <p className="text-red-500">{errors.resturantName}</p>
            )}

            <label htmlFor="address">Address</label>
            <Input
              type="text"
              id="address"
              onChange={handleChange}
              className="bg-gray-400 p-2 "
              name="address"
              value={formData.address}
            ></Input>
            {errors.address && <p className="text-red-500">{errors.address}</p>}
            

            <label htmlFor="pincode">Pincode</label>
            <Input
              type="text"
              id="pincode"
              onChange={handleChange}
              className="bg-gray-400 p-2 "
              name="pincode"
              value={formData.pincode}
            ></Input>
            {errors.pincode && <p className="text-red-500">{errors.pincode}</p>}

            <label htmlFor="phone">Phone</label>
            <Input
              type="text"
              id="phone"
              onChange={handleChange}
              className="bg-gray-400 p-2 "
              name="phone"
              value={formData.phone}
            ></Input>
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}

            <label htmlFor="category">Category</label>
            <Input
              type="text"
              id="category"
              onChange={handleChange}
              className="bg-gray-400 p-2 "
              name="category"
              value={formData.category}
            ></Input>
            {errors.category && <p className="text-red-500">{errors.category}</p>}

            <label htmlFor="banner">Banner</label>
            <Input
            id="banner"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="bg-gray-400 p-2 "
              name="file"
            ></Input>
            <Button
              type="submit"
              className="w-full bg-black hover:bg-amber-700 text-white py-2 rounded-2xl  mt-2"
            >
              {!loading ? (
                <p>Update</p>
              ) : (
                <div className="justify-center">
                  <Loader className="rotate inline"></Loader>
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
      <div>{/* <Footer/> */}</div>
    </div>
  );
};

export default EditProfile;
