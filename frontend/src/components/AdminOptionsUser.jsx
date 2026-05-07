import { SlArrowLeft } from "react-icons/sl"



const AdminOptionsUser = ({setNavigateAside}) => {


    return(
        <>  

            <div className='flex-1 flex flex-col w-full gap-[20px]'>

                <div className="w-full flex flex-col gap-[10px]">
                    <button onClick={()=>{setNavigateAside("optionsAdminUserUpdate")}} className="w-full h-[40px] bg-[var(--cor01)] duration-200 cursor-pointer rounded-[8px] text-[var(--cor02)] hover:text-[var(--cor01)] hover:bg-[var(--cor05)]">Editar Usuario</button>
                    <button onClick={()=>{setNavigateAside("optionsAdminUserUpdatePassword")}} className="w-full h-[40px] bg-[var(--cor01)] duration-200 cursor-pointer rounded-[8px] text-[var(--cor02)] hover:text-[var(--cor01)] hover:bg-[var(--cor05)]">Alterar senha de Usuario</button>
                    <button onClick={()=>{setNavigateAside("optionsAdminUserRoles")}} className="w-full h-[40px] bg-[var(--cor01)] duration-200 cursor-pointer rounded-[8px] text-[var(--cor02)] hover:text-[var(--cor01)] hover:bg-[var(--cor05)]">Cargos de Usuario</button>
                    <button onClick={()=>{setNavigateAside("optionsAdminUserBans")}} className="w-full h-[40px] bg-[var(--cor01)] duration-200 cursor-pointer rounded-[8px] text-[var(--cor02)] hover:text-[var(--cor01)] hover:bg-[var(--cor05)]">Banimentos e exclusões</button>
                </div>

            </div>

        </>
    )
}

export default AdminOptionsUser