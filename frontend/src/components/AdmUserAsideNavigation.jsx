import { SlArrowLeft } from "react-icons/sl"



const AdmUserAsideNavigation = ({destination,setNavigate,navigateUser}) => {

    return(

            <div className="flex justify-between w-full items-center">
                <span className="flex justify-center items-center gap-[10px]">
                    <img src={navigateUser?.avatar} className="w-[50px] h-[50px] rounded-full object-cover" alt="" />
                    <h1 className="text-[18px]">Configurações</h1>
                </span>

                <button onClick={()=> {
                    setNavigate(destination)   
                }} className='border-2 p-[10px] w-[40px] h-[40px] right-0 rounded-full hover:scale-[1.1] text-[var(--cor02)] duration-200 cursor-pointer'><SlArrowLeft /></button>

            </div>
    )

}

export default AdmUserAsideNavigation