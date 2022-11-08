import React from 'react'
import { useRecipesContext } from '../hooks/useRecipesContext'
import Card from './Card'

const CardContainer = () => {
    const { recipes } = useRecipesContext()


    return (
        <div className='grid grid-cols-3'>

        </div>
    )
}

export default CardContainer
