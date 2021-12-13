import React,{createContext,useState,useEffect} from 'react'
export const UserDetailsContext=createContext()
export default function UserDetailsContextProvider({children}) {
    const [wakeUpFunc,setWakeUpFunc]=useState(false)


    return(
        <UserDetailsContext.Provider 
          value={{wakeUpFunc,setWakeUpFunc}}>
              {children}
          </UserDetailsContext.Provider>)
}
