import { FaEdit } from "react-icons/fa";

const ButtonAnimation = ({state,setState,click = "on"}) => {

    return(
        <>

            <div onClick={()=> click === "on" && setState(prev=>!prev)} className={`w-[70px] h-[30px] relative hover:cursor-pointer flex px-[2px] transition-all duration-300 ${!state ? "bg-[var(--cor06)]" : "bg-[var(--cor05)]"} items-center border-2 border-[var(--sombra)] rounded-full`}>
                <div className={`h-[25px] w-[25px] absolute rounded-full transition-all duration-300 ${!state ? "left-[2px] bg-[var(--cor02)]" : " left-[100%] -translate-x-[calc(100%+2px)] bg-[var(--cor03)]"} `}></div>
            </div>

        </>
    )
}

export default ButtonAnimation