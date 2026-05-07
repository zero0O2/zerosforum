import { Navigate } from "react-router-dom"
import { AuthContext, useAuth } from "../contexts/auth/AuthProvider.jsx";
import { LuLoaderCircle } from "react-icons/lu";
import { usePost } from "../contexts/posts/PostProvider.jsx";

const PrivateRoute =  ({ children ,log , page, roles }) => {

    const {role,access} = useAuth()


    if(access == null){
        return <div className="w-[100dvw] h-[100dvh] text-[3em] flex justify-center items-center"><LuLoaderCircle className="animate-spin"/></div>
    }

    if(roles && !roles.includes(role)){
        return <Navigate to={"/"}/>
    }
    
    if(log !== undefined && !log){
        return !access ? children : <Navigate to={page}/>
    }

    if(log){
        return access ? children : <Navigate to={page}/>
    }

    return children

}

export default PrivateRoute