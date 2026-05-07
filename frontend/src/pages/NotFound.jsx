
import { useNavigate } from "react-router-dom"

const NotFound =  () => {

    const navigation = useNavigate()
    const search = window.location.pathname

    return (
        <div className="font-[Castoro_Titling] bg-[url('./images/fundo.jpg')] p-[20px] bg-cover text-[var(--text)] justify-center flex bg-bottom-right h-[100dvh] w-[100dvw]">
            <div className="flex flex-col justify-center w-[630px] text-center h-[50%] backdrop-blur-3xl backdrop-opacity-50 rounded-[20px] text-[20px] items-center">
                <h1 className="text-[170px] font-[Lexend] text-[white]">404</h1>
                <p>Pagina não encontrada <span onClick={() => navigation("/")} className="text-[var(--cor05)] underline cursor-pointer">Voltar para home</span></p>
                <p className="text-[14px] font-[Lexend]"><span className="text-[var(--cor05)]">{search} </span>não é um caminho disponivel.</p>
            </div>
        </div>
    )
}

export default NotFound