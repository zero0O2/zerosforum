import { LuLoaderCircle } from "react-icons/lu";
import CardsUser from "./CardsUser.jsx";

const AdmHomeAsideUsers =  ({users,setErro,setUseDelete,setSpan,setNavigateUser,setNavigate,setPostNavUser}) => {
    return (
        <div>
            <div className='text-[20px] bg-[var(--cor01)] p-[20px] justify-between items-center flex rounded-[15px]'>
                <h1>Usuarios Cadastrados</h1>
            </div>
            <div className='flex flex-col w-full flex-1 gap-[10px]'>
                {(!users) && <div className="text-[3em] h-full justify-center flex items-center"><LuLoaderCircle className="animate-spin"/></div>}
                
                <div className='w-full h-[280px] overflow-y-scroll no-scrollbar'>
                    {users && users.map((e)=>{
                        return <CardsUser setErro={setErro} setUseDelete={setUseDelete} setSpanDelete={setSpan} setNavigateUser={setNavigateUser} setNavigate={setNavigate} setPostNavUser={setPostNavUser} key={e._id} user={e}/>
                    })}
                </div>
            </div>
        </div>
    )
}



export default AdmHomeAsideUsers