import { createContext, useContext, useEffect, useState } from "react";

const DisplayContext = createContext()

const DisplayProvider = ({children}) => {
    
    const guardarTemaStorage = () => {
        const temaStorage = localStorage.getItem("tema")
        const tema = temaStorage ? temaStorage : localStorage.setItem("tema","light") && "light" 
        return tema
    }

    const [tema,setTema] = useState(() => {
        return guardarTemaStorage()
    })
    

    useEffect(()=>{
        localStorage.setItem("tema", tema)
    },[tema])



    return(
        <DisplayContext.Provider value={{tema, setTema}}>
            {children}
        </DisplayContext.Provider>  
    )
}

const useDisplay = () => {
    
    const context = useContext(DisplayContext)
    return context

}

export {DisplayContext,DisplayProvider,useDisplay}