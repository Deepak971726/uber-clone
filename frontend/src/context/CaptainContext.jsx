import { createContext, useContext, useState } from "react";


export const CaptainDataContext = createContext(null)

export const CaptainContextProvider = ({children})=>{
    const [captain, setCaptain]=useState()
    
    return <CaptainDataContext.Provider value={{captain, setCaptain}}>
                {children}
    </CaptainDataContext.Provider>
}

export const useCaptainData = ()=>{
    return useContext(CaptainDataContext)
}
