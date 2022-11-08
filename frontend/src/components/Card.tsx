import React from 'react'

interface Props {
    imageUrl: string,
    recipeName: string,
    author: string,
    prepTime: number,
    cookTime: number,
    course: string,
    cuisine: string
}


const Card = ({ recipeName, author, prepTime, cookTime, course, cuisine }: Props) => {
    const imageUrl = require('../assets/bowl.png')
    return (
        <div className='relative rounded-md border w-80 overflow-clip shadow-md'>
            <div className='h-50 overflow-y-hidden'>
                <img className='w-full hover:scale-105 transition-all ease-out' src={imageUrl} alt='recipe-img'/>
            </div>
            <div className='absolute top-0 flex space-x-2 p-2 w-full'>
                <div className='badge bg-yellow-400'>{cuisine}</div>
                <div className='badge bg-yellow-400'>{course}</div>
                <div className='flex items-end flex-1 flex-col space-y-1 text-gray-700'>
                    <div className='badge bg-gray-200'>{prepTime}min 🔪</div>
                    <div className='badge bg-gray-200'>{cookTime}min 🕙</div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute right-4 top-36 w-14 h-14 bg-yellow-400 rounded-full p-2 hover:scale-105 transition-all ease-out cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
            <div className='p-2 border-gray-50 text-gray-700'>
                <div className='font-bold text-lg'>{recipeName}</div>
                <div className='font-light'>{author}</div>
            </div>
        </div>
    )
}

export default Card
