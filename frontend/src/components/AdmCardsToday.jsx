

const AdmCardsToday =  ({dadosPostsToday,postsUploadsTotal,createdAt}) => {
    return (
        <div className='flex-1 flex flex-col'>
            <h1 className='text-[18px] text-[var(--cor03)]'>Ultimas 24hs</h1>
            <div className='flex flex-1 gap-[10px]'>

                <div className='flex-1 bg-[var(--text2)] text-[15px] rounded-[8px] flex justify-center items-start px-[10px] flex-col'>
                    <p className=' text-[var(--cor02)]'>Posts feitos: {dadosPostsToday?.length}</p>
                    <p className='text-[var(--cor02)]'>Uploads feitos: {postsUploadsTotal?.length}</p>
                </div>

                <div className='flex-2 rounded-[8px] p-[5px] flex justify-center items-center flex-col bg-[var(--cor05)] text-[var(--cor01)]'>
                    <p>Ultima publicaçao feita</p>
                    <p>{createdAt}</p>
                </div>
            </div>
        </div>
    )
}



export default AdmCardsToday