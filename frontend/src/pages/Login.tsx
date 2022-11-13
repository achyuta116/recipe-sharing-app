import React, { useState } from 'react'

const Login = () => {
    const [loginUsername, setloginUsername] = useState('')
    const [loginPwd, setloginPwd] = useState('')
    const [signupName, setsignupName] = useState('')
    const [signupUsername, setsignupUsername] = useState('')
    const [signupPwd, setsignupPwd] = useState('')
    const [showSignup, setShowSignup] = useState(true)
    
    return (
        <div className="grid place-items-center h-[100vh] w-[100vw] bg-[url('https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2788&q=80')] bg-cover bg-no-repeat">	
            <div className='grid grid-cols-3 rounded-xl w-[69vw] overflow-clip shadow-2xl'>
                <div className='col-span-2 grid content-center justify-items-end p-5 backdrop-blur-md bg-white bg-opacity-20'>
                    <div className="text-6xl font-extrabold text-right">Recipes</div> 
                    <div className="text-6xl font-extrabold text-right">App</div>
                    <div className='text-right mt-3 w-96'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus libero exercitationem architecto facere perferendis earum iste quod voluptatibus nihil? Voluptatem corrupti quae id obcaecati aut minima blanditiis laborum voluptate laudantium.</div>
                </div>
                <div className='flex flex-col col-span-1 bg-yellow-400 h-[75vh]'>
                        <div className="grid grid-cols-2 border-b-2 border-b-white bg-yellow-500">
                            <div className={'text-xl py-2 w-full text-center cursor-pointer' + (showSignup? ' bg-yellow-400' : '')} onClick={() => setShowSignup(true)}>Sign Up</div>
                            <div className={'text-xl py-2 w-full text-center cursor-pointer' + (!showSignup? ' bg-yellow-400' : '')} onClick={() => setShowSignup(false)}>Login</div>
                        </div>
                    {!showSignup && 
                        <div className='grid place-items-center flex-1'>
                            <form>
                                <input type="text" onChange={e => setloginUsername(e.target.value)} className='block placeholder-gray-700 hover:placeholder-black w-full bg-transparent my-1 border-gray-700 border-0 border-b-2 focus:ring-0 focus:border-black' placeholder='Username'/>
                                <input type="password" onChange={e => setloginPwd(e.target.value)} className='block placeholder-gray-700 hover:placeholder-black w-full bg-transparent my-1 border-gray-700 border-0 border-b-2 focus:ring-0 focus:border-black' placeholder='Password'/>
                                <div className='grid place-items-center'>
                                    <div className='mt-6 hover:scale-105 cursor-pointer inline-block py-2 px-4 bg-black text-white font-semibold text-center rounded-full transition ease-out'>Submit</div>
                                </div>
                            </form>
                        </div>
                }
                    {showSignup && 
                        <div className='grid place-items-center flex-1'>
                            <form>
                                <input type="text" onChange={e => setsignupName(e.target.value)} className='block placeholder-gray-700 hover:placeholder-black w-full bg-transparent my-1 border-gray-700 border-0 border-b-2 focus:ring-0 focus:border-black' placeholder='Name'/>
                                <input type="text" onChange={e => setsignupUsername(e.target.value)}className='block placeholder-gray-700 hover:placeholder-black w-full bg-transparent my-1 border-gray-700 border-0 border-b-2 focus:ring-0 focus:border-black' placeholder='Username'/>
                                <input type="password" onChange={e => setsignupPwd(e.target.value)} className='block placeholder-gray-700 hover:placeholder-black w-full bg-transparent my-1 border-gray-700 border-0 border-b-2 focus:ring-0 focus:border-black' placeholder='Password'/>
                                <div className='grid place-items-center'>
                                    <div className='mt-6 hover:scale-105 cursor-pointer inline-block py-2 px-4 bg-black text-white font-semibold text-center rounded-full transition ease-out'>Submit</div>
                                </div>
                            </form>
                        </div>
                }
                </div>
            </div>
        </div>
    )
}

export default Login
