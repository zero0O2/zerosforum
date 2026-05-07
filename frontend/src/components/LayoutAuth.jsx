

const LayoutAuth = ({title,contentTitle,children,position}) => {

    return(
        <>
            <div className={`flex justify-between items-center ${position == "left" && "flex-row-reverse"} w-[100dvw] h-[100dvh]`}>

                <div className={`w-[60%] h-[100%] bg-[url('/images/fundo.jpg')] bg-cover bg-[-7dvw] bg-left ${position == "left" && "bg-right bg-[0dvw]"} justify-center relative flex flex-col items-center p-[40px_20px]`}>
                    <div className="w-full text-center text-[3vw] text-[var(--cor04)] font-[Castoro_Titling]">
                        <h1>{contentTitle}</h1>
                        <p className="text-[2vw]">Conecte-se e participe
                            <span className="animate-pulse [animation-delay:0s]">.</span>
                            <span className="animate-pulse [animation-delay:0.3s]">.</span>
                            <span className="animate-pulse [animation-delay:0.6s]">.</span>
                        </p>
                    </div>

                </div>

                <div className="w-[40%] h-[100%] text-[var(--cor04)] flex flex-col gap-[10px] z-10 p-[60px_30px] font-[Castoro_Titling] bg-[var(--cor01)]">
                    <div className="w-full text-center text-[4vw]">
                        <h1>{title}</h1>
                    </div>


                    {children}

                </div>

            </div>
        </>
    )
}

export default LayoutAuth