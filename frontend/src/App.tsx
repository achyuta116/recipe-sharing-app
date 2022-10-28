import React from 'react'
import Card from './components/Card'
import Sidebar from './components/Sidebar'

const App = () => {
		return (
				<div className='grid grid-cols-10'>
						<div className='col-span-2'>
								<Sidebar/>
						</div>
						<div className='col-span-8'>
								<Card imageUrl='../assets/bowl.png' recipeName='Omurice' author='Bhargav' prepTime={25} cookTime={20} course='Breakfast' cuisine='Indian'/>
						</div>
				</div>
		)
}

export default App
