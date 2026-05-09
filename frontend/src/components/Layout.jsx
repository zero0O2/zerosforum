import Aside from "../components/Aside"
import LayoutContent from "../components/LayoutContent.jsx"
import { useDisplay } from "../contexts/display/DisplayProvider.jsx"

const Layout = ({children}) => {

    const {tema} = useDisplay()


    return(
        <>  
            <div className={`${tema === "light" ? 'mode-light' : 'mode-dark'} `}>
                <Aside/>
                <LayoutContent>
                    {children}
                </LayoutContent>
            </div>
        </>
    )
}



export default Layout