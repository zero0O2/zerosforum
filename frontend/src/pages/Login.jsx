import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../contexts/auth/AuthProvider.jsx"
import LayoutAuth from "../components/LayoutAuth.jsx"

const Login = () => {

    const {setAccess,UseToken} = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errosVld, setErrosVld] = useState({})

    const navigation = useNavigate()


    const Login = async (e) => {
        e.preventDefault()

        const dados = {email,password}
        
        try {
            const res = await axios.post("http://localhost:3000/login",dados)
            const token = res.data.token

            if (!res.data.token) {
                throw new Error("Token não recebido")
            }

            localStorage.setItem("token",token)
            setAccess(true)

            await UseToken()

            navigation("/")
            
        } catch (error) {
            setErrosVld(error.response.data)
        }
        
    }

    return(
        <>  
            <LayoutAuth 
                title={"Bem-vindo de volta!"}
                contentTitle={"Entre para compartilhar suas ideias"}>
                
                <form onSubmit={Login} className="flex flex-col h-full relative font-[Lexend] justify-between items-center gap-[60px] p-[80px_0px_40px_0px]" action="">
                    <div className="w-full relative items-center flex flex-col gap-[40px]">

                        <div className="flex relative flex-col w-full items-center">
                            <label className="flex relative flex-col w-full">
                                <input onChange={(e)=>{
                                    setEmail(e.target.value)
                                    setErrosVld(prev => ({...prev,email:null}))
                                    }} value={email} className=" peer w-full h-[35px] px-[10px] rounded-[4px] border-2 outline-none" type="email" />
                                <span className={`absolute bg-[var(--cor01)] flex left-[14px] px-[5px] text-[16px] top-1/2 transition-all duration-300 -translate-y-1/2 rounded-t-[2px] peer-focus:top-[-5px] ${email && "top-[-5px] text-[18px]"}`}>Email</span>
                            </label>
                            {errosVld.email && <p className="absolute text-[var(--cor02)] top-1/1">{errosVld.email.message}</p>}
                        </div>


                        <div className="flex relative w-full flex-col items-center">
                            <label className="flex relative flex-col w-full">
                                <input onChange={(e)=>{
                                    setPassword(e.target.value)
                                    setErrosVld(prev => ({...prev,senha:null}))
                                }} value={password} className="peer w-full h-[35px] px-[10px] rounded-[4px] border-2 outline-none" type="password" />
                                <span className={`absolute bg-[var(--cor01)] flex left-[14px] px-[5px] text-[16px]  top-1/2 transition-all duration-300 -translate-y-1/2 rounded-t-[2px] peer-focus:top-[-5px] ${password && "top-[-5px] text-[18px]"}`}>Senha</span>
                            </label>
                            {errosVld.senha && <p className="absolute text-[var(--cor02)] top-1/1">{errosVld.senha.message}</p>}
                        </div>

                        <div className=" w-full flex justify-between items-center">
                            <p onClick={() => navigation("/cadastro")} className="text-[var(--cor05)] text-[14px] underline cursor-pointer">Criar uma conta</p>
                            <p onClick={() => null} className="text-[var(--cor05)] text-[14px] underline cursor-pointer">Esqueceu a senha</p>
                        </div>
                    </div>


                    <button className="w-[200px] h-[40px] rounded-full border-2 cursor-pointer hover:scale-[1.05] duration-200" type="submit"> Login</button>
                    {errosVld.message && <p className="absolute text-[var(--cor02)] bottom-0">{errosVld.message}</p>}
                </form>

            </LayoutAuth>

        </>
    )
}

export default Login