
import Layout from '../components/Layout.jsx'
import HomeContentPosts from "../components/HomeContentPosts.jsx"
import { useEffect } from 'react'
import { useState } from 'react'

import { LuLoaderCircle } from "react-icons/lu";
import { SlArrowLeft } from "react-icons/sl";


import { useApp } from '../contexts/appContext/AppProvider.jsx'
import CardsUser from '../components/CardsUser.jsx'
import CardsPost from '../components/CardsPost.jsx'
import AdmHome from '../components/AdmHome.jsx'
import AdmUser from '../components/AdmUser.jsx'
import { useAuth } from '../contexts/auth/AuthProvider.jsx'


const PageAdmin = () => {

    const [navigate,setNavigate] = useState("home")

    const [users,setUsers] = useState(null)
    const [navigateUser,setNavigateUser] = useState(null)
    const [postNavUser,setPostNavUser] = useState(null)
    const [erro,setErro] = useState()

    const {setPage} = useApp()
    const {BuscarUsers} = useAuth()

    const BuscaBancoUsers = async () => {
        const dados = await BuscarUsers()
        setUsers(dados.data)
    }
    
    useEffect(()=>{
        const funtionsAwaitEffect = async () => {
            await BuscaBancoUsers()
        }
        
        funtionsAwaitEffect()
        setPage("adm")
    },[])


    return(
        <>  
            <Layout>
                <div className='w-full overflow-y-scroll scroll h-[calc(100dvh-100px)] bg-[var(--cor06)] p-[10px] flex flex-col text-[var(--text)]'>

                    {navigate == "home" && 
                        <AdmHome users={users} setUsers={setUsers} setNavigate={setNavigate} setNavigateUser={setNavigateUser} setPostNavUser={setPostNavUser} setErro={setErro}/>
                    }
                    

                    {(navigate == "user" && navigateUser) && 
                        <AdmUser 
                            setNavigate={setNavigate} 
                            navigateUser={navigateUser} setNavigateUser={setNavigateUser} 
                            postNavUser={postNavUser}   setPostNavUser={setPostNavUser} 
                            erro={erro} setErro={setErro} />
                    }


                </div>
            </Layout> 
        </>
    )
}

export default PageAdmin