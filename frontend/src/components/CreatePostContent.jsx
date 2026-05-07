import { useRef } from "react";
import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import ButtonAnimation from "./ButtonAnimation";
import axios from "axios";
import { usePost } from "../contexts/posts/PostProvider";

const CreatePostContent = () => {

    const {setDadosPosts} = usePost()

    const inputImg = useRef(null)
    const [previwImg, setPreviwImg] = useState("")

    const [imgPost, setImgPost] = useState("")
    const [titlePost, setTitlePost] = useState("")
    const [contentPost, setContentPost] = useState("")
    const [commentAccept, setCommentAccept] = useState(true)
    
    const [erro, setErro] = useState({})

    const Upload = async (image) => {
        if(!image) return

        const data = new FormData()
        
        data.append("file",image)
        data.append("upload_preset",import.meta.env.VITE_UPLOAD_PRESET)
        data.append("cloud_name",import.meta.env.VITE_CLOUD_NAME)
        data.append("folder","Posts")
        
        const res = await fetch("https://api.cloudinary.com/v1_1/dpjpug3o0/image/upload",{
            method:"POST",
            body:data
        })
        
        const uploadUrl = await res.json()

        return uploadUrl.url
    }

    const Submit = async (e) => {
        e.preventDefault()
        const dadosPost = {}


        if(imgPost)dadosPost.image = true
        if(titlePost)dadosPost.title = titlePost
        if(contentPost)dadosPost.content = contentPost
        dadosPost.commentAccept = commentAccept

        setImgPost("")
        setPreviwImg("")
        setTitlePost("")
        setContentPost("")

        try {
            let post = await axios.post("http://localhost:3000/posts",dadosPost,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            if(imgPost){
                const urlImg = await Upload(imgPost)
    
                post = await axios.put(`http://localhost:3000/posts/${post.data._id}`,{image:urlImg})
            }

            setDadosPosts(prev => [...prev, post.data])

            if (inputImg.current) {
                inputImg.current.value = ""
            }
        } catch (error) {
            setErro(error.response?.data)
            console.log(error)
        }


    }

    return(
        <>
            <div className="bg-[var(--cor06)] w-[350px] shrink-0 h-[100%] p-[8px_10px_10px_0px]">
                <div className="w-full h-full rounded-[10px] flex bg-[var(--cor01)]">
                    <form onSubmit={Submit} className="w-full h-full flex flex-col pb-[20px] center justify-between items-center">
                        <div className="w-full max-h-[250px] z-0 overflow-hidden relative h-full w-full">

                            {previwImg && <div onClick={()=>{
                                setPreviwImg("")
                                setImgPost("")
                                if(inputImg) inputImg.current.value = ""
                            }} className="absolute text-[var(--text2)] cursor-pointer bg-[var(--sombra)] text-shadow-black text-shadow-[0_0_10px] top-2 left-2 flex z-20 hover:scale-[1.1] transition-all duration-200 text-[40px]"><CiCircleRemove /></div>}

                            <label>
                                <input ref={inputImg} onChange={(e)=>{
                                    const file = e.target.files[0]
                                    if(!file) return
                                    setImgPost(file)
                                    setErro({})
                                    setPreviwImg(URL.createObjectURL(file))
                                }} className="hidden" type="file" accept="image/*" name="" id="" />
                                <div className="w-full h-full bg-[var(--text2)] flex-col border-[2px] border-[var(--text)] transition-all duration-200 hover:opacity-60 flex justify-center items-center text-[40px] text-[var(--text)] cursor-pointer">
                                    {    
                                    !previwImg ? 
                                    <div className="flex justify-center items-center flex-col">
                                        <CiImageOn />
                                        <p className="text-[14px] text-[var(--sombra)]">Enviar uma Imagem</p>
                                    </div>

                                    :
                                    <img className="h-full w-full object-cover" src={previwImg} alt="" />
                                    }
                                </div>
                            </label>
                        </div>
                        <div className="w-full flex flex-col flex-1 p-[30px_10px] gap-[35px]">
                            
                            <label className="flex w-full items-center flex flex-col relative">
                                <input onChange={(e) => {
                                    setTitlePost(e.target.value)
                                    setErro({})
                                    }} value={titlePost} className="peer text-[var(--text)] h-[35px] w-[100%] outline-none border-2 rounded-[8px] px-[10px]" autoComplete="off" type="text" />
                                <p className={`bg-[var(--cor01)] absolute rounded-t-[5px] -translate-y-1/2 transition-all h-[12px] flex justify-center items-center duration-300 ${titlePost ? "top-[-2px] left-[10px] px-[5px]":"top-1/2 left-[20px] px-[5px] peer-focus:top-[-2px] peer-focus:left-[20px]"}`}>Titulo</p>
                            </label>

                            <label className="flex w-full flex flex-col relative">
                                <textarea onChange={(e) => {
                                    setContentPost(e.target.value)
                                    setErro({})
                                    }} value={contentPost} className="peer text-[var(--text)] h-[100px] w-[100%] no-scrollbar text-[15px] resize-none p-[10px] outline-none border-2 rounded-[8px] px-[10px]" autoComplete="off" type="text" />
                                <p className={`bg-[var(--cor01)] absolute rounded-t-[5px] -translate-y-1/2 transition-all h-[12px] flex justify-center items-center duration-300 ${contentPost ? "top-[-2px] left-[10px] px-[5px]":"top-1/5 left-[20px] px-[5px] peer-focus:top-[-2px] peer-focus:left-[20px]"}`}>Conteúdo</p>
                            </label>

                            <p className="text-[14px] text-center text-[var(--cor02)]">{erro?.message}</p>

                            <label onClick={()=>setCommentAccept(prev=>!prev)} className="flex w-full flex justify-between hover:cursor-pointer items-center relative">
                                <h1>Permitir Comentarios</h1>
                                <ButtonAnimation state={commentAccept} setState={setCommentAccept} click="off"/>
                            </label>

                        </div>

                        <button className="w-[160px] h-[40px] rounded-full border-2 cursor-pointer hover:scale-[1.05] duration-200 hover:bg-[var(--cor02)] hover:text-[var(--text2)]" type="submit">Postar</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreatePostContent