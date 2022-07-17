import React from 'react'

export const Search = () => {
    return(
        <>
            <div className='flex flex-col'>
                <div className='search mt-12 mx-auto'>
                    <input 
                        className='search pl-5 text-2xl'
                        type='text'
                        placeholder='Location...'
                    />
                </div>
            </div>
        </>
    )
}