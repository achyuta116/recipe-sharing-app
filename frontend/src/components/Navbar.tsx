import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    return (
        <div className='flex items-center w-full text-lg font-semibold h-14 shadow'>
            <NavLink to={'/'} className={({isActive}) => 'px-2 h-full grid place-items-center hover:bg-gray-50 ' + (isActive ? 'underline':'' )}>Home</NavLink>
            {user?.token && <NavLink to='/create' 
                className={({isActive}) => 'px-2 h-full grid place-items-center hover:bg-gray-50 ' + (isActive ? 'underline':'' )}>Create Recipe</NavLink>}
            {!user?.token && <NavLink to='/login'
                className='w-min py-1 px-3 rounded-full bg-blue-400 grid place-items-center ml-auto mr-1 hover:bg-blue-500'>Login</NavLink>}
            {user?.token && <NavLink to='/'
                className='w-min py-1 px-3 rounded-full bg-blue-400 grid place-items-center ml-auto mr-1 hover:bg-blue-500' onClick={() => logout()}>Logout</NavLink>}
        </div>
    )
}

export default Navbar
