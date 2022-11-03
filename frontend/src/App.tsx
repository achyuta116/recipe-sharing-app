import React from 'react'
import Card from './components/Card'
import Sidebar from './components/Sidebar'
import CardContainer from './components/CardContainer'
import { RecipesContextProvider } from './contexts/RecipesContext'

const App = () => {
	return (
		<div className='grid grid-cols-10'>
			<div className='col-span-2'>
				<Sidebar/>
			</div>
			<div className='col-span-8'>
				<CardContainer/>
			</div>
		</div>
	)
}

export default App
