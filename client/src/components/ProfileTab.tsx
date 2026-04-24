import {useContext}from 'react'
import { BrowserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

type profileProp = {
  showHover: boolean;
  setShowHover: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileTab = ({ setShowHover }: profileProp) => {
  const navigate = useNavigate();
  const {user,logout } = useUserStore();
  const context = useContext(BrowserContext);
  if (context === undefined) return;
  const handleLogout = async()=>{
    setShowHover(false)
    await logout();
  }  

  const handleProfile = ()=>{
    setShowHover(false)
    navigate('/profile')
  }
  const handleLogin = ()=>{
    setShowHover(false)
    navigate('/login')
  }
  const { modeDay} = context;
  return (
    <div
      onMouseEnter={() => setShowHover(true)}
      onMouseLeave={() => setShowHover(false)}
      className={`absolute ${
        modeDay
          ? "bg-linear-to-br from-red-200 to-blue-200 text-black "
          : "bg-black text-white"
      } w-30 cursor-pointer -top-2 -left-10`}
    >
      <ul className="flex  flex-col justify-center items-center ">
        { user ? (
          <>
            <div className="border w-full text-center p-2">
              
                <button type='button' onClick={handleProfile}>Profile</button>
            </div>
            <div className="border w-full text-center p-2">
                <button type='button' onClick={handleLogout}>Logout</button>
            </div>
          </>
        ) : (
          <li className="border w-full text-center p-2">

               <button type='button' onClick={handleLogin}>Login</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProfileTab
