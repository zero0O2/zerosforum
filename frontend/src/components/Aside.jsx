import HomeAsideAccess from "./HomeAsideAccess"
import HomeAsideProfile from "./HomeAsideProfile"

import { IoHomeSharp, IoHomeOutline } from "react-icons/io5";
import { MdLocalPostOffice, MdOutlineLocalPostOffice } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";


import { useContext } from "react";
import { AuthContext, useAuth } from "../contexts/auth/AuthProvider.jsx";
import { useApp } from "../contexts/appContext/AppProvider.jsx";
import { useNavigate } from "react-router-dom";

const Aside = () => {

    const {access} = useContext(AuthContext)
    const {user,role} = useAuth()
    const navigation = useNavigate()

    const {page,setPage} = useApp()
    
    return(
        <>
            <div className="flex absolute top-0 left-0 justify-between items-center w-full bg-[var(--cor01)] h-[100px] px-[20px]">

                {/* Titulo */}
                <div className="flex justify-between items-center h-full ">
                    <h1 className="text-[40px]">ZeroSforum</h1>
                </div>

                <div className="flex justify-around min-w-[180px] items-center h-[60px] px-[30px] bg-[var(--cor02)] shadow-[0_0_20px_var(--sombra)] rounded-full gap-[20px]">

                    {/* Home */}
                    <div onClick={()=>{
                        setPage("home")
                        navigation("/")
                        }} className={`text-[25px] flex justify-center gap-[5px] items-center p-[8px] transition-all duration-400 ${page == "home" ? "bg-[var(--white)] rounded-full text-[var(--cor02)] w-[100px]" : "bg-transparent w-[40px] rounded-[6px] text-[var(--white)]"} cursor-pointer`}>
    
                        <IoHomeOutline />

                        {page == "home" && 
                            <p className="text-[13px]">Home</p>
                        }
                    </div>

                    {access &&
                    
                    /* Posts */
                    (role === "adm" || role === "dev") &&
                    <div onClick={() => {
                        setPage("adm")
                        navigation("/administracao")
                        }} className={`text-[25px] flex justify-center gap-[5px] items-center p-[8px] transition-all duration-400 ${page == "adm" ? "bg-[var(--white)] rounded-full text-[var(--cor02)] w-[100px]" : "bg-transparent w-[40px] rounded-[6px] text-[var(--white)]"} cursor-pointer`}>
                        
                        <MdOutlineAdminPanelSettings />

                        {page == "adm" && 
                            <p className="text-[13px]">ADM</p>
                        }
                    </div>

                    }
                </div>

                <div className="flex justify-center items-center gap-[10px]">
                    {role && (role === "dev" || role === "adm") &&
                        <h1 className="text-[12px] text-[var(--text)]">{user?.role == "adm" ? "Admin" : "Dev"} Experience</h1>
                    }
                    {
                        access ? <HomeAsideProfile /> : <HomeAsideAccess/>
                    }
                </div>

            </div>
        </>
    )
}

export default Aside