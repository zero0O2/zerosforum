
import { CiImageOn } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { AuthContext } from "../contexts/auth/AuthProvider.jsx";
import { useContext } from "react";
import ButtonAnimation from "./ButtonAnimation.jsx"

import { useState } from "react";
import axios from "axios";

const ContentCreatePost = ({setPosts}) => {

    const {user} = useContext(AuthContext)
    
    const [permitirComents,setPermitirComents] = useState(true)
    
    const [content,setContent] = useState("")
    const [erro,setErro] = useState({})


    const Submit = async (event) => {
        event.preventDefault()

        const dados = {
            content: content?.trim(),
            commentAccept: permitirComents
        }
        setContent("")

        try {
            const res = await axios.post("http://localhost:3000/posts",dados,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })

            setPosts(prev => [...prev,res.data] )

        } catch (error) {
            setErro(error.response?.data)
        }
    }
 



    return(
        <>
            <div className="flex justify-center bg-[var(--cor01)] items-center min-h-[180px] w-full rounded-[10px] p-[20px]">
                <form onSubmit={Submit} className="flex flex-col justify-center items-center h-full w-full ">
                    <div className="flex w-full h-[50%] gap-[30px] justify-between items-center">
                        <div className="max-w-[40px] max-h-[40px] w-full h-full">
                            <img className="w-full object-cover h-full rounded-full" src={user?.avatar} alt="" />
                        </div>
                        
                        {/* Imput POST */}
                        <input onChange={(e)=>{
                            setContent(e.target.value)
                            setErro({})
                            }} value={content} placeholder="Compartilhe algo..." className="bg-[var(--cor06)] outline-none rounded-[10px] h-[45px] w-[100%] px-[10px] text-[16px] text-[var(--text)]" type="text" />
                    </div>

                    <div className="flex w-full h-[50%] justify-between text-[var(--text)] items-center">
                        
                        <ButtonAnimation state={permitirComents} setState={setPermitirComents} />
                        
                        <p className="text-[var(--cor02)] text-[14px]">{erro?.message}</p>

                        <button className="w-[130px] h-[40px] rounded-full border-2 cursor-pointer hover:scale-[1.05] duration-200 hover:bg-[var(--cor02)] hover:text-[var(--text2)]" type="submit">Publicar</button>
                            
                    </div>

                </form>
            </div>
        </>
    )
}

export default ContentCreatePost