import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const Recipe = () => {
    let { user, rname } = useParams()
    const { user: u } = useAuthContext()
    const [cuisine, setCuisine] = useState('')
    const [course, setCourse] = useState('')
    const [cookTime, setCookTime] = useState('')
    const [prepTime, setPrepTime] = useState('')
    const [instructions, setInstructions] = useState('')
    const [ingredients, setIngredients] = useState<{iname: string, amount: number}[]>([])
    const [imageUrl, setImageUrl] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`/api/recipe/${encodeURIComponent(user!)}/${encodeURIComponent(rname!)}`)
            .then(res => res.json())
            .then(({ recipe, ingredients }) => {
                setCuisine(recipe.cuisine)
                setCourse(recipe.course)
                setCookTime(recipe.cook_time)
                setPrepTime(recipe.prep_time)
                setInstructions(recipe.instructions)
                setImageUrl(recipe.image_url)
                setIngredients(ingredients)
            })
    }, [user, rname])

    const deleteRecipe = (e:React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault()
        fetch('/api/recipe/recipe', {
            method: 'DELETE',
            headers: new Headers({
                'content-type': 'application/json',
                'authorization': `Bearer ${u?.token}`
            }),
            body: JSON.stringify({ rname })
        }).then(() => navigate('/'))
    }

    return (
        <div className='grid grid-cols-10 h-[100vh] overflow-y-scroll'>
            <div className='border border-y-gray-500 col-span-4 col-start-4 p-3 px-4'>
                <div className="flex items-center space-x-2">
                    <div className="flex-1 text-4xl font-bold">{rname}</div>
                    {u?.username === user && <span onClick={deleteRecipe}>
                        <TrashIcon className='cursor-pointer h-7 w-7 p-1 rounded-full border'/>
                    </span>}
                    {u?.username === user && <NavLink to={`/update/${encodeURIComponent(user!)}/${encodeURIComponent(rname!)}`}>
                        <PencilIcon className='h-7 w-7 p-1 rounded-full border'/>
                    </NavLink>}
                </div>
                <div className="flex my-2 w-full items-center justify-between font-light text-gray-600">
                    <span>By: {user}</span>
                </div>
                <img className='h-64 w-full bg-gray-700 object-cover' src={imageUrl} alt="bowl"/>
                <div className="text-lg font-semibold underline mt-2">Details</div>
                Course: <span>{course}</span>
                <br/>
                Cuisine: <span>{cuisine}</span>
                <br/>
                Cook Time: <span>{cookTime} min</span>
                <br/>
                Prep Time: <span>{prepTime} min</span>
                <br/>
                <div className='font-semibold text-lg underline mt-2'>Ingredients</div>
                <ul className='list-disc list-inside'>
                    {ingredients.map(el => <li key={el.iname}>{el.iname} - {el.amount}</li>)}
                </ul>
                <div className='font-semibold text-lg underline mt-2'>Instructions</div>
                {instructions}
            </div>
        </div>
    )
}

export default Recipe
