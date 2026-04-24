import { useContext } from "react"
import { Link } from "react-router-dom"
import { BrowserContext } from "../context/UserContext"
import { FacebookIcon, InstagramIcon, Mail, Phone,  YoutubeIcon } from "lucide-react"

const Footer = () => {
    const context  = useContext(BrowserContext)
    if(context === undefined)return;
    const{modeDay} = context;
  return (
    <div className={`p-10 ${modeDay ?"bg-linear-to-b from-orange-500 to-blue-100":"bg-black"}`}>
        <div className=" flex justify-evenly items-stretch">
            <div className="flex flex-col justify-around gap-3 self-start">
                <Link to='/'> About Us </Link>
                <Link to='/'>Contact Us</Link>
                <Link to='/' >Terms of Use</Link>
                <Link to='/' >Security</Link>
                <Link to='/' >Privacy</Link>
                <Link to='/' >Our Stores</Link>
            </div>
            <div className="self-start">
                <p>Head Office:</p>
                <p className="py-2">
                    cuttack-puri bypass, koradakanta,<br></br> Bhubaneswar, Odisha 751025
                </p>
                <div className="pt-2">Contact Us:</div>
                <div className="relative p-2">
                    <Mail size={18} className="absolute left-0 top-3"/> 
                    <a href="#" className="pl-4">xyz@food.com</a>
                </div>

                <div className="relative">
                    <Phone size={18} className="absolute left-0 top-1"/> 
                    <a  href="#" className="pl-6">9668392840</a>
                </div>
                <p className="pt-5">Social:</p>
                <div className="pt-1 flex gap-4">
                    
                    <a href="#"><InstagramIcon/></a>
                    <a href="#"><FacebookIcon/></a>
                    <a href="#"><YoutubeIcon/></a>
                </div>
            </div>
        </div>
        <div className=" pt-10 flex justify-center">
            <p>Copyright @ 2026</p>
        </div>
      
    </div>
  )
}

export default Footer
