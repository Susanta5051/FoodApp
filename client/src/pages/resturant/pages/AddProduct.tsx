import {
  ArrowLeft,
  FileType,
  Image,
  IndianRupee,
  Loader,
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
import { useResturantStore } from "../../../store/useResturantstore";
import { useNavigate } from "react-router-dom";
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




const AddProduct = () => {
  const [types, setTypes] = useState<Array<string>>([]);
  const [formData, setFormData] = useState<ProductType>({
    name: "",
    price: "",
    quantity: "",
    desc: "",
    category: [],
  });
  const [errors, setErrors] = useState<Partial<ProductType>>();
 const [image, setImage] = useState<File | null>(null);
  const {loading , addMenu} = useMenuStore();
 const {resturant} = useResturantStore();
  const navigate = useNavigate();
  const handleTypes = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if(!PreTypes.includes(val)){
      return
    }
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


   const formHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "image") {
      const file = e.target.files;
      console.log("selected file:", file);
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
  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.dir(formData)
    setFormData({ ...formData, category: types });
    const result = ProductSchema.safeParse(formData);
    
    if (!result.success) {
      result.error._zod.def.forEach((e: any) => {
        const newError = { ...errors, [e.path[0]]: e.message };
        setErrors(newError);
      });
      // console.dir(result)
      return;
    }

    
    console.dir(resturant)
    const menuData = new FormData();
    menuData.append("name", formData.name);
    menuData.append("desc", formData.desc);
    menuData.append("price", formData.price.toString());
    menuData.append("quantity", formData.quantity.toString());
    menuData.append("categories", JSON.stringify(types));
    menuData.append("resturantId", resturant?._id || "");
    if(image){
        menuData.append("image", image);
    }
    console.log("data to be sent")
    
    try{
      await addMenu(menuData);
      navigate("/resturant")
    }catch(error){
        console.log(error);
    }

  };

  useEffect(() => {
    console.dir(types)
  }, [types]);

  return (
    <div className="flex justify-center items-center h-screen bg-linear-to-r from-red-300 to-blue-300">
      
      <form onSubmit={onSubmitHandler} className=" border-2 p-10 rounded-2xl flex flex-col gap-2 bg-amber-50">
        <div className="relative">
          <div className="absolute -top-8 -left-8"> <button type="button" onClick={()=>{navigate(-1)}}><ArrowLeft/></button></div>
        </div>
        <div className="">
          <label htmlFor="name" className="">
            Enter Item Name
          </label>
          <div className="relative">
            <Package className="absolute top-1 left-2" />
          </div>
          <Input
            id="name"
            name="name"
            onChange={formHandler}
            value={formData.name}
            className="pl-10"
            placeholder="Enter Name"
          />
          {errors && <p>{errors.name}</p>}
        </div>
        <div className="">
          <label htmlFor="price" className="">
            Enter Price
          </label>
          <div className="relative">
            <IndianRupee className="absolute top-1 left-2" />
          </div>
          <Input
            id="price"
            name="price"
            className="pl-10"
            onChange={formHandler}
            value={formData.price}
            placeholder="Enter Price"
          />
          {errors && <p>{errors.price}</p>}
        </div>
        <div className="">
          <label htmlFor="quant" className="">
            Enter Quantity
          </label>
          <div className="relative">
            <Sigma className="absolute top-1 left-2" />
          </div>
          <Input
            id="quant"
            name="quantity"
            className="pl-10"
            onChange={formHandler}
            value={formData.quantity}
            placeholder="Enter Quantity"
          />
          {errors && <p>{errors.quantity}</p>}
        </div>
        <div className="">
          <label htmlFor="desc" className="">
            Enter Description
          </label>
          <div className="relative">
            <NotebookText className="absolute top-1 left-2" />
          </div>
          <Input
            id="desc"
            name="desc"
            className="pl-10"
            onChange={formHandler}
            value={formData.desc}
            placeholder="Enter Description"
          />
          {errors && <p>{errors.desc}</p>}
        </div>
        <div className="">
          <label htmlFor="image" className="">
            Enter Image
          </label>
          <div className="relative">
            <Image className="absolute top-1 left-2" />
          </div>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="pl-10"
            onChange={formHandler}
            placeholder=""
          />
        </div>
        <div className="">
          <label htmlFor="category" className="">
            Categories
          </label>
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
          <Button type="submit">Add</Button>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
