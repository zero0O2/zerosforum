import { LuLoaderCircle } from "react-icons/lu"
import { MdDataUsage } from "react-icons/md"
import AdmCardsWeek from "./AdmCardsWeek"
import AdmCardsToday from "./AdmCardsToday"
import { useAuth } from "../contexts/auth/AuthProvider"
import { useEffect, useState } from "react"
import AdmCardsDataUsers from "./AdmCardsDataUsers"


const AdmCardsPostsContent =  ({dadosPostsWeek,dadosPostsWeekTotal,dadosPostsToday,postsUploadsTotal,createdAt}) => {

    const {BuscarUsers,BuscarUserMaisAtivo} = useAuth()

    const [users,setUsers ] = useState(null)

    
    const SearchLastUserCadastrar = () => {
        
        const lastUser = users?.reduce((prev,next)=>{
            return new Date(prev.createdAt) > new Date(next.createdAt) ? prev : next 
        })
        
        const createdAtUser = new Date(lastUser?.createdAt).toLocaleString()
        
        return {...lastUser,createdAt:createdAtUser}
    }
    
    const SearchUserMaxActive = async () => {
        
        try {
            const userMaisAtivo = await BuscarUserMaisAtivo()
            const user = userMaisAtivo.data.user

            const createdAt = new Date(user?.createdAt).toLocaleString("pt-br")
            return {...user,createdAt}
            
        } catch (error) {
            console.log(error)
        }
        
    }
    
    
    useEffect(()=>{
        const functionEffectAwait = async () => {
            const usersdata = await BuscarUsers()
            setUsers(usersdata.data)
        }
        functionEffectAwait()

    },[])

    return (
        <div className='flex h-full max-[1400px]:flex-col w-full flex-1  gap-[10px]'>
                            
            {
            (!dadosPostsWeekTotal || !dadosPostsToday ) ? <div className="text-[40px] bg-[var(--cor01)] flex-1 h-full justify-center flex items-center"><LuLoaderCircle className="animate-spin"/></div> :
            
            
            <div className='bg-[var(--cor01)] flex p-[10px] flex-col rounded-[10px] flex-1'>

                <header className='w-full flex justify-between items-center '>
                    <h1 className='text-[18px]'>Dados dos Posts</h1>
                    <span className={`text-[24px] text-[var(--black)] animate-rotate-once duration-[3000ms] ease-in-out transition-all`}>
                        <MdDataUsage />
                    </span>
                </header>

                <main className='flex-1 flex flex-col gap-[10px]'>
 
                    <AdmCardsWeek dadosPostsWeek={dadosPostsWeek} dadosPostsWeekTotal={dadosPostsWeekTotal}/>

                    <AdmCardsToday dadosPostsToday={dadosPostsToday} postsUploadsTotal={postsUploadsTotal} createdAt={createdAt}/>

                </main>

            </div>}

            <div className='rounded-[10px] flex gap-[10px] flex-1'>
                <AdmCardsDataUsers title={"Ultimo cadastro feito"} users={users} func={SearchLastUserCadastrar}/>
                <AdmCardsDataUsers title={"Conta mais ativa"} users={users} func={SearchUserMaxActive}/>
            </div>

        </div>
    )
}

export default AdmCardsPostsContent