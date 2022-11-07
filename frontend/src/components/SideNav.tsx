import React from 'react'
import SideNavRow from './SideNavRow'
import { HomeIcon, PlusCircleIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const SideNav = () => {
	return (
		<div className='h-[100vh] w-full p-2'>	
			<div className='text-2xl font-bold text-center m-2'> Recipe SA </div>

			<div className="mt-4 flex flex-col items-end w-max space-y-3 ml-auto">
				<SideNavRow Icon={HomeIcon} title='Recipes'/>
				<SideNavRow Icon={PlusCircleIcon} title='Create Recipe'/>
				<SideNavRow Icon={UserCircleIcon} title='Profile' />
			</div>
		</div>
	)
}

export default SideNav
