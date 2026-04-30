import {  Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useContext, type SubmitEventHandler} from "react";
import { BrowserContext } from "../context/UserContext";
type propsType = {
  searchValue :string;
  setSearchValue:React.Dispatch<React.SetStateAction<string>>;
  submitAction:Function;
}

const SearchBox = (props : propsType) => {

    // const [error,setError] = useState<string>('');
    const context = useContext(BrowserContext);
    if(context === undefined)return
    const {modeDay} = context;
    
    const handleSubmit:SubmitEventHandler<HTMLFormElement> =(e)=>{
      e.preventDefault();
      // if(props.searchValue.length < 3){
      //   setError("Please Enter Minimum 3 Letters")
      //   return
      // }
      props.submitAction()
    }

  return (
    <div>
      <div className="">
        <div className="flex pl-10 sm:justify-center pt-5">
          <div className="flex justify-center sm:w-100 md:w-140 items-center">
            <form onSubmit={handleSubmit} className="flex justify-center sm:w-140 items-center">
              <div className="relative">
                <Search className="absolute left-2  -top-3" />
              </div>
              <Input 
                  value={props.searchValue}
                  onChange={(e)=>props.setSearchValue(e.target.value.trim())}
                  className={`pl-10  border-3  ${modeDay && "border-black"}`}
              ></Input>
              {
              // error && 
              // <div className="relative w-0">
              //   <p className="text-sm text-red-600 absolute w-2xs right-10 top-5">{error}</p>
              // </div>
            }
              <Button className="h-9 ml-2 rounded bg-gray-500 hover:bg-orange-500">
                Search
              </Button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default SearchBox
