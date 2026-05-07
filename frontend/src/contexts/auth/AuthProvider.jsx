import axios from "axios"
import { createContext,useState, useEffect, useContext } from "react"

const AuthContext = createContext()


const AuthProvider =  ({children}) => {

    const [access,setAccess] = useState(null)
    const [role,setRole] = useState(null)
    const [user,setUser] = useState(null)

    
    const BuscaUser = async (id) => {
        try {
            const userFind = await axios.get(`http://localhost:3000/users/${id}`)
            setUser(userFind.data)
            setRole(userFind.data.role)
            
        } catch (error) {
            setUser(null)
            setRole(null)
            console.log(error)
        }
    }
    
    const UseToken = async () => {
        
        const token = localStorage.getItem("token")
        
        if(!token){
            console.log("token nao encontrado")
            setAccess(false)
            return
        }
        
        try {
            
            const res = await axios.get("http://localhost:3000/autorizacao",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            
            
            await BuscaUser(res.data.id)
            
            
            setAccess(true)
            
        } catch {
            
            setAccess(false)
            setUser(null)
            setRole(null)
            
            localStorage.removeItem("token")
            console.log("token invalido")
        }
    }

    const DeleteUser = async (user) => {
        return await axios.delete(`http://localhost:3000/users/${user._id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
    }

    const BuscarUsers = async() => {        
        
        try {
            const res = await axios.get("http://localhost:3000/users/",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                    
                }
            })  
            
            return res
            
        } catch (error) {
            console.log(error?.response)
        }
        
    }

    const BuscarUserMaisAtivo = async() => {        
        
        try {
            const res = await axios.get("http://localhost:3000/userMaisAtivo/",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                    
                }
            })  
            
            return res
            
        } catch (error) {
            console.log(error?.response)
        }
        
    }

    useEffect(() =>{
            
        UseToken()

    },[])
    
    
    return (
        <AuthContext.Provider value={{access,setAccess,user,setUser,UseToken,role, BuscarUsers, BuscaUser,DeleteUser,BuscarUserMaisAtivo}}>
            {children}
        </AuthContext.Provider>
    )
    
}

const useAuth = () => {
    const auth = useContext(AuthContext)
    return auth
}

export {AuthContext, AuthProvider, useAuth}