import { createContext, useState } from "react"
type ContextValue = {
    modeDay:boolean
}

export const BrowserContext = createContext<ContextValue | undefined >(undefined);
const UserContext = ({props}:{props:React.ReactNode}) => {
    
    const [modeDay ,setModeDay] =useState<boolean>(false);
    const contextData:ContextValue = {
        modeDay
    }

  return (
    <BrowserContext.Provider value={contextData}>
        {props}
    </BrowserContext.Provider>
  )
}

export default UserContext
