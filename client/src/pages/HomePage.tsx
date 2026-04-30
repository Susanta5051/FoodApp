import foodImg from "../assets/media/food3.jpg";
import { useContext, useState } from "react";
import { BrowserContext } from "../context/UserContext";
import SearchBox from "../components/SearchBox";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  
  const [searchValue, setSearchvalue] = useState<string>("");
  const submitHandler = () => {
    navigate(`/products?q=${searchValue}`);
  };
  const context = useContext(BrowserContext);
  if (context === undefined) return;
  const { modeDay } = context;

  return (
    <div
      className={` ${
        modeDay
          ? "bg-linear-to-br from-red-200 to-blue-200"
          : "bg-gray-700 text-white"
      }`}
    >
      <div className="w-full">
      </div>
      <SearchBox
        searchValue={searchValue}
        setSearchValue={setSearchvalue}
        submitAction={submitHandler}
      />

      <div className="mt-5 ml-5 sm:flex justify-around  ">
        <div className="ml-5 w-4/5 sm:w-2/5  flex flex-col justify-center  items-start gap-6">
          <div className="text-4xl font-bold">
            Order Food Anytime & <br></br>
            Anywhere
          </div>
          <div className="text-sm">
            Hey! Our delicious food is waiting for you, we are always near to
            you.
          </div>
        </div>
        <div className="py-5 w-4/5 sm:w-2/5 ">
          <img src={foodImg} alt="food" className="rounded-full"></img>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default HomePage;
