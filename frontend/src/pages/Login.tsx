import React, { useState } from 'react'

const Login = () => {
		const [loginUsername, setloginUsername] = useState('')
		const [loginPwd, setloginPwd] = useState('')
		const [signupName, setsignupName] = useState('')
		const [signupUsername, setsignupUsername] = useState('')
		const [signupPwd, setsignupPwd] = useState('')
		return (
				<div className='grid place-items-center h-[100vh] w-full'>	
						<div className='grid grid-cols-2 rounded-lg border-gray-500 border-2 w-[50vw] h-[75vh] overflow-clip'>
								<div className='grid col-span-1 place-items-center border-0 border-r border-r-gray-500'>
										<form>
												<div className='text-center text-2xl font-bold'>Login</div>
												<input type="text" onChange={e => setloginUsername(e.target.value)} className='bg-gray-200 border-none block rounded-full w-full my-1' placeholder='Username'/>
												<input type="password" onChange={e => setloginPwd(e.target.value)} className='bg-gray-200 border-none block rounded-full w-full my-1' placeholder='Password'/>
												<div className='grid place-items-center'>
														<div className='inline-block p-2 bg-yellow-400 font-semibold text-center rounded-full'>Submit</div>
														<div className='text-sm text-red-500'></div>
												</div>
										</form>
								</div>
								<div className='grid col-span-1 place-items-center bg-yellow-400 border-0 border-l border-l-gray-500'>
										<form>
												<div className='text-center text-2xl font-bold'>Signup</div>
												<input type="text" onChange={e => setsignupName(e.target.value)} className='block w-full my-1 border-gray-200 border-0 border-b-2 focus:ring-0 focus:border-black' placeholder='Name'/>
												<input type="text" onChange={e => setsignupUsername(e.target.value)}className='block rounded-full w-full my-1 border-b' placeholder='Username'/>
												<input type="password" onChange={e => setsignupPwd(e.target.value)} className='block rounded-full w-full my-1 border-b' placeholder='Password'/>
												<div className='grid place-items-center'>
														<div className='inline-block p-2 bg-yellow-400 font-semibold text-center rounded-full'>Submit</div>
														<div className='text-sm text-red-500'></div>
												</div>
										</form>
								</div>
						</div>
				</div>
		)
}

export default Login
