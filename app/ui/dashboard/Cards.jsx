import React from 'react'

const Cards = ({ title, value }) => {
    return (
        <div className='rounded-xl bg-gray-100 p-2 shadow-sm'>
            <div className="flex p-4">
                <h3 className='ml-2 text-sm sm:text-xl font-medium'>{title}</h3>
            </div>
            <p
                className='truncate rounded-xl bg-white px-4 py-8 text-center text-2xl'
            >{value}</p>
        </div>
    )
}

export default Cards