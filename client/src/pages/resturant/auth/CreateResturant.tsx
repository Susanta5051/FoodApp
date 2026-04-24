import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Loader,
  LockKeyhole,
  User,
  Phone,
  ArrowLeft,
  MapPin,
} from "lucide-react";
// import image from '../../../assets/media/resturant.webp'
import { useNavigate } from "react-router-dom";
import {
  ResturantRegisterSchema,
  type ResturantRegisterState,
} from "../schema/ResturantSchema.tsx";
import { Button } from "../../../components/ui/button.tsx";
import { Input } from "../../../components/ui/input.tsx";
import { useResturantStore } from "../../../store/useResturantstore.tsx";
import { useUserStore } from "../../../store/useUserStore.ts";
import checkNumber from "../../../lib/checkNumber.ts";

const Register = () => {
  const { user } = useUserStore();
  if (!user) return;
  const { createResturant, loading } = useResturantStore();
  const [formData, setFormData] = useState<ResturantRegisterState>({
    resturantName: "",
    phone: "",
    address: "",
    category: "",
    pincode:"",
    user: JSON.stringify(user._id),
  });
  const [imageFile ,setImageFile] =useState<File|null>(null);
  const [errors, setErrors] = useState<Partial<ResturantRegisterState>>({});
  const navigate = useNavigate();

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "file") {
      if (e.target.files)
        setImageFile(e.target.files[0])
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

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //form data validation
    const result = ResturantRegisterSchema.safeParse(formData);
    // console.log( formData , result)
    if (!result.success) {
      result.error._zod.def.forEach((e: any) => {
        setErrors((errors: any) => ({
          ...errors,
          [e.path[0]]: e.message,
        }));
      });
      console.log("errorreee", errors);
      return;
    }
    
    const data = new FormData();

        data.append("resturantName", formData.resturantName);
        data.append("phone", formData.phone);
        data.append("address", formData.address);
        data.append("category", formData.category);
        data.append("user", formData.user);
        data.append("pincode", formData.pincode);

        if (imageFile) {
            data.append("file", imageFile); 
        }
    
    try {
      await createResturant(data);
      navigate('/profile')
    } catch (error) {
      console.log("result", error);
    }

    setTimeout(() => {}, 5000);
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-500 rounded-lg p-6 w-80 "
      >
        <p>
          <Button type="button" onClick={() => navigate(-1)}>
            <ArrowLeft />
          </Button>
        </p>

        <div className="mb-4 text-center">
          <p className="font-bold text-2xl">Welcome to Restaurant</p>
        </div>
        <div className="mb-4 relative">
          <User className="absolute left-2 top-3 text-gray-500" size={18} />

          <Input
            className="pl-8"
            placeholder="Resturant Name"
            id="resturantName"
            name="resturantName"
            value={formData.resturantName}
            onChange={handleFormChange}
          />
          {errors && (
            <span className="text-red-700 text-sm flex ">
              {errors.resturantName}
            </span>
          )}
        </div>

        <div className="mb-4 relative">
          <Phone className="absolute left-2 top-3 text-gray-500" size={18} />
          <Input
            className="pl-8"
            placeholder="Mobile no"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
          />
          {errors && (
            <span className="text-red-700 text-sm flex">{errors.phone}</span>
          )}
        </div>

        <div className="mb-4 relative">
          <MapPin className="absolute left-2 top-3 text-gray-500" size={18} />
          <Input
            className="pl-8"
            type="address"
            placeholder="address"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleFormChange}
          />
          {errors && (
            <span className="text-red-700 text-sm flex">{errors.address}</span>
          )}
        </div>

        <div className="mb-4 relative">
          <MapPin className="absolute left-2 top-3 text-gray-500" size={18} />
          <Input
            className="pl-8"
            type="text"
            placeholder="pincode"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleFormChange}
          />
          {errors && (
            <span className="text-red-700 text-sm flex">{errors.pincode}</span>
          )}
        </div>

        

        <div className="mb-4 relative">
          <MapPin className="absolute left-2 top-3 text-gray-500" size={18} />
          <Input
            className="pl-8"
            type="string"
            placeholder="category"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleFormChange}
          />
          {errors && (
            <span className="text-red-700 text-sm flex">{errors.category}</span>
          )}
        </div>

        <div className="mb-4 relative">
          <LockKeyhole
            className="absolute left-2 top-3 text-gray-500"
            size={18}
          />
          <Input
            className="pl-8"
            type="file"
            placeholder="Upload Banner"
            id="file"
            name="file"
            accept="image/*"
            onChange={handleFormChange}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-black hover:bg-amber-700 text-white py-2 rounded-md  mt-2"
        >
          {loading ? (
            <div className="justify-center">
              <Loader className="rotate inline"></Loader>
            </div>
          ) : (
            <p>Create</p>
          )}
        </Button>
      </form>
    </div>
  );
};

export default Register;
