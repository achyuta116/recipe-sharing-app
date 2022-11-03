import React, { useState } from 'react'
import { URLSearchParams } from 'url'


const Sidebar = () => {
		const [cuisine, setCuisine] = useState('')
		const [course, setCourse] = useState('')
		const [minPrep, setMinPrep] = useState<'' | number | undefined>()
		const [maxPrep, setMaxPrep] = useState<'' | number | undefined>()
		const [minCook, setMinCook] = useState<'' | number | undefined>()
		const [maxCook, setMaxCook] = useState<'' | number | undefined>()


		const cuisines = ['Indian', 'Italian']
		const courses = ['Breakfast', 'Lunch', 'Snacks', 'Dinner']

		const clearFilter = () => {
				setCuisine('')
				setCourse('')
				setMinPrep('')
				setMaxPrep('')
				setMinCook('')
				setMaxCook('')
		}

		const [ingredients, setIngredients] = useState<string[]>([
				'Ragi',
				'Wheat Flour',
				'Rava',
				'Apple',
				'Orange'
		])

		const [selected, setSelected] = useState<string[]>([])
		const [ingredientSelected, setIngredientSelected] = useState<string>('')

		const addIngredientFilter = (ingredient: string) => {
				if (!ingredient) return
				setIngredients(ingredients.filter(el => el != ingredient))
				setSelected(selected.concat([ingredient]))
				setIngredientSelected('')
		}

		const removeIngredientFilter = (ingredient: string) => {
				setSelected(selected.filter(el => el != ingredient))
				setIngredients(ingredients.concat([ingredient]))
		}

		const getIngredients = (e:React.MouseEventHandler<HTMLFormElement>) => {
				let filter: {
						cuisine?: string,
						course?: string,
						ingredients?: string[],
						minCook?: string,
						maxCook?: string,
						minPrep?: string,
						maxPrep?: string
				}  = {}
				if (cuisine) filter.cuisine = cuisine
				if (course) filter.course = course
				if (maxCook) filter.maxCook = maxCook.toString()
				if (minCook) filter.minCook = minCook.toString()
				if (minPrep) filter.minPrep = minPrep.toString()
				if (maxPrep) filter.maxPrep = maxPrep.toString()

				const query = new URLSearchParams(filter)

				fetch('/api/recipe/recipes' + query)
						.then(res => {
								
						}).catch(err => {

						})

		}

		return (
				<div className='h-[100vh] border border-l-gray-300 w-full p-2'>	
						<div className='text-2xl font-bold text-center m-2'> Recipe SA </div>
						<form>
								<label className="inline-block text-lg font-semibold border-b-2 border-b-yellow-400 m-1" htmlFor="cuisine">Cuisine</label>
								<select value={cuisine} className='bg-gray-200 border-none block rounded-full w-full my-1' onChange={e => setCuisine(e.target.value)} defaultValue={''} id='cuisine'>
										<option value=""></option>
										{cuisines.map(el => <option value={el}>{el}</option>)}
								</select>
								<label className="inline-block text-lg font-semibold border-b-2 border-b-yellow-400 m-1" htmlFor="course">Course</label>
								<select value={course} className='bg-gray-200 border-none block rounded-full w-full my-1' onChange={e => setCourse(e.target.value)} defaultValue={''} id='course'>
										<option value=""></option>
										{courses.map(el => <option value={el}>{el}</option>)}
								</select>
								<label className="inline-block text-lg font-semibold border-b-2 border-b-yellow-400 m-1">Ingredient Filter</label>
								<select value={ingredientSelected} className='bg-gray-200 border-none block rounded-full w-full my-1' defaultValue={''} onChange={e => addIngredientFilter(e.target.value)}>
										<option value=""></option>
										{ingredients.map(el => <option value={el}>{el}</option>)}
								</select>
								{selected.map(el => 
										<div key={el} className="m-1 p-2 text-md font-light border rounded-sm flex justify-between select-none">
										<div>{el}</div>
												<div onClick={() => removeIngredientFilter(el)} className='px-2 cursor-pointer text-lg'>&times;</div>
										</div>
								)}
								<label className="inline-block text-lg font-semibold border-b-2 border-b-yellow-400 m-1">Cook Time</label>
								<div>
										<input value={minCook} placeholder='(in min)' className='inline w-24 rounded-full m-1 bg-gray-200 border-none' onChange={e => setMinCook(Number(e.target.value))} type="number" min="10" max="500"/>
										<div className='inline mx-1 text-xl'>-</div>
										<input value={maxCook} placeholder='(in min)' className='inline w-24 rounded-full m-1 bg-gray-200 border-none' onChange={e => setMaxCook(Number(e.target.value))} type="number" min="10" max="500"/>
								</div>
								<label className="inline-block text-lg font-semibold border-b-2 border-b-yellow-400 m-1">Prep Time</label>
								<div>
										<input value={minPrep} placeholder='(in min)' className='inline w-24 rounded-full m-1 bg-gray-200 border-none' onChange={e => setMinPrep(Number(e.target.value))} type="number" min="10" max="500"/>
										<div className='inline mx-1 text-xl'>-</div>
										<input value={maxPrep} placeholder='(in min)' className='inline w-24 rounded-full m-1 bg-gray-200 border-none' onChange={e => setMaxPrep(Number(e.target.value))} type="number" min="10" max="500"/>
								</div>
								<input className='w-full rounded-lg mx-auto mt-3 text-lg bg-yellow-400 font-semibold p-2' type="submit" onClick={getIngredients}/>
								<input className='w-full rounded-lg mx-auto my-1 text-lg bg-yellow-400 font-semibold p-2' type="reset" onClick={clearFilter}/>
						</form>

				</div>
		)
}

export default Sidebar
