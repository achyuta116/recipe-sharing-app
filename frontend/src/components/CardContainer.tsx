import React from 'react'
import { useRecipesContext } from '../hooks/useRecipesContext'
import Card from './Card'

const CardContainer = () => {
    const { recipes } = useRecipesContext()


    return (
        <div className='grid grid-cols-3 px-2'>
            <Card imageUrl='../assets/bowl.png' author='Bhargav' course='Indian' cuisine='Breakfast' prepTime={10} cookTime={30} recipeName='Omurice'/>
        </div>
    )
}

export default CardContainer
