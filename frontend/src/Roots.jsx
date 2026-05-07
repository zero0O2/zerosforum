import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Home from "./pages/Home.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"
import Login from './pages/Login.jsx'
import Cadastrar from './pages/Cadastrar.jsx'
import NotFound from './pages/NotFound.jsx'
import PageAdmin from './pages/PageAdmin.jsx'

const Roots = () => {

    return(
        <BrowserRouter>
            <Routes>
                    <Route path='*' 
                    element={ <NotFound />} />
                    
                    <Route path='/' 
                    element={<PrivateRoute >
                        <Home />

                    </PrivateRoute>} />

                    <Route path='/administracao' 
                    element={<PrivateRoute roles={["adm","dev"]} page="/">
                        <PageAdmin/>

                    </PrivateRoute>} />


                    <Route path='/login' 
                    element={<PrivateRoute log={false} page="/">
                        <Login />

                    </PrivateRoute>} />

                    <Route path='/cadastro' 
                    element={<PrivateRoute log={false} page="/">
                        <Cadastrar />

                    </PrivateRoute>} />

            </Routes>
        </BrowserRouter>
    )
}

export default Roots