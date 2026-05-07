import { useNavigate } from "react-router-dom"


const HomeAsideAccess = () => {
    const navigate = useNavigate()

    return(
        <>

            <div onClick={()=>{ navigate("/cadastro") }} className="flex justify-center items-center w-[150px] h-[40px] border-[var(--cor02)] hover:bg-[var(--cor02)] border-[1px] text-[var(--cor02)] hover:text-[var(--cor01)] rounded-full duration-200 cursor-pointer">
                <p>Cadastrar</p>
            </div>
            <div onClick={()=>{ navigate("/login") }} className="flex justify-center items-center w-[150px] h-[40px] bg-[var(--cor02)] hover:bg-[var(--cor05)] hover:scale-103 text-[var(--cor01)] rounded-full duration-200 cursor-pointer">
                <p>Login</p>
            </div>

        </>
    )
}

export default HomeAsideAccess