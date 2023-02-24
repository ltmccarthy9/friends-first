import React from 'react'

const Landing = () => {
  
    return (
    <div className='h-screen'>
        <a href='/login' className='absolute login-landing rounded-lg text-xl top-4 right-8 py-2 px-4 cursor-pointer font-bold'>Login</a>
      <div className='flex flex-col mt-44 mx-auto'>
        <h2 className='theme-dark text-center my-4 font-extrabold tracking-tight text-8xl'>Friend's First</h2>
        <a href='/register' className='sign-up-landing m-auto font-bold text-xl theme-green rounded-lg text-center py-2 px-20'>Sign Up</a>
      </div>
    </div>
  )
}

export default Landing
