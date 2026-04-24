

import {  createContext, useState } from 'react'
import data from '../assets/media/ProductsDetails'


type BrowserContextType={
  modeDay:boolean;
  setModeDay:React.Dispatch<React.SetStateAction<boolean>>;
   loggedinEmail:string;
  setLoggedinEmail:React.Dispatch<React.SetStateAction<string>>;
  searchValue:string;
  setSearchValue:React.Dispatch<React.SetStateAction<string>>;
  active:string;
  setActive:React.Dispatch<React.SetStateAction<string>>;
  errors:string;
  setErrors:React.Dispatch<React.SetStateAction<string>>;
  cartItems:Array<ContainerType>;
}
type ContainerType = {
  image: string;
  name: string;
  desc: string;
  price: number;
  category: Array<string>;
  address : string;
  store: string

};
export const BrowserContext = createContext<BrowserContextType | undefined>(undefined);

type Props = {
    children : React.ReactNode
}

const UserContext = ({ children }: Props) => {
    const [modeDay,setModeDay]= useState<boolean>(true);
    const [loggedinEmail,setLoggedinEmail] = useState<string>('2133');
    const [searchValue,setSearchValue] = useState<string>('');
    const [active,setActive] = useState<string>('');
    const [errors,setErrors] =useState<string>("")

    const cartItems = data;
    const BrowserData = {
    modeDay,setModeDay,loggedinEmail,setLoggedinEmail,searchValue,setSearchValue,active,setActive,cartItems,errors,setErrors
  }
  return (
    <div>
        <BrowserContext.Provider value={BrowserData}>
        {children}
        </BrowserContext.Provider>
      
    </div>
  )
}

export default UserContext
