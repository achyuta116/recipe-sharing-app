import React from 'react'
import Card from './components/Card'
import Sidebar from './components/Sidebar'
import SideNav from './components/SideNav'
import Create from './pages/Create'

const App = () => {
    return (
        <div className='grid grid-cols-10'>
            <Create/>
        </div>
    )
}

export default App
