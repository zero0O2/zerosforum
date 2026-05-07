import HomeContentPosts from "./HomeContentPosts"
import HomeContentProfile from "./HomeContentProfile"

import { useAuth } from "../contexts/auth/AuthProvider"


const LayoutContent = ({children}) => {

    const {access} = useAuth()


    return(
        <>
            <div className="h-[100dvh] flex pt-[100px]">
                
                {access && <HomeContentProfile/>}

                {children}

                

            </div>
        </>
    )
}

export default LayoutContent