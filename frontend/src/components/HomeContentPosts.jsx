import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthProvider.jsx";
import { usePost } from "../contexts/posts/PostProvider.jsx";

import ContentCreatePost from "./ContentCreatePost.jsx";
import CardsPost from "./CardsPost.jsx";
import MessageLoading from "./MessageLoading.jsx";

import { CiImageOn } from "react-icons/ci";


const HomeContentPosts = () => {
    const {access} = useContext(AuthContext)
    const {dadosPosts,setDadosPosts} = usePost()

    return(
        <>
            <div className=" w-[100%] h-[100%]  p-[10px] flex flex-col overflow-y-scroll no-scrollbar gap-[10px] bg-[var(--cor06)]">

                {access && <ContentCreatePost setPosts={setDadosPosts}/>}

                <div className="bg-[var(--cor01)] w-full flex-1 justify-center items-center flex rounded-[10px] p-[20px]">
                    <div className=" w-full flex flex-col max-w-[1000px] gap-[20px] min-h-[100%]">

                        {(!dadosPosts || dadosPosts.length < 1) &&
                            <MessageLoading message="nenhum post encontrado" />
                        }

                        {Array.isArray(dadosPosts) && 
                            [...dadosPosts].reverse().map((e,index)=>{
                                return <CardsPost key={index} post={e} setPosts={setDadosPosts}/>
                            })
                        }   

                    </div>
                </div>

            </div>
        </>
    )
}

export default HomeContentPosts