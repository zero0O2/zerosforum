import { useState } from "react"
import { SlArrowLeft } from "react-icons/sl"
import AdminOptionsUser from "./AdminOptionsUser.jsx"
import AdmUserAsideNavigation from "./AdmUserAsideNavigation.jsx"
import AdmUserOptionsUpdate from "./AdmUserOptionsUpdate.jsx"
import AdmUserOptionsUpdatePassword from "./AdmUserOptionsUpdatePassword.jsx"
import AdmUserOptionsRoles from "./AdmUserOptionsRoles.jsx"
import AdmUserOptionsBans from "./AdmUserOptionsBans.jsx"
import AdmUserOptions from "./AdmUserOptions.jsx"



const AdmUserAside = ({navigateUser,postNavUser,postsUploadsTotal,createdAt }) => {
    const [navigateAside,setNavigateAside] = useState("profile")


    return(
        <>  
            <aside className='w-[400px] px-[20px] h-[100%] flex flex-col items-center justify-center'>


                {navigateAside == "profile" && <div className=' w-full h-full flex flex-col items-center'>
                    <img className='w-[200px] h-[200px] rounded-full object-cover' src={navigateUser?.avatar} alt="" />

                    <div className='flex flex-col items-start w-full gap-[10px] py-[20px]'>
                        <h1 className='text-[24px] text-center w-full'>{navigateUser?.name}</h1>
                        <p className='text-[16px] flex justify-between w-full'><span className='text-[var(--cor02)]'>Email:</span> {navigateUser?.email}</p>
                        <p className='text-[16px] flex justify-between w-full'><span className='text-[var(--cor02)]'>Criado em:</span> {createdAt?.split(", ")[0]} ás {createdAt?.split(", ")[1]}</p>
                    </div>

                    <div className='flex w-full flex-wrap items-center gap-[10px] justify-center'>
                        <div className='flex-1 flex flex-col justify-center px-[5px] items-center rounded-[10px] text-[var(--text2)] h-[100px] bg-[var(--cor02)]'>
                            <h1 className='text-[16px] text-center'>Uploads feitos</h1>
                            <p className='text-[30px]'>{postsUploadsTotal?.length || 0}</p>
                        </div>
                        <div className='flex-2 text-[var(--white)]  rounded-[10px] h-[100px] flex flex-col justify-center items-center bg-[var(--cor05)]'>
                            <h1 className='text-[18px]'>Total de Posts enviados</h1>
                            <p className='text-[30px]'>{postNavUser?.length || 0}</p>
                        </div>
                    </div>

                    <div className='flex-1 w-full py-[30px]'>
                        <button className="w-full h-[50px] bg-gradient-to-r to-[var(--cor01)] from-[var(--cor01)] rounded-[10px] text-[var(--cor02)] transition-all duration-500 hover:scale-[1.02] cursor-pointer hover:text-[var(--white)] hover:to-[var(--cor05)] hover:from-[var(--cor02)]" onClick={()=>{setNavigateAside("optionsAdminUser")}}>Opções de Administração de Usuário</button>
                    </div>
                    
                </div>}

                {navigateAside == "optionsAdminUser" && <div className="flex-1 w-full flex-col flex gap-[30px]">

                        <AdmUserAsideNavigation destination={"profile"} setNavigate={setNavigateAside} navigateUser={navigateUser}/>

                        <AdminOptionsUser navigateUser={navigateUser} setNavigateAside={setNavigateAside}/>

                    </div>
                }

                {/* ==================== ROTAS das OPTIONS ==================== */}

                <AdmUserOptions navigateUser={navigateUser} setNavigateAside={setNavigateAside} navigateAside={navigateAside}/>


            </aside>
        </>
    )
}

export default AdmUserAside