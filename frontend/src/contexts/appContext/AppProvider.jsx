import { createContext } from "react"
import { AuthProvider } from "../auth/AuthProvider"
import { PostProvider } from "../posts/PostProvider"
import { useState } from "react"
import { useContext } from "react"


const AppContext = createContext()

const AppProvider = ({children}) => {

    const [page,setPage] = useState("home")

    return(
        <AppContext.Provider value={{page, setPage}}>
        <AuthProvider>
        <PostProvider>

            {children}
            
        </PostProvider>
        </AuthProvider>
        </AppContext.Provider>
    )
}

const useApp = () => {
    const app = useContext(AppContext)
    return app
}

export {AppContext,AppProvider,useApp}