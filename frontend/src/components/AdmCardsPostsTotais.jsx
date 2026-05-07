import { LuLoaderCircle } from "react-icons/lu"


const AdmCardsPostsTotais = ({users,dadosPosts}) => {

    return(
        <>  
            <div className='flex max-w-[220px] w-full max-[1400px]:flex-row flex-col max-[1400px]:max-w-[100%] h-full gap-[10px]'>
                <div className='w-full h-[50%] max-[1400px]:h-[140px] bg-[var(--cor02)] p-[15px_10px] text-[18px] text-[var(--white)] rounded-[14px] flex flex-col justify-between items-center'>
                    <h1 className='text-center text-wrap' >Total de Posts publicados</h1>
                    <p className='text-[50px]'>{dadosPosts ? dadosPosts.length :
                    <span className="w-[100dvw] h-[100dvh] text-[30px] flex justify-center items-center"><LuLoaderCircle className="animate-spin"/></span>
                }</p>
                </div>

                <div className='w-full h-[50%] max-[1400px]:h-[140px]  bg-[var(--cor02)] p-[15px_10px] text-[18px] text-[var(--white)] rounded-[14px] flex flex-col justify-between items-center'>
                    <h1 className='text-center text-wrap'>Total de Usuários cadastrados</h1>
                    <p className='text-[50px]'>{users ? users.length :
                    <span className="w-[100dvw] h-[100dvh] text-[30px] flex justify-center items-center"><LuLoaderCircle className="animate-spin"/></span>
                }</p>
                </div>
            </div>
        </>
    )
}

export default AdmCardsPostsTotais