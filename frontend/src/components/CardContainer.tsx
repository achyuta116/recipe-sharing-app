import React, { useEffect } from 'react'
import { useRecipesContext } from '../hooks/useRecipesContext'
import Card from './Card'

const CardContainer = () => {
    const { recipes } = useRecipesContext()


    return (
        <div className='grid grid-cols-3 place-items-center gap-3'>
            {recipes && recipes.map(el => 
                <Card imageUrl={el.image_url} author={el.uname} course={el.course}
                    cuisine={el.cuisine} prepTime={el.prep_time} cookTime={el.cook_time}
                    recipeName={el.rname}/>)}
        </div>
    )
}

export default CardContainer
