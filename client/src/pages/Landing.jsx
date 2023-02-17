import React from 'react'

const Landing = () => {
  
    return (
    <div className='h-screen'>
        <a href='/login' className='absolute text-xl top-4 right-8 signOut p-3 cursor-pointer font-bold'>Login</a>
      <div className='flex flex-col mt-44 mx-auto'>
        <h2 className='theme-green text-center my-4 font-extrabold tracking-tight text-8xl'>Friend's First</h2>
        <a href='/register' className='signUp mx-auto font-bold text-xl theme-green rounded-lg text-center pt-2'>Sign Up</a>
      </div>
    </div>
  )
}

export default Landing
