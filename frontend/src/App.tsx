import React from 'react'
import Card from './components/Card'
import Sidebar from './components/Sidebar'
import SideNav from './components/SideNav'
import Create from './pages/Create'
import Login from './pages/Login'

const App = () => {
    return (
        <div className='grid grid-cols-10'>
            <Login/>
        </div>
    )
}

export default App
