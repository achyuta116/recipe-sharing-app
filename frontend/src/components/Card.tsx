import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    imageUrl: string,
    recipeName: string,
    author: string,
    prepTime: number,
    cookTime: number,
    course: string,
    cuisine: string
}


const Card = ({ recipeName, imageUrl, author, prepTime, cookTime, course, cuisine }: Props) => {

    return (
        <Link to={`/recipe/${encodeURIComponent(author)}/${encodeURIComponent(recipeName)}`}>
            <div className='relative rounded-md border w-80 overflow-clip shadow-md hover:scale-105 transition-all ease-out cursor-pointer'>
                <div className='h-48 overflow-y-hidden'>
                    <img className='w-full hover:scale-105 transition-all ease-out' src={imageUrl} alt='recipe-img'/>
                </div>
                <div className='absolute top-0 flex space-x-2 p-2 w-full'>
                    <div className='badge bg-yellow-400 cursor-default'>{cuisine}</div>
                    <div className='badge bg-yellow-400 cursor-default'>{course}</div>
                    <div className='flex items-end flex-1 flex-col space-y-1 text-gray-700'>
                        <div className='badge bg-gray-200 cursor-default'>{prepTime}min 🔪</div>
                        <div className='badge bg-gray-200 cursor-default'>{cookTime}min 🕙</div>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute right-4 top-40 w-14 h-14 bg-yellow-400 rounded-full p-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
                <div className='p-2 border-gray-50 text-gray-700'>
                    <div className='font-bold text-lg'>{recipeName}</div>
                    <div className='font-light'>{author}</div>
                </div>
            </div>
        </Link>
    )
}

export default Card
