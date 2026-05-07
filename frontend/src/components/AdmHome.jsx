
import Layout from '../components/Layout.jsx'
import HomeContentPosts from "../components/HomeContentPosts.jsx"

import { LuLoaderCircle } from "react-icons/lu";
import { SlArrowLeft } from "react-icons/sl";
import { MdDataUsage } from "react-icons/md";


import CardsUser from '../components/CardsUser.jsx'
import { usePost } from '../contexts/posts/PostProvider.jsx';
import SpanMsg from './SpanMsg.jsx';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth/AuthProvider.jsx';
import AdmHomeAsideUsers from './AdmHomeAsideUsers.jsx';
import AdmCardsPostsContent from './AdmCardsPostsContent.jsx';
import AdmCardsPostsTotais from './AdmCardsPostsTotais.jsx';


const AdmHome = ({users,setNavigate,setUsers,setNavigateUser,setPostNavUser,setErro}) => {

    const {dadosPosts,CarregarLastDaysPost,CarregarPostforDays} = usePost()
    const {DeleteUser} = useAuth()
    
    const ultimoPostFeito = dadosPosts?.length ? dadosPosts.reduce((a, b) =>
        new Date(b.createdAt) > new Date(a.createdAt) ? b : a
    ): null
    

    const date = new Date(ultimoPostFeito?.createdAt)
    const createdAt = date.toLocaleString('pt-br')

    const [userDelete,setUseDelete] = useState(null)
    const [span,setSpan] = useState(false)
    const [dadosPostsWeek,setDadosPostsWeek] = useState(null)
    const [dadosPostsToday,setDadosPostsToday] = useState(null)
    const [dadosPostsWeekTotal,setDadosPostsWeekTotal] = useState(null)
    
    const Delete = async () => {
        try {
            await DeleteUser(userDelete)
            setUsers(prev=> prev.filter(e=>(e._id !== userDelete._id)))
            
        } catch (error) {
            console.log(error?.response)
        }
        setUseDelete(null) 
    }
    
    
    useEffect(()=>{
        const funtionsAwaitEffect = async () => {
            const postsWeek = await CarregarLastDaysPost(7)
            const postsToday = await CarregarPostforDays(1)
            setDadosPostsWeek(postsWeek)
            setDadosPostsToday(postsToday)
        }
        
        funtionsAwaitEffect()
    },[])
    
    useEffect(()=>{
        
        const funtionsAwaitEffect = async () => {
            const countPostsforWeek = dadosPostsWeek?.length && dadosPostsWeek?.reduce((prev,atual)=>{
                return prev.total >= atual.total ? prev : atual
            })
            
            setDadosPostsWeekTotal(countPostsforWeek?.total || 0)
        }
        
        funtionsAwaitEffect()
        
        
    },[dadosPostsWeek])
    
    const postsUploadsTotal = dadosPostsToday?.filter(e=>{return e.image})
    

    return(
        <>  
            <div className='flex-1 flex flex-col gap-[10px]'>
                <AdmHomeAsideUsers 
                    users={users} 
                    setErro={setErro} 
                    setUseDelete={setUseDelete} 
                    setSpan={setSpan} 
                    setNavigateUser={setNavigateUser} 
                    setNavigate={setNavigate} 
                    setPostNavUser={setPostNavUser}/>

                <div className='flex flex-col gap-[10px] overflow-y-scroll no-scrollbar'>
                    <div className='w-full flex-1 max-[1400px]:flex-col flex  gap-[10px]'>
                        <AdmCardsPostsTotais users={users} dadosPosts={dadosPosts}/>

                        <AdmCardsPostsContent

                            dadosPostsWeek={dadosPostsWeek}
                            dadosPostsWeekTotal={dadosPostsWeekTotal}
                            dadosPostsToday={dadosPostsToday}
                            postsUploadsTotal={postsUploadsTotal}
                            createdAt={createdAt}
                        />
                    </div>
                    
                    <div className='w-full flex-1 max-[1400px]:flex-col flex  gap-[10px]'>
                        <AdmCardsPostsTotais users={users} dadosPosts={dadosPosts}/>

                        <AdmCardsPostsContent

                            dadosPostsWeek={dadosPostsWeek}
                            dadosPostsWeekTotal={dadosPostsWeekTotal}
                            dadosPostsToday={dadosPostsToday}
                            postsUploadsTotal={postsUploadsTotal}
                            createdAt={createdAt}
                        />
                    </div>
                    

                </div>
            </div>
            <SpanMsg setSpan={setSpan} Span={span} title={"Dejesa deletar esse usuário"} opcion={"Deletar"} func={Delete} />
        </>
    )
}

export default AdmHome