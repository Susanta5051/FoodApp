import { ArrowLeft, Loader } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { Button } from "../components/ui/button";
import { useUserStore } from "../store/useUserStore";
import Navbar from "../components/Navbar";

const VerifyEmail = () => {

      const [otp, setOtp] = useState('');
      const [OTPMessase,setOTPMessage] = useState<string>("");
      let {loading ,user, verifyEmail} = useUserStore();
      const [email , setEmail] = useState<string>(user?.email || "");
      const navigate = useNavigate();
      const handleSubmit = async (event:FormEvent<HTMLFormElement>)=>{
          event.preventDefault();
          if(otp.length < 6){
            setOTPMessage("Please Enter 6 Digits")
            return
          }
          try{
            await verifyEmail(otp , email);
            navigate('/')
          }catch(error){
            console.log(error)
          }
      }

      useEffect(()=>{
        setEmail(user?.email || "")
      },[user])
      useEffect(()=>{
          if(otp.length == 6){
            setOTPMessage("")
            return
          }
      },[otp])
    return (
      <div>
        <Navbar/>
        <div className="flex justify-center items-center min-h-screen w-full">
          <form onSubmit={handleSubmit} className=" bg-amber-100 border p-5 text-center flex flex-col gap-5 md:border md:p-8 w-full max-w-md rounded-2xl">
            <div className="relative">
              <p><button type="button" className="absolute left-4"  onClick={()=>navigate(-1)} ><ArrowLeft /></button></p>
            </div>
            <h1 className="font-bold h-5 text-2xl text-center">Verify Email</h1>
            <div className="relative">
                {email}
            </div>
            {  
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span></span>} // Optional separator
              renderInput={(props) => <input {...props} />} // Required in v2+
              shouldAutoFocus={true} // Optional autoFocus
              containerStyle='flex  justify-center space-evenly '
              inputStyle='  border border-black rounded h-10 mx-3 min-w-8 '
              inputType="tel"
            />}
            <p className="text-red-500 text-sm">{OTPMessase}</p>
            
            {  
            }
            { loading ? <Button 
            type="button"
            disabled
            className="w-full bg-black hover:bg-amber-700 text-white py-2 rounded-md  mt-2"><Loader className="rotate inline"></Loader>   
            </Button>
            :
            <Button 
            type="submit"
            className="w-full bg-black hover:bg-amber-700 text-white py-2 rounded-md  mt-2">Verify    
            </Button>
            }
            
          </form>
        </div>
      </div>
  )
}

export default VerifyEmail
