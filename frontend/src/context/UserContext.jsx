import { createContext, useContext, useState } from "react";


export const UserDataContext = createContext(null)

export const UserContextProvider = ({children})=>{
    const [user, setUser]=useState({
          email: '',
        fullName: {
            firstName: '',  
            lastName: ''
        }
    })
    
    return <UserDataContext.Provider value={{user, setUser}}>
                {children}
    </UserDataContext.Provider>
}

export const useUserData = ()=>{
    return useContext(UserDataContext)
}