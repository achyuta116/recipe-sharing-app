import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SideNav from '../components/SideNav'
import { useAuthContext } from '../hooks/useAuthContext'

const Update = () => {
    const [cuisine, setCuisine] = useState('')
    const [course, setCourse] = useState('')
    const [cookTime, setCookTime] = useState('')
    const [prepTime, setPrepTime] = useState('')
    const [instructions, setInstructions] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const cuisines =['Indian', 'Italian', 'American', 'Japanese',
        'Chinese', 'French'] 
    const courses = ['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Appetizer', 'Desserts'] 
    const [ingredients, setIngredients] = useState(['Tomato','Potato','Onion', 'Brinjal', 'Drumstick'])
    const [selectedIngredients, setSelectedIngredients] = useState<{ingredient:string, amount:number}[]>([])
    const [ingredientSelected, setIngredientSelected] = useState('')
    const navigate = useNavigate()
    const { user, rname } = useParams()
    const { user: u } = useAuthContext()

    useEffect(() => {
        fetch(`/api/recipe/${encodeURIComponent(user!)}/${encodeURIComponent(rname!)}`)
            .then(async (res) => {
                const data = await fetch('/api/recipe/ingredients').then(res => res.json())
                const { recipe, ingredients: selected } = await res.json()
                setCourse(recipe.course)
                setCuisine(recipe.cuisine)
                console.log(recipe.cuisine)
                setCookTime(recipe.cook_time)
                setPrepTime(recipe.prep_time)
                setImageUrl(recipe.image_url)
                setInstructions(recipe.instructions)
                const included = selected.map((el: {iname: string}) => el.iname)
                setIngredients(data.ingredients.filter((el: string) => !included.includes(el)))
                setSelectedIngredients(selected.map((el: {iname: string, amount: number}) => ({ingredient: el.iname, amount: el.amount})))
            })
    }, [rname, user])


    const addIngredient = (e:React.ChangeEvent<HTMLSelectElement>) => {
        if (!e.target.value) return
        setIngredients(ingredients.filter(el => el !== e.target.value))
        selectedIngredients.push({ingredient: e.target.value, amount: 1})
        setSelectedIngredients(selectedIngredients)
        setIngredientSelected('')
    }

    const removeIngredient = (ingredient: string) => {
        setSelectedIngredients(selectedIngredients.filter(({ingredient: el, amount}) => el !== ingredient))
        ingredients.push(ingredient)
        setIngredients(Array.from(new Set(ingredients)))
        setIngredientSelected('')
    }

    const updateAmount = (ingredient:string, amount:number) => {
        const index = selectedIngredients.findIndex(el => el.ingredient === ingredient)
        if (index === -1) return
        selectedIngredients[index].amount = Number(amount)
        setSelectedIngredients(selectedIngredients.map(el => el)) 
    } 


    const updateRecipe = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        const recipe = {
            cuisine, course, cookTime, prepTime, imageUrl, ingredients:selectedIngredients, instructions, rname
        }

        fetch('/api/recipe/recipe', {
            method: 'PUT',
            body: JSON.stringify(recipe),
            headers: new Headers({
                'content-type':'application/json',
                'authorization': `Bearer ${u?.token}`
            })
        }).then(() => navigate('/'))
    }

    return (
        <div className='grid grid-cols-10'>
            <div className='col-span-3 border-r px-3'>
                <SideNav/>
            </div>
            <div className='col-span-7 bg-gray-50 flex flex-col items-center'>
                <div className="text-4xl font-bold text-center mt-3 p-1">Update Recipe</div>
                <form className='w-8/12 max-w-full p-5 border rounded-lg drop-shadow my-auto h-[90vh] overflow-y-scroll bg-white'>
                    <div className='flex space-x-2'>
                        <div className='flex-1'>
                            <label className="inline-block text-lg font-semibold border-b-2 border-b-yellow-400 m-1" htmlFor="course">Course</label>
                        <select value={course} 
                                className='bg-gray-200 border-none block rounded-full w-full my-1 focus:ring-0' 
                                onChange={e => setCourse(e.target.value)} 
                                id='course'>
                            <option value=""></option>
                                {courses.map(el => <option key={el} value={el}>{el}</option>)}
                            </select>
                        </div>
                        <div className='flex-1'>
                            <label className="inline-block text-lg font-semibold border-b-2 border-b-yellow-400 m-1" htmlFor="cuisine">Cuisine</label>
                            <select value={cuisine} 
                                className='bg-gray-200 border-none block rounded-full w-full my-1 focus:ring-0' 
                                onChange={e => setCuisine(e.target.value)} 
                                id='cuisine'>
                            <option value=""></option>
                                {cuisines.map(el => <option key={el} value={el}>{el}</option>)}
                            </select>
                        </div>
                    </div>
                    <label className="inline-block text-lg font-semibold border-b-2 border-b-yellow-400 m-1">Recipe Image Url</label>
                    <input className='block w-full rounded-lg focus:ring-0'
                        type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)}/>
                    <div className="flex items-center mx-1 mt-2 space-x-2 w-full">
                        <label className="inline-block text-lg font-semibold border-b-2 border-b-yellow-400">Ingredients</label>
                        <select value={ingredientSelected} className='bg-gray-200 border-none rounded-full focus:ring-0'
                            onChange={addIngredient}>
                        <option value=""></option>
                            {ingredients.map(el => <option key={el}>{el}</option>)}
                        </select>
                    </div>
                    <div className='grid w-full'>
                        {selectedIngredients.map(({ingredient, amount}) => 
                            <span key={ingredient} className="m-1 p-1 text-sm max-w-full font-light border rounded-full flex items-center select-none">
                                <span className='flex-1 p-2 text-md font-semibold'>{ingredient}</span>
                                <input type="number" className='border-none h-min focus:ring-0 text-right' min={1} 
                                    onChange={e => updateAmount(ingredient, Number(e.target.value))} value={amount}/>
                                <span onClick={() => removeIngredient(ingredient)} className='px-2 cursor-pointer text-lg'>&times;</span>
                            </span>
                        )}
                    </div>
                    <div className='flex space-x-2'>
                        <div className='flex-1'>
                            <label className="inline-block text-lg font-semibold border-b-2 border-b-yellow-400 m-1">Cook Time</label>
                            <input className='block w-full rounded-lg focus:ring-0' type="number" value={cookTime} min='10' max='500' onChange={e => setCookTime(e.target.value)}/>
                        </div>
                        <div className='flex-1'>
                            <label className="inline-block text-lg font-semibold border-b-2 border-b-yellow-400 m-1">Prep Time</label>
                            <input className='block w-full rounded-lg focus:ring-0' type="number" value={prepTime} min='10' max='500' onChange={e => setPrepTime(e.target.value)}/>
                        </div>					
                    </div>
                    <label className="inline-block text-lg font-semibold border-b-2 border-b-yellow-400 m-1">Instructions</label>
                    <textarea className='block w-full' onChange={e => setInstructions(e.target.value)} value={instructions}></textarea>
                    <div onClick={updateRecipe} className='cursor-pointer p-2 text-center bg-yellow-400 font-bold rounded-full mt-3'>Update Recipe</div>
                </form>
            </div>
        </div>
    )
}

export default Update

