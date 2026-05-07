import { useState } from "react"
import { useAuth } from "../contexts/auth/AuthProvider"
import ContentProfileUpdate from "./ContentProfileUpdate"
import SpanMsg from "./SpanMsg"
import { usePost } from "../contexts/posts/PostProvider"


const HomeContentProfile = () => {

    const {user,DeleteUser,setAccess} = useAuth()
    const {CarregarAllPosts} = usePost()

    const [navigate,setNavigate] = useState("profile")

    const [deleteSpan,setDeleteSpan] = useState(false)
    
    const Delete = async () => {
        try {
            await DeleteUser(user)
            localStorage.removeItem("token")
            setAccess(false)
            await CarregarAllPosts()
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
                
            <div className="w-[300px] shrink-0 relative h-[100%] p-[8px_0_10px_10px] bg-[var(--cor06)]">
                <div className="w-full h-full bg-[var(--cor01)] flex rounded-[10px] flex-col p-[30px_10px] items-center">

                    {
                    navigate == "profile" && 
                        <div className="w-full h-full flex flex-col justify-between items-center">
                            <div className="w-full h-full flex flex-col gap-[30px] items-center">
                                <div className=" w-full flex overflow-hidden flex-col justify-center gap-[20px] items-center">
                                    <img className="w-[100px] h-[100px] object-cover rounded-full bg-[var(--cor06)]" src={user?.avatar} alt="" />
                                    <h1 className="text-[25px] text-wrap w-full text-[var(--text)] text-center">{user?.name}</h1>
                                </div>

                                <div className=" w-full flex flex-col justify-center gap-[10px] items-center">
                                    <button onClick={()=>setNavigate('update')} className="bg-[var(--cor06)] hover:bg-[var(--cor05)] hover:text-[var(--text2)] duration-200 backdrop-opacity-10 w-full h-[35px] text-[var(--text)] text-[14px] rounded-[4px] cursor-pointer">Editar meus dados</button>
                                </div>
                            </div>
                            <button onClick={()=>setDeleteSpan(true)} className="hover:bg-[var(--cor05)] hover:text-[var(--text2)] duration-200 backdrop-opacity-10 w-full h-[35px] text-[var(--text)] text-[14px] rounded-[4px] cursor-pointer">Excluir Conta</button>
                        </div>
                    }

                    {
                    navigate == "update" && 
                        <ContentProfileUpdate setNavigate={setNavigate}/>
                    }   

                    <SpanMsg title="Deseja excluir sua conta?" opcion="Excluir" func={Delete} Span={deleteSpan} setSpan={setDeleteSpan} />

                </div>   
            </div>
            

        </>
    )
}

export default HomeContentProfile