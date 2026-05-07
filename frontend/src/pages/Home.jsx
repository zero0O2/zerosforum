
import Layout from '../components/Layout.jsx'
import { useApp } from '../contexts/appContext/AppProvider.jsx'
import { useEffect } from 'react'
import { useAuth } from '../contexts/auth/AuthProvider.jsx'

import HomeContentPosts from "../components/HomeContentPosts.jsx"
import CreatePostContent from "../components/CreatePostContent"


const Home = () => {
    const {access} = useAuth()
    const {setPage} = useApp()

    useEffect(()=>{
        setPage("home")
    },[])

    return(
        <>  
            <Layout>
                <HomeContentPosts />

                {access && <CreatePostContent/>}

            </Layout> 
        </>
    )
}

export default Home