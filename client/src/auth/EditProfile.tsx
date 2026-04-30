import { ArrowLeft, Loader } from "lucide-react";
import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { userEditSchema, type EditInputState } from "../schema/UserSchema";
import { BrowserContext } from "../context/UserContext";

import { useUserStore } from "../store/useUserStore";

type Props = {
  email: string;
  fullName: string;
  phone: number;
  image: string;
  address: string;
};

const EditProfile = () => {
  const context = useContext(BrowserContext);
  if (context == undefined) return;
  const { modeDay } = context;
  const { loading, updateProfile, user } = useUserStore();
  if (!user) {
    return;
  }
  const [formData, setFormData] = useState<Props>({
    email: user.email,
    phone: user.phone,
    fullName: user.fullName,
    image: user.profilePicture,
    address: user.address,
  });
  const [errors, setErrors] = useState<Partial<EditInputState>>({});
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();
    const result = userEditSchema.safeParse(formData);
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
    const response = await updateProfile(formData);
    if (response) {
      navigate('/profile');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div
      className={`flex flex-col justify-center ${
        modeDay ? " bg-white text-black" : "bg-gray-700 text-white"
      }`}
    >

      <div className=" p-2 ">
        <div className="absolute" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </div>
        <div className="flex justify-center items-center ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-around pt-10 gap-5  bg-amber-900 p-5 rounded-2xl sm:min-w-150 sm:min-h-100"
           >
            <label htmlFor="image">Profile picture</label>
            <input
            id='image'
              type="text"
              onChange={handleChange}
              className="bg-gray-400 p-2 rounded-2xl"
              name="image"
              value={formData.image}
            ></input>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id='name'
              onChange={handleChange}
              className="bg-gray-400 p-2 rounded-2xl"
              name="fullName"
              value={formData.fullName}
            ></input>
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName}</p>
            )}
            <label htmlFor="phone">Phone</label>
            <input
            id='phone'
              type="number"
              onChange={handleChange}
              className="bg-gray-400 p-2 rounded-2xl"
              name="phone"
              value={formData.phone}
            ></input>
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            <label htmlFor="address">Address</label>
            <input
            id='address'
              type="text"
              onChange={handleChange}
              className="bg-gray-400 p-2 rounded-2xl"
              name="address"
              value={formData.address}
            ></input>
            {errors.address && <p className="text-red-500">{errors.address}</p>}
            <button
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
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default EditProfile;
