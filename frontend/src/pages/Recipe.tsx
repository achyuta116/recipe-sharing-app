import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

const Recipe = () => {
    let { user, rname } = useParams()
    user = 'author'
    const imageUrl = require('../assets/bowl.png')
    return (
        <div className='grid grid-cols-10 h-[100vh] overflow-y-scroll'>
            <div className='border border-y-gray-500 col-span-4 col-start-4 p-3 px-4'>
                <div className="flex items-center space-x-2">
                    <div className="flex-1 text-4xl font-bold">Recipe Name</div>
                    {'author' === user && <span>
                        <TrashIcon className='h-7 w-7 p-1 rounded-full border'/>
                    </span>}
                    {'author' === user && <NavLink to={`/update/${encodeURIComponent(user)!}/${encodeURIComponent(rname!)}`}>
                        <PencilIcon className='h-7 w-7 p-1 rounded-full border'/>
                    </NavLink>}
                </div>
                <div className="flex my-2 w-full items-center justify-between font-light text-gray-600">
                    <span>Author Name</span>
                    <span>11/12/22</span>
                </div>
                <img className='h-64 w-full bg-gray-700 object-cover' src={imageUrl} alt="bowl"/>
                <div className="text-lg font-semibold underline mt-2">Details</div>
                Course: <span>Breakfast</span>
                <br/>
                Cuisine: <span>Indian</span>
                <br/>
                Cook Time: <span>20 min</span>
                <br/>
                Prep Time: <span>10 min</span>
                <br/>
                <div className='font-semibold text-lg underline mt-2'>Ingredients</div>
                <ul className='list-disc list-inside'>
                    <li>Maggi (pc.s) - {4}</li>
                    <li>Water (cups.) - {2}</li>
                </ul>
                <div className='font-semibold text-lg underline mt-2'>Instructions</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam unde recusandae, quisquam deserunt dicta laborum quaerat animi. Temporibus eaque optio ut tempora architecto officia amet tenetur, consequatur laboriosam enim sapiente!
                Quidem doloribus doloremque fugit, ipsa corrupti dolor veniam fugiat corporis hic est neque perferendis tempore quaerat aut maiores saepe explicabo ex natus pariatur. Non beatae laboriosam aliquid blanditiis ex dignissimos!
                Delectus quis veritatis quisquam mollitia laborum officiis nobis odio soluta excepturi. Quo vitae repudiandae deserunt esse corrupti, quaerat minus sit doloribus incidunt necessitatibus eligendi quod, illo repellat non tempora dolorum.
                Reiciendis corrupti cum repellendus reprehenderit dolores dolore laboriosam dolorum maiores similique atque veritatis unde quasi ullam voluptatibus quam perspiciatis suscipit eveniet, quis debitis! Nihil, nisi vitae? Error eligendi cum nostrum.
                Consequatur quidem optio obcaecati, iure error ratione, quasi odio cumque quae ipsum accusamus nesciunt harum. Repellat, placeat, quae nulla quia est vel, iusto earum ullam illum sit perferendis? Aliquid, quam?

            </div>
        </div>
    )
}

export default Recipe
