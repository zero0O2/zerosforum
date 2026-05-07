
import Layout from '../components/Layout.jsx'
import HomeContentPosts from "../components/HomeContentPosts.jsx"

import { LuLoaderCircle } from "react-icons/lu";
import { SlArrowLeft } from "react-icons/sl";


import CardsUser from '../components/CardsUser.jsx'
import CardsPost from '../components/CardsPost.jsx'
import AdmHome from '../components/AdmHome.jsx'
import AdmUserAside from './AdmUserAside.jsx';


const AdmUser = ({setNavigate,setNavigateUser,navigateUser,postNavUser,setPostNavUser,erro,setErro}) => {

    const postsUploadsTotal =  postNavUser?.filter(e=>{return e.image})
    
    const date = new Date(navigateUser.createdAt)
    const createdAt = date.toLocaleString("pt-BR")


    return(
        <>  

            <div className='relative z-0 flex w-full gap-[10px] h-full'>
            
                <AdmUserAside 
                    postsUploadsTotal={postsUploadsTotal}
                    createdAt={createdAt}
                    navigateUser={navigateUser}
                    postNavUser={postNavUser}
                />

                <main className='flex-1 flex flex-col'>
                        <div className='flex justify-between pb-[10px] items-center'>
                            <h1 className='text-[18px] text-[var(--black)]'>Menssagens do úsuario</h1>
                            <button onClick={()=> {
                                setPostNavUser(null)
                                setNavigateUser(null)
                                setNavigate("home")
                                setErro(null)
                                }} className='border-2 p-[10px] rounded-full hover:scale-[1.1] text-[var(--cor02)] duration-200 cursor-pointer'><SlArrowLeft /></button>
                        </div>

                        <div className="bg-[var(--cor01)] p-[20px] rounded-[10px] no-scrollbar max-h-[100%] overflow-y-scroll">
                            <div className="flex gap-[20px] flex-col-reverse">
                                {erro &&<p className='text-[16px]'>{erro?.data?.message} ...</p>}
                                {postNavUser?.map(e=>(
                                    <CardsPost key={e._id} post={e} setPosts={setPostNavUser}/>
                                ))}    
                            </div>
                        </div>
                </main>
            
            </div>
        </>
    )
}

export default AdmUser