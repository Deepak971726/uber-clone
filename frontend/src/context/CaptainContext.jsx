import { createContext, useContext, useState } from "react";


export const CaptainDataContext = createContext(null)

export const CaptainContextProvider = ({children})=>{
    const [captain, setCaptain]=useState()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    
    return <CaptainDataContext.Provider value={{error, setError, isLoading, setIsLoading,captain, setCaptain}}>
                {children}
    </CaptainDataContext.Provider>
}

export const useCaptainData = ()=>{
    return useContext(CaptainDataContext)
}
