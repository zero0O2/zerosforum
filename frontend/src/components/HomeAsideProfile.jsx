import { CiLogout } from "react-icons/ci";
import { useContext } from "react";
import { AuthContext, useAuth } from "../contexts/auth/AuthProvider.jsx";
import { useState } from "react";
import SpanMsg from "./SpanMsg.jsx";
import { useApp } from "../contexts/appContext/AppProvider.jsx";
import { useNavigate } from "react-router-dom";

const HomeAsideProfile = () => {

    const {setAccess,user,UseToken} = useContext(AuthContext)
    const [logSpan,setLogSpan] = useState(false)
    const {BuscaUser} = useAuth()
    const {setPage} = useApp()
    const navigation = useNavigate()

    const userName = user?.name.split(" ")[0]

    const Logout = async () => {
        localStorage.removeItem("token")
        setAccess(false)
        navigation("/")
        setPage("home")
        await BuscaUser()
    }

    return(
        <>
            <div className="flex justify-center items-center text-[17px] text-[var(--text)]">
                <p><strong>Bem vindo</strong> {userName}</p>
            </div>

            <div className="w-[60px] h-[60px] flex justify-center items-center">
                <img className="w-full h-full border-[3px] object-cover border-[var(--cor03)] rounded-full" src={user?.avatar} alt="" />
            </div>

            <div onClick={()=>{setLogSpan(prev => !prev)}} className="flex justify-center items-center text-[20px] border-[1px] text-[red] rounded-full p-[5px] cursor-pointer">
                <CiLogout />
            </div>

            <SpanMsg title="Deseja sair de sua conta" opcion="Confirmar" func={Logout} Span={logSpan} setSpan={setLogSpan} />
        </>
    )
}

export default HomeAsideProfile