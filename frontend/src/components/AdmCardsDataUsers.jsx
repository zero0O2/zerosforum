import { useEffect, useState } from "react"

const AdmCardsDataUsers =  ({users,title,func}) => {

    const [userDisplay,setUserDisplay] = useState(null)

    useEffect(()=>{
        const functionEffectAsync = async () => {

            setUserDisplay(await func())
        }

        functionEffectAsync()

    },[users])


    return (    
        <>  
            <div className="flex-1 flex bg-[var(--cor01)] p-[10px] rounded-[8px] flex-col items-center gap-[10px]">
                <h1 className="text-[var(--black)]">{title}</h1>
                {
                    !userDisplay ? <p className="text-[14px] text-[var(--cor05)]">Nenhum usuário encontrado...</p> :

                    <div onClick={()=>{
                    }} className="flex-1 flex flex-col justify-center gap-[10px] items-center w-full">

                        <img className="w-[100px] h-[100px] border-4 border-[var(--cor02)] rounded-full object-cover" src={userDisplay.avatar} alt="" />
                        <div className="justify-center items-center flex flex-col">
                            <h1 className="text-[15px] text-center overflow-hidden line-clamp-2">{userDisplay.name}</h1>
                            <p>{userDisplay.email}</p>
                        </div>
                        <div className="w-full bg-[var(--cor05)] text-[var(--text2)] p-[5px] rounded-[8px] text-[14px] flex justify-center items-center flex-col">
                            <p>Cadastrado em</p>
                            <p>{userDisplay.createdAt}</p>
                        </div>
                        
                    </div>
                }
            </div>
        </>

    )
}



export default AdmCardsDataUsers