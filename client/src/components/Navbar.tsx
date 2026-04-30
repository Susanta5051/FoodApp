import {
  CircleUserIcon,
  Home,
  HomeIcon,
  List,
  LogOut,
  Menu,
  Moon,
  ShoppingCart,
  Store,
  StoreIcon,
  Sun,
  User,
} from "lucide-react";
import {  useContext, useEffect, useState } from "react";
import { BrowserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import ProfileTab from "./ProfileTab";
import { useUserStore } from "../store/useUserStore";

const Navbar = () => {
  const [showBar, setShowBar] = useState<boolean>(false);
  const context = useContext(BrowserContext);
  if (context === undefined) return;
  const { modeDay } = context;

  return (
    <div
      className={`flex ${
        modeDay
          ? "bg-linear-to-r from-red-100  to-blue-100"
          : "bg-black text-white"
      }  justify-between p-5`}
    >
      <div className="">
        <h1>FOOD APP</h1>
      </div>
      <div>
        <BarMenu />
      </div>
      <div className="sm:hidden  gap-5 mr-3">
        <div className=" text-black ">
          <button onClick={() => setShowBar(!showBar)}>
            <Menu />
          </button>
        </div>
        {showBar && (
          <div>
            <DropMenu />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

const BarMenu = () => {
  const [show, setShow] = useState<boolean>(false);
  const [showHover, setShowHover] = useState<boolean>(false);
  const {user } = useUserStore();
  const [ccart,setCcart ]  = useState(user?.cart.length || 0);
  const context = useContext(BrowserContext);
  if (context === undefined) return;
  const navi = useNavigate();

  const { modeDay, setModeDay, active, setActive } = context;
  const handleCart = () => {
    navi(`/cart`);
  };
  useEffect(()=>{
    setCcart(user?.cart.length || 0)
  },[user?.cart.length , user])
  return (
    <div className=" hidden sm:flex gap-10 mr-3">
      <div
        className={`${active === "home" ? "scale-130" : ""}`}
        onClick={() => setActive("home")}
      >
        <button>
          <Link to="/">
            <Home size={25} />
          </Link>
        </button>
      </div>

      <div
        className={`${active === "store" ? "scale-130" : ""}`}
        onClick={() => setActive("store")}
      >
        <button>
          <Link to="/stores">
            <Store size={25} />
          </Link>
        </button>
      </div>
      <div
        className={`${active === "products" ? " scale-130" : ""} `}
        onClick={() => setActive("products")}
      >
        <Link to="/products">
          <List />
        </Link>
      </div>
      <div
        className={`${active === "profile" ? " scale-130" : ""} `}
        onClick={() => setActive("profile")}
      >
        <button
          className="cursor-pointer"
          onClick={() => {
            if (show) setShowHover(false);
            setShow(!show);
          }}
          onMouseEnter={() => {
            setShowHover(true);
          }}
          onMouseLeave={() => {
            setShowHover(false);
          }}
        >
          <CircleUserIcon size={25} />
        </button>
        {(show || showHover) && (
          <div className="relative">
            <ProfileTab showHover={showHover} setShowHover={setShowHover} />
          </div>
        )}
      </div>

      <div
        className={`${active === "cart" ? " scale-130" : ""}  relative`}
        onClick={() => setActive("cart")}
      >
        <button onClick={handleCart}>
          <ShoppingCart />
        </button>

        <button
          className={`absolute -top-2 z-10 right-0 p-0.5  text-white h-3 ${
            ccart >= 10 ? "w-3" : "w-2"
          }  bg-red-500 rounded-4xl`}
        >
          <div className=" icon text-white text-center"> {ccart}</div>
        </button>
      </div>
      <div className={`active:scale-130`}>
        <button onClick={() => setModeDay(!modeDay)}>
          {modeDay ? <Sun /> : <Moon></Moon>}
        </button>
      </div>
    </div>
  );
};


// import { useContext } from "react";
// import { BrowserContext } from "../context/UserContext";
// import { Link } from "react-router-dom";
// import { HomeIcon,Sun,Moon ,User,ShoppingCart,List , LogOut} from "lucide-react";


const DropMenu = ()=>{
  const context = useContext(BrowserContext);
  if(context === undefined)return
  const {user,logout } = useUserStore();
    if (context === undefined) return;
    const handleLogout = async()=>{
      await logout();
    }
  const{modeDay ,setModeDay}=context;
  return (
    <div
            className={`absolute ${
              modeDay
                ? "bg-linear-to-br from-orange-100 to-blue-300"
                : "bg-black"
            }   right-10 gap-4 top-10 z-10 `}
          >
            <Link to="/">
              <div className=" p-3 border flex w-40 justify-between">
                <button>Home</button>
                <button><HomeIcon/></button>
              </div>
            </Link>
            
            <Link to="/products">
                <div className="border flex justify-between p-3">
                  <button className="  block">Products</button>
                  <button>
                    <List />
                  </button>
                </div>
              </Link>

              <Link to="/stores">
                <div className="border flex justify-between p-3">
                  <button className="  block">Restaurants</button>
                  <button>
                    <StoreIcon/>
                  </button>
                </div>
              </Link>

            <Link to="/cart">
              <div className="border flex justify-between p-3">
                <button className="  block">Cart</button>
                <button className="  block">
                  <ShoppingCart />
                </button>
              </div>
            </Link>
            <div className=" border ">
              <div className="flex flex-wrap  p-3 justify-between">
                <button
                  onClick={() => setModeDay(!modeDay)}
                  className="max-w-20 "
                >
                  Mode
                </button>
                <button onClick={() => setModeDay(!modeDay)}>
                  {" "}
                  {modeDay ? <Sun /> : <Moon></Moon>}
                </button>
              </div>
            </div>
            <div>
              { user ? (
                    <>
                      <div className="border w-full text-center p-2">
                        <Link to={`/profile`}>
                          <div className=" flex justify-between ">
                            <button className="  block">Profile</button>
                            <button className="  block">
                              <User />
                            </button>
                          </div>
                        </Link>
                      </div>
                        <div className="border flex justify-between p-3">
                          <button type='button' onClick={handleLogout}>Logout</button>
                          <button className="  block">
                            <LogOut/>
                          </button>
                        </div>
                    </>
                  ) : (
                    <Link to="/login">
                      <div className="border flex justify-between p-3">
                        <button className="  block">Login</button>
                        <button className="  block">
                          <User />
                        </button>
                      </div>
                    </Link>
                  )}
            </div>
          </div>
  )
}

