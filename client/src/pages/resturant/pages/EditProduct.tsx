import {
  ArrowLeft,
  FileType,
  Image,
  IndianRupee,
  Loader,
  Loader2,
  NotebookText,
  Package,
  Sigma,
  X,
} from "lucide-react";
import { Input } from "../../../components/ui/input";
import { ProductSchema, type ProductType } from "../schema/ResturantSchema";
import { Button } from "../../../components/ui/button";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import useMenuStore from "../../../store/useMenuStore";
import checkNumber from "../../../lib/checkNumber";
import { useNavigate } from "react-router";


const PreTypes = [
    "VEG",
    "NONVEG",
    "BIRIYANI",
    "MAINCOURSE",
    "THALI",
    "STARTER",
    "DESERT",
    "DRINKS",
  ];


const EditProduct = () => {
  const [types, setTypes] = useState<Array<string>>([]);
  const [formData, setFormData] = useState<ProductType>({
    name: "",
    price: "",
    quantity: "",
    desc: "",
    category: [],
  });
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<ProductType>>();
  const {loading , updateMenu ,menu} = useMenuStore();  
  const navigate = useNavigate(); 

  const formHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "image") {
      const file = e.target.files;
      if (file) {
        setImage(file[0]);
      }
      return;
    }
    if(e.target.name === "price" || e.target.name === "quantity"){
        if( e.target.value.length > 0 && !checkNumber(e.target.value)){
            setErrors({...errors , [e.target.name]:"Please enter a valid number"})
            return;
        }else{
          setErrors({...errors , [e.target.name]:""})
        }
    }
    
    const data: ProductType = { ...formData, [e.target.name]: e.target.value };
    setFormData(data);
  };

  const handleTypes = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!types.includes(val) && val !== "") {
      const newTypes = [...types, val];
      setTypes(newTypes);
      const data: ProductType = { ...formData, category: types };
      setFormData(data);
    }
  };
  const handleRemove = (value: string) => {
    const val = value;
    console.log(val);
    if (types.includes(val)) {
      const newTypes = types.filter((t) => t !== val);
      setTypes(newTypes);
      const data: ProductType = { ...formData, category: types };
      setFormData(data);
    }
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = ProductSchema.safeParse(formData);
    if (!result.success) {
      result.error._zod.def.forEach((e: any) => {
        const newError = { ...errors, [e.path[0]]: e.message };
        setErrors(newError);
      });
      return;
    }

    const menuData = new FormData();
    menuData.append("name", formData.name);
    menuData.append("desc", formData.desc);
    menuData.append("price", formData.price.toString());
    menuData.append("quantity", formData.quantity.toString());
    menuData.append("categories", JSON.stringify(types));
    menuData.append("resturantId", menu?.resturantId || "");
    menuData.append("id", menu?._id || "");
    if(image){
        menuData.append("image", image);
    }

    try{
          await updateMenu(menuData);
          navigate(-1);
    }catch(error){
        console.log(error);
    }
  };
  useEffect(() => {
    // const Product = {
    // }
    console.dir(menu)
    setFormData({
      name: menu?.name || "",
      price: menu?.price.toString() || "",
      quantity: menu?.quantity.toString() || "",
      desc: menu?.desc || "",
      category: menu?.categories || [],

    })
    setTypes(menu?.categories || [])
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-linear-to-r from-red-300 to-blue-300">
      
      <form
        onSubmit={onSubmitHandler}
        className=" border-2 p-10 rounded-2xl flex flex-col gap-2 bg-amber-50"
      >
        <div className="relative">
          <div className="absolute -top-8 -left-8"> <button type="button" onClick={()=>{navigate(-1)}}><ArrowLeft/></button></div>
        </div>
        <div className="">
          <div className="relative">
            <Package className="absolute top-1 left-2" />
          </div>
          <Input
            name="name"
            onChange={formHandler}
            value={formData.name}
            className="pl-10"
            placeholder="Enter Item Name"
          />
          {errors && <p>{errors.name}</p>}
        </div>
        <div className="">
          <div className="relative">
            <IndianRupee className="absolute top-1 left-2" />
          </div>
          <Input
            name="price"
            className="pl-10"
            onChange={formHandler}
            value={formData.price}
            placeholder="Enter Price"
          />
          {errors && <p>{errors.price}</p>}
        </div>
        <div className="">
          <div className="relative">
            <Sigma className="absolute top-1 left-2" />
          </div>
          <Input
            name="quantity"
            className="pl-10"
            onChange={formHandler}
            value={formData.quantity}
            placeholder="Enter Quantity"
          />
          {errors && <p>{errors.quantity}</p>}
        </div>
        <div className="">
          <div className="relative">
            <NotebookText className="absolute top-1 left-2" />
          </div>
          <Input
            name="desc"
            className="pl-10"
            onChange={formHandler}
            value={formData.desc}
            placeholder="Enter Description"
          />
          {errors && <p>{errors.desc}</p>}
        </div>
        <div className="">
          <div className="relative">
            <Image className="absolute top-1 left-2" />
          </div>
          <Input
            name="image"
            type="file"
            accept="image/*"
            className="pl-10"
            placeholder=""
          />
        </div>
        <div className="">
          <div className="flex ">
            {types.map((t, index) => (
              <div
                className="p-1 m-1 bg-gray-500 rounded-3xl flex text-center "
                key={index + 1}
              >
                {t}
                <X
                  className="m-1"
                  values={t}
                  onClick={() => handleRemove(t)}
                  size={15}
                />
              </div>
            ))}
          </div>
          <div className=" my-2">
            <div className="relative">
              <FileType className="absolute top-1 left-2" />
            </div>
            <select className="pl-10 h-8" onChange={handleTypes}>
              {PreTypes.map((t, index) => (
                <option key={index} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading ? (
          <Button disabled>
            <div className="justify-center" ><Loader className="rotate inline"></Loader></div>
          </Button>
        ) : (
          <Button type="submit">Update</Button>
        )}
      </form>
    </div>
  );
};

export default EditProduct;
