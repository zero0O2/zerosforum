import { FaRegTrashAlt } from "react-icons/fa";
import { useAuth } from "../contexts/auth/AuthProvider";
import axios from "axios";

const CardsUser = ({user,setNavigateUser,setSpanDelete,setUseDelete,setNavigate,setPostNavUser,setErro}) => {

    const {DeleteUser} = useAuth()

    const PostsUser = async(user) => {
        try {
            const res = await axios.get(`http://localhost:3000/posts/${user._id}`)
            setPostNavUser(res.data)
        } catch (error) {
            setErro(error?.response)
        }

    }

    const date = new Date(user.createdAt)
    const createdAt = date.toLocaleString("pt-BR")

    return(
        <>  
            <div onClick={async()=>{
                await PostsUser(user)
                setNavigateUser(user)
                setNavigate("user")
                }} className='w-full h-[80px] relative flex justify-between hover:bg-[var(--cor01)] duration-300 cursor-pointer items-center gap-[10px] px-[10px] rounded-[10px]'>
                <div>
                    <img className='w-[60px] h-[60px] object-cover rounded-full' src={user.avatar} alt="" />
                </div>
                <div className='flex-1 flex justify-between h-full'>
                    <div className='flex flex-col justify-center '>
                        <h1 className='text-[16px]'>{user.name}</h1>
                        <p className='text-[14px]' >{user.email}</p>
                    </div>
                    <div className="flex flex-col justify-between items-end p-[2px]">
                        <div className="text-[14px] flex flex-col items-end">
                            <h1>Criado em <span className="text-[var(--cor03)]">{createdAt.split(", ")[0]}</span> ás <span className="text-[var(--cor03)]">{createdAt.split(", ")[1].split(".")[0]}</span></h1>
                            <p className="text-[var(--cor02)]">Cargo: {user.role}</p>
                        </div>
                        <p onClick={async (e) => {
                            e.stopPropagation()
                            setSpanDelete(true)
                            setUseDelete(user)
                            }} className="flex justify-center items-center hover:scale-[1.1] duration-200 text-[white] hover:text-[var(--cor02)] text-[14px] w-[30px] h-[30px] hover:bg-[var(--cor06)] bg-[var(--cor02)] rounded-full"><FaRegTrashAlt /></p>
                    </div>
                </div>
            </div>          
        </>
    )
}

export default CardsUser