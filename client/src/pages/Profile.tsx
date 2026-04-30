
import { ArrowLeft,  ChevronRight, Eye,  Info, KeyRound, Mail, MapPin, Package } from 'lucide-react'
import { useNavigate,Link } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
// import { useEffect } from 'react';
const Profile = () => {
  
  const {user} = useUserStore();
  console.dir(user);
  if(!user){
    return
  }
  const navigate = useNavigate();
  
  return (
    <div>
      <div className='sm:p-5 flex  items-center   bg-orange-600 '>
          <button className='absolute top-3 left-2' onClick={()=>navigate(-1)}><ArrowLeft></ArrowLeft></button>
          <div className='w-1/3 flex flex-col gap-2'>
            <div >
              <img src={user.profilePicture} alt="profile" className='h-20 w-20 ml-10 bg-blue-700 rounded-full' />
              
            </div>
            <div className=' ml-10'>{user.fullName}</div>
            <div className=' ml-10 flex items-center'> <Mail size={18} className='shrink-0' />{user.email}</div>
            <div className='ml-10 flex items-center'> <MapPin size={18} className='shrink-0'/>{user.address}</div>
            <div className=' ml-10 w-40 md:w-50 text-sm sm:text-2xl  bg-black hover:bg-amber-700 text-white py-2 rounded-md  mt-2 text-center '><Link to='/profile/edit'><button>Edit Profile</button></Link></div>
          </div>
      </div>
        <div className='flex flex-col justify-around w-full  '>
          {user.admin ===true ?
            <Link to='/resturant'>
              <div className=' flex justify-between bg-linear-to-br from-red-200 to-blue-200 p-5 sm:pl-15 '>
                <div className='absolute'><Package/></div>
                <p className='pl-10'>Go To Resturant</p>
                <ChevronRight/>
              </div>
            </Link>
            :
            <Link to='/resturant/create'>
              <div className=' flex justify-between bg-linear-to-br from-red-200 to-blue-200 p-5 sm:pl-15 '>
                <div className='absolute'><Package/></div>
                <p className='pl-10'>Create A Resturant</p>
                <ChevronRight/>
              </div>
            </Link>
            }
            <Link to='/:email/orders'>
              <div className=' flex justify-between bg-linear-to-br from-red-200 to-blue-200 p-5 sm:pl-15 '>
                <div className='absolute'><Package/></div>
                <p className='pl-10'>Orders</p>
                <ChevronRight/>
              </div>
            </Link>

            <Link to='/:email/reviews'>
              <div className=' flex justify-between bg-linear-to-br from-red-200 to-blue-200 p-5 sm:pl-15'>
                <div className='absolute'><Eye/></div>
                <p className='pl-10'>Reviews</p>
                <ChevronRight/>
              </div>
            </Link>


            <Link to='/:email/change-password'>
              <div className=' flex justify-between bg-linear-to-br from-red-200 to-blue-200 p-5 sm:pl-15'>
                <div className='absolute'><KeyRound/></div>
                <p className='pl-10'>Change Password</p>
                <ChevronRight/>                
              </div>
            </Link>

            <Link to='/about'>
              <div className=' flex justify-between bg-linear-to-br from-red-200 to-blue-200 p-5 sm:pl-15'>
                <div className='absolute'><Info/></div>
                <p className='pl-10'>About Us</p>
                <ChevronRight/>
              </div>
            </Link>
        </div>

      
    </div>
  )
}

export default Profile
