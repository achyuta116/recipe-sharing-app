import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Create from './pages/Create'
import Home from './pages/Home'
import Login from './pages/Login'
import Recipe from './pages/Recipe'
import Update from './pages/Update'


const App = () => {
    const { user } = useAuthContext()
    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route 
                            path='/login' 
                            element={!user?.token ? <Login/> : <Navigate to='/'/>}/>
                        <Route 
                            path='/recipe/:user/:rname' 
                            element={<Recipe/>}/>
                        <Route 
                            path='/update/:user/:rname' 
                            element={user?.token ? <Update/> : <Navigate to='/login'/>}/>
                        <Route 
                            path='/create' 
                            element={user?.token ? <Create/> : <Navigate to='/login'/>}/>
                    </Routes>
                </div>  
            </BrowserRouter>
        </div>
    )
}

export default App
