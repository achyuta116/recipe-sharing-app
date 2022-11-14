import React from 'react'
import CardContainer from '../components/CardContainer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Home = () => {
    return (
        <div className='grid grid-cols-10'>
            <div className='col-span-2'><Sidebar/></div>
            <div className='col-span-8'>
                <Navbar/>
                <div className='text-4xl flex items-center pl-3 font-extrabold h-20'>Recipes Listing</div>
                <CardContainer/>
            </div>
        </div>
    )
}

export default Home
