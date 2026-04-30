import { useState, type ChangeEvent, type FormEvent } from "react"
import { Input } from "../components/ui/input"
import { ArrowLeft, Loader, LockKeyhole, Mail } from "lucide-react"
import {Link,  useNavigate} from 'react-router-dom'
import type { LoginInputState } from "../schema/UserSchema"
import  { userLoginSchema} from "../schema/UserSchema"
import { useUserStore } from "../store/useUserStore"
// import { Button } from "../components/ui/button"


export const Login = () => {
    // type Logindata = {
    //     email:string,
    //     password:string
    // }


    const [formData , setFormData]  = useState <LoginInputState>({
        email:"",
        password:""
    })
     const [errors,setErrors] = useState<Partial<LoginInputState>>({})
   
    const navigate = useNavigate();
    const {login , loading } = useUserStore();

    const handleFormChange = (e : ChangeEvent<HTMLInputElement>)=>{
        const {name , value} = e.target;
        setFormData({...formData,[name]:value});

    }

    const handleSubmit =async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
          const result = userLoginSchema.safeParse(formData);
                // console.log( formData , result)
                if(!result.success){
                    result.error._zod.def.forEach((e: any) => {
                        setErrors((errors) => ({
                            ...errors,
                            [e.path[0]]: e.message
                        }));
                    });
                    return
                }
                try{
                    let response = await login(formData);
                    if(response)navigate(-1);
                }catch(error){
                    console.log(error)
                }
                 
        setTimeout(()=>{
            // setFormData({
            //     email:"",
            //     password:""
            // })
        }
        ,5000)
        
    }

    return (
        <div className="flex justify-center items-center h-screen ">
            <form 
                onSubmit={handleSubmit}
                className="border border-gray-500 rounded-lg p-6 w-4/5 sm:w-100 "
            >
                <p><button type="button"   onClick={()=>navigate(-1)} ><ArrowLeft /></button></p>
                <div className="mb-4 text-center">
                    <p className="font-bold text-2xl">Welcome to Restaurant</p>
                </div>

                <div className="mb-4 relative">
                    <Mail className="absolute left-2 top-2 text-gray-500" size={18}/>
                    <Input 
                        className="pl-8"
                        placeholder="Email" 
                        id="email" 
                        name='email'
                        value={formData.email}
                        onChange={handleFormChange}
                    />
                     {errors && <span  className="text-red-700 text-sm flex ">{errors.email}</span>}
                </div>

                <div className="mb-4 relative">
                    <LockKeyhole className="absolute left-2 top-2 text-gray-500" size={18}/>
                    <Input 
                        className="pl-8"
                        type="password"
                        placeholder="Password" 
                        id="password"
                        name='password'
                        value={formData.password}
                        onChange={handleFormChange}
                    />
                     {errors && <span  className="text-red-700 text-sm flex ">{errors.password}</span>}
                </div>

                <button 
                    type="submit"
                    className="w-full bg-black hover:bg-amber-700 text-white py-2 rounded-md  mt-2"
                >
                    { !loading ? <p>Login</p>:<div className="justify-center" ><Loader className="rotate inline"></Loader></div>}
                </button>
                <p className="text-blue-500 underline text-left"><Link to='/forgot-password'>Forgot Password ?</Link></p>
                {/* <p className="text-blue-500 underline text-left"><Link to='/change-password'>Change Password</Link></p> */}
                <p className=" text-left">Donot have an account?<Link to='/register' className="text-blue-400">Register</Link></p>

            </form>
        </div>
    )
}