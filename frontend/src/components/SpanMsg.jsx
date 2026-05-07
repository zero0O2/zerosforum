const SpanMsg = ({setSpan, Span,title,opcion,func}) => {
    return(
        <>
            {Span && 
                <div onClick={()=>{setSpan(false)}} className="w-[100dvw] h-[100dvh] flex justify-center bg-[var(--sombra)] pt-[50px] duration-200 fixed backdrop-blur-2xl left-0 top-0 z-10">
                    <div onClick={(e)=>e.stopPropagation()} className="w-[420px] rounded-[8px] p-[20px_10px] flex flex-col items-center justify-between h-[130px] bg-[var(--cor01)] text-[var(--text)]">
                        <h1 className="text-[20px]">{title}</h1>
                        <div className="w-[100%] flex justify-around">
                            <div onClick={()=>{setSpan(false)}} className="w-[40%] h-[35px] border-2 rounded-[4px] justify-center items-center flex cursor-pointer duration-200 hover:scale-105 ">Voltar</div>
                            <div onClick={()=>{
                                func()
                                setSpan(false)
                            }} className="w-[40%] h-[35px] border-2 rounded-[4px] justify-center items-center flex cursor-pointer duration-200 hover:scale-105 hover:bg-[var(--cor02)] hover:text-[var(--cor01)]">{opcion}</div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SpanMsg