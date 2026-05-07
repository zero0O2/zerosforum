import Aside from "../components/Aside"
import LayoutContent from "../components/LayoutContent.jsx"

const Layout = ({children}) => {

    return(
        <>
            <Aside/>
            <LayoutContent>
                {children}
            </LayoutContent>
        </>
    )
}



export default Layout