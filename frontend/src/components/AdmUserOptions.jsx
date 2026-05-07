import AdminOptionsUser from "./AdminOptionsUser.jsx"
import AdmUserAsideNavigation from "./AdmUserAsideNavigation.jsx"
import AdmUserOptionsUpdate from "./AdmUserOptionsUpdate.jsx"
import AdmUserOptionsUpdatePassword from "./AdmUserOptionsUpdatePassword.jsx"
import AdmUserOptionsRoles from "./AdmUserOptionsRoles.jsx"
import AdmUserOptionsBans from "./AdmUserOptionsBans.jsx"



const AdmUserOptions = ({navigateUser,setNavigateAside,navigateAside}) => {


    return(
        <>  
            {/* ==================== ROTAS das OPTIONS ==================== */}

            {navigateAside == "optionsAdminUserUpdate" && <div className="flex-1 w-full flex-col flex gap-[30px]">

                    <AdmUserAsideNavigation destination={"optionsAdminUser"} setNavigate={setNavigateAside} navigateUser={navigateUser}/>

                    <AdmUserOptionsUpdate user={navigateUser}/>

                </div>
            }

            {navigateAside == "optionsAdminUserUpdatePassword" && <div className="flex-1 w-full flex-col flex gap-[30px]">

                    <AdmUserAsideNavigation destination={"optionsAdminUser"} setNavigate={setNavigateAside} navigateUser={navigateUser}/>

                    <AdmUserOptionsUpdatePassword user={navigateUser}/>

                </div>
            }

            {navigateAside == "optionsAdminUserRoles" && <div className="flex-1 w-full flex-col flex gap-[30px]">

                    <AdmUserAsideNavigation destination={"optionsAdminUser"} setNavigate={setNavigateAside} navigateUser={navigateUser}/>

                    <AdmUserOptionsRoles user={navigateUser}/>

                </div>
            }

            {navigateAside == "optionsAdminUserBans" && <div className="flex-1 w-full flex-col flex gap-[30px]">

                    <AdmUserAsideNavigation destination={"optionsAdminUser"} setNavigate={setNavigateAside} navigateUser={navigateUser}/>

                    <AdmUserOptionsBans user={navigateUser}/>

                </div>
            }

        </>
    )
}

export default AdmUserOptions