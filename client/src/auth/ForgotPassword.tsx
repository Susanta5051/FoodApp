
  // import React from 'react'

  import { useState, type FormEvent} from "react"
  import { Button } from "../components/ui/button"
  import { Input } from "../components/ui/input"
  import {Mail,ArrowLeft} from 'lucide-react'
  import OtpInput from 'react-otp-input';
  import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

  const ForgotPassword = () => {

      const [email,setEmail] = useState<string>("");
      const [otpSent, setOtpSent] = useState(false);
      const [verifySent, setVerifySent] = useState(false);
      const [noValue, setNoValue] = useState(false);
      const [otp, setOtp] = useState('');
      const [OTPMessase,setOTPMessage] = useState<string>("");

      const navigate = useNavigate();
      const handleSubmit = (event:FormEvent<HTMLFormElement>)=>{
          event.preventDefault();
          if(!email){
            setNoValue (true);
            return 
          }else{
            setNoValue(false);
            setOtpSent(true);
          }
      }

      const handleOTPVerify = ()=>{
        if(otp.length < 6){
          setOTPMessage("Please Enter 6 Digits")
          return
        }
          setOTPMessage("")
          setVerifySent(true)
      }
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:border md:p-8 w-full max-w-md rounded-2xl">
          <p><button type="button"   onClick={()=>navigate(-1)} ><ArrowLeft /></button></p>
          <h1 className="font-bold h-5 text-2xl">Forgot Password</h1>
          <div className="relative">
              <Input 
              className="rounded pl-8 h-10 " 
              value={email}
              onChange={(e)=>(setEmail(e.target.value))} 
              placeholder="Enter Email">
              </Input>
              <Mail className="absolute top-2 left-1"></Mail>
              {noValue && <p className="text-red-500 text-sm">Please Enter valid Emaail</p>}
          </div>
          { otpSent && 
          <OtpInput
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
          
          { !verifySent && otpSent && <Button 
          type="button"
          onClick={handleOTPVerify}
          className="w-full bg-black hover:bg-amber-700 text-white py-2 rounded-md  mt-2">Verify    
          </Button>
          }
          { verifySent && otpSent && <Button 
          type="button"
          disabled
          className="w-full bg-black hover:bg-amber-700 text-white py-2 rounded-md  mt-2"><Loader className="rotate inline"></Loader>   
          </Button>
          }

          {!otpSent && <Button 
          type="submit"
          className="w-full bg-black hover:bg-amber-700 text-white py-2 rounded-md  mt-2">Get OTP
          </Button>}
        </form>
      </div>
    )
  }

  export default ForgotPassword








