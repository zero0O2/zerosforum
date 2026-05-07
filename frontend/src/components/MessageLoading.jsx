

const MessageLoading = ({message}) => {

    return(
        <>
            <p className="flex justify-center text-[18px] text-[var(--text)] mt-[20px] items-center">
                {message}
                <span className="animate-pulse [animation-delay:0s]">.</span>
                <span className="animate-pulse [animation-delay:0.3s]">.</span>
                <span className="animate-pulse [animation-delay:0.6s]">.</span>
            </p>

        </>
    )
}

export default MessageLoading