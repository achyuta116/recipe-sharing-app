import React, { useState } from 'react'


const Sidebar = () => {
		const [cuisine, setCuisine] = useState('')
		const [course, setCourse] = useState('')
		const [minPrep, setMinPrep] = useState<string | number | undefined>()
		const [maxPrep, setMaxPrep] = useState<string | number | undefined>()
		const [minCook, setMinCook] = useState<string | number | undefined>()
		const [maxCook, setMaxCook] = useState<string | number | undefined>()


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
								<input className='w-full rounded-lg mx-auto my-3 text-lg bg-yellow-400 font-semibold p-2' type="submit" onSubmit={() => {}}/>
						</form>

				</div>
		)
}

export default Sidebar
