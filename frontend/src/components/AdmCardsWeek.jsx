


const AdmCardsWeek =  ({dadosPostsWeek,dadosPostsWeekTotal}) => {
    return (

        <div className='flex-1 flex justify-center max-[1400px]:min-h-[200px] flex-col items-start p-[10px]'>
            <h1 className='text-[15px] text-[var(--cor03)]'>Dados por semana</h1>
            <div className='w-full relative h-full border-[0_0_4px_4px] flex bg-[var(--text2)]'>

                <div className='flex absolute left-[4px] top-0 flex-col h-full'>
                    <p className='absolute top-0'>{dadosPostsWeekTotal}</p>
                    <p className='absolute bottom-0'>0</p>
                </div>

                <div className=' w-full h-full p-[0_10px_0_30px] gap-[10px] flex justify-around items-end'>
                    {dadosPostsWeek?.map((e,index)=>(
                        <div key={index} style={{height:`${(e.total / dadosPostsWeekTotal) * 100}%`}} className={`flex-1 justify-center transition-all duration-[2000ms] items-center flex bg-[black] max-w-[10%] relative`}>
                            <span className='absolute text-[var(--cor05)] text-[13px]'>{e.total}</span>
                            <span className='absolute top-[calc(100%+2px)] text-[13px]'>{e._id}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    )
}



export default AdmCardsWeek