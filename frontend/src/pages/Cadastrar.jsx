import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/auth/AuthProvider.jsx"

import LayoutAuth from "../components/LayoutAuth.jsx"

const Cadastrar = () => {

    const {UseToken} = useAuth()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    
    const [erros, setErros] = useState({})

    const navigation = useNavigate()

    const Cadastro = async (e) => {
        e.preventDefault()

        const dados = {name, email, password, passwordConfirm}
        
        try {

            await axios.post("http://localhost:3000/cadastro",dados)

            navigation("/login")
            
        } catch (error) {
            setErros(error.response.data.erro)
        }
        
    }


    return(
        <>  
            <LayoutAuth
                title="Cadastre-se "
                contentTitle={"Crie sua conta e comece agora"}
                position="left"
            >
    
                <form onSubmit={Cadastro} className="flex flex-col h-full relative font-[Lexend] justify-between items-center gap-[60px] p-[80px_0px_40px_0px]" action="">
                    <div className="w-full relative items-center flex flex-col gap-[40px]">

                        <div className="flex relative w-full flex-col items-center">
                            <label className="flex relative flex-col w-full">
                                <input onChange={(e)=>{setName(e.target.value)}} value={name} className="peer w-full h-[35px] px-[10px] rounded-[4px] border-2 outline-none" type="text" />
                                <span className={`absolute bg-[var(--cor01)] flex left-[14px] px-[5px] text-[16px]  top-1/2 transition-all duration-300 -translate-y-1/2 rounded-t-[2px] peer-focus:top-[-5px] ${name && "top-[-5px] text-[18px]"}`
                            }>Nome (completo)</span>
                            </label>
                            {erros?.name && <p className="absolute text-[var(--cor02)] top-1/1">{erros?.name.message}</p>}
                        </div>

                        <div className="flex relative w-full flex-col items-center">
                            <label className="flex relative flex-col w-full">
                                <input onChange={(e)=>{setEmail(e.target.value)}} value={email} className="peer w-full h-[35px] px-[10px] rounded-[4px] border-2 outline-none" type="email" />
                                <span 
                                className={`absolute bg-[var(--cor01)] flex left-[14px] px-[5px] text-[16px]  top-1/2 transition-all duration-300 -translate-y-1/2 rounded-t-[2px] peer-focus:top-[-5px] ${email && "top-[-5px] text-[18px]"}`
                            }>Email</span>
                            </label>
                            {erros?.email && <p className="absolute text-[var(--cor02)] top-1/1">{erros?.email.message}</p>}
                        </div>

                        <div className="flex relative w-full flex-col items-center">
                            <label className="flex relative flex-col w-full">
                                <input onChange={(e)=>{setPassword(e.target.value)}} value={password} className="peer w-full h-[35px] px-[10px] rounded-[4px] border-2 outline-none" type="password" />
                                <span 
                                className={`absolute bg-[var(--cor01)] flex left-[14px] px-[5px] text-[16px]  top-1/2 transition-all duration-300 -translate-y-1/2 rounded-t-[2px] peer-focus:top-[-5px] ${password && "top-[-5px] text-[18px]"}`
                            }>Senha</span>
                            </label>
                            {erros?.senha && <p className="absolute text-[var(--cor02)] top-1/1">{erros?.senha.message}</p>}
                        </div>

                        <div className="flex relative w-full flex-col items-center">
                            <label className="flex relative flex-col w-full">
                                <input onChange={(e)=>{setPasswordConfirm(e.target.value)}} value={passwordConfirm} className="peer w-full h-[35px] px-[10px] rounded-[4px] border-2 outline-none" type="password" />
                                <span 
                                className={`absolute bg-[var(--cor01)] flex left-[14px] px-[5px] text-[16px]  top-1/2 transition-all duration-300 -translate-y-1/2 rounded-t-[2px] peer-focus:top-[-5px] ${passwordConfirm && "top-[-5px] text-[18px]"}`
                            }>Repita sua enha</span>
                            </label>
                            {erros?.senhaConfirm && <p className="absolute text-[var(--cor02)] top-1/1">{erros?.senhaConfirm.message}</p>}
                        </div>

                        <div className=" w-full flex justify-between items-center">
                            <p onClick={() => navigation("/login")} className="text-[var(--cor05)] text-[14px] underline cursor-pointer">Ja tem uma conta?</p>
                            <p onClick={() => null} className="text-[var(--cor05)] text-[14px] underline cursor-pointer"></p>
                        </div>

                    </div>

                    <button className="w-[200px] h-[40px] rounded-full border-2 cursor-pointer hover:scale-[1.05] duration-200" type="submit"> Cadastrar </button>
                </form>
            </LayoutAuth>
        </>
    )
}

export default Cadastrar