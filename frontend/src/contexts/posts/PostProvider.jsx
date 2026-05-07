import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const PostContext = createContext()

const PostProvider = ({children}) => {

    const [dadosPosts,setDadosPosts] = useState(null)


    const CarregarAllPosts = async () => {

        try {
            const dadosPost = await axios.get("http://localhost:3000/posts")
            setDadosPosts(dadosPost.data)
        } catch (error) {   
            console.log(error?.response)
        }
        
    }
    const CarregarPostsForUser = async (id) => {

        try {
            const dadosPost = await axios.get(`http://localhost:3000/posts/${id}`)
            return dadosPost.data
        } catch (error) {   
            console.log(error?.response)
        }
        
    }
    
    const CarregarLastDaysPost = async (daysForPosts) => {
        if (typeof daysForPosts !== "number") {return console.error({messsage:"parametro passado na funcao CarregarLastDaysPost,precisa ser do tipo number"})}
        const dadosPostLastDays = await axios.get(`http://localhost:3000/postsDados/postOfDays/${daysForPosts}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        return dadosPostLastDays.data
    }
    
    const CarregarPostforDays = async (daysForPosts) => {
        if (typeof daysForPosts !== "number") {return console.error({messsage:"parametro passado na funcao CarregarLastDaysPost,precisa ser do tipo number"})}
        const dadosPostLastDays = await axios.get(`http://localhost:3000/postsDados/daySearch/${daysForPosts}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        return dadosPostLastDays.data
    }


    useEffect(()=>{
        const funtionsAwaitEffect = async () => {
            await CarregarAllPosts()

        }
        
        funtionsAwaitEffect()
    },[])

    return(
        <PostContext.Provider value={{dadosPosts,CarregarAllPosts,setDadosPosts,CarregarLastDaysPost,CarregarPostforDays,CarregarPostsForUser}}>
            {children}
        </PostContext.Provider>
    )
}

const usePost = () => {
    const post = useContext(PostContext)
    return post
}

export {PostContext,PostProvider,usePost}