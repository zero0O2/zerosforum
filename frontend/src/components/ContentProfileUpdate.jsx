import { useState } from "react";
import { useAuth } from "../contexts/auth/AuthProvider"
import { FaEdit } from "react-icons/fa";
import ButtonAnimation from "./ButtonAnimation";
import axios from "axios";
import { SlArrowLeft } from "react-icons/sl";

const ContentProfileUpdate = ({setNavigate}) => {

    const {user,BuscaUser} = useAuth()

    const [campoSenha,setCampoSenha] = useState(false)

    const [avatar,setAvatar] = useState(undefined)
    const [avatarPreviw,setAvatarPreviw] = useState(user?.avatar)
    const [nameUpdate,setNameUpdate] = useState(user?.name)
    const [emailUpdate,setEmailUpdate] = useState(user?.email)
    const [passwordUpdate,setPasswordUpdate] = useState("")
    const [password,setPassword] = useState("")
    
    const [erros,setErros] = useState({})

    const Submit = async (e) => {
        e.preventDefault()
        
        const Upload = async (avatar) => {
            if(!avatar) return

            const data = new FormData()
            
            data.append("file",avatar)
            data.append("upload_preset",import.meta.env.VITE_UPLOAD_PRESET)
            data.append("cloud_name",import.meta.env.VITE_CLOUD_NAME)
            data.append("folder","Fotos_Perfil")
            
            const res = await fetch("https://api.cloudinary.com/v1_1/dpjpug3o0/image/upload",{
                method:"POST",
                body:data
            })
            
            const uploadUrl = await res.json()

            console.log(uploadUrl.url)

            return uploadUrl.url
            
        }

        const RecebendoDados = async (updateData) => {
            updateData.name = nameUpdate
            updateData.email = emailUpdate
            
            if(campoSenha){
                updateData.password = password
                updateData.passwordUpdate = passwordUpdate
            }
        }
        
        
        const updateData = {}
        await RecebendoDados(updateData)

        try {
            await axios.put(`http://localhost:3000/users/${user?._id}`,updateData)
            
            if(avatar){
                const avatarUrl = await Upload(avatar)

                await axios.put(`http://localhost:3000/users/${user?._id}`,{
                    avatar:avatarUrl    
                })
            }
            

            setAvatar(undefined)
            setPassword("")
            setPasswordUpdate("")
            setErros({})

            await BuscaUser(user?._id)
            
        } catch (error) {
            setErros(error.response.data)
        }

    }
    

    return(
        <> 
            <div onClick={()=>setNavigate("profile")} className="absolute top-[20px] z-10 flex justify-center items-center cursor-pointer w-[30px] h-[30px] left-[20px]">
                <SlArrowLeft />
            </div>

            <div className="w-full h-full relative flex flex-col justify-center items-center">
                <form onSubmit={Submit} className="w-full h-full flex flex-col items-center gap-[40px]">
                    
                    <label className="rounded-full max-w-[130px] max-h-[130px] w-full h-full relative hover:opacity-70 duration-300 hover:scale-[1.03] cursor-pointer">
                        <input onChange={(e) => {
                            const file = e.target.files[0]
                            setAvatar(file)
                            setAvatarPreviw(URL.createObjectURL(file))
                        }} className="hidden" type="file" accept="image/*" />
                        <div className="w-full h-full">
                            <img className="w-full object-cover h-full rounded-full" src={avatarPreviw} alt="" />
                        </div>
                        <span className="absolute left-0 bottom-[10px]">
                            <FaEdit className=" text-[var(--cor03)]" />
                        </span>
                    </label>

                    <div className="w-full h-[100%] flex flex-col gap-[40px] items-center">

                        <label className="flex w-full items-center flex flex-col relative">
                            <input onChange={(e) => {
                                setNameUpdate(e.target.value)
                                setErros(prev => ({...prev,name:null}))
                                }} value={nameUpdate} className="peer text-[var(--text)] h-[35px] w-[100%] outline-none border-2 rounded-[8px] px-[10px]" autoComplete="off" type="text" />
                            <p className={`bg-[var(--cor01)] text-[var(--black)] absolute rounded-t-[5px] -translate-y-1/2 transition-all duration-300 ${nameUpdate ? "top-[-2px] left-[10px] px-[5px]":"top-1/2 left-[20px] px-[5px] peer-focus:top-[-2px] peer-focus:left-[20px]"}`}>Nome</p>
                            <p className="absolute text-[11px] text-nowrap text-[var(--cor02)] -bottom-1/2 left-0 ">{erros.name && erros.name.message}</p>
                        </label>

                        <label className="flex w-full items-center relative">
                            <input onChange={(e) => {
                                setEmailUpdate(e.target.value)
                                setErros(prev => ({...prev,email:null}))
                            }} value={emailUpdate} className="peer text-[var(--text)] h-[35px] w-[100%] outline-none border-2 rounded-[8px] px-[10px]" autoComplete="off" type="text" />
                            <p className={`bg-[var(--cor01)] text-[var(--black)] absolute rounded-t-[5px] -translate-y-1/2 transition-all duration-300 ${emailUpdate ? "top-[-2px] left-[10px] px-[5px]":"top-1/2 left-[20px] px-[5px] peer-focus:top-[-2px] peer-focus:left-[20px]"}`}>Email</p>
                            <p className="absolute text-[11px] text-nowrap text-[var(--cor02)] -bottom-1/2 left-0 ">{erros.email && erros.email.message}</p>
                        </label>

                        <div className="w-full flex flex-col gap-[30px]">
                            <div onClick={()=>setCampoSenha(prev=>!prev)} className="w-full flex items-center justify-between cursor-pointer">
                                <p  className="text-[16px] text-[var(--cor02)] ">Editar senha</p>
                                <ButtonAnimation state={campoSenha} setState={setCampoSenha} click="off" />
                            </div>
                            {campoSenha &&
                                <>
                                    <label className="flex w-full items-center relative">
                                        <input onChange={(e) =>{
                                            setPasswordUpdate(e.target.value)
                                            setErros(prev => ({...prev,password:null}))
                                        }} value={passwordUpdate} className="peer text-[var(--text)] h-[35px] w-[100%] outline-none border-2 rounded-[8px] px-[10px]" autoComplete="off" type="text" />
                                        <p className={`bg-[var(--cor01)] text-[var(--black)] absolute rounded-t-[5px]  -translate-y-1/2 transition-all duration-300 ${passwordUpdate ? "top-[-2px] left-[10px] px-[5px]":"top-1/2 left-[20px] px-[5px] peer-focus:top-[-2px] peer-focus:left-[20px]"}`}>Nova senha</p>
                                        <p className="absolute text-nowrap text-[11px] text-[var(--cor02)] -bottom-1/2 left-0 ">{erros.passwordUpdate && erros.passwordUpdate.message}</p>
                                    </label>

                                    <label className="flex w-full items-center relative">
                                        <input onChange={(e) => {
                                            setPassword(e.target.value)
                                            setErros(prev => ({...prev,passwordUpdate:null}))
                                        }} value={password} className="peer text-[var(--text)] h-[35px] w-[100%] outline-none border-2 rounded-[8px] px-[10px]" autoComplete="off" type="text" />
                                        <p className={`bg-[var(--cor01)] text-[var(--black)] absolute rounded-t-[5px] -translate-y-1/2 transition-all duration-300 ${password ? "top-[-2px] left-[10px] px-[5px]":"top-1/2 left-[20px] px-[5px] peer-focus:top-[-2px] peer-focus:left-[20px]"}`}>Senha atual</p>
                                        <p className="absolute text-nowrap text-[11px] text-[var(--cor02)] -bottom-1/2 left-0 ">{erros.password && erros.password.message}</p>
                                    </label>
                                </>
                            }

                            
                        </div>
                        
                    </div>

                    <div>
                        <button className="w-[160px] h-[40px] rounded-full border-2 cursor-pointer hover:scale-[1.05] duration-200 hover:bg-[var(--cor02)] hover:text-[var(--text2)]" type="submit"> Confirmar</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default ContentProfileUpdate