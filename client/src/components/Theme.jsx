import React, { useEffect, useState } from 'react'
import { BsFillMoonFill, BsSunFill } from 'react-icons/bs'

// this is our
const Theme = ({dark, setDark}) => {

    useEffect(() => {
        if(localStorage.getItem("dark")){
            setDark(true)
        }
    }, [])
    // this toggles between our dark and light theme
    const changeTheme = () => {
        if(dark){
            localStorage.removeItem('dark')
            document.documentElement.classList.remove('dark');
            setDark(false)
            console.log('set theme to light')
        } else {
            localStorage.setItem('dark', 'true')
            document.documentElement.classList.add('dark');
            setDark(true)
            console.log('set theme to dark')
        }
      }
    
     
      console.log('is dark theme true? ', dark)

  return (
    <button type='button' onClick={changeTheme} className='flex mx-4 mb-2 items-center'>
        <BsFillMoonFill className={dark ? 'hidden' : 'flex hover:scale-110 ease-in duration-100'} color={'black'} size={26}/>
        <BsSunFill className={dark ? 'flex hover:scale-110 ease-in duration-100' : 'hidden'} color={'white'} size={26}/>
    </button>
  )
}

export default Theme