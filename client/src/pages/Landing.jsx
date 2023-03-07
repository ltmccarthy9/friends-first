import React from 'react'

const Landing = () => {
  
    return (
    <div className='h-screen'>
        <a href='/login' className='absolute rounded-lg text-xl top-4 right-8 py-2 px-4 cursor-pointer font-bold bg-teal-400 hover:bg-teal-500 text-gray-50 hover:text-gray-50'>Login</a>
      <div className='flex flex-col mt-44 mx-auto'>
        <h2 className='text-gray-700 text-center my-4 font-extrabold tracking-tight text-8xl'>Friend's First</h2>
        <a href='/register' className='bg-gray-700 text-gray-50 hover:text-gray-50 hover:bg-gray-600 m-auto font-bold text-xl theme-green rounded-lg text-center py-2 px-20'>Sign Up</a>
      </div>
    </div>
  )
}

export default Landing
