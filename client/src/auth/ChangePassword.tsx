import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "../components/ui/button"
// import { Input } from "../components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { ChangePasswordSchema, type ChangePassword } from "../schema/UserSchema";
import { KeyRound, LockKeyhole, Mail,ArrowLeft } from "lucide-react";
const ResetPassword = () => {
  const [errors,setErrors] = useState<Partial<ChangePassword>>({});
  const [formData , setFormData] = useState<ChangePassword>({
    email:"",
    oldPassword:"",
    newPassword1:"",
    newPassword2:""
  })
  const [matchPassword,setMatchPassword] = useState<boolean>(true);
  const navigate = useNavigate()

  const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const result = ChangePasswordSchema.safeParse(formData);
    if(result.error){
     let tempErrors:Partial<ChangePassword> = {}
      result.error._zod.def.forEach((e:any)=>tempErrors = {...tempErrors , [e.path[0]] : e.message})
      setErrors(tempErrors)
      console.log(errors)
    }
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name , value} = e.target;
    setFormData({...formData,[name]:value})
  }
  useEffect(()=>{
    console.log(formData.newPassword1 , "  ",formData.newPassword2)
    if(formData.newPassword2.length >0 && formData.newPassword1 !== formData.newPassword2){
      setMatchPassword(false);
    }else{
      setMatchPassword(true)
    }
  },[formData.newPassword1 ,formData.newPassword2])

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-orange-600 ">
      <form className="max-w-120 p-5  rounded-2xl flex flex-col gap-3 bg-linear-to-r from-red-200 to-blue-200" onSubmit={handleSubmit}>
        <p><button type="button"   onClick={()=>navigate(-1)} ><ArrowLeft /></button></p>
        <div className="relative">
          <input type="email" 
            value={formData.email} 
            name="email"
            onChange={handleChange} 
            className="border block  p-2 rounded bg-white pl-10"  
            placeholder="Enter Your Email">
        </input>
        <Mail className="absolute top-2 left-2"></Mail>
        {errors && <span className="text-sm text-red-500">{errors.email}</span>}
        </div>
        

        <div className="relative">
          <input 
            type="password" 
            value={formData.oldPassword} 
            onChange={handleChange}
            name="oldPassword" 
            className="border block  p-2 rounded pl-10 bg-white" 
            placeholder="Enter Old Password">
        </input>
        <LockKeyhole className="absolute top-2 left-2"></LockKeyhole>
        {errors && <span className="text-sm text-red-500">{errors.oldPassword}</span>}
        </div>

        <div className="relative">
          <input 
            type="password" 
            value={formData.newPassword1} 
            onChange={handleChange}
            name="newPassword1" 
            className="border block  p-2  pl-10 rounded bg-white" 
            placeholder="Enter New Password">
        </input>
        <KeyRound className="absolute top-2 left-2" />
        {errors && <span className="text-sm text-red-500">{errors.newPassword1}</span>}
        </div>
        

        <div className="relative">
          <input 
            type="password" 
            value={formData.newPassword2} 
            onChange={handleChange}
            name="newPassword2" 
            className="border block  p-2 pl-10 rounded bg-white" 
            placeholder="Re Enter New Password">          
        </input>
        <KeyRound className="absolute top-2 left-2" />
        </div>

        {!matchPassword &&
         <p className="text-red-500 text-sm">Password Must be Same</p>
        }
        <Button type="submit" className="text-left  hover:bg-orange-400 ml-3 w-19/20 rounded-2xl">Change</Button>
        <p className="hover:text-blue-500 hover:underline text-center "><Link to='/forgotPassword'>Forgot Password ?</Link></p>
      </form>
    </div>
  )
}

export default ResetPassword
