import React, { useState } from 'react'

const Login = () => {
    const [loginUsername, setloginUsername] = useState('')
    const [loginPwd, setloginPwd] = useState('')
    const [signupName, setsignupName] = useState('')
    const [signupUsername, setsignupUsername] = useState('')
    const [signupPwd, setsignupPwd] = useState('')
    const [showSignup, setShowSignup] = useState(true)
    return (
        <div className='grid place-items-center h-[100vh] w-[100vw] bg-gradient-to-b from-black'>	
            <div className='grid grid-cols-3 rounded-lg w-[69vw] h-[75vh] overflow-clip shadow-xl'>
                <div className='col-span-2 grid content-center justify-items-end p-5 bg-white'>
                    <div className="text-6xl font-extrabold text-right">Recipes </div> 
                        <div className="text-6xl font-extrabold text-right"> App </div>
                    <div className='text-right mt-3 w-96'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus libero exercitationem architecto facere perferendis earum iste quod voluptatibus nihil? Voluptatem corrupti quae id obcaecati aut minima blanditiis laborum voluptate laudantium.</div>
                </div>
                <div className='col-span-1 bg-yellow-400'>
                        <div className="flex mt-1 space-x-8 justify-center items-center">
                            <div className={'text-xl pt-2 border-b-2 cursor-pointer border-black' + (!showSignup? ' border-transparent' : '')} onClick={() => setShowSignup(true)}>Sign Up</div>
                            <div className={'text-xl pt-2 border-b-2 cursor-pointer border-black ' + (showSignup? ' border-transparent' : '')} onClick={() => setShowSignup(false)}>Login</div>
                        </div>
                {!showSignup && 
                    <div className='grid place-items-center h-full'>
                        <form>
                            <input type="text" onChange={e => setloginUsername(e.target.value)} className='block placeholder-gray-700 hover:placeholder-black w-full bg-transparent my-1 border-gray-700 border-0 border-b-2 focus:ring-0 focus:border-black' placeholder='Username'/>
                            <input type="password" onChange={e => setloginPwd(e.target.value)} className='block placeholder-gray-700 hover:placeholder-black w-full bg-transparent my-1 border-gray-700 border-0 border-b-2 focus:ring-0 focus:border-black' placeholder='Password'/>
                            <div className='grid place-items-center'>
                                <div className='mt-3 cursor-pointer inline-block py-2 px-4 bg-black text-white font-semibold text-center rounded-full'>Submit</div>
                            </div>
                        </form>
                    </div>
            }
                {showSignup && 
                    <div className='grid place-items-center h-full'>
                        <form>
                            <input type="text" onChange={e => setsignupName(e.target.value)} className='block placeholder-gray-700 hover:placeholder-black w-full bg-transparent my-1 border-gray-700 border-0 border-b-2 focus:ring-0 focus:border-black' placeholder='Name'/>
                            <input type="text" onChange={e => setsignupUsername(e.target.value)}className='block placeholder-gray-700 hover:placeholder-black w-full bg-transparent my-1 border-gray-700 border-0 border-b-2 focus:ring-0 focus:border-black' placeholder='Username'/>
                            <input type="password" onChange={e => setsignupPwd(e.target.value)} className='block placeholder-gray-700 hover:placeholder-black w-full bg-transparent my-1 border-gray-700 border-0 border-b-2 focus:ring-0 focus:border-black' placeholder='Password'/>
                            <div className='grid place-items-center'>
                                <div className='mt-3 cursor-pointer inline-block py-2 px-4 bg-black text-white font-semibold text-center rounded-full'>Submit</div>
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
