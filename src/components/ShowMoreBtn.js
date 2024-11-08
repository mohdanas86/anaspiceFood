import React from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useMyContext } from '../context/useContext'

const ShowMoreBtn = () => {
    const {handleShowMore} = useMyContext();
    return (
        <div className="flex w-full justify-center">
            <button
                onClick={handleShowMore}
                className="flex items-center gap-2 px-6 py-3 mt-6 text-lg font-semibold text-gray-700 bg-white rounded-lg shadow-lg shadow-slate-200 border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
                <span>Show more</span>
                <MdKeyboardArrowDown className="text-gray-500 text-2xl transition-transform transform group-hover:rotate-180" />
            </button>
        </div>
    )
}

export default ShowMoreBtn