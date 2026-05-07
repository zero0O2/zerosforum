
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import axios from "axios"
import { usePost } from "../contexts/posts/PostProvider";
import { useAuth } from "../contexts/auth/AuthProvider";
import { FaRegTrashAlt } from "react-icons/fa";
import SpanMsg from "./SpanMsg";
import { useState } from "react";

const CardsPost = ({post,setPosts}) => {

    const {CarregarAllPosts} = usePost()
    const {user, role} = useAuth()

    const data = new Date(post.createdAt)
    const createdAt = data.toLocaleString("pt-BR")
    const isToday =  createdAt?.split("T")[0] === data.toISOString().split("T")[0]


    const [msgDelete,setMsgDelete] = useState(false)

    
    const Curtir = async () => {
        try {
            const liked = await axios.put(`http://localhost:3000/likes/${post._id}`,{},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}` 
                }
            })

            setPosts((prev) => prev.map(e=>(
                e._id === post._id ? liked.data : e
            )))

            
        } catch (error) {
            console.log(error?.response)
        }
    }

    const PostDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:3000/posts/${post._id}`)
            setMsgDelete(false)
    
            setPosts(prev => prev.filter(e => (
                e._id !== res.data._id 
            )))
            
        } catch (error) {
            console.log(error.response)
        }
    }


    const curtiu = post?.likes?.some(e => (
        e === user?._id
    ))

    return(
        <>
            <div onDoubleClick={Curtir} className="w-full relative z-0 flex flex-col justify-center rounded-[10px] hover:bg-[var(--text2)] cursor-pointer items-center min-h-[80px] h-full">
                
                <div className="w-full relative flex gap-[10px] justify-start p-[20px_20px]">
                    <div className={`${(!post.content && !post.title) && "absolute top-5 left-5 z-10"} flex justify-start items-center`}>
                        <img className="w-[50px] h-[50px] object-cover rounded-full" src={post.authorId?.avatar} alt="" />
                    </div>
                    {(post.content || post.title) && <div className="flex-1 flex flex-col overflow-hidden justify-center ">
                        {post.title && <h1 className="text-[18px] font-bold">{post.title}</h1>}
                        {post.content && <p className="text-[var(--text)] text-[16px]">{post.content}</p>}
                    </div>}
                </div>

                {post.image &&
                <div className="w-full flex flex-col">
                    <img className="max-h-[300px] w-full object-contain" src={post.image} alt="" />
                </div>}

                <div className="absolute top-1 right-3 text-[12px] justify-center items-center text-[var(--cor02)] flex gap-[10px]">

                    <p onClick={Curtir} className="text-[var(--text)] flex items-center justify-center gap-[5px] hover:scale-[1.1] duration-200">
                        {post?.likes?.length}

                        {curtiu ? <FaHeart /> : <FaRegHeart />}
                    </p>
                    {role == "adm" || role == "dev"
                        ? <p>{createdAt?.split(", ")[0]} ás {createdAt?.split(", ")[1].split(".")[0]}</p> 
                        : <p>{!isToday ? createdAt?.split(", ")[0] : createdAt?.split(", ")[1].split(".")[0]}</p>
                    }

                </div>
                { user && (post.authorId?._id === user?._id || user?.role !== "user") &&
                    <div onClick={()=>setMsgDelete(true)} className={`absolute bottom-3 z-10 hover:scale-[1.1] duration-200 right-3 text-[15px] text-[var(--text)] flex`}>
                        <FaRegTrashAlt />
                    </div>
                }


                <div className="absolute top-1 left-3 text-[12px] text-[var(--balck)] gap-[5px] flex">
                    {post.authorId?.role == "dev" && <p className="text-[var(--cor02)]">Dev</p>}
                    {post.authorId?.name}
                </div>
            </div>

            <SpanMsg Span={msgDelete} setSpan={setMsgDelete} title={"Deseja excluir o Post"} opcion={"Excluir"} func={PostDelete}/>
        </>
    )
}

export default CardsPost