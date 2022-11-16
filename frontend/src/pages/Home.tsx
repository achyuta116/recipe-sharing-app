import React, { useEffect } from 'react'
import CardContainer from '../components/CardContainer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useRecipesContext } from '../hooks/useRecipesContext'

const Home = () => {
    const { setRecipes } = useRecipesContext()
    useEffect(() => {
        fetch('/api/recipe/recipe')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setRecipes(data.recipes)
            })
    }, [setRecipes])
    return (
        <div className='grid grid-cols-10 '>
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
